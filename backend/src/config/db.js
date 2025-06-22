// Cargar dotenv antes de todo
require('dotenv').config();

// backend/src/config/db.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar variables del archivo .env
dotenv.config();

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // Ej: localhost
  user: process.env.DB_USER,      // Ej: root
  password: process.env.DB_PASS,  // Ej: "" (vacío si no hay contraseña)
  database: process.env.DB_NAME   // Ej: login_db
});
console.log('Usuario MySQL:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASS);
// Conectar y verificar errores
connection.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});




// Exportar la conexión para usarla en otros archivos
module.exports = connection;