// conectamos el archivo de la base de datos
const conexion = require('../Config/db.js');

// Enchufe para el WebSocket
let enviarAlertaWS = null;
const vincularSocket = (funcionAlerta) => { enviarAlertaWS = funcionAlerta; };

// logica para recivir y procesar los datos
const registrarMarcacion = (req, res) => {
    let rutOperario = req.body.rut;
    let zonaDestino = req.body.zona;

    //validación
    if (rutOperario.length<9) {
        return res.json({resultado: "Error", mensaje: "El Rut es demasiado corto "});
    }

    //validación
    if (rutOperario === "12345678-9") {
        return res.json ({resultado: "Error", mensaje: "El Rut de prueba"});
    }

    //validación
    let rutEsValido = /^[0-9kK\.\-]+$/.test(rutOperario);   

    if (!rutOperario || !rutEsValido) {
        return res.json({ resultado: "Error", mensaje: "Formato de RUT incorrecto." });
    }

    // consulta a MySQL y filtro con JS
    conexion.query('SELECT * FROM operarios', (error, listaoperarios) => {
        if (error) {
            return res.json({ resultado: "Error", mensaje: "Error interno de la base de datos." });
        }
        
        // buscamos al operario usando el metodo alternativo find
        let operario = listaoperarios.find(op => op.rut === rutOperario);

        if (operario) {
            console.log("Validación Exitosa: " + operario.nombre + " -> " + zonaDestino);
            
            //Guardar en la tabla 2 historial
            conexion.query('INSERT INTO registros_acceso (rut_operario, zona_destino) VALUES (?, ?)', [rutOperario, zonaDestino]);

            //Avisar en tiempo real por el WebSocket
            if (enviarAlertaWS) {
                enviarAlertaWS({ nombre: operario.nombre, zona: zonaDestino });
            }
            res.json({ 
                resultado: "OK", 
                mensaje: `\n\nOperario Identificado: ${operario.nombre}\nCargo: ${operario.cargo}`
            });
        } else {
            res.json({ resultado: "Error", mensaje: " El RUT ingresado no existe en el sistema." });
        }
    });
};

//función para leer la tabla 2 desde el HTML
const obtenerHistorial = (req, res) => {
    conexion.query('SELECT * FROM registros_acceso ORDER BY id DESC', (error, resultados) => {
        if (error) return res.json([]);
        res.json(resultados);
    });
};
module.exports = { registrarMarcacion, obtenerHistorial, vincularSocket };