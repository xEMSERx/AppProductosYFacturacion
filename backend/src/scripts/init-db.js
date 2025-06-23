require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({ // Conexión sin base de datos para poder crearla
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const dbName = process.env.DB_NAME;

connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => { // Crear base de datos si no existe
  if (err) {
    console.error('❌ Error al crear la base de datos:', err);
    process.exit(1);
  }

  console.log(`✅ Base de datos '${dbName}' creada o ya existente.`);

  const db = mysql.createConnection({ // Ahora conectamos a la base para crear las tablas
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName
  });

  // Crear tabla usuarios
  db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      nombre INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla usuarios:', err);
    } else {
      console.log('✅ Tabla usuarios creada o ya existente.');
    }
  });

  // Crear tabla productos
  db.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10,2) NOT NULL,
      categoria VARCHAR(100),
      imagen VARCHAR(255)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla productos:', err);
    } else {
      console.log('✅ Tabla productos creada o ya existente.');
    }

    db.end(() => { // Cerramos conexión y terminamos proceso correctamente
      console.log('✅ Conexión cerrada. Finalizando script de inicialización.');
      process.exit(0);
    });
  });
});

