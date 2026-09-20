const express = require('express');
const router = express.Router();

// Simulamos una base de datos en memoria
let workouts = [
    { id: 1, name: 'Rutina de Fuerza', description: 'Día de pecho y tríceps', duration: 60, userId: 1 },
    { id: 2, name: 'Cardio HIIT', description: 'Entrenamiento de alta intensidad', duration: 30, userId: 2 }
];

// GET /api/v1/workouts - Obtener todas las rutinas
router.get('/', (req, res) => {
    // Filtro opcional por userId: /workouts?userId=1
    const userId = req.query.userId;
    let result = workouts;
    
    if (userId) {
        result = workouts.filter(w => w.userId === parseInt(userId));
    }

    res.status(200).json({
        message: 'Lista de rutinas',
        data: result
    });
});

// GET /api/v1/workouts/:id - Obtener una rutina por ID
router.get('/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const workout = workouts.find(w => w.id === workoutId);

    if (!workout) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
    }

    res.status(200).json({
        message: 'Rutina encontrada',
        data: workout
    });
});

// POST /api/v1/workouts - Crear una nueva rutina
router.post('/', (req, res) => {
    const { name, description, duration, userId } = req.body;

    if (!name || !userId) {
        return res.status(400).json({ message: 'Nombre y userId son obligatorios' });
    }

    const newWorkout = {
        id: workouts.length + 1,
        name,
        description: description || '',
        duration: duration || 0,
        userId
    };

    workouts.push(newWorkout);

    res.status(201).json({
        message: 'Rutina creada exitosamente',
        data: newWorkout
    });
});

// PUT /api/v1/workouts/:id - Actualización completa
router.put('/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const { name, description, duration, userId } = req.body;

    const workoutIndex = workouts.findIndex(w => w.id === workoutId);

    if (workoutIndex === -1) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
    }

    workouts[workoutIndex] = { id: workoutId, name, description, duration, userId };
    res.status(200).json({
        message: 'Rutina actualizada completamente',
        data: workouts[workoutIndex]
    });
});

// PATCH /api/v1/workouts/:id - Actualización parcial
router.patch('/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const updates = req.body;

    const workout = workouts.find(w => w.id === workoutId);

    if (!workout) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
    }

    Object.assign(workout, updates);

    res.status(200).json({
        message: 'Rutina actualizada parcialmente',
        data: workout
    });
});

// DELETE /api/v1/workouts/:id
router.delete('/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const workoutIndex = workouts.findIndex(w => w.id === workoutId);

    if (workoutIndex === -1) {
        return res.status(404).json({ message: 'Rutina no encontrada' });
    }

    workouts.splice(workoutIndex, 1);

    res.status(204).send();
});

module.exports = router;