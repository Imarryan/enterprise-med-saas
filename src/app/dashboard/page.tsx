'use client';

import Link from 'next/link';
import { BookOpen, Award, Clock, TrendingUp, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const stats = [
    { label: 'Courses Enrolled', value: 3, icon: BookOpen, color: '#7c3aed' },
    { label: 'Certificates Earned', value: 1, icon: Award, color: '#06b6d4' },
    { label: 'Hours Watched', value: 24, suffix: 'h', icon: Clock, color: '#10b981' },
    { label: 'Avg. Progress', value: 68, suffix: '%', icon: TrendingUp, color: '#f59e0b' },
];

const enrolledCourses = [
    { id: 1, title: 'Advanced Cardiology for Practitioners', progress: 72, instructor: 'Priya Sharma', lastWatched: '2h ago' },
    { id: 2, title: 'Emergency Medicine & Critical Care', progress: 45, instructor: 'Rahul Gupta', lastWatched: '1d ago' },
    { id: 3, title: 'Neurology: From Basics to Advanced', progress: 18, instructor: 'Meera Iyer', lastWatched: '3d ago' },
];

export default function DashboardPage() {
    return (
        <PageTransition>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                {/* Header */}
                <motion.div
                    style={{ marginBottom: 36 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', fontWeight: 800, marginBottom: 6 }}>
                        Welcome back! 👋
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                        You&apos;re making great progress. Keep it up!
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'clamp(10px, 2vw, 16px)',
                        marginBottom: 40,
                    }}
                    className="stats-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {stats.map(({ label, value, suffix, icon: Icon, color }) => (
                        <motion.div
                            key={label}
                            className="card p-5 lg:p-6 flex flex-col gap-3"
                            variants={scaleIn}
                            whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}15` }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="text-[28px] font-extrabold leading-none">
                                    <AnimatedCounter end={value} suffix={suffix || ''} duration={2} />
                                </div>
                                <motion.div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                                    style={{ background: `${color}18` }}
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Icon size={18} color={color} />
                                </motion.div>
                            </div>
                            <div className="text-[var(--text-secondary)] text-[13px]">{label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* My Courses */}
                <motion.div
                    className="card mb-7"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="p-6 md:px-7 border-b border-[var(--border)] flex justify-between items-center">
                        <h2 className="text-lg font-bold">Continue Learning</h2>
                        <Link href="/dashboard/courses" className="text-[var(--primary-light)] text-[13px] no-underline flex gap-1 items-center">
                            All courses <ArrowRight size={13} />
                        </Link>
                    </div>
                    <div className="p-2">
                        {enrolledCourses.map((course, i) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                <Link href={`/courses/${course.id}/learn`} className="flex items-center gap-4 px-5 py-4 rounded-[10px] no-underline transition-colors duration-200 hover:bg-[var(--bg-elevated)]">
                                    <motion.div
                                        className="w-[52px] h-[52px] rounded-[10px] shrink-0 bg-gradient-to-br from-[#7c3aed4d] to-[#06b6d433] flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <BookOpen size={22} color="#9f5cf7" />
                                    </motion.div>

                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm mb-1 text-[#f0f0f8] whitespace-nowrap overflow-hidden text-ellipsis">
                                            {course.title}
                                        </div>
                                        <div className="text-xs text-[var(--text-muted)] mb-2">
                                            {course.instructor} · Last watched {course.lastWatched}
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex-1 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${course.progress}%` }}
                                                    transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: 'easeOut' }}
                                                />
                                            </div>
                                            <span className="text-[11px] text-[var(--text-muted)] shrink-0">{course.progress}%</span>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="btn-primary px-3.5 py-2 text-xs shrink-0"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.93 }}
                                    >
                                        <Play size={12} /> Resume
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
