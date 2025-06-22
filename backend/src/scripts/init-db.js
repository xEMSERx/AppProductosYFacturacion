const db = require('../config/db'); // usa la conexión ya configurada

const crearTablaUsuarios = `
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
`;

db.query(crearTablaUsuarios, (err, result) => {
  if (err) {
    console.error('❌ Error al crear la tabla usuarios:', err);
  } else {
    console.log('✅ Tabla "usuarios" creada o ya existente.');
  }
  process.exit();
});
