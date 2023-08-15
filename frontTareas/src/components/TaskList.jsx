import React, { useState, useEffect } from "react";

export default function TaskList({tasks,setTasks}) {

    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/tasks");
        if (!res.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        const data = await res.json();
        setTasks(data.tasks);
      } catch (err) {
        console.error("Error al obtener tareas:", err);
      }
    }
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("La solicitud peto");
      }
      fetchData()
      //aca actualiza
    //   const updatedTasks = tasks.filter((task) => task._id !== taskId);
    //   setTasks(updatedTasks);
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };
  const handleCompleted = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error("La solicitud peto");
      }

      //aca actualiza
    //   const updatedTasks = tasks.filter((task) => task._id !== taskId);
      fetchData()
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };
  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul>
        {tasks?.length&&tasks.map((task) => (
          <li key={task._id} id={task._id}>
            {task.title}
            <button>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <input type="checkbox" checked={task.completed} onChange={()=>{handleCompleted(task._id)}} />
          </li>
        ))}
      </ul>
    </div>
  );
}
