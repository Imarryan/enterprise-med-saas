'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, AlertCircle, XCircle, MessageCircle, ArrowRight, Loader2, GraduationCap } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Enrollment {
    id: string;
    status: string;
    amount: number;
    progress: number;
    createdAt: string;
    course: {
        id: string;
        title: string;
        slug: string;
        thumbnail: string | null;
        duration: number | null;
        level: string;
        category: string | null;
    };
}

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
    ACTIVE: { label: 'Confirmed', color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: CheckCircle },
    payment_pending: { label: 'Payment Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: AlertCircle },
    cancelled: { label: 'Cancelled', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: XCircle },
};

export default function MyCoursesPage() {
    const { data: session, status: authStatus } = useSession();
    const router = useRouter();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/my-courses');
            return;
        }
        if (authStatus === 'authenticated') {
            fetchEnrollments();
        }
    }, [authStatus, router]);

    const fetchEnrollments = async () => {
        try {
            const res = await fetch('/api/enrollments');
            const data = await res.json();
            setEnrollments(data.enrollments || []);
        } catch (err) {
            console.error('Failed to fetch enrollments:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCompletePayment = (courseName: string) => {
        const message = encodeURIComponent(
            `Hi! I have a pending payment for *${courseName}*.\n\n` +
            `👤 Name: ${session?.user?.name || 'Student'}\n` +
            `📧 Email: ${session?.user?.email || ''}\n\n` +
            `Please help me complete my enrollment! 🙏`
        );
        window.open(`https://wa.me/919981891051?text=${message}`, '_blank');
    };

    if (authStatus === 'loading' || loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)' }} />
            </div>
        );
    }

    if (authStatus === 'unauthenticated') return null;

    return (
        <PageTransition>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 100px' }}>
                <motion.div
                    style={{ marginBottom: 36 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>My Courses</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                        Track your enrolled courses and learning progress
                    </p>
                </motion.div>

                {enrollments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            textAlign: 'center', padding: '64px 24px',
                            background: 'var(--bg-elevated)',
                            borderRadius: 16, border: '1px solid var(--border)',
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <GraduationCap size={56} style={{ color: 'var(--text-muted)', opacity: 0.3, margin: '0 auto 16px', display: 'block' }} />
                        </motion.div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No courses yet</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24 }}>
                            Start your learning journey by enrolling in a course
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/courses" className="btn-primary" style={{ padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                Browse Courses <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {enrollments.map((enrollment) => {
                            const config = statusConfig[enrollment.status] || statusConfig.ACTIVE;
                            const StatusIcon = config.icon;

                            return (
                                <motion.div
                                    key={enrollment.id}
                                    variants={fadeInUp}
                                    className="card"
                                    style={{ padding: 0, overflow: 'hidden' }}
                                    whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(124,58,237,0.1)' }}
                                >
                                    <div style={{
                                        display: 'grid', gridTemplateColumns: '1fr',
                                        gap: 0,
                                    }}
                                    className="enrollment-card-grid"
                                    >
                                        {/* Course info */}
                                        <div style={{ padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: 60, height: 60, borderRadius: 12, flexShrink: 0,
                                                background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <BookOpen size={24} style={{ color: 'var(--primary)', opacity: 0.7 }} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#f0f0f8' }}>
                                                    {enrollment.course.title}
                                                </h3>
                                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                                                    {enrollment.course.category && (
                                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                            {enrollment.course.category}
                                                        </span>
                                                    )}
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Clock size={11} /> {enrollment.course.level}
                                                    </span>
                                                </div>

                                                {/* Status Badge */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                                    <span style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                                        padding: '4px 12px', borderRadius: 20,
                                                        background: config.bg,
                                                        color: config.color,
                                                        fontSize: 12, fontWeight: 600,
                                                        border: `1px solid ${config.color}30`,
                                                    }}>
                                                        <StatusIcon size={13} /> {config.label}
                                                    </span>
                                                    {enrollment.amount > 0 && (
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
                                                            ₹{enrollment.amount.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                                                {enrollment.status === 'ACTIVE' && (
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <Link
                                                            href={`/courses/${enrollment.course.id}`}
                                                            className="btn-primary"
                                                            style={{ padding: '8px 20px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
                                                        >
                                                            Continue Learning <ArrowRight size={14} />
                                                        </Link>
                                                    </motion.div>
                                                )}
                                                {enrollment.status === 'payment_pending' && (
                                                    <motion.button
                                                        onClick={() => handleCompletePayment(enrollment.course.title)}
                                                        style={{
                                                            padding: '8px 20px', borderRadius: 8,
                                                            background: '#25D366', color: 'white', border: 'none',
                                                            cursor: 'pointer', fontSize: 13, fontWeight: 600,
                                                            display: 'flex', alignItems: 'center', gap: 6,
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <MessageCircle size={14} /> Complete Payment
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Progress bar — only for active enrollments */}
                                        {enrollment.status === 'ACTIVE' && (
                                            <div style={{
                                                padding: '0 24px 16px',
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Progress</span>
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{Math.round(enrollment.progress)}%</span>
                                                </div>
                                                <div style={{ height: 4, borderRadius: 2, background: 'var(--bg)', overflow: 'hidden' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${enrollment.progress}%` }}
                                                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                                        style={{
                                                            height: '100%', borderRadius: 2,
                                                            background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </PageTransition>
    );
}
