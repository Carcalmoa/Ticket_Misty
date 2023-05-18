const mysql = require('mysql');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'usuario1',
    password: 'Usuario1*',
    database: 'TaquillaVirtual'
});

// Conecta a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
