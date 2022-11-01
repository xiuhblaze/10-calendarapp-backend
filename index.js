const express = require('express');
const { dbConnection } = require('./database/config');

require('dotenv').config();

// console.log(process.env);

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));

// Lectura y parseo de body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth')); // crear, login, renew
// Todo: crud: eventos


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});