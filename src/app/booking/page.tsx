'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import CourseBookingForm from '@/components/CourseBookingForm';

export default function BookingPage() {
  return (
    <PageTransition>
      <div style={{ paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
        {/* Animated background */}
        <motion.div
          style={{
            position: 'absolute',
            top: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container" style={{ maxWidth: 640, paddingTop: 48, position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/courses" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14,
              marginBottom: 32, transition: 'color 0.2s',
            }}>
              ← Back to Courses
            </Link>
          </motion.div>

          <motion.div
            className="card"
            style={{ padding: 'clamp(24px, 5vw, 40px)' }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
          >
            <CourseBookingForm />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
