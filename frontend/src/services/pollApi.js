import api from './api'

export const getPolls = async () => {
  const res = await api.get('/admin/polls')
  return res.data.data
}

export const createPoll = async (question, options, expires_at) => {
  const res = await api.post('/admin/poll', { question, options, expires_at: expires_at || null })
  return res.data.data
}

export const updatePoll = async (id, updates) => {
  const res = await api.patch(`/admin/poll/${id}`, updates)
  return res.data.data
}