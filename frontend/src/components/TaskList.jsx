import { useEffect, useRef } from 'react'
import '../styles/TaskList.css'
import TaskItem from './TaskItem.jsx'

const AUTO_ADVANCE_MS = 3000
const RESUME_DELAY = 4000

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  const viewportRef = useRef(null)
  const pausedRef = useRef(false)
  const resumeTimer = useRef(null)

  const slide = (direction) => {
    const el = viewportRef.current
    if (!el) return

    const card = el.querySelector('.task-card')
    const style = card ? getComputedStyle(card) : null
    const step = card ? card.offsetWidth + parseFloat(style.marginRight) : el.clientWidth
    const max = el.scrollWidth - el.clientWidth

    if (direction === 1 && el.scrollLeft >= max - 1) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction === -1 && el.scrollLeft <= 1) {
      el.scrollTo({ left: max, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: direction * step, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        slide(1)
      }
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(interval)
  }, [])

  const pause = () => {
    pausedRef.current = true
    clearTimeout(resumeTimer.current)
  }

  const resume = () => {
    pausedRef.current = false
  }

  const pauseTemporarily = () => {
    pausedRef.current = true
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false
    }, RESUME_DELAY)
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks to show. Add one above to get started.</p>
      </div>
    )
  }

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pauseTemporarily}
    >
      <button className="carousel-arrow" onClick={() => slide(-1)} aria-label="Previous task">
        ❮
      </button>
      <div className="carousel" ref={viewportRef}>
        <div className="carousel-track">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
      <button className="carousel-arrow" onClick={() => slide(1)} aria-label="Next task">
        ❯
      </button>
    </div>
  )
}

export default TaskList
