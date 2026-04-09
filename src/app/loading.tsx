'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 72,
    }}>
      <div style={{ textAlign: 'center' }}>
        {/* Animated Logo */}
        <motion.div
          style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <BookOpen size={24} color="white" />
        </motion.div>

        {/* Loading bar */}
        <div style={{
          width: 200, height: 3, borderRadius: 2,
          background: 'var(--bg-elevated)',
          margin: '0 auto 16px',
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary), var(--accent))',
              borderRadius: 2,
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Text */}
        <motion.p
          style={{ color: 'var(--text-muted)', fontSize: 14 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
