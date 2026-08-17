import React, { useState, useEffect } from 'react'
import { getNotices } from '../../services/noticeApi'

const NoticesList = () => {
  const [notices, setNotices] = useState([])

  useEffect(() => {
    getNotices().then(setNotices).catch(() => {})
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Notices</h2>

      {notices.length === 0 ? (
        <p className="text-muted-foreground text-sm">No notices posted yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {notices.map((n) => (
            <div key={n._id} className="p-4">
              <div className="flex justify-between items-start">
                <p className="font-medium">{n.title}</p>
                <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NoticesList