'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { fadeInUp, fadeInDown, staggerContainer, scaleIn } from '@/lib/animations';
import { WHATSAPP_CHAT_URL } from '@/lib/whatsapp';

const cards = [
  { icon: '📧', title: 'Email Support', detail: 'support@medlearnpro.com', sub: 'Response within 24 hours' },
  { icon: '💬', title: 'WhatsApp', detail: '+91 99818 91051', sub: 'Mon–Sat, 9am–6pm IST', href: WHATSAPP_CHAT_URL },
  { icon: '📍', title: 'Office', detail: 'Bengaluru, India', sub: 'By appointment only' },
  { icon: '🕐', title: 'Support Hours', detail: 'Mon–Sat', sub: '9:00 AM – 6:00 PM IST' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus('loading');

    // Build WhatsApp message with form data
    const msg = encodeURIComponent(
      `📩 *Contact Form*\n\n👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📌 *Subject:* ${form.subject}\n💬 *Message:* ${form.message}`
    );
    const waUrl = `https://wa.me/919981891051?text=${msg}`;

    // Simulate brief loading then open WhatsApp
    setTimeout(() => {
      setStatus('success');
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <PageTransition>
      <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', paddingTop: 96 }}>
        <div className="container" style={{ maxWidth: 896, paddingTop: 48, paddingBottom: 96 }}>

          {/* Hero */}
          <AnimatedSection variants={fadeInDown}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
                Contact Us
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', maxWidth: 560, margin: '0 auto' }}>
                Have a question? We&apos;re here to help. Reach out to our team anytime.
              </p>
            </div>
          </AnimatedSection>

          {/* Info Cards */}
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 56 }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {cards.map((c) => (
              <motion.div
                key={c.title}
                className="card"
                style={{ padding: 24, cursor: c.href ? 'pointer' : 'default' }}
                variants={scaleIn}
                whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(124,58,237,0.1)' }}
                onClick={() => c.href && window.open(c.href, '_blank')}
              >
                <motion.div
                  style={{ fontSize: 32, marginBottom: 12 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {c.icon}
                </motion.div>
                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{c.title}</h3>
                <p style={{ color: '#7c3aed', fontWeight: 500, fontSize: 15 }}>{c.detail}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{c.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <AnimatedSection variants={fadeInUp} delay={0.2}>
            <motion.div
              className="card"
              style={{ padding: 'clamp(24px, 5vw, 48px)' }}
              whileHover={{ borderColor: 'rgba(124,58,237,0.2)' }}
            >
              {status === 'success' ? (
                <motion.div
                  style={{ textAlign: 'center', padding: '32px 0' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24 }}>
                    We&apos;ve opened WhatsApp so you can confirm your message. We&apos;ll get back to you soon.
                  </p>
                  <motion.button
                    className="btn-primary"
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 28 }}>Send us a Message</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="contact-name">Full Name *</label>
                      <input id="contact-name" name="name" placeholder="Your Full Name" value={form.name} onChange={handleChange} required />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="contact-email">Email *</label>
                      <input id="contact-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </motion.div>
                  </div>
                  <motion.div
                    style={{ marginBottom: 16 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="contact-subject">Subject *</label>
                    <input id="contact-subject" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} required />
                  </motion.div>
                  <motion.div
                    style={{ marginBottom: 28 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="contact-message">Message *</label>
                    <textarea id="contact-message" name="message" rows={5} placeholder="Describe your question or issue..." style={{ resize: 'none' }} value={form.message} onChange={handleChange} required />
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'loading'}
                    style={{ minWidth: 180, justifyContent: 'center' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'loading' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...
                      </span>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </AnimatedSection>
        </div>
      </main>
    </PageTransition>
  );
}
