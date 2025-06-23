const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/../../.env' }); // Cargar sólo una vez

const connection = mysql.createConnection({ // Crear la conexión a la base de datos
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASS);
console.log('Base de datos:', process.env.DB_NAME);
console.log(process.env);

connection.connect(err => { // Conectar y verificar errores
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;