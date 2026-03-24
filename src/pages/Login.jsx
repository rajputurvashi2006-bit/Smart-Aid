import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { api } from '../services/api'
import { useAppStore } from '../store/useAppStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!password) {
      setError('Password is required')
      return
    }
    setLoading(true)
    try {
      const data = await api.login(email.trim(), password)
      login(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-padding min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-6">
            Log in to Smart-Aid
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
            {error && (
              <p className="text-sm text-accent-rose">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              disabled={loading}
            >
              Log in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Demo: use any email and any password to log in.
          </p>
          <p className="mt-2 text-center">
            <Link
              to="/"
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
