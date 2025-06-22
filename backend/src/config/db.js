const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/../../.env' }); // cargar sólo una vez

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
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


// Conectar y verificar errores
connection.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;
