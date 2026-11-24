import http from 'node:http';
import { loadBooks } from './books.js';

const port = process.env.PORT ?? 3000;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { method } = req;
  const { pathname } = new URL(req.url, 'http://localhost');

  if (method === 'GET' && pathname === '/books') {
    loadBooks((err, books) => {
      if (err) {
        console.error(err);
        sendJson(res, 500, { error: 'Server error' });
        return;
      }
      sendJson(res, 200, books);
    });
    return;
  }

  sendJson(res, 404, { error: 'Route not found' });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});