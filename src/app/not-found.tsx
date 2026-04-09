'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <motion.div
        style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <motion.div
          style={{ fontSize: 120, fontWeight: 800, lineHeight: 1 }}
          className="gradient-text"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          404
        </motion.div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, marginTop: 16 }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="btn-primary" style={{ padding: '12px 32px', fontSize: 16 }}>
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
