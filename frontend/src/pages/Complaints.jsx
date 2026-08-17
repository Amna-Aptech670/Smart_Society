import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getComplaints, updateComplaintStatus } from '../services/complaintApi'

const STATUS_OPTIONS = ['Pending', 'In-Progress', 'Resolved']

const Complaints = () => {
  const role = useSelector((state) => state.auth.role)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getComplaints()
      .then(setComplaints)
      .catch(() => setError('Could not load complaints'))
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status)
      setComplaints(complaints.map((c) => (c._id === id ? { ...c, status } : c)))
    } catch (err) {
      setError('Could not update status')
    }
  }

  if (role !== 'admin') {
    return (
      <div>
        <h2 className="font-heading text-2xl mb-6">Complaints</h2>
        <p className="text-muted-foreground text-sm">Resident complaint view coming soon.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Complaints</h2>

      {loading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {error && <p className="text-destructive text-sm mb-4">{error}</p>}
      {!loading && complaints.length === 0 && (
        <p className="text-muted-foreground text-sm">No complaints submitted yet.</p>
      )}

      {complaints.length > 0 && (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {complaints.map((c) => (
            <div key={c._id} className="p-4 flex justify-between items-start gap-4">
              <div>
                <p className="font-medium">{c.category}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {c.resident_id?.username || 'Unknown resident'}
                  {c.resident_id?.flat_id && ` · Block ${c.resident_id.flat_id.block_name} - ${c.resident_id.flat_id.flat_number}`}
                  {' · '}{new Date(c.createdAt).toLocaleDateString()}
                </p>
                {c.photo_url && (
                  <a href={c.photo_url} target="_blank" rel="noreferrer" className="text-xs text-primary underline mt-1 inline-block">
                    View attached photo
                  </a>
                )}
              </div>
              <select
                value={c.status}
                onChange={(e) => handleStatusChange(c._id, e.target.value)}
                className="border border-input rounded-lg px-2 py-1.5 text-xs bg-background shrink-0"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Complaints