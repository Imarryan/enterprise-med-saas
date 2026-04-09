'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
    LayoutDashboard, BookOpen, Users, CreditCard,
    Settings, LogOut, BarChart3, PlusCircle, Menu, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { href: '/admin/students', icon: Users, label: 'Students' },
    { href: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => { setOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: 72 }}>
            {/* Mobile top bar */}
            <motion.div
                style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', background: 'var(--bg-card)',
                    borderBottom: '1px solid var(--border)',
                    position: 'sticky', top: 72, zIndex: 50,
                }}
                className="admin-mobile-topbar"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle sidebar"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text-primary)', display: 'flex',
                        alignItems: 'center', padding: 6, borderRadius: 8,
                    }}
                >
                    <AnimatePresence mode="wait">
                        {open ? (
                            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X size={22} />
                            </motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <Menu size={22} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Admin Panel</span>
                </div>
            </motion.div>

            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                {/* Backdrop overlay (mobile) */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 40,
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(2px)',
                            }}
                            className="admin-mobile-only"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <aside
                    style={{
                        width: 240, flexShrink: 0,
                        background: 'var(--bg-card)',
                        borderRight: '1px solid var(--border)',
                        display: 'flex', flexDirection: 'column',
                        padding: '24px 12px',
                    }}
                    className={`admin-sidebar${open ? ' admin-sidebar-open' : ''}`}
                >
                    <motion.div
                        style={{ padding: '6px 14px', marginBottom: 20 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="admin-sidebar-label"
                    >
                        <span style={{
                            fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '0.12em', color: 'var(--text-muted)',
                        }}>Admin Panel</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Link href="/admin/courses/new" onClick={() => setOpen(false)} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            margin: '0 2px 20px',
                            padding: '10px 14px', borderRadius: 10,
                            background: 'linear-gradient(135deg, #7c3aed, #9f5cf7)',
                            color: 'white', textDecoration: 'none',
                            fontSize: 13, fontWeight: 600,
                            transition: 'opacity 0.2s',
                        }}>
                            <PlusCircle size={15} /> New Course
                        </Link>
                    </motion.div>

                    <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {navItems.map(({ href, icon: Icon, label }, i) => {
                            const active = pathname === href;
                            return (
                                <motion.div
                                    key={href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link href={href} onClick={() => setOpen(false)} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '10px 14px', borderRadius: 10,
                                        color: active ? 'var(--primary-light)' : 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: 14, fontWeight: 500,
                                        transition: 'all 0.2s',
                                        background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                                        borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                                        position: 'relative',
                                    }}>
                                        <motion.div
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Icon size={17} />
                                        </motion.div>
                                        {label}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            onClick={() => signOut({ callbackUrl: '/auth/login' })}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 14px', borderRadius: 10,
                                color: 'var(--text-muted)', width: '100%',
                                fontSize: 14, fontWeight: 500,
                                background: 'none', border: 'none', cursor: 'pointer',
                                borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 16,
                            }}
                        >
                            <LogOut size={17} /> Sign Out
                        </button>
                    </motion.div>
                </aside>

                {/* Content */}
                <main style={{ flex: 1, minWidth: 0, padding: 'clamp(16px, 3vw, 32px)', overflowX: 'hidden' }}>
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>

            <style>{`
                @media (min-width: 769px) {
                    .admin-mobile-topbar { display: none !important; }
                    .admin-mobile-only { display: none !important; }
                    .admin-sidebar {
                        position: sticky;
                        top: 72px;
                        height: calc(100vh - 72px);
                        overflow-y: auto;
                    }
                }
                @media (max-width: 768px) {
                    .admin-sidebar {
                        position: fixed;
                        top: 0; left: 0;
                        height: 100vh;
                        z-index: 50;
                        transform: translateX(-100%);
                        transition: transform 0.25s ease;
                        overflow-y: auto;
                    }
                    .admin-sidebar.admin-sidebar-open {
                        transform: translateX(0);
                    }
                    .admin-sidebar-label { display: none; }
                }
            `}</style>
        </div>
    );
}
