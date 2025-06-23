require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const dbName = process.env.DB_NAME;

connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
  if (err) {
    console.error('❌ Error al crear la base de datos:', err);
    process.exit(1);
  }

  console.log(`✅ Base de datos '${dbName}' creada o ya existente.`);

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName
  });

  // Crear tabla users
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      nombre VARCHAR(255) NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla users:', err);
    } else {
      console.log('✅ Tabla users creada o ya existente.');
    }
  });

  // Crear tabla products
  db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10,2) NOT NULL,
      categoria VARCHAR(100),
      imagen VARCHAR(255)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla products:', err);
    } else {
      console.log('✅ Tabla products creada o ya existente.');
    }
  });

  // Crear tabla invoices
  db.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      date DATETIME NOT NULL,
      total_ars DECIMAL(10,2) NOT NULL,
      total_usd DECIMAL(10,2) NOT NULL,
      exchange_rate DECIMAL(10,2) NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla invoices:', err);
    } else {
      console.log('✅ Tabla invoices creada o ya existente.');
    }
  });

  // Crear tabla invoice_products
  db.query(`
    CREATE TABLE IF NOT EXISTS invoice_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      invoice_id INT,
      product_id INT,
      name VARCHAR(255),
      quantity INT,
      unit_price DECIMAL(10,2),
      FOREIGN KEY (invoice_id) REFERENCES invoices(id)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla invoice_products:', err);
    } else {
      console.log('✅ Tabla invoice_products creada o ya existente.');
    }

    db.end(() => {
      console.log('✅ Conexión cerrada. Finalizando script de inicialización.');
      process.exit(0);
    });
  });
});