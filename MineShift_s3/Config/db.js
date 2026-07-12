// carga la libreria de mysql2
const mysql = require('mysql2');

// creamos la conexion con los datos WAMP/XAMPP
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mineshift_db'
});

// conectamos la base de datos y vemos si hay errores
connection.connect((err)=> {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('conexion exitosa a la base de datos MySQL')
});

// exportamos la conexion para que se pueda usar los controles
module.exports=connection;