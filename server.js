import {createServer} from 'node:http';
import { uptime } from 'node:process';
import {json} from 'node:stream/consumers';
import {randomUUID} from 'node:crypto';


process.loadEnvFile();// Cargar las variables de entorno desde el archivo .env

const port = process.env.PORT ?? 3000;

function sendJsonResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(data));
}

const users = [
            { name: 'Vale', id: 1 },
            { name: 'Oli', id: 2 }
        ]

const server = createServer(async (req, res) => {
    const { method, url } = req;

    const [pathname, queryString = ''] = url.split('?');
    const searchParams = new URLSearchParams(queryString);

    if (url === '/') {
        res.setHeader('content-type', 'text/html; charset=utf-8');
        return res.end('Hola VALE!! 🌟 este es un server HTTP creado con Node.js');
    }

    if (method === 'GET' && pathname === '/users') {
        const limitParam = searchParams.get('limit');
        const limit = limitParam ? Number(limitParam) : users.length;
        const offset = Number(searchParams.get('offset')) || 0;

        if (limit > 0) {
            const paginatedUsers = users.slice(offset, offset + limit);
            return sendJsonResponse(res, 200, paginatedUsers);
        }

        return sendJsonResponse(res, 200, users);
    }

    if (method === 'GET' && pathname === '/health') {
        return sendJsonResponse(res, 200, { status: 'OK', uptime: process.uptime() });
    }

    if (method === 'POST' && pathname === '/users') {
        const body = await json(req);

        if (!body || !body.name) {
            return sendJsonResponse(res, 400, { error: 'Nombre del usuario es requerido' });
        }

        const newUser = {
            name: body.name,
            id: randomUUID(),
        };
        users.push(newUser);

        return sendJsonResponse(res, 201, { message: 'Usuario creado correctamente' });
    }

    return sendJsonResponse(res, 404, { error: 'Not Found' });
});

server.listen(port, () => {
    const address = server.address()
    console.log(`Server esta escuchando en http://localhost:${address.port} 🚀`)
})
    
