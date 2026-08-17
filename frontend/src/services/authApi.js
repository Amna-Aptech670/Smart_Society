import api from './api'

export const loginUser = async (username, password) => {
  try {
    const res = await api.post('/auth/login', { username, password })
    return res.data
  } catch (err) {
    const msg = err.response?.data?.message || 'Invalid username or password'
    throw new Error(msg)
  }
}