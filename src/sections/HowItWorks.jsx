import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const steps = [
  {
    step: '1',
    title: 'Capture body image',
    desc: 'Take a clear photo from the front (or upload one you have). The image just needs good lighting and full body visibility. No clothing needed if you\'re comfortable.',
  },
  {
    step: '2',
    title: 'AI reads the signs',
    desc: 'Computer vision scans skeletal prominence, muscle tone, skin condition, and other visible nutritional markers. The AI compares findings against clinical malnutrition indicators.',
  },
  {
    step: '3',
    title: 'Get your results',
    desc: 'See your malnutrition status (yes/no), severity stage (mild/moderate/severe), and personalized suggestions. Results are saved with your basic info for future comparison.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Three steps to diagnosis
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Photo to insight: capture, scan, get results—no equipment or clinic visit needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="relative">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute left-[calc(50%+2rem)] w-full h-0.5 bg-gradient-to-r from-primary-400 to-slate-200 dark:to-slate-700"
                  style={{ top: i === 0 ? '3.35rem' : '3.15rem' }}
                />
              )}
              <div
                className={[
                  'relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30 transition-transform',
                  i === 0 ? 'min-h-[250px] md:translate-y-1' : '',
                  i === 1 ? 'min-h-[220px] md:translate-y-2' : '',
                  i === 2 ? 'min-h-[240px] md:-translate-y-0.5' : '',
                ].join(' ')}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-500 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-primary-500/30">
                  {step}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/scan">
            <Button size="lg" className="transition-all hover:shadow-lg hover:shadow-primary-500/20">
              Start assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
