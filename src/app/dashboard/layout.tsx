'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
    LayoutDashboard, BookOpen, Award, User,
    Settings, LogOut, MessageSquare, Menu, X, BookMarked,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';

const navItems = [
    { href: '/dashboard',                  icon: LayoutDashboard, label: 'Overview'      },
    { href: '/dashboard/courses',          icon: BookOpen,        label: 'My Courses'    },
    { href: '/dashboard/certificates',     icon: Award,           label: 'Certificates'  },
    { href: '/dashboard/ai-assistant',     icon: MessageSquare,   label: 'AI Assistant'  },
    { href: '/dashboard/profile',          icon: User,            label: 'Profile'       },
    { href: '/dashboard/settings',         icon: Settings,        label: 'Settings'      },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
                className="mobile-topbar"
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
                    <BookMarked size={18} color="var(--primary-light)" />
                    <span style={{ fontWeight: 700, fontSize: 15 }}>
                        MedLearn<span style={{ color: 'var(--primary-light)' }}>Pro</span>
                    </span>
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
                            className="mobile-only"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <aside
                    style={{
                        width: 240, background: 'var(--bg-card)',
                        borderRight: '1px solid var(--border)',
                        display: 'flex', flexDirection: 'column',
                        padding: '24px 12px', flexShrink: 0,
                    }}
                    className={`dashboard-sidebar${open ? ' sidebar-open' : ''}`}
                >
                    <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {navItems.map(({ href, icon: Icon, label }, i) => {
                            const active = pathname === href;
                            return (
                                <motion.div
                                    key={href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            padding: '10px 14px', borderRadius: 10,
                                            textDecoration: 'none', fontSize: 14, fontWeight: 500,
                                            transition: 'all 0.2s',
                                            background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                                            color: active ? 'var(--primary-light)' : 'var(--text-secondary)',
                                            borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                                            position: 'relative',
                                        }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Icon size={17} />
                                        </motion.div>
                                        {label}
                                        {active && (
                                            <motion.div
                                                layoutId="dashboardActiveIndicator"
                                                style={{
                                                    position: 'absolute', inset: 0,
                                                    background: 'rgba(124,58,237,0.1)',
                                                    borderRadius: 10, zIndex: -1,
                                                }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => signOut({ callbackUrl: '/auth/login' })}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 14px', borderRadius: 10,
                                color: 'var(--text-muted)', textDecoration: 'none',
                                fontSize: 14, fontWeight: 500, width: '100%',
                                background: 'none', border: 'none', cursor: 'pointer',
                                borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 8,
                                transition: 'color 0.2s',
                            }}
                        >
                            <LogOut size={17} /> Sign Out
                        </button>
                    </motion.div>
                </aside>

                {/* Main content */}
                <main style={{
                    flex: 1, minWidth: 0,
                    padding: 'clamp(16px, 3vw, 32px)',
                    overflowX: 'hidden',
                }}>
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
                    .mobile-topbar { display: none !important; }
                    .mobile-only { display: none !important; }
                    .dashboard-sidebar {
                        position: sticky;
                        top: 72px;
                        height: calc(100vh - 72px);
                        overflow-y: auto;
                    }
                }
                @media (max-width: 768px) {
                    .dashboard-sidebar {
                        position: fixed;
                        top: 0; left: 0;
                        height: 100vh;
                        z-index: 50;
                        transform: translateX(-100%);
                        transition: transform 0.25s ease;
                        overflow-y: auto;
                    }
                    .dashboard-sidebar.sidebar-open {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
}
