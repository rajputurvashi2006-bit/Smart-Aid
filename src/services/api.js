// Avoid relying on Vite dev-server proxy. Always call backend directly.
// You can override in env using VITE_API_BASE if needed.
const API_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }
  if (options.body && options.body instanceof FormData) {
    delete config.headers['Content-Type']
  }
  const res = await fetch(url, config)
  if (!res.ok) {
    let body
    try {
      body = await res.json()
    } catch {
      body = await res.text()
    }
    const err = new Error(typeof body === 'object' && body?.error ? body.error : res.statusText || 'Request failed')
    err.status = res.status
    err.body = body
    throw err
  }
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }
  return res.text()
}

export const api = {
  async scan(file) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await request('/scan', {
      method: 'POST',
      headers: {},
      body: formData,
    })
    return res
  },
  async getResult(id) {
    return request(`/scan/result/${id}`)
  },

  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
  async logout() {
    return request('/auth/logout', { method: 'POST' })
  },

  async chat(message, history = []) {
    return request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    })
  },
}
