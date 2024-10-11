import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const storageFileName = 'numbers.txt';
const storageDir = path.join(process.cwd(), 'storage');
const filePath = path.join(storageDir, storageFileName);

const server = createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname.startsWith('/save_num/')) {
    await handleAddNumberToFile(pathname, res);
  }
  else if (pathname === '/sum') {
    await handleSum(res);
  }
  else if (pathname === '/mult') {
    await handleMult(res);
  }
  else if (pathname === '/remove') {
    await handleRemove(res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

async function handleAddNumberToFile(pathname, res) {
  const number = parseInt(pathname.split('/')[2]);

  if (isNaN(number)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Invalid input: not a number.');
  }

  try {
    await addNumberToFile(number);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Number ${number} successfully stored in the file.`);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error while adding number to file.');
  }
}

async function handleSum(res) {
  try {
    const numbers = await readNumbersFromFile();
    const sum = sumNumbers(numbers);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Sum is ${sum}.`);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error while calculating sum.');
  }
}

async function handleMult(res) {
  try {
    const numbers = await readNumbersFromFile();
    const multiply = multiplyNumbers(numbers);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Multiply result is ${multiply}.`);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error while calculating multiply.');
  }
}

async function handleRemove(res) {
  try {
    await deleteFile();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('File successfully removed.');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error while deleting file.');
  }
}

async function addNumberToFile(number) {
  try {
    await fs.mkdir(storageDir, { recursive: true });
    await fs.appendFile(filePath, `${number}\n`);
    console.log(`Number ${number} added to ${filePath}.`);
  } catch (err) {
    console.error('Error writing to file:', err);
    throw err;
  }
}

async function readNumbersFromFile() {
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf-8');
    return data
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(Number)
      .filter(num => !isNaN(num));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File does not exist.');
      return [];
    } else {
      console.error('Error reading the file:', err);
      throw err;
    }
  }
}

function sumNumbers(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function multiplyNumbers(numbers) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}

async function deleteFile() {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File does not exist.');
    } else {
      console.error('An error occurred while deleting the file:', error);
      throw error;
    }
  }
}
