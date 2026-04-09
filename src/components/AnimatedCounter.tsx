'use client'

import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          separator=","
          useEasing
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}
