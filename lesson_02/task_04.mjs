import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const staticHtmlFilesPath = path.join(process.cwd(), 'static', 'html');

const server = createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/' || pathname === '/coffee' || pathname === '/music') {
    handleRoute(pathname, res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

function handleRoute(pathname, res) {
    const routeToFilePathMap = {
        ['/']: 'about.html',
        ['/coffee']: 'coffee.html',
        ['/music']: 'music.html',
    };

    const htmlFilePath = path.join(staticHtmlFilesPath, routeToFilePathMap[pathname]);
    const readStream = createReadStream(htmlFilePath);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    readStream.pipe(res);

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error: Unable to load the page');
    });
}