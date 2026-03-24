import Card from '../components/ui/Card'

const problems = [
  {
    title: 'Visual signs are missed or delayed',
    desc: 'Malnutrition manifests on the body, but recognizing it requires expertise. Without proper screening tools, cases go undiagnosed until they worsen.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Diagnosis depends on who\'s looking',
    desc: 'One clinician sees signs of malnutrition, another doesn\'t. Without consistent visual assessment standards, identical cases get completely different outcomes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Health data isn\'t tracked over time',
    desc: 'One screening visit tells you if someone is malnourished today, but it doesn\'t help track progress or guide long-term support. Past assessments are lost.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
]

export default function Problem() {
  return (
    <section className="section-padding bg-slate-100/50 dark:bg-slate-900/30">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            The real cost of missing malnutrition
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Malnutrition weakens immune systems, stunts growth, and increases disease risk. But if nobody screens effectively, it spreads silently—especially in communities with limited access to clinics.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map(({ title, desc, icon }, idx) => (
            <Card
              key={title}
              hover
              gradient={idx !== 1}
              className={[
                idx === 0 ? 'min-h-[260px]' : '',
                idx === 1 ? 'min-h-[220px] translate-y-2' : '',
                idx === 2 ? 'min-h-[240px] -translate-y-1' : '',
              ].join(' ')}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {title}
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
