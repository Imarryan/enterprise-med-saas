import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Careers' };

const perks = [
  { icon: '🌍', label: 'Remote First' },
  { icon: '🏥', label: 'Health Insurance' },
  { icon: '📚', label: 'Learning Budget' },
  { icon: '⏰', label: 'Flexible Hours' },
  { icon: '🚀', label: 'Equity Options' },
  { icon: '🍕', label: 'Team Retreats' },
];

const jobs = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', type: 'Full-time', loc: 'Remote (India)' },
  { title: 'Medical Content Writer', dept: 'Content', type: 'Full-time', loc: 'Bengaluru / Remote' },
  { title: 'UX Designer', dept: 'Design', type: 'Full-time', loc: 'Remote (India)' },
  { title: 'Growth Marketing Manager', dept: 'Marketing', type: 'Full-time', loc: 'Bengaluru' },
  { title: 'Customer Success Associate', dept: 'Support', type: 'Full-time', loc: 'Remote (India)' },
];

export default function CareersPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 896, paddingTop: 48, paddingBottom: 96 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            Join Our Mission
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', maxWidth: 580, margin: '0 auto' }}>
            Help us democratize medical education across India. We&apos;re a passionate team of doctors, engineers, and educators building the future of healthcare learning.
          </p>
        </div>

        {/* Perks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 72 }}>
          {perks.map((p) => (
            <div key={p.label} className="card" style={{ padding: '20px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</p>
            </div>
          ))}
        </div>

        {/* Jobs */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>Open Positions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {jobs.map((job) => (
            <div key={job.title} className="card" style={{
              padding: '20px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{job.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                  {job.dept} · {job.type} · {job.loc}
                </p>
              </div>
              <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 14, flexShrink: 0 }}>
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Open Application CTA */}
        <div style={{
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(24px, 5vw, 40px)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>Don&apos;t see your role?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
            Send us your CV — we&apos;re always looking for exceptional people.
          </p>
          <a href="mailto:careers@medlearnpro.com" className="btn-primary">
            Send Open Application
          </a>
        </div>
      </div>
    </main>
  );
}
