'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

loadEnvFile(path.join(ROOT, '.env'));

const MIME_OK = new Set(Object.keys(MIME));

function loadEnvFile(file) {
  try {
    fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach(function (line) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.charAt(0) === '#') return;
      const eq = trimmed.indexOf('=');
      if (eq < 1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.charAt(0) === '"' && val.charAt(val.length - 1) === '"') || (val.charAt(0) === "'" && val.charAt(val.length - 1) === "'")) {
        val = val.slice(1, -1);
      }
      if (key && process.env[key] == null) process.env[key] = val;
    });
  } catch {
    /* no .env is fine — For You stays on-device */
  }
}

function sendJson(res, code, body) {
  const data = JSON.stringify(body);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store'
  });
  res.end(data);
}

function readBody(req, limit) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    let size = 0;
    req.on('data', function (chunk) {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', function () {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
    req.on('error', reject);
  });
}

function onDevicePicks(seed, catalog) {
  const sid = seed && seed.id;
  return catalog
    .filter(function (s) {
      return s && s.id && s.id !== sid && (s.genre === seed.genre || s.theme === seed.theme);
    })
    .slice(0, 6)
    .map(function (s) { return s.id; });
}

function hasBedrockCreds() {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    (process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION)
  );
}

async function bedrockPicks(seed, catalog) {
  const { BedrockRuntimeClient, ConverseCommand } = require('@aws-sdk/client-bedrock-runtime');
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
  const modelId = process.env.BEDROCK_MODEL_ID || 'amazon.nova-lite-v1:0';
  const allowed = catalog.map(function (s) { return s.id; }).filter(Boolean);
  const client = new BedrockRuntimeClient({ region });
  const prompt =
    'You rank original CINESCAPE catalogue titles for a Fire TV For You row. ' +
    'Seed title: ' + (seed.title || '') + ' (genre ' + (seed.genre || '') + ', mood ' + (seed.theme || '') + '). ' +
    'Choose exactly 6 ids from this JSON list. Reply with JSON only: {"ids":["id"]}. No other ids.\n' +
    JSON.stringify(catalog.slice(0, 80));
  const out = await client.send(new ConverseCommand({
    modelId: modelId,
    messages: [{ role: 'user', content: [{ text: prompt }] }],
    inferenceConfig: { maxTokens: 256, temperature: 0.2 }
  }));
  const text = ((out.output && out.output.message && out.output.message.content) || [])
    .map(function (part) { return part.text || ''; })
    .join(' ');
  const match = text.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(match ? match[0] : text);
  const ids = (parsed.ids || []).filter(function (id) {
    return allowed.indexOf(id) !== -1 && id !== seed.id;
  });
  return ids.slice(0, 6);
}

async function handleForYou(req, res) {
  let payload = {};
  try {
    payload = JSON.parse(await readBody(req, 200000)) || {};
  } catch {
    sendJson(res, 400, { source: 'on-device', ids: [] });
    return;
  }
  const seed = payload.seed || {};
  const catalog = Array.isArray(payload.catalog) ? payload.catalog : [];
  const fallback = onDevicePicks(seed, catalog);
  if (!hasBedrockCreds()) {
    sendJson(res, 200, { source: 'on-device', ids: fallback });
    return;
  }
  try {
    const ids = await bedrockPicks(seed, catalog);
    if (!ids.length) {
      sendJson(res, 200, { source: 'on-device', ids: fallback });
      return;
    }
    sendJson(res, 200, { source: 'bedrock', ids: ids });
  } catch (err) {
    sendJson(res, 200, { source: 'on-device', ids: fallback, error: 'bedrock-unavailable' });
  }
}

const server = http.createServer(function (req, res) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://' + (req.headers.host || 'localhost')).pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  if (req.method === 'GET' && pathname === '/api/status') {
    sendJson(res, 200, { ok: true, bedrock: hasBedrockCreds() });
    return;
  }
  if (req.method === 'POST' && pathname === '/api/foryou') {
    handleForYou(req, res).catch(function () {
      sendJson(res, 200, { source: 'on-device', ids: [] });
    });
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const ext = path.extname(pathname).toLowerCase();
  if (ext && !MIME_OK.has(ext)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  const filePath = path.resolve(ROOT, '.' + pathname);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, function (err, stat) {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', function () {
  console.log('CINESCAPE running at http://localhost:' + PORT);
  console.log(hasBedrockCreds()
    ? 'For You: Amazon Bedrock when the model is enabled; otherwise on-device picks.'
    : 'For You: on-device picks (add AWS keys in .env to call Bedrock).');
});
