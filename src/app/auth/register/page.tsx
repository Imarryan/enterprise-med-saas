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
                        style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Free 7-day trial. No credit card required.
                    </motion.p>

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
                                transition={{ delay: 0.4 + i * 0.08 }}
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
                            transition={{ delay: 0.64 }}
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
                            transition={{ delay: 0.7 }}
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
                        transition={{ delay: 0.8 }}
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
