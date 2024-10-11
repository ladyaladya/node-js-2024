import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const settingsFile = path.join(process.cwd(), 'settings.json');
const settings = await readSettings();
const historyFile = path.join(process.cwd(), settings.historyFile);

const server = createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === settings.historyRoute) {
    await serveHistory(res);
  } else {
    await trackRoute(pathname);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Visited ${pathname}`);
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

async function readSettings() {
  return readFileAsJSON(settingsFile);
}

async function trackRoute(route) {
  await ensureFileExists(historyFile, {});
  const history = await readFileAsJSON(historyFile);
  history[route] = (history[route] || 0) + 1;
  await writeJSON(historyFile, history);
}

async function ensureFileExists(filePath, defaultContent) {
  try {
    await fs.access(filePath);
  } catch {
    await writeJSON(filePath, defaultContent);
  }
}

async function serveHistory(res) {
  await ensureFileExists(historyFile, {});
  const history = await readFileAsJSON(historyFile);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(history, null, 2));
}

async function readFileAsJSON(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeJSON(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
