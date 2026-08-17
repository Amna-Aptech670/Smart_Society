import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createFlat } from '../../services/flatApi'

const AddFlat = () => {
  const [block, setBlock] = useState('')
  const [number, setNumber] = useState('')
  const [occupancy, setOccupancy] = useState('Owner')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createFlat(block, number, occupancy)
      navigate('/dashboard/flats')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create flat')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Add Flat</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 max-w-md flex flex-col gap-3">
        <div>
          <label className="text-sm text-muted-foreground">Block Name</label>
          <input value={block} onChange={(e) => setBlock(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background" placeholder="A" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Flat Number</label>
          <input value={number} onChange={(e) => setNumber(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background" placeholder="101" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Occupancy Type</label>
          <select value={occupancy} onChange={(e) => setOccupancy(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background">
            <option value="Owner">Owner</option>
            <option value="Tenant">Tenant</option>
          </select>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium">
          {loading ? 'Adding...' : 'Add Flat'}
        </button>
      </form>
    </div>
  )
}

export default AddFlat