const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Manejo de rutas no encontradas para API
app.use('/api/*', (req, res) => {
    res.status(404).json({
        ok: false,
        msg: 'Ruta no encontrada'
    });
});

// Catch-all route para SPA - solo para GET requests
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        ok: false,
        msg: 'Error interno del servidor'
    });
});

//Escuchar peticiones
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});