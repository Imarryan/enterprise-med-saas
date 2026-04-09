'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMemo } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const words = useMemo(() => text.split(' '), [text])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
