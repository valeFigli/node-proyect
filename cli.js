import {readdir, stat} from 'node:fs/promises';
import {join} from 'node:path';

//1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? '.';

//2. Formateo simple de los tamaños
const formatBytes = (size) => {
    if (size < 1024) return `${size} B`;
    return `${(size / (1024 ** 2)).toFixed(2)} KB`;
}

//3. leer los nombres sin info
const files = await readdir(dir);

//4.Recuperar la info de cada file  
const entries = await Promise.all(
    files.map(async (name) => {
        const fullpath = join(dir, name);
        const info = await stat(fullpath);
        return {
            name,
            size: formatBytes(info.size),
            isDirectory: info.isDirectory(),
        }

    })
)
//sort
// 1.Que aparezcan primero las carpetas
// 2.Orden alfabético

//filter
//tener en cuenta el flag --files-only o --dirs-only


for (const entry of await entries) {
    //Renderizar la info
    const icon = entry.isDirectory ? '📁' : '📄';
    const size = entry.isDirectory ? '-' : `(${entry.size})`
    console.log(`${icon} ${entry.name.padEnd(25)}   ${size}`)
}