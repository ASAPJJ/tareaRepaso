import React, { useState } from 'react';

function TaskForm({ tasks,setTasks }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, completed: false };

        // Realizar la solicitud POST al servidor para agregar la tarea
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (response.ok) {
            const savedTask = await response.json();
            setTasks(savedTask);
        }
    };

    return (
        <div>
            <h2>Agregar Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Descripción:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <button type="submit">Agregar Tarea</button>
            </form>
        </div>
    );
}

export default TaskForm;