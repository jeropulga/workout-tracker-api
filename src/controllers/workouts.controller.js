// src/controllers/workouts.controller.js

let workouts = [
    { id: 1, userId: 1, name: "Rutina de Fuerza", day: "Lunes", duration: 60 },
    { id: 2, userId: 2, name: "Cardio", day: "Martes", duration: 45 }
];

const getWorkouts = (req, res) => {
    // Ejemplo de Query String: /workouts?limit=10
    const limit = req.query.limit;
    let result = workouts;

    if (limit) {
        result = workouts.slice(0, parseInt(limit));
    }

    res.status(200).json({
        message: "Lista de rutinas",
        count: result.length,
        data: result
    });
};

const getWorkoutById = (req, res) => {
    const { id } = req.params;
    const workout = workouts.find(w => w.id === parseInt(id));

    if (!workout) {
        return res.status(404).json({ message: "Rutina no encontrada" });
    }

    res.status(200).json({ data: workout });
};

const createWorkout = (req, res) => {
    const { userId, name, day, duration } = req.body;

    if (!userId || !name || !day || !duration) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const newWorkout = {
        id: workouts.length + 1,
        userId,
        name,
        day,
        duration
    };

    workouts.push(newWorkout);
    res.status(201).json({ message: "Rutina creada", data: newWorkout });
};

const updateWorkout = (req, res) => {
    const { id } = req.params;
    const { userId, name, day, duration } = req.body;
    const index = workouts.findIndex(w => w.id === parseInt(id));

    if (index === -1) return res.status(404).json({ message: "Rutina no encontrada" });
    if (!userId || !name || !day || !duration) return res.status(400).json({ message: "Faltan datos para PUT" });

    workouts[index] = { id: parseInt(id), userId, name, day, duration };
    res.status(200).json({ message: "Rutina actualizada", data: workouts[index] });
};

const patchWorkout = (req, res) => {
    const { id } = req.params;
    const index = workouts.findIndex(w => w.id === parseInt(id));

    if (index === -1) return res.status(404).json({ message: "Rutina no encontrada" });

    workouts[index] = { ...workouts[index], ...req.body };
    res.status(200).json({ message: "Rutina actualizada parcialmente", data: workouts[index] });
};

const deleteWorkout = (req, res) => {
    const { id } = req.params;
    const index = workouts.findIndex(w => w.id === parseInt(id));

    if (index === -1) return res.status(404).json({ message: "Rutina no encontrada" });

    workouts.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    patchWorkout,
    deleteWorkout
};