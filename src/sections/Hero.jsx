import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-slate-50 dark:from-primary-950/30 dark:via-slate-950 dark:to-slate-900" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '1.4s' }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center sm:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            Body Image Analysis
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            Scan a photo.
            <span className="block text-primary-600 dark:text-primary-400 mt-2">
              Get nutritional insights.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto sm:mx-0 leading-relaxed">
            Upload a body photo and let AI analyze nutritional markers. Get clear results: malnutrition status, severity level, and what to do next—accessible to everyone, regardless of resources.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link to="/scan">
              <Button
                size="lg"
                className="w-full sm:w-auto transition-transform hover:scale-[1.01]"
              >
                Scan photo
              </Button>
            </Link>
            <Link to="/result">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto transition-all hover:bg-white/10 dark:hover:bg-slate-950/20"
              >
                View results
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 flex justify-center">
          <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-slate-100 dark:from-primary-900/30 dark:to-slate-800 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/40 animate-glow">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
                  Take or upload a clear photo of yourself, and AI will assess malnutrition status instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
