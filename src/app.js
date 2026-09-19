const express = require('express');
require('dotenv').config(); // Para usar variables de entorno

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

// Aquí irás agregando las rutas de users, workouts, etc.
// Ejemplo: app.use('/api/v1/users', require('./routes/users'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});