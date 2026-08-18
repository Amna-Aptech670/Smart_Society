import React, { useState, useEffect } from 'react'
import { getVisitorLogs } from '../services/auditApi'

const AuditLogs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVisitorLogs().then(setLogs).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Audit Logs</h2>
      <p className="mb-4 text-xs text-muted-foreground">Full visitor entry/exit history across all gates.</p>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {!loading && logs.length === 0 && <p className="text-sm text-muted-foreground">No visitor records yet.</p>}

      {logs.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
          {logs.map((v) => (
            <div key={v._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium">{v.visitor_name}</p>
                <p className="text-xs text-muted-foreground">
                  {v.phone} {v.vehicle_number && `· ${v.vehicle_number}`}
                  {v.flat_id && ` · Block ${v.flat_id.block_name} - ${v.flat_id.flat_number}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs ${v.status === 'Entered' ? 'bg-secondary/20 text-secondary' : v.status === 'Exited' ? 'bg-muted text-muted-foreground' : 'bg-primary/20 text-primary'}`}>
                  {v.status}
                </span>
                {v.entry_timestamp && <p className="mt-1 text-xs text-muted-foreground">{new Date(v.entry_timestamp).toLocaleString()}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AuditLogs
