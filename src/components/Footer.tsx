'use client';

import Link from 'next/link';
import { BookOpen, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();

    const footerLinks = {
        Platform: [
            { href: '/courses', label: 'All Courses' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/dashboard', label: 'My Dashboard' },
            { href: '/certificates', label: 'Certificates' },
        ],
        Company: [
            { href: '/about', label: 'About Us' },
            { href: '/blog', label: 'Blog' },
            { href: '/careers', label: 'Careers' },
            { href: '/contact', label: 'Contact' },
        ],
        Legal: [
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' },
            { href: '/refunds', label: 'Refund Policy' },
        ],
    };

    return (
        <footer style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)',
            padding: '64px 0 24px',
            marginTop: 'auto',
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <BookOpen size={18} color="white" />
                            </div>
                            <span style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f8' }}>
                                MedLearn<span style={{ color: '#9f5cf7' }}>Pro</span>
                            </span>
                        </Link>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
                            Premium digital medical education for healthcare professionals. Learn from India&apos;s top doctors.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: 36, height: 36, borderRadius: 8,
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--text-secondary)', transition: 'all 0.2s', textDecoration: 'none',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#9f5cf7'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                                {title}
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {links.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link href={href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        © {year} MedLearnPro. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <a href="mailto:support@medlearnpro.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
                            <Mail size={13} /> support@medlearnpro.com
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer > div > div:first-child > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>
        </footer>
    );
}
