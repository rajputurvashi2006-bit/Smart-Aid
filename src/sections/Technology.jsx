import Card from '../components/ui/Card'

const tech = [
  {
    name: 'Computer vision for bodies',
    desc: 'Trained on thousands of images with clinical annotations. The AI recognizes skeletal markers, muscle atrophy, edema, and skin changes—trained to spot what trained eyes would see.',
  },
  {
    name: 'Secure personal records',
    desc: 'Your photos and results are encrypted. Store name, age, location (optional), and assessment history. No data is shared without consent. Transparent, simple privacy.',
  },
  {
    name: 'Works everywhere',
    desc: 'No internet required for analysis after initial setup. Works on phones, tablets, laptops. No expensive equipment. Works for rich, poor, and everyone in between.',
  },
]

export default function Technology() {
  return (
    <section className="section-padding bg-slate-100/50 dark:bg-slate-900/30">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Built to be accessible
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            AI meets practical reality: reliable detection that works on basic phones, protects privacy, and costs almost nothing to deploy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tech.map(({ name, desc }, idx) => (
            <Card
              key={name}
              hover
              gradient={idx === 0}
              className={[
                idx === 0 ? 'min-h-[160px]' : '',
                idx === 1 ? 'min-h-[190px] md:-translate-y-1' : '',
                idx === 2 ? 'min-h-[175px] md:translate-y-1' : '',
              ].join(' ')}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    {name}
                  </h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
