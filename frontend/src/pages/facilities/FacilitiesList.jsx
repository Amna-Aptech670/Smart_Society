import React, { useState, useEffect } from 'react'
import { getFacilities, updateFacility, deleteFacility } from '../../services/facilityApi'

const STATUS_OPTIONS = ['Active', 'Maintenance', 'Closed']

const FacilitiesList = () => {
  const [facilities, setFacilities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getFacilities().then(setFacilities).catch(() => {})
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateFacility(id, { status })
      setFacilities(facilities.map((f) => (f._id === id ? updated : f)))
    } catch (err) {
      setError('Could not update facility')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this facility?')) return

    try {
      await deleteFacility(id)
      setFacilities(facilities.filter((f) => f._id !== id))
    } catch (err) {
      setError('Could not delete facility')
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Facilities</h2>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {facilities.length === 0 ? (
        <p className="text-muted-foreground text-sm">No facilities added yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
          {facilities.map((f) => (
            <div key={f._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium">{f.name}</p>
                {f.description && <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>}
                <p className="mt-2 text-xs text-muted-foreground">
                  {f.location && `${f.location} · `}{f.timing && `${f.timing} · `}Capacity: {f.capacity}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end shrink-0">
                <select value={f.status} onChange={(e) => handleStatusChange(f._id, e.target.value)} className="rounded-lg border border-input bg-background px-2 py-1.5 text-xs">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => handleDelete(f._id)} className="rounded-lg border border-destructive px-3 py-1.5 text-xs font-medium text-destructive">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FacilitiesList
