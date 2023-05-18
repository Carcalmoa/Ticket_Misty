const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/rutas');

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use(routes);

// Inicia el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
