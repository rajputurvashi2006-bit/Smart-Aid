import Card from '../components/ui/Card'

const benefits = [
  {
    title: 'Instant visual diagnosis',
    desc: 'One photo, seconds of processing. No waiting for lab results or clinic appointments. Results are immediate enough for on-site intervention decisions.',
    stat: 'Under 30',
    statLabel: 'seconds',
  },
  {
    title: 'Always the same standard',
    desc: 'The AI doesn\'t have bad days or miss details. Every person gets assessed with identical criteria—whether they\'re rich or poor, urban or rural.',
    stat: 'Zero',
    statLabel: 'bias',
  },
  {
    title: 'Tracked over time',
    desc: 'Store results with basic info (name, age, location). Monitor progress week by week. See if interventions are working before illness gets severe.',
    stat: 'History',
    statLabel: 'preserved',
  },
]

export default function Benefits() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Why Smart-Aid works differently
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Simple tools built for real-world impact: fast screening, fair assessment, and progress tracking for everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map(({ title, desc, stat, statLabel }, idx) => (
            <Card
              key={title}
              hover
              gradient={idx !== 1}
              className={[
                idx === 0 ? 'min-h-[220px]' : '',
                idx === 1 ? 'min-h-[190px] md:-translate-y-2' : '',
                idx === 2 ? 'min-h-[210px] md:translate-y-1' : '',
              ].join(' ')}
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stat}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {statLabel}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {title}
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
