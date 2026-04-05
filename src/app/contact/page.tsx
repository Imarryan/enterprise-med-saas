import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us' };

const cards = [
  { icon: '📧', title: 'Email Support', detail: 'support@medlearnpro.com', sub: 'Response within 24 hours' },
  { icon: '💬', title: 'WhatsApp', detail: '+91 98765 43210', sub: 'Mon–Sat, 9am–6pm IST' },
  { icon: '📍', title: 'Office', detail: 'Bengaluru, India', sub: 'By appointment only' },
  { icon: '🕐', title: 'Support Hours', detail: 'Mon–Sat', sub: '9:00 AM – 6:00 PM IST' },
];

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 896, paddingTop: 48, paddingBottom: 96 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            Contact Us
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', maxWidth: 560, margin: '0 auto' }}>
            Have a question? We&apos;re here to help. Reach out to our team anytime.
          </p>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 56 }}>
          {cards.map((c) => (
            <div key={c.title} className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{c.title}</h3>
              <p style={{ color: '#7c3aed', fontWeight: 500, fontSize: 15 }}>{c.detail}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="card" style={{ padding: 'clamp(24px, 5vw, 48px)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 28 }}>Send us a Message</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
            <div>
              <label>Full Name</label>
              <input placeholder="Dr. Your Name" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Subject</label>
            <input placeholder="How can we help?" />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label>Message</label>
            <textarea rows={5} placeholder="Describe your question or issue..." style={{ resize: 'none' }} />
          </div>
          <button className="btn-primary">Send Message</button>
        </div>
      </div>
    </main>
  );
}
