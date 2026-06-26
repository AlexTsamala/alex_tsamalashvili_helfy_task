import '../styles/TaskFilter.css'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
]

const TaskFilter = ({ filter, onChange }) => {
  return (
    <div className="task-filter">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${filter === f.key ? 'active' : ''}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter
