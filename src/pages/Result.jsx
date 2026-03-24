import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card, { CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAppStore } from '../store/useAppStore'
import { formatDate } from '../utils/helpers'

export default function Result() {
  const scanResult = useAppStore((s) => s.scanResult)
  const lastScanAt = useAppStore((s) => s.lastScanAt)

  useEffect(() => {
    if (!scanResult && !lastScanAt) return
  }, [scanResult, lastScanAt])

  if (!scanResult) {
    return (
      <div className="section-padding">
        <div className="container-narrow text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            No scan yet
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Go to Scan and upload a body photo to get your malnutrition assessment, severity level, and personalized recommendations.
          </p>
          <Link to="/scan">
            <Button size="lg">Go to Scanner</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { summary, insights = [], confidence, id } = scanResult

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Your Malnutrition Assessment
            </h1>
            {lastScanAt && (
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {formatDate(lastScanAt)}
              </p>
            )}
          </div>
          <Link to="/scan">
            <Button variant="outline" size="md">New Scan</Button>
          </Link>
        </div>

        <div className="space-y-6">
          {summary && (
            <Card hover className="transition-transform hover:rotate-[0.2deg]">
              <CardHeader title="Summary" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {summary}
              </p>
            </Card>
          )}

          {confidence != null && (
            <Card padding hover className="flex flex-row items-center gap-4 transition-transform hover:rotate-[-0.15deg]">
              <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                {Math.round(confidence * 100)}%
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Confidence
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  A quick signal for how strongly the extracted info matches expected patterns.
                </p>
              </div>
            </Card>
          )}

          {insights?.length > 0 && (
            <Card>
              <CardHeader title="Insights" />
              <ul className="space-y-3">
                {insights.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 transition-colors hover:bg-primary-50/40 dark:hover:bg-primary-950/20"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {typeof item === 'string' ? item : item.text || item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {id && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Result ID: {id}
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/scan">
            <Button size="lg">Scan another</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
