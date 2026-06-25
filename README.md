# Ejemplos Node

Proyecto de ejemplo con varios scripts en Node.js.

## Archivos principales

- `index.js`: ejemplo simple que importa la función `sum` de `math.js`.
- `server.js`: servidor HTTP básico con Node.js que responde texto plano.
- `manage-files.js`: lee `archivo.txt`, convierte su contenido a mayúsculas y escribe el resultado en `output/files/documents/archivo-uppercase.txt`.
- `cli.js`: listador de directorios que muestra iconos emoji para carpetas y archivos.
- `package.json`: configuración del proyecto.

## Requisitos

- Node.js 18+ con soporte para módulos ES.

## Ejecutar el servidor

```bash
PORT=3000 node server.js
```

Luego abre en el navegador:

```bash
http://localhost:3000
```

### Endpoints disponibles

#### GET `/`
Devuelve un mensaje de bienvenida en HTML.

```bash
curl http://localhost:3000/
```

#### GET `/users`
Devuelve la lista de usuarios en JSON. Soporta paginación.

**Parámetros de query:**
- `limit` (opcional): número de usuarios a devolver. Defecto: todos.
- `offset` (opcional): índice inicial. Defecto: 0.

Ejemplos:
```bash
curl http://localhost:3000/users
curl http://localhost:3000/users?limit=1
curl http://localhost:3000/users?limit=1&offset=1
```

#### POST `/users`
Crea un nuevo usuario. Requiere un cuerpo JSON con `name`.

**Body esperado:**
```json
{ "name": "Nombre del usuario" }
```

Ejemplo:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan"}'
```

**Respuesta (201 Created):**
```json
{ "message": "Usuario creado correctamente" }
```

#### GET `/health`
Devuelve el estado del servidor y el uptime.

```bash
curl http://localhost:3000/health
```

**Respuesta (200 OK):**
```json
{ "status": "OK", "uptime": 123.456 }
```

#### Rutas no encontradas
Cualquier otra ruta devuelve un error 404.

```bash
curl http://localhost:3000/inexistente
```

**Respuesta (404 Not Found):**
```json
{ "error": "Not Found" }
```

> Si usas macOS/Linux, la variable de entorno `PORT` debe escribirse en mayúsculas.

## Ejecutar `manage-files.js`

Este script necesita permisos de lectura y escritura cuando se ejecuta con Node.js en modo restringido.

```bash
node --permission --allow-fs-read="./archivo.txt" --allow-fs-write="output" manage-files.js
```

El resultado se guarda en:

```bash
output/files/documents/archivo-uppercase.txt
```

## Ejecutar `cli.js`

Lista un directorio y muestra iconos emoji según el tipo de entrada.

```bash
node cli.js .
```

## Uso rápido

- Arrancar servidor:
  ```bash
  PORT=3000 node server.js
  ```
- Listar usuarios:
  ```bash
  curl http://localhost:3000/users
  ```
- Crear un usuario:
  ```bash
  curl -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Tu nombre"}'
  ```
- Verificar salud del servidor:
  ```bash
  curl http://localhost:3000/health
  ```
- Convertir archivo:
  ```bash
  node --permission --allow-fs-read="./archivo.txt" --allow-fs-write="output" manage-files.js
  ```
- Listar directorio:
  ```bash
  node cli.js .
  ```

## Errores comunes

- Si `node server.js` muestra el puerto `3000` aunque pones `port=1234`, usa `PORT=1234` en mayúsculas.
- Si `server.js` devuelve error 404 inesperado, verifica que la ruta y método HTTP sean correctos (GET, POST).
- Si POST `/users` falla sin crear el usuario, asegúrate de enviar `{ "name": "nombre" }` en el body.
- Si `manage-files.js` falla por permisos, agrega `--allow-fs-read="./archivo.txt" --allow-fs-write="output"`.
- Si `cli.js` no imprime nada, verifica que tengas `console.log` y no `console.lg`.

## Notas

- `server.js` es un servidor HTTP REST que gestiona usuarios con paginación.
  - Carga variables de entorno desde `.env` con `process.loadEnvFile()`.
  - Soporta GET, POST con respuestas JSON.
  - Implementa paginación con `limit` y `offset`.
- `manage-files.js` crea carpetas con `mkdir(..., { recursive: true })`.
- `cli.js` muestra `📁` para directorios y `📄` para archivos.
