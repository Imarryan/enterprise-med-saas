'use client'

import { motion } from 'framer-motion'

export default function SuccessCheckmark({ size = 120 }: { size?: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          stroke="#10b981"
          strokeWidth="4"
          fill="rgba(16,185,129,0.08)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M38 62L52 76L82 46"
          stroke="#10b981"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
        />
      </svg>
    </motion.div>
  )
}
