import { createServer } from 'node:http';
import url from 'node:url';

const server = createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname.startsWith('/add/')) {
    handleAddNumbers(pathname, res);
  }
  else if (pathname.startsWith('/subtract')) {
    handleSubtract(pathname, res);
  }
  else if (pathname.startsWith('/mult')) {
    handleMult(pathname, res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

function getNumbersFromQuery(pathname) {
  const numbersString = pathname.split('/')[2];
  return numbersString
    .split('-')
    .map(Number)
    .filter(num => !isNaN(num));
}

function handleAddNumbers(pathname, res) {
  const numbers = getNumbersFromQuery(pathname);

  if (!numbers) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Invalid input.');
  }

  const sum = sumNumbers(numbers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Sum is ${sum}.`);
}

function handleMult(pathname, res) {
  const numbers = getNumbersFromQuery(pathname);

  if (!numbers) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Invalid input.');
  }

  const mult = multiplyNumbers(numbers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Multiply result is ${mult}.`);
}

function handleSubtract(pathname, res) {
  const numbers = getNumbersFromQuery(pathname);

  if (!numbers) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Invalid input.');
  }

  const subtract = subtractNumbers(numbers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Subtract result is ${subtract}.`);
}

function sumNumbers(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function subtractNumbers(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.reduce((acc, curr) => acc - curr);
}

function multiplyNumbers(numbers) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}