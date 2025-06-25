import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getgid } from 'process';

// 👇 Step 1: Define Task type
type Task = {
  id: number;
  title: string;
};

function App() {
  // 👇 Step 2: useState with correct type
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const handleDelete = (id: number) => {
  axios
    .delete(`http://localhost:5000/tasks/${id}`)
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch(err => console.error(err));
};


  // 👇 Step 3: Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get<Task[]>('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  // 👇 Step 4: Add new task
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    axios.post<Task>('http://localhost:5000/tasks', { title: newTask })
      .then(res => {
        setTasks([...tasks, res.data]); // Add new task to list
        setNewTask(''); // Clear input
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Add new task..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
  {tasks.map(task => (
    <li key={task.id}>
      {task.title}
      <button onClick={() => handleDelete(task.id)}>🗑️ Delete</button>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
