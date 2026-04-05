'use client';

import Link from 'next/link';
import { BookOpen, Award, Clock, TrendingUp, Play, ArrowRight } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

const stats = [
    { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: '#7c3aed' },
    { label: 'Certificates Earned', value: '1', icon: Award, color: '#06b6d4' },
    { label: 'Hours Watched', value: '24h', icon: Clock, color: '#10b981' },
    { label: 'Avg. Progress', value: '68%', icon: TrendingUp, color: '#f59e0b' },
];

const enrolledCourses = [
    { id: 1, title: 'Advanced Cardiology for Practitioners', progress: 72, instructor: 'Dr. Priya Sharma', lastWatched: '2h ago' },
    { id: 2, title: 'Emergency Medicine & Critical Care', progress: 45, instructor: 'Dr. Rahul Gupta', lastWatched: '1d ago' },
    { id: 3, title: 'Neurology: From Basics to Advanced', progress: 18, instructor: 'Dr. Meera Iyer', lastWatched: '3d ago' },
];

export default function DashboardPage() {
    return (
        <div className="max-w-[1100px]">
            {/* Header */}
            <div className="mb-9">
                <h1 className="text-[28px] font-extrabold mb-1.5">Welcome back, Doctor! 👋</h1>
                <p className="text-[var(--text-secondary)]">You&apos;re making great progress. Keep it up!</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            {/* My Courses */}
            <div className="card mb-7">
                <div className="p-6 md:px-7 border-b border-[var(--border)] flex justify-between items-center">
                    <h2 className="text-lg font-bold">Continue Learning</h2>
                    <Link href="/dashboard/courses" className="text-[var(--primary-light)] text-[13px] no-underline flex gap-1 items-center">
                        All courses <ArrowRight size={13} />
                    </Link>
                </div>
                <div className="p-2">
                    {enrolledCourses.map((course) => (
                        <Link key={course.id} href={`/courses/${course.id}/learn`} className="flex items-center gap-4 px-5 py-4 rounded-[10px] no-underline transition-colors duration-200 hover:bg-[var(--bg-elevated)]">
                            {/* Thumbnail placeholder */}
                            <div className="w-[52px] h-[52px] rounded-[10px] shrink-0 bg-gradient-to-br from-[#7c3aed4d] to-[#06b6d433] flex items-center justify-center">
                                <BookOpen size={22} color="#9f5cf7" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm mb-1 text-[#f0f0f8] whitespace-nowrap overflow-hidden text-ellipsis">
                                    {course.title}
                                </div>
                                <div className="text-xs text-[var(--text-muted)] mb-2">
                                    {course.instructor} · Last watched {course.lastWatched}
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="flex-1 h-1.5 bg-[var(--bg-elevated)] rounded-full">
                                        <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" style={{ width: `${course.progress}%` }} />
                                    </div>
                                    <span className="text-[11px] text-[var(--text-muted)] shrink-0">{course.progress}%</span>
                                </div>
                            </div>

                            <div className="btn-primary px-3.5 py-2 text-xs shrink-0">
                                <Play size={12} /> Resume
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
