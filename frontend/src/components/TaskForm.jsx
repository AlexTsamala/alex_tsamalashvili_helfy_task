import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import '../styles/TaskForm.css'

const EMPTY = { title: '', description: '', priority: 'medium' }

const TaskForm = ({ onCreate, onUpdate, editingTask, onCancelEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY })

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
      })
    } else {
      reset(EMPTY)
    }
  }, [editingTask, reset])

  const onSubmit = async (data) => {
    try {
      if (editingTask) {
        await onUpdate(editingTask.id, { ...editingTask, ...data })
      } else {
        await onCreate(data)
      }
      reset(EMPTY)
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="task-form-row">
        <input
          placeholder="Task title"
          {...register('title', {
            required: 'Title is required',
            validate: (value) => value.trim() !== '' || 'Title is required',
          })}
        />
        <select {...register('priority')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea
        placeholder="Description (optional)"
        rows={2}
        {...register('description')}
      />
      {errors.title && <p className="task-form-error">{errors.title.message}</p>}
      {errors.root && <p className="task-form-error">{errors.root.message}</p>}
      <div className="task-form-actions">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
