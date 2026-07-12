// llamamos a express para usar su sistema de rutas
const express = require('express');
const router = express.Router();
const path = require('path');
const controlador = require('../Controllers/controllers.js');


// ruta para cargar la pagina principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/index.html'));
});
router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/index.html'));
});
router.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/index.html'));
});

// ruta para cargar la segunda pagina 
router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/pagina_2.html'));
});
router.get('/pagina_2', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/pagina_2.html'));
});
router.get('/pagina_2.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/pagina_2.html'));
});


// ruta para cargar la tercera pagina 
router.get('/pagina_3', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/pagina_3.html'));
});
router.get('/pagina_3.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/pagina_3.html'));
});


// ruta de la api de la base de datos 
router.post('/api/registro', controlador.registrarMarcacion);
router.get('/api/historial', controlador.obtenerHistorial);

module.exports = router;