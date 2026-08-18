import React, { useState, useEffect } from 'react'
import { getGuards, getGuardTasks } from '../../services/securityAdminApi'

const STATUS_STYLES = {
  Pending: 'bg-muted text-muted-foreground',
  'In-Progress': 'bg-primary/20 text-primary',
  Completed: 'bg-secondary/20 text-secondary',
}

const SecurityList = () => {
  const [guards, setGuards] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getGuards().then(setGuards).catch(() => {})
    getGuardTasks().then(setTasks).catch(() => {})
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Security</h2>

      <div className="mb-6">
        <h3 className="font-heading text-lg mb-3">Guards on Duty</h3>
        {guards.length === 0 ? (
          <p className="text-muted-foreground text-sm">No guard accounts found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guards.map((g) => {
              const guardTasks = tasks.filter((t) => t.assigned_to?._id === g._id)
              const active = guardTasks.filter((t) => t.status !== 'Completed').length
              return (
                <div key={g._id} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-medium">{g.username}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{active} active task{active !== 1 ? 's' : ''} · {guardTasks.length} total</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-heading text-lg mb-3">All Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tasks assigned yet.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
            {tasks.map((t) => (
              <div key={t._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium">{t.title}</p>
                  {t.description && <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">Assigned to {t.assigned_to?.username || 'Unknown'} · {new Date(t.createdAt).toLocaleString()}</p>
                </div>
                <span className={`inline-flex shrink-0 rounded-full px-2 py-1 text-xs ${STATUS_STYLES[t.status] || STATUS_STYLES.Pending}`}>{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SecurityList
