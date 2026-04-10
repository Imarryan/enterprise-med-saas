'use client';

import Link from 'next/link';
import { BookOpen, Play, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const enrolledCourses = [
    { id: 1, title: 'Advanced Cardiology for Practitioners', instructor: 'Priya Sharma', progress: 72, duration: '42 hours', lastWatched: '2 hours ago', category: 'Cardiology' },
    { id: 2, title: 'Emergency Medicine & Critical Care', instructor: 'Rahul Gupta', progress: 45, duration: '35 hours', lastWatched: '1 day ago', category: 'Emergency' },
    { id: 3, title: 'Neurology: From Basics to Advanced', instructor: 'Meera Iyer', progress: 18, duration: '58 hours', lastWatched: '3 days ago', category: 'Neurology' },
];

export default function DashboardCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

    const filtered = enrolledCourses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            filter === 'all' ? true :
            filter === 'completed' ? c.progress === 100 :
            c.progress < 100;
        return matchesSearch && matchesFilter;
    });

    return (
        <PageTransition>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <motion.div
                    style={{ marginBottom: 28 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 800, marginBottom: 6 }}>My Courses</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                        You&apos;re enrolled in {enrolledCourses.length} courses
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{
                        flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: 10,
                        background: 'var(--bg-elevated)', borderRadius: 10,
                        border: '1px solid var(--border)', padding: '0 14px',
                    }}>
                        <Search size={16} color="var(--text-muted)" />
                        <input
                            placeholder="Search your courses..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ background: 'transparent', border: 'none', outline: 'none', padding: '10px 0', fontSize: 14, color: 'var(--text-primary)', width: '100%', minHeight: 40 }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {(['all', 'in-progress', 'completed'] as const).map(f => (
                            <motion.button
                                key={f}
                                onClick={() => setFilter(f)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                                    fontSize: 13, fontWeight: 500, textTransform: 'capitalize',
                                    background: filter === f ? 'rgba(124,58,237,0.15)' : 'var(--bg-elevated)',
                                    color: filter === f ? 'var(--primary-light)' : 'var(--text-secondary)',
                                    borderWidth: 1, borderStyle: 'solid',
                                    borderColor: filter === f ? 'rgba(124,58,237,0.3)' : 'var(--border)',
                                }}
                            >
                                {f.replace('-', ' ')}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Course List */}
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            filtered.map((course) => (
                                <motion.div
                                    key={course.id}
                                    className="card"
                                    style={{ padding: 'clamp(16px, 3vw, 24px)', cursor: 'pointer' }}
                                    variants={fadeInUp}
                                    whileHover={{ y: -2, borderColor: 'rgba(124,58,237,0.3)' }}
                                >
                                    <Link href={`/courses/${course.id}/learn`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                        <motion.div
                                            style={{
                                                width: 64, height: 64, borderRadius: 12, flexShrink: 0,
                                                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.15))',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <BookOpen size={24} color="#9f5cf7" />
                                        </motion.div>
                                        <div style={{ flex: 1, minWidth: 200 }}>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f8', marginBottom: 4 }}>{course.title}</div>
                                            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
                                                {course.instructor} · {course.duration} · <span style={{ color: 'var(--primary-light)' }}>{course.category}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ flex: 1, height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                                                    <motion.div
                                                        style={{
                                                            height: '100%', borderRadius: 3,
                                                            background: course.progress === 100
                                                                ? 'linear-gradient(90deg, #10b981, #06b6d4)'
                                                                : 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                                                        }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${course.progress}%` }}
                                                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                                                    />
                                                </div>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', minWidth: 35 }}>{course.progress}%</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                            <motion.div
                                                className="btn-primary"
                                                style={{ padding: '8px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Play size={12} /> Resume
                                            </motion.div>
                                            <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Clock size={11} /> {course.lastWatched}
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="card"
                                style={{ padding: 48, textAlign: 'center' }}
                            >
                                <Search size={40} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 16px' }} />
                                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No courses found</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Try adjusting your search or filters.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </PageTransition>
    );
}
