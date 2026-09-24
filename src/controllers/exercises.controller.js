// src/controllers/exercises.controller.js

let exercises = [
    { id: 1, workoutId: 1, name: "Sentadillas", reps: 12, sets: 3 },
    { id: 2, workoutId: 2, name: "Correr", duration: 30, distance: 5 }
];

const getExercises = (req, res) => {
    res.status(200).json({ data: exercises });
};

const getExerciseById = (req, res) => {
    const { id } = req.params;
    const exercise = exercises.find(e => e.id === parseInt(id));
    if (!exercise) return res.status(404).json({ message: "Ejercicio no encontrado" });
    res.status(200).json({ data: exercise });
};

const createExercise = (req, res) => {
    const { workoutId, name, reps, sets } = req.body;
    if (!workoutId || !name) return res.status(400).json({ message: "Faltan datos obligatorios" });

    const newExercise = { id: exercises.length + 1, workoutId, name, reps, sets };
    exercises.push(newExercise);
    res.status(201).json({ message: "Ejercicio creado", data: newExercise });
};

const updateExercise = (req, res) => {
    const { id } = req.params;
    const { workoutId, name, reps, sets } = req.body;
    const index = exercises.findIndex(e => e.id === parseInt(id));

    if (index === -1) return res.status(404).json({ message: "Ejercicio no encontrado" });
    if (!workoutId || !name) return res.status(400).json({ message: "Faltan datos para PUT" });

    exercises[index] = { id: parseInt(id), workoutId, name, reps, sets };
    res.status(200).json({ message: "Ejercicio actualizado", data: exercises[index] });
};

const patchExercise = (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Ejercicio no encontrado" });

    exercises[index] = { ...exercises[index], ...req.body };
    res.status(200).json({ message: "Ejercicio actualizado parcialmente", data: exercises[index] });
};

const deleteExercise = (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Ejercicio no encontrado" });

    exercises.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    getExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    patchExercise,
    deleteExercise
};