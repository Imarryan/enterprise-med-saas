'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const perks = [
    'Access to 200+ premium medical courses',
    'AI-powered learning assistant',
    'Verifiable certificates',
    '7-day free trial, no card required',
];

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState('');
    const [error, setError] = useState('');
    const [shakeForm, setShakeForm] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.id]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Registration failed');
                setIsLoading(false);
                setShakeForm(true);
                setTimeout(() => setShakeForm(false), 600);
                return;
            }

            const signInRes = await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (signInRes?.error) {
                setError('Registration successful, but auto-login failed. Please sign in manually.');
                setIsLoading(false);
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch {
            setError('An error occurred. Please try again later.');
            setIsLoading(false);
            setShakeForm(true);
            setTimeout(() => setShakeForm(false), 600);
        }
    };

    const handleSocialLogin = (provider: string) => {
        setSocialLoading(provider);
        signIn(provider, { callbackUrl: '/dashboard' });
    };

    const socialButtons = [
        {
            provider: 'google',
            label: 'Sign up with Google',
            bg: '#ffffff',
            color: '#1f1f1f',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
            ),
        },
        {
            provider: 'apple',
            label: 'Sign up with Apple',
            bg: '#000000',
            color: '#ffffff',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
            ),
        },
        {
            provider: 'twitter',
            label: 'Sign up with X',
            bg: '#0f0f0f',
            color: '#ffffff',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'stretch',
            paddingTop: 72,
        }}>
            {/* Left Panel */}
            <motion.div
                style={{
                    display: 'flex',
                    flex: 1,
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.10) 100%)',
                    padding: '80px 60px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRight: '1px solid var(--border)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                className="register-left-panel"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Animated background orb */}
                <motion.div
                    style={{
                        position: 'absolute', bottom: -80, right: -80,
                        width: 300, height: 300, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
                    <motion.div
                        style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        whileHover={{ rotate: 10 }}
                    >
                        <BookOpen size={20} color="white" />
                    </motion.div>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>
                        MedLearn<span style={{ color: '#9f5cf7' }}>Pro</span>
                    </span>
                </Link>

                <motion.h1
                    style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginBottom: 16, lineHeight: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Start Your Medical<br />
                    <span className="gradient-text">Learning Journey Today</span>
                </motion.h1>
                <motion.p
                    style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 40, maxWidth: 340, lineHeight: 1.7 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Join over 50,000 professionals who are advancing their careers.
                </motion.p>

                <motion.ul
                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {perks.map((perk, i) => (
                        <motion.li
                            key={perk}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 15 }}
                            variants={fadeInUp}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                            >
                                <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />
                            </motion.div>
                            {perk}
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>

            {/* Right Panel */}
            <motion.div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 60px',
                }}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <div style={{ width: '100%', maxWidth: 440 }}>
                    <motion.h2
                        style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Create your account
                    </motion.h2>
                    <motion.p
                        style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Free 7-day trial. No credit card required.
                    </motion.p>

                    {/* Social Login Buttons */}
                    <motion.div
                        style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        {socialButtons.map(({ provider, label, bg, color, icon }) => (
                            <motion.button
                                key={provider}
                                type="button"
                                onClick={() => handleSocialLogin(provider)}
                                disabled={!!socialLoading}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                    width: '100%', height: 48, borderRadius: 12,
                                    background: bg, color: color,
                                    border: provider === 'google' ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255,255,255,0.1)',
                                    cursor: socialLoading ? 'not-allowed' : 'pointer',
                                    fontSize: 14, fontWeight: 600,
                                    opacity: socialLoading && socialLoading !== provider ? 0.5 : 1,
                                    transition: 'all 0.2s',
                                }}
                                whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {socialLoading === provider ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    icon
                                )}
                                {label}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                    >
                        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                        or sign up with email
                        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                        animate={shakeForm ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', color: '#ef4444', fontSize: 14 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {[
                            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                            { id: 'phone', label: 'Phone Number (for WhatsApp updates)', type: 'tel', placeholder: '+91 98765 43210' },
                        ].map((field, i) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.08 }}
                            >
                                <label htmlFor={field.id}>{field.label}</label>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={form[field.id as keyof typeof form]}
                                    onChange={handleChange}
                                    required={field.id !== 'phone'}
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.74 }}
                        >
                            <label htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Min 8 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingRight: 48 }}
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </motion.button>
                            </div>
                            {/* Password strength indicator */}
                            {form.password.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{ marginTop: 8 }}
                                >
                                    <div style={{ height: 3, borderRadius: 2, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                                        <motion.div
                                            style={{
                                                height: '100%',
                                                background: form.password.length >= 8 ? '#10b981' : form.password.length >= 4 ? '#f59e0b' : '#ef4444',
                                                borderRadius: 2,
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, (form.password.length / 8) * 100)}%` }}
                                        />
                                    </div>
                                    <span style={{ fontSize: 11, color: form.password.length >= 8 ? '#10b981' : 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                                        {form.password.length >= 8 ? '✓ Strong password' : `${8 - form.password.length} more characters needed`}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                            style={{ justifyContent: 'center', width: '100%', padding: '14px', marginTop: 4 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Loader2 size={18} />
                                </motion.div>
                            ) : (
                                <>Create Free Account <ArrowRight size={16} /></>
                            )}
                        </motion.button>
                    </motion.form>

                    <motion.p
                        style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 13 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85 }}
                    >
                        By signing up, you agree to our{' '}
                        <Link href="/terms" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>Terms</Link> and{' '}
                        <Link href="/privacy" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>Privacy Policy</Link>.
                    </motion.p>
                    <motion.p
                        style={{ textAlign: 'center', marginTop: 12, color: 'var(--text-secondary)', fontSize: 14 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        Already have an account?{' '}
                        <Link href="/auth/login" style={{ color: 'var(--primary-light)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                    </motion.p>
                </div>
            </motion.div>

            <style>{`@media (max-width: 768px) { .register-left-panel { display: none !important; } }`}</style>
        </div>
    );
}
