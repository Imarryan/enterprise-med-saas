'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollYRef = useRef(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const onScroll = () => {
            // Cancel any pending rAF to debounce at display refresh rate
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const scrolled = currentY > 20;
                const hidden = currentY > lastScrollYRef.current && currentY > 100;

                setIsScrolled(scrolled);
                setIsHidden(hidden);
                lastScrollYRef.current = currentY;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const navLinks = [
        { href: '/courses', label: 'Courses' },
        { href: '/about', label: 'About' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/blog', label: 'Blog' },
    ];

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: isHidden && !isMobileOpen ? -80 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
            }}
        >
            {/* Backdrop — separate div for GPU-accelerated blur */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1,
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
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'rgba(255,255,255,0.07)',
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

                {/* Auth Buttons */}
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}
                    className="desktop-nav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
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
                </motion.div>

                {/* Mobile Menu Toggle (hamburger → X morph) */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0f0f8', marginLeft: 16, position: 'relative', width: 24, height: 24 }}
                    className="mobile-menu-btn"
                    aria-label="Toggle menu"
                >
                    <motion.div
                        style={{ position: 'absolute', left: 0, width: 24, height: 2, background: '#f0f0f8', borderRadius: 2 }}
                        animate={{
                            top: isMobileOpen ? 11 : 4,
                            rotate: isMobileOpen ? 45 : 0,
                        }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                        style={{ position: 'absolute', top: 11, left: 0, width: 24, height: 2, background: '#f0f0f8', borderRadius: 2 }}
                        animate={{ opacity: isMobileOpen ? 0 : 1, scaleX: isMobileOpen ? 0 : 1 }}
                        transition={{ duration: 0.15 }}
                    />
                    <motion.div
                        style={{ position: 'absolute', left: 0, width: 24, height: 2, background: '#f0f0f8', borderRadius: 2 }}
                        animate={{
                            top: isMobileOpen ? 11 : 18,
                            rotate: isMobileOpen ? -45 : 0,
                        }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                </button>
            </div>

            {/* Mobile Menu — slides from right */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '85%',
                            maxWidth: 360,
                            background: 'rgba(10,10,15,0.98)',
                            backdropFilter: 'blur(16px)',
                            padding: '80px 24px 24px',
                            borderLeft: '1px solid rgba(255,255,255,0.07)',
                            zIndex: 99,
                            overflowY: 'auto',
                        }}
                    >
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
                        <motion.div
                            style={{ display: 'flex', gap: 12, marginTop: 24 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link href="/auth/login" onClick={() => setIsMobileOpen(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14 }}>Sign In</Link>
                            <Link href="/auth/register" onClick={() => setIsMobileOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14 }}>Get Started</Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile menu backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsMobileOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 98,
                        }}
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
