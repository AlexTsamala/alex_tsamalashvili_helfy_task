# Task Manager App

A full-stack task manager with a React frontend and an Express.js REST API using in-memory
storage. Users can create, view, edit, delete, toggle, and filter tasks, displayed in an
animated infinite carousel.

## Tech Stack

- **Frontend:** React 19 (Vite), React Hook Form, plain CSS
- **Backend:** Node.js, Express.js (ES modules), in-memory storage

## Setup & Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Start the backend first, then the frontend. The frontend reads the API base URL from
`VITE_API_URL` in `frontend/.env` (see `.env.example`).

## API Documentation

Base URL: `http://localhost:4000/api/tasks`

### Task model

```js
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: string,
  priority: 'low' | 'medium' | 'high'
}

**Error responses** use a consistent shape: `{ "error": "message" }`.

## Features

- Full CRUD: create, read, update (in a modal), delete (with confirmation)
- Toggle completion status
- Filter by All / Pending / Completed
- Priority shown via colored badge and card border
- Infinite carousel that auto-advances with smooth transitions (pauses on hover/interaction),
  plus left/right navigation arrows and wrap-around looping
- Form validation with inline error messages
- Loading and error states
- Responsive / mobile-friendly layout
- Dark / light theme toggle, persisted in localStorage
```
