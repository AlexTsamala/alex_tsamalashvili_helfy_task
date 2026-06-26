const BASE_URL = import.meta.env.VITE_API_URL

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${res.status})`)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function getTasks() {
  return fetch(BASE_URL).then(handle)
}

export async function createTask(data) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)
}

export async function updateTask(id, data) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)
}

export async function deleteTask(id) {
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handle)
}

export async function toggleTask(id) {
  return fetch(`${BASE_URL}/${id}/toggle`, { method: 'PATCH' }).then(handle)
}
