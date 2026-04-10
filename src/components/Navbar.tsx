'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { BookOpen, User, Settings, LogOut, LayoutDashboard, ChevronDown, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const lastScrollYRef = useRef(0);
    const rafRef = useRef<number>(0);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { data: session, status } = useSession();

    const isAuth = status === 'authenticated' && !!session?.user;

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const currentY = window.scrollY;
                setIsScrolled(currentY > 20);
                setIsHidden(currentY > lastScrollYRef.current && currentY > 100);
                lastScrollYRef.current = currentY;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Close user menu on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const navLinks = [
        { href: '/courses', label: 'Courses' },
        { href: '/about', label: 'About' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/blog', label: 'Blog' },
    ];

    const user = session?.user;
    const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: isHidden && !isMobileOpen ? -80 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 100,
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
            }}
        >
            {/* Backdrop */}
            <motion.div
                style={{
                    position: 'absolute', inset: 0, zIndex: -1,
                    pointerEvents: 'none',
                }}
                animate={{
                    backgroundColor: isScrolled ? 'rgba(10, 10, 15, 0.92)' : 'rgba(10, 10, 15, 0)',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.25 }}
            />
            {isScrolled && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 1, background: 'rgba(255,255,255,0.07)',
                }} />
            )}

            <div className="container" style={{ display: 'flex', alignItems: 'center', height: isScrolled ? 64 : 72, transition: 'height 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 'auto' }}>
                    <motion.div
                        style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                        <BookOpen size={18} color="white" />
                    </motion.div>
                    <motion.span
                        style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f8' }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        MedLearn<span style={{ color: '#9f5cf7' }}>Pro</span>
                    </motion.span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.06 }}
                        >
                            <Link href={link.href} className="animated-link" style={{
                                padding: '8px 16px', borderRadius: 8,
                                color: '#9090b0', textDecoration: 'none',
                                fontSize: 14, fontWeight: 500,
                                transition: 'color 0.15s ease',
                                display: 'inline-block',
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f8')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#9090b0')}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Desktop Auth Section */}
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}
                    className="desktop-nav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {isAuth ? (
                        <div ref={userMenuRef} style={{ position: 'relative' }}>
                            <motion.button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                                    borderRadius: 10, padding: '6px 14px 6px 6px',
                                    cursor: 'pointer', color: '#f0f0f8',
                                }}
                                whileHover={{ borderColor: 'rgba(124,58,237,0.5)' }}
                            >
                                {user?.image ? (
                                    <img
                                        src={user.image}
                                        alt=""
                                        style={{ width: 30, height: 30, borderRadius: 8, objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: 30, height: 30, borderRadius: 8,
                                        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 13, fontWeight: 700,
                                    }}>
                                        {userInitial}
                                    </div>
                                )}
                                <span style={{ fontSize: 13, fontWeight: 600, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {user?.name?.split(' ')[0] || 'Account'}
                                </span>
                                <motion.div animate={{ rotate: showUserMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={14} color="#9090b0" />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        style={{
                                            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                            width: 220, background: 'var(--bg-card)',
                                            border: '1px solid var(--border)', borderRadius: 12,
                                            padding: 6, zIndex: 200,
                                            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                                        }}
                                    >
                                        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f8', marginBottom: 2 }}>
                                                {user?.name || 'User'}
                                            </div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {user?.email}
                                            </div>
                                        </div>
                                        {[
                                            { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                                            { href: '/my-courses', icon: GraduationCap, label: 'My Courses' },
                                            { href: '/dashboard/profile', icon: User, label: 'Profile' },
                                            { href: '/settings', icon: Settings, label: 'Settings' },
                                        ].map(({ href, icon: Icon, label }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setShowUserMenu(false)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 10,
                                                    padding: '9px 12px', borderRadius: 8,
                                                    color: 'var(--text-secondary)', textDecoration: 'none',
                                                    fontSize: 13, fontWeight: 500,
                                                    transition: 'all 0.15s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                                                    e.currentTarget.style.color = '#f0f0f8';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                                }}
                                            >
                                                <Icon size={15} /> {label}
                                            </Link>
                                        ))}
                                        <div style={{ borderTop: '1px solid var(--border)', marginTop: 4, paddingTop: 4 }}>
                                            <button
                                                onClick={() => { setShowUserMenu(false); signOut({ callbackUrl: '/auth/login' }); }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 10,
                                                    padding: '9px 12px', borderRadius: 8, width: '100%',
                                                    color: '#ef4444', background: 'none', border: 'none',
                                                    fontSize: 13, fontWeight: 500, cursor: 'pointer',
                                                    transition: 'background 0.15s',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                            >
                                                <LogOut size={15} /> Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/auth/login" className="btn-outline" style={{ padding: '8px 20px', fontSize: 14 }}>
                                    Sign In
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/auth/register" className="btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>
                                    Get Started
                                </Link>
                            </motion.div>
                        </>
                    )}
                </motion.div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0f0f8', marginLeft: 16, position: 'relative', width: 24, height: 24 }}
                    className="mobile-menu-btn"
                    aria-label="Toggle menu"
                >
                    <motion.div
                        style={{ position: 'absolute', left: 0, width: 24, height: 2, background: '#f0f0f8', borderRadius: 2 }}
                        animate={{ top: isMobileOpen ? 11 : 4, rotate: isMobileOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                        style={{ position: 'absolute', top: 11, left: 0, width: 24, height: 2, background: '#f0f0f8', borderRadius: 2 }}
                        animate={{ opacity: isMobileOpen ? 0 : 1, scaleX: isMobileOpen ? 0 : 1 }}
                        transition={{ duration: 0.15 }}
                    />
                    <motion.div
                        style={{ position: 'absolute', left: 0, width: 24, height: 2, background: '#f0f0f8', borderRadius: 2 }}
                        animate={{ top: isMobileOpen ? 11 : 18, rotate: isMobileOpen ? -45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed', top: 0, right: 0, bottom: 0,
                            width: '85%', maxWidth: 360,
                            background: 'rgba(10,10,15,0.98)',
                            backdropFilter: 'blur(16px)',
                            padding: '80px 24px 24px',
                            borderLeft: '1px solid rgba(255,255,255,0.07)',
                            zIndex: 99, overflowY: 'auto',
                        }}
                    >
                        {/* User info on mobile if authenticated */}
                        {isAuth && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '16px 0', marginBottom: 8,
                                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                                }}
                            >
                                {user?.image ? (
                                    <img src={user.image} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                                ) : (
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 10,
                                        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 16, fontWeight: 700, color: 'white',
                                    }}>{userInitial}</div>
                                )}
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f8' }}>{user?.name || 'User'}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.email}</div>
                                </div>
                            </motion.div>
                        )}

                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    style={{ display: 'block', padding: '14px 0', color: '#9090b0', textDecoration: 'none', fontWeight: 500, fontSize: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        {isAuth && (
                            <>
                                {[
                                    { href: '/dashboard', label: 'Dashboard' },
                                    { href: '/my-courses', label: 'My Courses' },
                                    { href: '/settings', label: 'Settings' },
                                ].map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (navLinks.length + i) * 0.04, duration: 0.25 }}
                                    >
                                        <Link href={link.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            style={{ display: 'block', padding: '14px 0', color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 500, fontSize: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </>
                        )}

                        <motion.div
                            style={{ display: 'flex', gap: 12, marginTop: 24 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {isAuth ? (
                                <button
                                    onClick={() => { setIsMobileOpen(false); signOut({ callbackUrl: '/auth/login' }); }}
                                    className="btn-outline"
                                    style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}
                                >
                                    <LogOut size={15} /> Sign Out
                                </button>
                            ) : (
                                <>
                                    <Link href="/auth/login" onClick={() => setIsMobileOpen(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14 }}>Sign In</Link>
                                    <Link href="/auth/register" onClick={() => setIsMobileOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14 }}>Get Started</Link>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsMobileOpen(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 98 }}
                    />
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
        </motion.header>
    );
}
