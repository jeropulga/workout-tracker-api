const express = require('express');
const router = express.Router();

// Simulamos una base de datos en memoria
let progress = [
    { id: 1, userId: 1, workoutId: 1, date: '2026-09-19', weight: 80, notes: 'Buen entrenamiento' },
    { id: 2, userId: 2, workoutId: 2, date: '2026-09-20', weight: 65, notes: 'Mejorando resistencia' }
];

// GET /api/v1/progress - Obtener todos los registros de progreso
router.get('/', (req, res) => {
    const { userId, workoutId } = req.query;
    let result = progress;
    
    if (userId) {
        result = result.filter(p => p.userId === parseInt(userId));
    }
    if (workoutId) {
        result = result.filter(p => p.workoutId === parseInt(workoutId));
    }

    res.status(200).json({
        message: 'Lista de registros de progreso',
        data: result
    });
});

// GET /api/v1/progress/:id - Obtener un registro por ID
router.get('/:id', (req, res) => {
    const progressId = parseInt(req.params.id);
    const record = progress.find(p => p.id === progressId);

    if (!record) {
        return res.status(404).json({ message: 'Registro de progreso no encontrado' });
    }

    res.status(200).json({
        message: 'Registro encontrado',
        data: record
    });
});

// POST /api/v1/progress - Crear un nuevo registro
router.post('/', (req, res) => {
    const { userId, workoutId, date, weight, notes } = req.body;

    if (!userId || !workoutId) {
        return res.status(400).json({ message: 'userId y workoutId son obligatorios' });
    }

    const newRecord = {
        id: progress.length + 1,
        userId,
        workoutId,
        date: date || new Date().toISOString().split('T')[0],
        weight: weight || 0,
        notes: notes || ''
    };

    progress.push(newRecord);

    res.status(201).json({
        message: 'Registro de progreso creado exitosamente',
        data: newRecord
    });
});

// PUT /api/v1/progress/:id - Actualización completa
router.put('/:id', (req, res) => {
    const progressId = parseInt(req.params.id);
    const { userId, workoutId, date, weight, notes } = req.body;

    const recordIndex = progress.findIndex(p => p.id === progressId);

    if (recordIndex === -1) {
        return res.status(404).json({ message: 'Registro de progreso no encontrado' });
    }

    progress[recordIndex] = { id: progressId, userId, workoutId, date, weight, notes };
    res.status(200).json({
        message: 'Registro actualizado completamente',
        data: progress[recordIndex]
    });
});

// PATCH /api/v1/progress/:id - Actualización parcial
router.patch('/:id', (req, res) => {
    const progressId = parseInt(req.params.id);
    const updates = req.body;

    const record = progress.find(p => p.id === progressId);

    if (!record) {
        return res.status(404).json({ message: 'Registro de progreso no encontrado' });
    }

    Object.assign(record, updates);

    res.status(200).json({
        message: 'Registro actualizado parcialmente',
        data: record
    });
});

// DELETE /api/v1/progress/:id
router.delete('/:id', (req, res) => {
    const progressId = parseInt(req.params.id);
    const recordIndex = progress.findIndex(p => p.id === progressId);

    if (recordIndex === -1) {
        return res.status(404).json({ message: 'Registro de progreso no encontrado' });
    }

    progress.splice(recordIndex, 1);

    res.status(204).send();
});

module.exports = router;