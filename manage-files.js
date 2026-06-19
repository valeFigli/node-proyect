import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const filePath = './archivo.txt';
const outputDir = join('output', 'files', 'documents');

if (!process.permission.has('fs.read', filePath)) {
  console.log('No se tienen permisos para leer el archivo archivo.txt');
  process.exit(1);
}

const content = await readFile(filePath, 'utf8');
console.log('contenido del archivo:');
console.log(content);

if (!process.permission.has('fs.write', outputDir)) {
  console.log('No se tienen permisos para escribir en el directorio especificado');
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });
const uppercaseContent = content.toUpperCase();
const outputFilePath = join(outputDir, 'archivo-uppercase.txt');

console.log('la extension del archivo es:', extname(outputFilePath));
console.log('el nombre del archivo es:', basename(outputFilePath));

await writeFile(outputFilePath, uppercaseContent);
console.log('Archivo convertido a mayúsculas y guardado como archivo-uppercase.txt');
