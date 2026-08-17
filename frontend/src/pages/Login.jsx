import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginSuccess } from '../store/authSlice'
import { loginUser } from '../services/authApi'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { user, token } = await loginUser(username, password)
      dispatch(loginSuccess({ user, token }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Branded panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-sidebar overflow-hidden flex-col justify-between p-12">
        {/* window-grid pattern, echoes a residential block */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, currentColor 0, currentColor 2px, transparent 2px, transparent 48px), repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 64px)',
          color: 'var(--sidebar-primary)'
        }} />

        <div className="relative z-10">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-sidebar-foreground/60">Community Operations</p>
        </div>

        <div className="relative z-10">
          <h1 className="font-heading text-6xl leading-[1.05] text-sidebar-primary mb-4">
            Smart<br />Society
          </h1>
          <p className="text-sidebar-foreground/70 text-sm max-w-xs">
            One dashboard for residents, guards, and administration — built for how a real society actually runs.
          </p>
        </div>

        <div className="relative z-10 font-mono text-xs text-sidebar-foreground/50">
          Admin · Resident · Guard
        </div>
      </div>

      {/* Form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-heading text-3xl text-primary">SmartSociety</h1>
          </div>

          <h2 className="font-heading text-2xl mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your dashboard</p>

          <form onSubmit={handleSubmit}>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2.5 mb-4 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              placeholder="admin"
              autoComplete="username"
            />

            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2.5 mb-6 mt-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              placeholder="••••••••"
              autoComplete="current-password"
            />

            {error && (
              <p className="text-destructive text-sm mb-4 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login