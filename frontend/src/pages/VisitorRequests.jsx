import React, { useState, useEffect } from 'react'
import { getVisitorRequests, updateVisitorRequest } from '../services/visitorRequestApi'

const VisitorRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState(null)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = () => {
    setLoading(true)
    getVisitorRequests()
      .then(setRequests)
      .catch(() => setError('Could not load visitor requests'))
      .finally(() => setLoading(false))
  }

  const handleDecision = async (id, status) => {
    setActingId(id)
    setError('')
    try {
      await updateVisitorRequest(id, status)
      setRequests(requests.filter((r) => r._id !== id))
    } catch (err) {
      setError('Could not update request')
    } finally {
      setActingId(null)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Visitor Requests</h2>
      <p className="mb-4 text-xs text-muted-foreground">Pending visitor pass requests awaiting approval.</p>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {!loading && requests.length === 0 && (
        <p className="text-sm text-muted-foreground">No pending requests right now.</p>
      )}

      {requests.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
          {requests.map((r) => (
            <div key={r._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium">{r.visitor_name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r.phone} {r.vehicle_number && `· ${r.vehicle_number}`}
                  {r.flat_id && ` · Block ${r.flat_id.block_name} - ${r.flat_id.flat_number}`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Requested {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center shrink-0">
                <button
                  onClick={() => handleDecision(r._id, 'Rejected')}
                  disabled={actingId === r._id}
                  className="rounded-lg border border-destructive px-3 py-2 text-xs font-medium text-destructive disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDecision(r._id, 'Pre-Approved')}
                  disabled={actingId === r._id}
                  className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VisitorRequests
