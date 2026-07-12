const { WebSocketServer } = require('ws');

let clientes = [];

const iniciarSocket = (server, controlador) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        clientes.push(ws);
        ws.on('close', () => { 
            clientes = clientes.filter(c => c !== ws); 
        });
    });

    // Conectamos el enchufe con el controlador original
    controlador.vincularSocket((datos) => {
        clientes.forEach(c => c.send(JSON.stringify(datos)));
    });
};

module.exports = iniciarSocket;