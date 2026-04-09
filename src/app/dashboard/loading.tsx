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
    }}>
      <div style={{ textAlign: 'center' }}>
        <motion.div
          style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <BookOpen size={20} color="white" />
        </motion.div>
        <div style={{
          width: 160, height: 3, borderRadius: 2,
          background: 'var(--bg-elevated)',
          margin: '0 auto 14px',
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
        <motion.p
          style={{ color: 'var(--text-muted)', fontSize: 13 }}
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
