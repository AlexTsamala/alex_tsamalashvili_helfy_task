import TaskList from '../TaskList.jsx'
import '../../styles/App.css'

const DUMMY_TASKS = [
  { id: 1, title: 'Design landing page', description: 'Build the hero section and navigation bar.', completed: false, priority: 'high' },
  { id: 2, title: 'Write API documentation', description: 'Document all REST endpoints in the README.', completed: true, priority: 'medium' },
  { id: 3, title: 'Fix login session bug', description: 'Sessions expire far too early on mobile.', completed: false, priority: 'high' },
  { id: 4, title: 'Update dependencies', description: 'Bump packages to their latest stable versions.', completed: false, priority: 'low' },
  { id: 5, title: 'Share standup notes', description: 'Summarize the daily standup and post it.', completed: true, priority: 'low' },
]

export default function App() {
  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskList tasks={DUMMY_TASKS} />
    </div>
  )
}
