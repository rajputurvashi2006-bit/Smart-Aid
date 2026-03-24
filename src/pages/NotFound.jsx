import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="section-padding min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="text-8xl font-bold text-primary-500/30 dark:text-primary-500/20">404</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-4">
        Page not found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  )
}
