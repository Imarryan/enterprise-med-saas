'use client';

import Link from 'next/link';
import {
    LayoutDashboard, BookOpen, Users, CreditCard,
    Settings, LogOut, BarChart3, PlusCircle,
} from 'lucide-react';



const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { href: '/admin/students', icon: Users, label: 'Students' },
    { href: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 72 }}>
            {/* Sidebar */}
            <aside style={{
                width: 240, flexShrink: 0,
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column',
                position: 'sticky', top: 72, height: 'calc(100vh - 72px)',
                padding: '24px 12px',
            }}>
                <div style={{ padding: '6px 14px', marginBottom: 20 }}>
                    <span style={{
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: 'var(--text-muted)',
                    }}>Admin Panel</span>
                </div>

                <Link href="/admin/courses/new" style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    margin: '0 2px 20px',
                    padding: '10px 14px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #7c3aed, #9f5cf7)',
                    color: 'white', textDecoration: 'none',
                    fontSize: 13, fontWeight: 600,
                    transition: 'opacity 0.2s',
                }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                    <PlusCircle size={15} /> New Course
                </Link>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {navItems.map(({ href, icon: Icon, label }) => (
                        <Link key={href} href={href} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 14px', borderRadius: 10,
                            color: 'var(--text-secondary)', textDecoration: 'none',
                            fontSize: 14, fontWeight: 500,
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(124,58,237,0.12)';
                                e.currentTarget.style.color = '#f0f0f8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}>
                            <Icon size={17} />
                            {label}
                        </Link>
                    ))}
                </nav>

                <Link href="/auth/login" style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 14px', borderRadius: 10,
                    color: 'var(--text-muted)', textDecoration: 'none',
                    fontSize: 14, fontWeight: 500,
                    borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 16,
                }}>
                    <LogOut size={17} /> Sign Out
                </Link>
            </aside>

            {/* Content */}
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
