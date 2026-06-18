import { readFile, writeFile, mkdir } from 'node:fs/promises';
import {join,basename,extname} from 'node:path';

const content = await readFile('./archivo.txt');
console.log(content.toString());

const outputDir = join('output', 'files', 'documents');
await mkdir(outputDir, { recursive: true });

const uppercaseContent = content.toString().toUpperCase();
const outputfilePath = join(outputDir, 'archivo-uppercase.txt');

console.log('la extension del archivo es: ', extname(outputfilePath));
console.log('el nombre del archivo es: ', basename(outputfilePath));

await writeFile(outputfilePath, uppercaseContent);
console.log('Archivo convertido a mayúsculas y guardado como archivo-uppercase.txt');
