import express from 'express';
import store from '../store/taskStore.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(store.getAll());
});


router.post('/', (req, res) => {
  const newTask = store.create(req.body);
  res.status(201).json(newTask);
});


router.put('/:id', (req, res) => {

  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid task ID' });
    return;
  }

  const updatedTask = store.update(id, req.body);
  if (!updatedTask) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(updatedTask);
  }
});


router.patch('/:id/toggle', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid task ID' });
    return;
  }

  const toggledTask = store.toggle(id);
  if (!toggledTask) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(toggledTask);
  }
});


router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid task ID' });
    return;
  }

  const removedTask = store.remove(id);
  if (!removedTask) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.status(204).send();
  }
});

export default router;
