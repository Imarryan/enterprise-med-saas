'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInUp } from '@/lib/animations'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  once?: boolean
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  variants = fadeInUp,
  once = true
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
