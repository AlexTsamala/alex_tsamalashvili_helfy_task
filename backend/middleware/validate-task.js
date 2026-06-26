const ALLOWED_PRIORITIES = ['low', 'medium', 'high'];

function validateTask(req, res, next) {
  const { title, priority, description, completed } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  if (priority && !ALLOWED_PRIORITIES.includes(priority)) {
    res.status(400).json({ error: 'Invalid priority' });
    return;
  }

  if (description && typeof description !== 'string') {
    res.status(400).json({ error: 'Description must be a string' });
    return;
  }

  if (completed && typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Completed must be a boolean' });
    return;
  }

  next();
}

export default validateTask;
