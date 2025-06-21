const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // para leer JSON en los body

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
