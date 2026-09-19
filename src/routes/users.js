const express = require('express');
const router = express.Router();

// Simulamos una base de datos en memoria
let users = [
    { id: 1, name: 'Juan Perez', email: 'juan@example.com', age: 25 },
    { id: 2, name: 'Maria Lopez', email: 'maria@example.com', age: 30 }
];

// --- MÉTODO GET (Rutas básicas y consulta) ---
// GET /api/v1/users - Obtener todos los usuarios (con query strings opcionales)
router.get('/', (req, res) => {
    // Ejemplo de Query String: /users?limit=1
    const limit = req.query.limit;
    let result = users;
    if (limit) {
        result = users.slice(0, parseInt(limit));
    }
    res.status(200).json({
        message: 'Lista de usuarios',
        data: result
    });
});

// GET /api/v1/users/:id - Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
        message: 'Usuario encontrado',
        data: user
    });
});

// --- MÉTODO POST (Creación de recursos) ---
// POST /api/v1/users - Crear un nuevo usuario
router.post('/', (req, res) => {
    const { name, email, age } = req.body;

    // Validación básica (400 Bad Request)
    if (!name || !email) {
        return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        age: age || null
    };

    users.push(newUser);

    // 201 Created
    res.status(201).json({
        message: 'Usuario creado exitosamente',
        data: newUser
    });
});

// --- MÉTODOS PUT y PATCH (Actualización de recursos) ---
// PUT /api/v1/users/:id - Actualización completa
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, age } = req.body;

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Reemplazo completo
    users[userIndex] = { id: userId, name, email, age };
    res.status(200).json({
        message: 'Usuario actualizado completamente',
        data: users[userIndex]
    });
});

// PATCH /api/v1/users/:id - Actualización parcial
router.patch('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updates = req.body;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizamos solo los campos enviados
    Object.assign(user, updates);

    res.status(200).json({
        message: 'Usuario actualizado parcialmente',
        data: user
    });
});

// --- MÉTODO DELETE (Eliminación de recursos) ---
// DELETE /api/v1/users/:id
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users.splice(userIndex, 1);

    // 204 No Content (No devuelve cuerpo)
    res.status(204).send();
});

module.exports = router;