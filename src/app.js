const express = require('express');
const env = require('./config/env');

const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de cabeceras explícitas
app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.set('X-API-Key', env.API_KEY);
    res.set('X-Powered-By', 'Workout Tracker API');
    next();
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a Workout Tracker API',
        version: 'v1',
        endpoints: {
            users: '/api/v1/users',
            workouts: '/api/v1/workouts',
            exercises: '/api/v1/exercises',
            progress: '/api/v1/progress'
        }
    });
});

// Rutas v1
app.use('/api/v1/users', require('./routes/v1/users.routes'));
app.use('/api/v1/workouts', require('./routes/v1/workouts.routes'));
app.use('/api/v1/exercises', require('./routes/v1/exercises.routes'));
app.use('/api/v1/progress', require('./routes/v1/progress.routes'));

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
});