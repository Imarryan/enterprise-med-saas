'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Users, BookOpen, CreditCard, TrendingUp, ArrowUpRight, ArrowRight, MessageCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const stats = [
    { label: 'Total Revenue', value: 1240000, prefix: '₹', display: '₹12.4L', change: '+18%', icon: CreditCard, color: '#7c3aed' },
    { label: 'Active Students', value: 3248, display: '3,248', change: '+12%', icon: Users, color: '#06b6d4' },
    { label: 'Total Courses', value: 24, display: '24', change: '+2', icon: BookOpen, color: '#10b981' },
    { label: 'Monthly Growth', value: 22, suffix: '%', display: '22%', change: '+4%', icon: TrendingUp, color: '#f59e0b' },
];

const recentPayments = [
    { name: 'Arjun Mehta', course: 'Advanced Cardiology', amount: '₹4,999', status: 'Success', date: '2 mins ago' },
    { name: 'Sneha Pillai', course: 'Emergency Medicine', amount: '₹3,499', status: 'Success', date: '14 mins ago' },
    { name: 'Vikram Singh', course: 'Neurology Advanced', amount: '₹5,999', status: 'Pending', date: '1 hr ago' },
    { name: 'Asha Reddy', course: 'Advanced Cardiology', amount: '₹4,999', status: 'Success', date: '3 hrs ago' },
];

const statusColors: Record<string, string> = {
    Success: '#10b981',
    Pending: '#f59e0b',
    Failed: '#ef4444',
    ACTIVE: '#10b981',
    payment_pending: '#f59e0b',
    cancelled: '#ef4444',
};

const statusLabels: Record<string, string> = {
    ACTIVE: 'Confirmed',
    payment_pending: 'Payment Pending',
    cancelled: 'Cancelled',
};

interface Enrollment {
    id: string;
    status: string;
    amount: number;
    createdAt: string;
    user: { id: string; name: string | null; email: string; phone: string | null };
    course: { id: string; title: string; slug: string; price: number };
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'enrollments'>('overview');
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchEnrollments = async () => {
        setLoadingEnrollments(true);
        try {
            const res = await fetch('/api/admin/enrollments');
            if (res.ok) {
                const data = await res.json();
                setEnrollments(data.enrollments || []);
            }
        } catch (err) {
            console.error('Failed to fetch enrollments:', err);
        } finally {
            setLoadingEnrollments(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'enrollments') {
            fetchEnrollments();
        }
    }, [activeTab]);

    const updateStatus = async (enrollmentId: string, status: string) => {
        setUpdatingId(enrollmentId);
        try {
            const res = await fetch(`/api/enrollments/${enrollmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setEnrollments(prev =>
                    prev.map(e => e.id === enrollmentId ? { ...e, status } : e)
                );
            }
        } catch (err) {
            console.error('Status update failed:', err);
        } finally {
            setUpdatingId(null);
        }
    };

    const whatsAppStudent = (phone: string | null, name: string | null) => {
        const num = phone?.replace(/[^0-9]/g, '') || '';
        const message = encodeURIComponent(
            `Hi ${name || 'Student'}, this is MedLearnPro admin. Regarding your enrollment...`
        );
        window.open(`https://wa.me/${num}?text=${message}`, '_blank');
    };

    return (
        <PageTransition>
            <div style={{ maxWidth: 1100 }}>
                <motion.div
                    style={{ marginBottom: 24 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Admin Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Here&apos;s what&apos;s happening with MedLearnPro today.</p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'var(--bg-elevated)', borderRadius: 12, padding: 4, width: 'fit-content' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {[
                        { id: 'overview' as const, label: 'Overview' },
                        { id: 'enrollments' as const, label: 'Enrollments' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                                fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' ? (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Stats */}
                            <motion.div
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="admin-stats-grid"
                            >
                                {stats.map(({ label, display, change, icon: Icon, color }) => (
                                    <motion.div
                                        key={label}
                                        className="card"
                                        style={{ padding: '20px 24px' }}
                                        variants={scaleIn}
                                        whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}15` }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                            <motion.div
                                                style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                whileHover={{ rotate: 360, scale: 1.15 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Icon size={18} color={color} />
                                            </motion.div>
                                            <motion.span
                                                style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 600, color: '#10b981' }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                <ArrowUpRight size={12} />{change}
                                            </motion.span>
                                        </div>
                                        <motion.div
                                            style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3, type: 'spring' }}
                                        >
                                            {display}
                                        </motion.div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Recent Payments */}
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ fontSize: 17, fontWeight: 700 }}>Recent Payments</h2>
                                    <Link href="/admin/payments" style={{ color: 'var(--primary-light)', fontSize: 13, textDecoration: 'none', display: 'flex', gap: 4, alignItems: 'center' }}>
                                        View all <ArrowRight size={13} />
                                    </Link>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                                {['Student', 'Course', 'Amount', 'Status', 'Time'].map((h) => (
                                                    <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentPayments.map((p, i) => (
                                                <motion.tr
                                                    key={i}
                                                    style={{ borderBottom: i < recentPayments.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.2s' }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + i * 0.08 }}
                                                    whileHover={{ backgroundColor: 'var(--bg-elevated)' }}
                                                >
                                                    <td style={{ padding: '16px 24px', fontWeight: 600, fontSize: 14 }}>{p.name}</td>
                                                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: 14 }}>{p.course}</td>
                                                    <td style={{ padding: '16px 24px', fontWeight: 700, fontSize: 14 }}>{p.amount}</td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <span
                                                            className={p.status === 'Pending' ? 'animate-pending' : ''}
                                                            style={{
                                                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                                                padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                                                                background: `${statusColors[p.status]}18`,
                                                                color: statusColors[p.status],
                                                                border: `1px solid ${statusColors[p.status]}40`,
                                                            }}
                                                        >
                                                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColors[p.status] }} />
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: 13 }}>{p.date}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="enrollments"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <motion.div
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--border)' }}>
                                    <h2 style={{ fontSize: 17, fontWeight: 700 }}>Enrollment Management</h2>
                                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
                                        Confirm payments and manage student enrollments
                                    </p>
                                </div>

                                {loadingEnrollments ? (
                                    <div style={{ padding: 48, textAlign: 'center' }}>
                                        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto' }} />
                                    </div>
                                ) : enrollments.length === 0 ? (
                                    <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No enrollments found
                                    </div>
                                ) : (
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                                    {['Student', 'Email', 'Course', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {enrollments.map((enrollment, i) => (
                                                    <motion.tr
                                                        key={enrollment.id}
                                                        style={{
                                                            borderBottom: i < enrollments.length - 1 ? '1px solid var(--border)' : 'none',
                                                            transition: 'background 0.2s',
                                                        }}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.03 }}
                                                        whileHover={{ backgroundColor: 'var(--bg-elevated)' }}
                                                    >
                                                        <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                                                            {enrollment.user.name || 'Unknown'}
                                                        </td>
                                                        <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>
                                                            {enrollment.user.email}
                                                        </td>
                                                        <td style={{ padding: '14px 16px', fontSize: 13, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {enrollment.course.title}
                                                        </td>
                                                        <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: 13 }}>
                                                            ₹{enrollment.amount.toLocaleString()}
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span style={{
                                                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                                                padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                                                                background: `${statusColors[enrollment.status] || '#666'}18`,
                                                                color: statusColors[enrollment.status] || '#666',
                                                                border: `1px solid ${statusColors[enrollment.status] || '#666'}30`,
                                                                whiteSpace: 'nowrap',
                                                            }}>
                                                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColors[enrollment.status] || '#666' }} />
                                                                {statusLabels[enrollment.status] || enrollment.status}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
                                                            {new Date(enrollment.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
                                                                {enrollment.status === 'payment_pending' && (
                                                                    <motion.button
                                                                        onClick={() => updateStatus(enrollment.id, 'ACTIVE')}
                                                                        disabled={updatingId === enrollment.id}
                                                                        style={{
                                                                            padding: '5px 10px', borderRadius: 6,
                                                                            background: 'rgba(16,185,129,0.12)', color: '#10b981',
                                                                            border: '1px solid rgba(16,185,129,0.3)',
                                                                            fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                                                            display: 'flex', alignItems: 'center', gap: 4,
                                                                            whiteSpace: 'nowrap',
                                                                        }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        {updatingId === enrollment.id ? <Loader2 size={11} className="animate-spin" /> : <CheckCircle size={11} />}
                                                                        Confirm
                                                                    </motion.button>
                                                                )}
                                                                {enrollment.status !== 'cancelled' && (
                                                                    <motion.button
                                                                        onClick={() => updateStatus(enrollment.id, 'cancelled')}
                                                                        disabled={updatingId === enrollment.id}
                                                                        style={{
                                                                            padding: '5px 10px', borderRadius: 6,
                                                                            background: 'rgba(239,68,68,0.08)', color: '#ef4444',
                                                                            border: '1px solid rgba(239,68,68,0.2)',
                                                                            fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                                                            display: 'flex', alignItems: 'center', gap: 4,
                                                                            whiteSpace: 'nowrap',
                                                                        }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        <XCircle size={11} /> Cancel
                                                                    </motion.button>
                                                                )}
                                                                {enrollment.user.phone && (
                                                                    <motion.button
                                                                        onClick={() => whatsAppStudent(enrollment.user.phone, enrollment.user.name)}
                                                                        style={{
                                                                            padding: '5px 10px', borderRadius: 6,
                                                                            background: 'rgba(37,211,102,0.1)', color: '#25D366',
                                                                            border: '1px solid rgba(37,211,102,0.3)',
                                                                            fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                                                            display: 'flex', alignItems: 'center', gap: 4,
                                                                            whiteSpace: 'nowrap',
                                                                        }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        <MessageCircle size={11} /> WhatsApp
                                                                    </motion.button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <style>{`
                    @media (max-width: 768px) {
                        .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    }
                    @media (max-width: 480px) {
                        .admin-stats-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </div>
        </PageTransition>
    );
}
