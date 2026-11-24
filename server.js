import http from 'node:http';
import { loadBooks } from './books.js';

const port = process.env.PORT ?? 3000;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const { method } = req;
  const { pathname } = new URL(req.url, 'http://localhost');

  try {
    if (method === 'GET' && pathname === '/books') {
      const books = await loadBooks();
      sendJson(res, 200, books);
      return;
    }

    const parts = pathname.split('/');

      if (method === 'GET' && parts.length === 3 && parts[1] === 'books') {
      const id = Number(parts[2]);
      const books = await loadBooks();
      const book = books.find((b) => b.id === id);

      if (!book) {
        sendJson(res, 404, { error: 'Book not found' });
        return;
      }

      sendJson(res, 200, book);
      return;
    }

    sendJson(res, 404, { error: 'Route not found' });
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: 'Server error' });
  }
});


server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});