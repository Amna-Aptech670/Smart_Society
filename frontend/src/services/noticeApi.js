import api from './api'

export const createNotice = async (title, description) => {
  const res = await api.post('/admin/notice', { title, description })
  return res.data
}

export const getNotices = async () => {
  const res = await api.get('/admin/notices')
  return res.data.data
}