'use client';

import Link from 'next/link';
import { Users, BookOpen, CreditCard, TrendingUp, ArrowUpRight, ArrowRight } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: '₹12.4L', change: '+18%', icon: CreditCard, color: '#7c3aed' },
    { label: 'Active Students', value: '3,248', change: '+12%', icon: Users, color: '#06b6d4' },
    { label: 'Total Courses', value: '24', change: '+2', icon: BookOpen, color: '#10b981' },
    { label: 'Monthly Growth', value: '22%', change: '+4%', icon: TrendingUp, color: '#f59e0b' },
];

const recentPayments = [
    { name: 'Dr. Arjun Mehta', course: 'Advanced Cardiology', amount: '₹4,999', status: 'Success', date: '2 mins ago' },
    { name: 'Dr. Sneha Pillai', course: 'Emergency Medicine', amount: '₹3,499', status: 'Success', date: '14 mins ago' },
    { name: 'Dr. Vikram Singh', course: 'Neurology Advanced', amount: '₹5,999', status: 'Pending', date: '1 hr ago' },
    { name: 'Dr. Asha Reddy', course: 'Advanced Cardiology', amount: '₹4,999', status: 'Success', date: '3 hrs ago' },
];

const statusColors: Record<string, string> = {
    Success: '#10b981',
    Pending: '#f59e0b',
    Failed: '#ef4444',
};

export default function AdminPage() {
    return (
        <div style={{ maxWidth: 1100 }}>
            <div style={{ marginBottom: 36 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Admin Overview</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here&apos;s what&apos;s happening with MedLearnPro today.</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
                {stats.map(({ label, value, change, icon: Icon, color }) => (
                    <div key={label} className="card" style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon size={18} color={color} />
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 600, color: '#10b981' }}>
                                <ArrowUpRight size={12} />{change}
                            </span>
                        </div>
                        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{value}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Payments */}
            <div className="card">
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
                                <tr key={i} style={{ borderBottom: i < recentPayments.length - 1 ? '1px solid var(--border)' : 'none' }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                                    <td style={{ padding: '16px 24px', fontWeight: 600, fontSize: 14 }}>{p.name}</td>
                                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: 14 }}>{p.course}</td>
                                    <td style={{ padding: '16px 24px', fontWeight: 700, fontSize: 14 }}>{p.amount}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 5,
                                            padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                                            background: `${statusColors[p.status]}18`,
                                            color: statusColors[p.status],
                                            border: `1px solid ${statusColors[p.status]}40`,
                                        }}>
                                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColors[p.status] }} />
                                            {p.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: 13 }}>{p.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
