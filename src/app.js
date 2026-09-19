const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenido a Workout Tracker API',
        status: 'OK',
        version: '1.0.0'
    });
});

// --- IMPORTAR RUTAS ---
const usersRouter = require('./routes/users');
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});