'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { href: '/courses', label: 'Courses' },
        { href: '/about', label: 'About' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/blog', label: 'Blog' },
    ];

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transition: 'all 0.3s ease',
                background: isScrolled
                    ? 'rgba(10, 10, 15, 0.92)'
                    : 'transparent',
                backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', height: 72 }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 'auto' }}>
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

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} style={{
                            padding: '8px 16px', borderRadius: 8,
                            color: '#9090b0', textDecoration: 'none',
                            fontSize: 14, fontWeight: 500,
                            transition: 'color 0.2s',
                        }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f8')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#9090b0')}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }} className="desktop-nav">
                    <Link href="/auth/login" className="btn-outline" style={{ padding: '8px 20px', fontSize: 14 }}>
                        Sign In
                    </Link>
                    <Link href="/auth/register" className="btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0f0f8', marginLeft: 16 }}
                    className="mobile-menu-btn"
                >
                    {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div style={{
                    background: 'rgba(10,10,15,0.98)',
                    backdropFilter: 'blur(16px)',
                    padding: '16px 24px 24px',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            style={{ display: 'block', padding: '12px 0', color: '#9090b0', textDecoration: 'none', fontWeight: 500 }}>
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                        <Link href="/auth/login" className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14 }}>Sign In</Link>
                        <Link href="/auth/register" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 14 }}>Get Started</Link>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
        </header>
    );
}
