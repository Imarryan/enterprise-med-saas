'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
                return;
            }

            // Automatically sign in after successful registration
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
            <div style={{
                display: 'flex',
                flex: 1,
                background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.10) 100%)',
                padding: '80px 60px',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: '1px solid var(--border)',
            }} className="register-left-panel">
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <BookOpen size={20} color="white" />
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>
                        MedLearn<span style={{ color: '#9f5cf7' }}>Pro</span>
                    </span>
                </Link>

                <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginBottom: 16, lineHeight: 1.2 }}>
                    Start Your Medical<br />
                    <span className="gradient-text">Learning Journey Today</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 40, maxWidth: 340, lineHeight: 1.7 }}>
                    Join over 50,000 doctors and healthcare professionals who are advancing their careers.
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {perks.map((perk) => (
                        <li key={perk} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 15 }}>
                            <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} /> {perk}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Panel */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 60px',
            }}>
                <div style={{ width: '100%', maxWidth: 440 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Create your account</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32 }}>Free 7-day trial. No credit card required.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', color: '#ef4444', fontSize: 14 }}>
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input id="name" type="text" placeholder="Dr. John Doe" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" placeholder="doctor@hospital.com" value={form.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number (for WhatsApp updates)</label>
                            <input id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                        </div>
                        <div>
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
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" disabled={isLoading} style={{ justifyContent: 'center', width: '100%', padding: '14px', marginTop: 4 }}>
                            {isLoading ? <Loader2 size={18} /> : <>Create Free Account <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 13 }}>
                        By signing up, you agree to our{' '}
                        <Link href="/terms" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>Terms</Link> and{' '}
                        <Link href="/privacy" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>Privacy Policy</Link>.
                    </p>
                    <p style={{ textAlign: 'center', marginTop: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
                        Already have an account?{' '}
                        <Link href="/auth/login" style={{ color: 'var(--primary-light)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                    </p>
                </div>
            </div>

            <style>{`@media (max-width: 768px) { .register-left-panel { display: none !important; } }`}</style>
        </div>
    );
}
