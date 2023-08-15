const express = require('express')
const router = express.Router();
const Task = require('./task');

//Obtener todas las tareas
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({message:"Tareas",tasks});
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// Agregar una nueva tarea
router.post('/tasks', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const newTask = new Task({ title, description, completed });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        console.error('Error al agregar tarea:', error);
        res.status(500).json({ error: 'Error al agregar tarea' });
    }
});

// Actualizar una tarea existente
router.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
});
router.patch('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId)
        await task.updateOne({completed: !task.completed})
        res.json({message: "La tarea cambio de estado!"});
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ error: 'Error al actualizar tarea' });
    }
});

// Eliminar una tarea
router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});

module.exports = router;