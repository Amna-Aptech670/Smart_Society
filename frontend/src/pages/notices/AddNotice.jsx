import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createNotice } from '../../services/noticeApi'

const AddNotice = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createNotice(title, description)
      navigate('/dashboard/notices')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post notice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Add Notice</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 max-w-lg flex flex-col gap-3">
        <div>
          <label className="text-sm text-muted-foreground">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background" placeholder="Water Tank Cleaning Notice" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background" />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium self-start">
          {loading ? 'Posting...' : 'Post Notice'}
        </button>
      </form>
    </div>
  )
}

export default AddNotice