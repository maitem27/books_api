import http from 'node:http';
import { books } from './books.js';

const port = 3000;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { method } = req;
  const { pathname } = new URL(req.url, 'http://localhost');

  if (method === 'GET' && pathname === '/books') {
    sendJson(res, 200, books);
    return;
  }

  sendJson(res, 404, { error: 'Route not found' });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});