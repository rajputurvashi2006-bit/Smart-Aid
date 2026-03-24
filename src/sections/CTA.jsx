import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-primary-500/25">
          <div className="absolute inset-0 opacity-10 bg-[length:60px_60px] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to check nutritional status?
            </h2>
            <p className="mt-4 text-primary-100 max-w-xl mx-auto text-lg leading-relaxed">
              Take a photo right now. Get results in seconds. Find out if intervention is needed—today, not after waiting weeks for an appointment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link to="/scan">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg w-full sm:w-auto transition-all hover:shadow-primary-500/20 sm:mt-1"
                >
                  Scan now
                </Button>
              </Link>
              <Link to="/chat">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto transition-all hover:translate-y-[-1px]"
                >
                  Got questions?
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto transition-colors sm:mt-[-1px]"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
