const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a Workout Tracker API', status: 'OK' });
});

// --- RUTAS ---
const usersRouter = require('./routes/users');
app.use('/api/v1/users', usersRouter);

// 👇 AGREGA ESTAS LÍNEAS
const workoutsRouter = require('./routes/workouts');
app.use('/api/v1/workouts', workoutsRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});