import api from './api'

export const getComplaints = async () => {
  const res = await api.get('/admin/complaints')
  return res.data.data
}

export const updateComplaintStatus = async (id, status) => {
  const res = await api.patch(`/admin/complaints/${id}`, { status })
  return res.data
}