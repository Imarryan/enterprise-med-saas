'use client';

import Link from 'next/link';
import {
    LayoutDashboard, BookOpen, Award, User,
    Settings, LogOut, MessageSquare,
} from 'lucide-react';



const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/courses', icon: BookOpen, label: 'My Courses' },
    { href: '/dashboard/certificates', icon: Award, label: 'Certificates' },
    { href: '/dashboard/ai-assistant', icon: MessageSquare, label: 'AI Assistant' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
                    borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 8,
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
