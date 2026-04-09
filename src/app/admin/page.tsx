'use client';

import Link from 'next/link';
import { Users, BookOpen, CreditCard, TrendingUp, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
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
};

export default function AdminPage() {
    return (
        <PageTransition>
            <div style={{ maxWidth: 1100 }}>
                <motion.div
                    style={{ marginBottom: 36 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Admin Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Here&apos;s what&apos;s happening with MedLearnPro today.</p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
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
            </div>
        </PageTransition>
    );
}
