import http from 'http';

import app from './app';

const PORT = process?.env?.PORT ?? 3000;

console.time('SR - Server mounted');
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`SR - Servidor corriendo en el puerto ${PORT} ! 👌`);
});
