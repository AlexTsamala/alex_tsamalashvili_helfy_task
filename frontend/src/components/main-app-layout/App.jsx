import { useState, useEffect } from 'react'
import TaskList from '../TaskList.jsx'
import TaskForm from '../TaskForm.jsx'
import TaskFilter from '../TaskFilter.jsx'
import Modal from '../Modal.jsx'
import * as api from '../../services/api.js'
import '../../styles/App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (data) => {
    const created = await api.createTask(data)
    setTasks((prev) => [...prev, created])
  }

  const handleUpdate = async (id, data) => {
    const updated = await api.updateTask(id, data)
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    setEditingTask(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await api.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggle = async (id) => {
    try {
      const updated = await api.toggleTask(id)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      setError(err.message)
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed
    if (filter === 'pending') return !t.completed
    return true
  })

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm onCreate={handleCreate} />

      <TaskFilter filter={filter} onChange={setFilter} />

      {loading && <p className="status-msg">Loading tasks…</p>}
      {error && <p className="status-msg error">{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      )}

      {editingTask && (
        <Modal title="Edit Task" onClose={() => setEditingTask(null)}>
          <TaskForm
            onUpdate={handleUpdate}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </div>
  )
}
