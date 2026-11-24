import { readFile } from 'node:fs/promises';
import path from 'node:path';

const file = path.join(import.meta.dirname, 'books.json');

export async function loadBooks(){
    const content = await readFile(file, 'utf8');
    return JSON.parse(content);
}