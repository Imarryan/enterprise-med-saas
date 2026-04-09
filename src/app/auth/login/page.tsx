'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, Loader2, BookOpen, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [shakeForm, setShakeForm] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials');
                setIsLoading(false);
                setShakeForm(true);
                setTimeout(() => setShakeForm(false), 600);
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch {
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
            setShakeForm(true);
            setTimeout(() => setShakeForm(false), 600);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px 48px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow */}
            <motion.div
                style={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                    width: 600, height: 600, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            <motion.div
                style={{ width: '100%', maxWidth: 440, position: 'relative' }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                {/* Logo */}
                <motion.div
                    style={{ textAlign: 'center', marginBottom: 32 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 24 }}>
                        <motion.div
                            style={{
                                width: 40, height: 40, borderRadius: 12,
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                            whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                            <BookOpen size={20} color="white" />
                        </motion.div>
                        <span style={{ fontSize: 20, fontWeight: 700 }}>
                            MedLearn<span style={{ color: '#9f5cf7' }}>Pro</span>
                        </span>
                    </Link>
                    <motion.h1
                        style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome back
                    </motion.h1>
                    <motion.p
                        style={{ color: 'var(--text-secondary)', fontSize: 15 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Sign in to continue your medical learning journey
                    </motion.p>
                </motion.div>

                {/* Card */}
                <motion.div
                    className="card"
                    style={{ padding: 36 }}
                    animate={shakeForm ? {
                        x: [0, -8, 8, -6, 6, -3, 3, 0],
                    } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#ef4444', fontSize: 14 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ paddingRight: 48 }}
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </motion.button>
                            </div>
                            <div style={{ textAlign: 'right', marginTop: 8 }}>
                                <Link href="/auth/forgot-password" style={{ color: 'var(--primary-light)', fontSize: 13, textDecoration: 'none' }}>
                                    Forgot password?
                                </Link>
                            </div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                            style={{ justifyContent: 'center', width: '100%', padding: '14px' }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Loader2 size={18} />
                                </motion.div>
                            ) : (
                                <>Sign In <ArrowRight size={16} /></>
                            )}
                        </motion.button>

                        {/* Divider */}
                        <motion.div
                            style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: 13 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                            or continue with
                            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                        </motion.div>

                        <motion.button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                            className="btn-outline"
                            style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </motion.button>
                    </form>
                </motion.div>

                <motion.p
                    style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 14 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" style={{ color: 'var(--primary-light)', fontWeight: 600, textDecoration: 'none' }}>
                        Sign up free
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}
