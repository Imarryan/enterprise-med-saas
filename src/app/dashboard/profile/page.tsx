'use client';

import { useSession } from 'next-auth/react';
import { User, Mail, Phone, Calendar, Shield, BookOpen, Award, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const stats = [
    { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: '#7c3aed' },
    { label: 'Certificates', value: '1', icon: Award, color: '#06b6d4' },
    { label: 'Member Since', value: 'Mar 2026', icon: Calendar, color: '#10b981' },
    { label: 'Account Type', value: 'Student', icon: Shield, color: '#f59e0b' },
];

export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)' }} />
            </div>
        );
    }

    const userName = session?.user?.name || 'Student';
    const userEmail = session?.user?.email || 'student@medlearnpro.com';
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <PageTransition>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                {/* Profile Header */}
                <motion.div
                    className="card"
                    style={{
                        padding: 'clamp(24px, 5vw, 40px)',
                        background: 'linear-gradient(135deg, var(--bg-card), rgba(124,58,237,0.05))',
                        marginBottom: 24,
                        textAlign: 'center',
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        style={{
                            width: 90, height: 90, borderRadius: 24, margin: '0 auto 20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{
                                width: '100%', height: '100%',
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 32, fontWeight: 800, color: 'white',
                            }}>
                                {userInitial}
                            </div>
                        )}
                    </motion.div>

                    <motion.h1
                        style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {userName}
                    </motion.h1>

                    <motion.div
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 12 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}>
                            <Mail size={14} /> {userEmail}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}>
                            <Phone size={14} /> +91 •••• •••0
                        </span>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {stats.map(({ label, value, icon: Icon, color }) => (
                        <motion.div
                            key={label}
                            className="card"
                            style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}
                            variants={scaleIn}
                            whileHover={{ y: -2, borderColor: `${color}40` }}
                        >
                            <motion.div
                                style={{
                                    width: 42, height: 42, borderRadius: 12,
                                    background: `${color}15`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Icon size={20} color={color} />
                            </motion.div>
                            <div>
                                <div style={{ fontSize: 17, fontWeight: 800 }}>{value}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Activity */}
                <motion.div
                    className="card"
                    style={{ padding: 24 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h2>
                    {[
                        { text: 'Completed Module 2 of Advanced Cardiology', time: '2 hours ago', color: '#10b981' },
                        { text: 'Started Emergency Medicine course', time: '1 day ago', color: '#7c3aed' },
                        { text: 'Earned Cardiology certificate', time: '3 days ago', color: '#f59e0b' },
                    ].map((activity, i) => (
                        <motion.div
                            key={i}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '12px 0',
                                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                        >
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: activity.color, flexShrink: 0 }} />
                            <div style={{ flex: 1, fontSize: 14, color: 'var(--text-secondary)' }}>{activity.text}</div>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{activity.time}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
