import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Privacy() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          Privacy Policy
        </h1>
        <Card>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Your photos and health information belong to you. We encrypt everything. No sharing without permission. Your scan history stays private unless you choose to share it with a healthcare provider.
          </p>
          <Link to="/">
            <Button variant="outline" size="md">Back to Home</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
