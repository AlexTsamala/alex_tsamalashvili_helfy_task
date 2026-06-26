const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' }

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <article className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge priority-${task.priority}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-card-footer">
        <span className="task-status">{task.completed ? 'Completed' : 'Pending'}</span>
        <div className="task-actions">
          <button className="btn-toggle" onClick={() => onToggle(task.id)}>
            {task.completed ? 'Undo' : 'Done'}
          </button>
          <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    </article>
  )
}

export default TaskItem
