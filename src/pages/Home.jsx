import { Link } from 'react-router-dom'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import HowItWorks from '../sections/HowItWorks'
import Technology from '../sections/Technology'
import Benefits from '../sections/Benefits'
import CTA from '../sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-[-6px]">
        <Problem />
      </div>
      <div className="mt-10">
        <HowItWorks />
      </div>
      <div className="mt-[-2px]">
        <Technology />
      </div>
      <div className="mt-12">
        <Benefits />
      </div>
      <div className="mt-[-4px]">
        <CTA />
      </div>
    </>
  )
}
