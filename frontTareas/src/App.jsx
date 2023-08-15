import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
    <TaskForm tasks={tasks} setTasks={setTasks}/>
    <TaskList tasks={tasks} setTasks={setTasks}/>
    
    </>
  )
}

export default App
