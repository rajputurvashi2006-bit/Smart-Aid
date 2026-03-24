import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Terms() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          Terms of Service
        </h1>
        <Card>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            This is a placeholder. Add your terms of service content here.
          </p>
          <Link to="/">
            <Button variant="outline" size="md">Back to Home</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
