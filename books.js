import fs from 'node:fs';
import path from 'node:path';

const file = path.join(import.meta.dirname, 'books.json');

export function loadBooks(callback) {
    fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
            callback(err);
            return;
        }

        let books;
        try {
            books = JSON.parse(content);
        } catch (parseError) {
            callback(parseError);
            return
        }

        callback(null, books);
    });
}