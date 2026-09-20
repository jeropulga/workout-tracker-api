const express = require('express');
const router = express.Router();

// Simulamos una base de datos en memoria
let exercises = [
    { id: 1, name: 'Press de Banca', muscleGroup: 'Pecho', sets: 4, reps: 10, workoutId: 1 },
    { id: 2, name: 'Sentadillas', muscleGroup: 'Pierna', sets: 4, reps: 12, workoutId: 1 },
    { id: 3, name: 'Burpees', muscleGroup: 'Cuerpo completo', sets: 3, reps: 15, workoutId: 2 }
];

// GET /api/v1/exercises - Obtener todos los ejercicios
router.get('/', (req, res) => {
    // Filtro opcional por workoutId: /exercises?workoutId=1
    const workoutId = req.query.workoutId;
    let result = exercises;
    
    if (workoutId) {
        result = exercises.filter(e => e.workoutId === parseInt(workoutId));
    }

    res.status(200).json({
        message: 'Lista de ejercicios',
        data: result
    });
});

// GET /api/v1/exercises/:id - Obtener un ejercicio por ID
router.get('/:id', (req, res) => {
    const exerciseId = parseInt(req.params.id);
    const exercise = exercises.find(e => e.id === exerciseId);

    if (!exercise) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    res.status(200).json({
        message: 'Ejercicio encontrado',
        data: exercise
    });
});

// POST /api/v1/exercises - Crear un nuevo ejercicio
router.post('/', (req, res) => {
    const { name, muscleGroup, sets, reps, workoutId } = req.body;

    if (!name || !workoutId) {
        return res.status(400).json({ message: 'Nombre y workoutId son obligatorios' });
    }

    const newExercise = {
        id: exercises.length + 1,
        name,
        muscleGroup: muscleGroup || '',
        sets: sets || 0,
        reps: reps || 0,
        workoutId
    };

    exercises.push(newExercise);

    res.status(201).json({
        message: 'Ejercicio creado exitosamente',
        data: newExercise
    });
});

// PUT /api/v1/exercises/:id - Actualización completa
router.put('/:id', (req, res) => {
    const exerciseId = parseInt(req.params.id);
    const { name, muscleGroup, sets, reps, workoutId } = req.body;

    const exerciseIndex = exercises.findIndex(e => e.id === exerciseId);

    if (exerciseIndex === -1) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    exercises[exerciseIndex] = { id: exerciseId, name, muscleGroup, sets, reps, workoutId };
    res.status(200).json({
        message: 'Ejercicio actualizado completamente',
        data: exercises[exerciseIndex]
    });
});

// PATCH /api/v1/exercises/:id - Actualización parcial
router.patch('/:id', (req, res) => {
    const exerciseId = parseInt(req.params.id);
    const updates = req.body;

    const exercise = exercises.find(e => e.id === exerciseId);

    if (!exercise) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    Object.assign(exercise, updates);

    res.status(200).json({
        message: 'Ejercicio actualizado parcialmente',
        data: exercise
    });
});

// DELETE /api/v1/exercises/:id
router.delete('/:id', (req, res) => {
    const exerciseId = parseInt(req.params.id);
    const exerciseIndex = exercises.findIndex(e => e.id === exerciseId);

    if (exerciseIndex === -1) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    exercises.splice(exerciseIndex, 1);

    res.status(204).send();
});

module.exports = router;