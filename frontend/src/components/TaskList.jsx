import '../styles/TaskList.css'

const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' }

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Add one to get started.</p>
      </div>
    )
  }

  const loopTasks = [...tasks, ...tasks]

  return (
    <div className="carousel">
      <div className="carousel-track">
        {loopTasks.map((task, index) => (
          <article
            key={`${task.id}-${index}`}
            className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-card-header">
              <h3 className="task-title">{task.title}</h3>
              <span className={`priority-badge priority-${task.priority}`}>
                {PRIORITY_LABELS[task.priority]}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-status">{task.completed ? 'Completed' : 'Pending'}</div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default TaskList
