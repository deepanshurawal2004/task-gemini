const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn TypeScript' },
  { id: 2, title: 'Build a Todo App' }
];

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST new task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title
  };
  tasks.push(newTask);
  res.json(newTask);
});

// ✅ DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(200).json({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
