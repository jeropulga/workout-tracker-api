// src/controllers/progress.controller.js

let progress = [
    { id: 1, userId: 1, weight: 80, date: "2026-09-20", notes: "Buena sesión" }
];

const getProgress = (req, res) => {
    res.status(200).json({ data: progress });
};

const getProgressById = (req, res) => {
    const { id } = req.params;
    const record = progress.find(p => p.id === parseInt(id));
    if (!record) return res.status(404).json({ message: "Registro no encontrado" });
    res.status(200).json({ data: record });
};

const createProgress = (req, res) => {
    const { userId, weight, date, notes } = req.body;
    if (!userId || !weight || !date) return res.status(400).json({ message: "Faltan datos obligatorios" });

    const newRecord = { id: progress.length + 1, userId, weight, date, notes };
    progress.push(newRecord);
    res.status(201).json({ message: "Progreso registrado", data: newRecord });
};

const updateProgress = (req, res) => {
    const { id } = req.params;
    const { userId, weight, date, notes } = req.body;
    const index = progress.findIndex(p => p.id === parseInt(id));

    if (index === -1) return res.status(404).json({ message: "Registro no encontrado" });
    if (!userId || !weight || !date) return res.status(400).json({ message: "Faltan datos para PUT" });

    progress[index] = { id: parseInt(id), userId, weight, date, notes };
    res.status(200).json({ message: "Progreso actualizado", data: progress[index] });
};

const patchProgress = (req, res) => {
    const { id } = req.params;
    const index = progress.findIndex(p => p.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Registro no encontrado" });

    progress[index] = { ...progress[index], ...req.body };
    res.status(200).json({ message: "Progreso actualizado parcialmente", data: progress[index] });
};

const deleteProgress = (req, res) => {
    const { id } = req.params;
    const index = progress.findIndex(p => p.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Registro no encontrado" });

    progress.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    getProgress,
    getProgressById,
    createProgress,
    updateProgress,
    patchProgress,
    deleteProgress
};