
const express = require('express');
const http = require('http');
const path = require('path');
const helmet = require('helmet'); 
const rutas = require('./Routes/Routes.js');
const controlador = require('./Controllers/controllers.js');
const iniciarSocket = require('./Sockets/Socket.js');

// cargamos la libreria Express
const app = express();
const server = http.createServer(app);

// configuracion para leer datos JSON del formulario
app.use(express.json());

// Configuracion para que node no tire error
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"], 
                connectSrc: ["'self'", "ws://localhost:3000", "ws://127.0.0.1:3000"],
                imgSrc: ["'self'", "data:"],
            },
        },
    })
);

// Mapeo de la carpeta Public
app.use(express.static(path.join(__dirname, 'Public')));

app.use(rutas);

iniciarSocket(server, controlador);

// Encendemos el servidor en el puerto 3000
server.listen(3000, () => {
    console.log("Servidor listo en el puerto 3000");
});