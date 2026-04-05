import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing and using MedLearnPro, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our platform.',
  },
  {
    title: '2. Use of the Platform',
    body: 'MedLearnPro grants you a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from our content.',
  },
  {
    title: '3. User Accounts',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.',
  },
  {
    title: '4. Course Content & Certificates',
    body: 'All course content is for educational purposes only and does not constitute medical advice. Certificates are issued upon successful completion of course requirements and are subject to our verification process.',
  },
  {
    title: '5. Payments & Subscriptions',
    body: 'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. Subscription fees are billed in advance and are non-refundable except as specified in our Refund Policy.',
  },
  {
    title: '6. Prohibited Activities',
    body: 'You agree not to engage in any activity that interferes with or disrupts the platform, share your account credentials, use the platform for any unlawful purpose, or attempt to gain unauthorized access to any portion of the platform.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'MedLearnPro shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use the platform.',
  },
  {
    title: '8. Contact',
    body: 'For any questions regarding these Terms, please contact legal@medlearnpro.com.',
  },
];

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 768, paddingTop: 48, paddingBottom: 96 }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
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
