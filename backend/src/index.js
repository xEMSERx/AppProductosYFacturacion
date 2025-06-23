const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Middlewares
app.use(express.json()); // para leer JSON en los body

const authRoutes = require('./routes/authRoutes'); // Rutas
app.use('/api', authRoutes);

app.get('/', (req, res) => { // Ruta base
  res.send('API funcionando correctamente ✅');
});

app.listen(PORT, () => { // Iniciar servidor
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
