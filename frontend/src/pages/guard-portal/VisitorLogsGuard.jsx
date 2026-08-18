import React, { useState, useEffect } from 'react'
import { getActiveVisitors } from '../../services/guardApi'

const VisitorLogsGuard = () => {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveVisitors().then(setVisitors).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Visitor Logs</h2>
      <p className="mb-4 text-xs text-muted-foreground">Visitors currently inside the premises.</p>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {!loading && visitors.length === 0 && <p className="text-sm text-muted-foreground">No visitors currently inside.</p>}

      {visitors.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
          {visitors.map((v) => (
            <div key={v._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium">{v.visitor_name}</p>
                <p className="text-xs text-muted-foreground">
                  {v.phone} {v.vehicle_number && `· ${v.vehicle_number}`}
                  {v.flat_id && ` · Block ${v.flat_id.block_name} - ${v.flat_id.flat_number}`}
                </p>
              </div>
              <span className="inline-flex rounded-full bg-primary/20 px-2 py-1 text-xs text-primary">
                {v.entry_timestamp && new Date(v.entry_timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VisitorLogsGuard
