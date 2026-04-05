import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Refund Policy' };

const sections = [
  {
    title: 'Individual Course Purchases',
    body: 'If you are not satisfied with a course, you may request a full refund within 7 days of purchase, provided you have watched less than 30% of the course content. Refunds are processed within 5–7 business days to your original payment method.',
  },
  {
    title: 'Subscription Plans',
    body: 'Monthly subscriptions are non-refundable. Annual subscriptions may be refunded within 14 days of the initial purchase if you have not accessed more than 2 courses. After this period, no refunds will be issued for the remaining subscription period.',
  },
  {
    title: '7-Day Free Trial',
    body: 'Users on a free trial will not be charged until the trial period ends. You may cancel at any time during the trial without any charge. If you forget to cancel, please contact us within 48 hours of the charge for a full refund.',
  },
  {
    title: 'Non-Refundable Items',
    body: 'Certificates of completion, custom enterprise plans, and any courses purchased during a promotional discount of 50% or more are non-refundable.',
  },
  {
    title: 'How to Request a Refund',
    body: 'Email us at support@medlearnpro.com with your order ID and reason for the refund. Our team will review your request and respond within 2 business days.',
  },
];

export default function RefundsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 768, paddingTop: 48, paddingBottom: 96 }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 8 }}>Refund Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>Last updated: April 1, 2026</p>

        {/* Guarantee Banner */}
        <div style={{
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.35)',
          borderRadius: 'var(--radius)',
          padding: '18px 24px',
          marginBottom: 48,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <span style={{ fontSize: 22 }}>💡</span>
          <p style={{ color: '#9f5cf7', fontSize: 15, lineHeight: 1.6 }}>
            We offer a <strong>7-day money-back guarantee</strong> on all individual course purchases — no questions asked.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {sections.map((s) => (
            <section key={s.title}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{s.title}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
