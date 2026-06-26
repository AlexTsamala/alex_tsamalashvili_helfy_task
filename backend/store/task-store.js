// Task Store - In-memory data layer for tasks.
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', completed: false, createdAt: new Date().toISOString(), priority: 'medium' },
  { id: 2, title: 'Task 2', description: 'Description 2', completed: false, createdAt: new Date().toISOString(), priority: 'low' },
  { id: 3, title: 'Task 3', description: 'Description 3', completed: false, createdAt: new Date().toISOString(), priority: 'medium' },
];

let nextId = 4;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find(task => task.id === id);
}

function create(data) {
  const newTask = {
    id: nextId,
    title: data.title,
    description: data.description || '',
    completed: data.completed || false,
    createdAt: new Date().toISOString(),
    priority: data.priority || 'medium',
  };
  tasks.push(newTask);
  nextId++;
  return newTask;
}

function update(id, data) {
  const task = tasks.find(task => task.id === id);
  if (!task) return null;
  task.title = data.title;
  task.description = data.description ?? '';
  task.priority = data.priority ?? 'medium';
  task.completed = data.completed ?? false;
  return task;
}

function remove(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function toggle(id) {
  const task = tasks.find(task => task.id === id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

export default { getAll, getById, create, update, remove, toggle };
