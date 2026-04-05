import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us, such as when you create an account, enroll in a course, or contact us for support. This includes your name, email address, payment information, and professional credentials.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.',
  },
  {
    title: '3. Information Sharing',
    body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, conducting our business, or serving you.',
  },
  {
    title: '4. Data Security',
    body: 'We implement industry-standard security measures including SSL encryption, two-factor authentication, and regular security audits to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
  },
  {
    title: '5. Cookies',
    body: 'We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
  },
  {
    title: '6. Your Rights',
    body: 'You have the right to access, update, or delete the information we hold about you. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us at privacy@medlearnpro.com.',
  },
  {
    title: '7. Contact Us',
    body: 'If you have any questions about this Privacy Policy, please contact us at privacy@medlearnpro.com or write to us at MedLearnPro, Bengaluru, Karnataka, India.',
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 768, paddingTop: 48, paddingBottom: 96 }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 56 }}>Last updated: April 1, 2026</p>

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
