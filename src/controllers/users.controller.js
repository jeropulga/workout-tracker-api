// src/controllers/users.controller.js

// Simulación de base de datos en memoria (para que funcione ya mismo)
// Si usas MySQL, cambia esto por las consultas SQL con mysql2
let users = [
    { id: 1, name: "Juan Perez", email: "juan@example.com", age: 25 },
    { id: 2, name: "Maria Lopez", email: "maria@example.com", age: 30 }
];

// GET /users - Obtener todos los usuarios
const getUsers = (req, res) => {
    // La guía pide usar res.json()
    res.status(200).json({
        message: "Lista de usuarios obtenida correctamente",
        data: users
    });
};

// GET /users/:id - Obtener un usuario por ID
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        // La guía pide usar estado 404
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
        message: "Usuario encontrado",
        data: user
    });
};

// POST /users - Crear un nuevo usuario
const createUser = (req, res) => {
    const { name, email, age } = req.body;

    // Validación básica (La guía pide validar datos)
    if (!name || !email || !age) {
        return res.status(400).json({ message: "Faltan datos obligatorios (name, email, age)" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        age
    };

    users.push(newUser);

    // La guía pide devolver estado 201 Created
    res.status(201).json({
        message: "Usuario creado exitosamente",
        data: newUser
    });
};

// PUT /users/:id - Actualización completa
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!name || !email || !age) {
        return res.status(400).json({ message: "Para PUT se requieren todos los campos (name, email, age)" });
    }

    users[userIndex] = { id: parseInt(id), name, email, age };

    res.status(200).json({
        message: "Usuario actualizado completamente",
        data: users[userIndex]
    });
};

// PATCH /users/:id - Actualización parcial
const patchUser = (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Solo actualiza los campos que vienen en el body
    users[userIndex] = { ...users[userIndex], ...updates };

    res.status(200).json({
        message: "Usuario actualizado parcialmente",
        data: users[userIndex]
    });
};

// DELETE /users/:id - Eliminar usuario
const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    users.splice(userIndex, 1);

    // La guía pide estado 204 No Content para eliminaciones exitosas
    res.status(204).send();
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
};