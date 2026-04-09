'use client';

import { useState } from 'react';
import { buildCourseBookingMessage, sendWhatsAppMessage } from '@/lib/whatsapp';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import SuccessCheckmark from '@/components/SuccessCheckmark';

interface CourseBookingFormProps {
  courseName?: string;
  onClose?: () => void;
}

export default function CourseBookingForm({ courseName = '', onClose }: CourseBookingFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: courseName,
    date: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [shakeForm, setShakeForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fireConfetti = () => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    confetti({ ...defaults, particleCount: 100, origin: { x: 0.5, y: 0.5 } });
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.3, y: 0.6 } });
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.7, y: 0.6 } });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!form.name || !form.email || !form.phone || !form.course || !form.date) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 600);
      return;
    }

    try {
      const res = await fetch('/api/bookings/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save booking.');
      }

      setStatus('success');
      fireConfetti();

      const message = buildCourseBookingMessage(form);
      const url = sendWhatsAppMessage(message);
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred.');
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 600);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        style={{ textAlign: 'center', padding: 32 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <SuccessCheckmark size={80} />
        </div>
        <motion.h3
          style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Booking Submitted!
        </motion.h3>
        <motion.p
          style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Redirecting you to WhatsApp to confirm your booking...
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center' }}
        >
          <motion.button
            onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', course: courseName, date: '', notes: '' }); }}
            className="btn-outline"
            style={{ padding: '10px 24px', fontSize: 14 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Another Course
          </motion.button>
          {onClose && (
            <motion.button
              onClick={onClose}
              className="btn-outline"
              style={{ padding: '10px 24px', fontSize: 14 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      animate={shakeForm ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Book via WhatsApp
      </motion.h3>
      <motion.p
        style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Fill in your details and we&apos;ll open WhatsApp with your booking request.
      </motion.p>

      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderRadius: 8,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444', fontSize: 14,
            }}
          >
            <AlertCircle size={16} />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { id: 'bf-name', name: 'name', label: 'Full Name *', placeholder: 'Your Full Name', type: 'text' },
          { id: 'bf-email', name: 'email', label: 'Email *', placeholder: 'you@example.com', type: 'email' },
        ].map((field, i) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input id={field.id} name={field.name} type={field.type} value={form[field.name as keyof typeof form]} onChange={handleChange} placeholder={field.placeholder} required />
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { id: 'bf-phone', name: 'phone', label: 'Phone Number *', placeholder: '+91 98765 43210', type: 'tel' },
          { id: 'bf-date', name: 'date', label: 'Preferred Date *', placeholder: '', type: 'date' },
        ].map((field, i) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input id={field.id} name={field.name} type={field.type} value={form[field.name as keyof typeof form]} onChange={handleChange} placeholder={field.placeholder} required />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <label htmlFor="bf-course">Course *</label>
        <input id="bf-course" name="course" value={form.course} onChange={handleChange} placeholder="Course name" required />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <label htmlFor="bf-notes">Notes (optional)</label>
        <textarea id="bf-notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Any specific requirements or questions?" rows={3} style={{ resize: 'none' }} />
      </motion.div>

      <motion.button
        type="submit"
        className="btn-primary"
        disabled={status === 'loading'}
        style={{
          width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 15,
          opacity: status === 'loading' ? 0.7 : 1, marginTop: 8,
          minHeight: 48,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        {status === 'loading' ? (
          <motion.span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Loader2 size={18} />
            </motion.div>
            Sending...
          </motion.span>
        ) : (
          <><Send size={16} /> Send Booking Request on WhatsApp</>
        )}
      </motion.button>
    </motion.form>
  );
}
