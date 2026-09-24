let users = [
    { id: 1, name: 'Juan Perez', email: 'juan@example.com', age: 25 },
    { id: 2, name: 'Maria Lopez', email: 'maria@example.com', age: 30 }
];

const getUsers = (req, res) => {
    const limit = req.query.limit;
    let result = users;
    if (limit) result = users.slice(0, parseInt(limit));
    res.status(200).json({ message: 'Lista de usuarios', data: result });
};

const getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario encontrado', data: user });
};

const createUser = (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    const newUser = { id: users.length + 1, name, email, age: age || null };
    users.push(newUser);
    res.status(201).json({ message: 'Usuario creado', data: newUser });
};

const updateUser = (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { name, email, age } = req.body;
    users[index] = { id: parseInt(req.params.id), name, email, age };
    res.status(200).json({ message: 'Usuario actualizado', data: users[index] });
};

const patchUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    Object.assign(user, req.body);
    res.status(200).json({ message: 'Usuario actualizado parcialmente', data: user });
};

const deleteUser = (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
    users.splice(index, 1);
    res.status(204).send();
};

module.exports = { getUsers, getUserById, createUser, updateUser, patchUser, deleteUser };