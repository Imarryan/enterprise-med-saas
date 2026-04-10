'use client';

import Link from 'next/link';
import { BookOpen, Star, Users, Clock, Play, Lock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PurchaseModal from '@/components/PurchaseModal';

interface Course {
    id: string | number;
    title: string;
    instructor: string;
    price: number;
    originalPrice: number;
    rating: number;
    students: number;
    duration: string;
    level: string;
    category?: string;
    tag?: string;
    comingSoon?: boolean;
    launchDate?: string;
}

export function CourseCard({ course, showCategory = true }: { course: Course; showCategory?: boolean }) {
    const [showPurchase, setShowPurchase] = useState(false);

    const handleEnrollClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (course.comingSoon) {
            // Open WhatsApp with notify me
            const message = encodeURIComponent(
                `Hi! I want to be notified when *${course.title}* launches! 🚀`
            );
            window.open(`https://wa.me/919981891051?text=${message}`, '_blank');
            return;
        }

        setShowPurchase(true);
    };

    const discount = course.originalPrice - course.price;
    const discountPercent = Math.round((discount / course.originalPrice) * 100);

    return (
        <>
            <Link href={course.comingSoon ? '#' : `/courses/${course.id}`} className="block h-full no-underline text-inherit rounded-xl group" onClick={course.comingSoon ? (e) => e.preventDefault() : undefined}>
                <motion.div
                    className="card h-full flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)]"
                    whileHover={{
                        y: -6,
                        boxShadow: course.comingSoon
                            ? '0 20px 60px rgba(255,255,255,0.05)'
                            : '0 20px 60px rgba(124,58,237,0.15)',
                        borderColor: course.comingSoon
                            ? 'rgba(255,255,255,0.15)'
                            : 'rgba(6,182,212,0.4)',
                    }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={course.comingSoon ? { opacity: 0.85 } : undefined}
                >
                    {/* Thumbnail */}
                    <div className="relative h-[180px] flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
                        <div style={{ opacity: course.comingSoon ? 0.08 : 0.15 }}>
                            {course.comingSoon ? <Lock size={48} className="text-white" /> : <BookOpen size={48} className="text-white" />}
                        </div>

                        {/* Coming Soon Overlay */}
                        {course.comingSoon && (
                            <>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'column', gap: 8,
                                }}>
                                    <Lock size={28} color="rgba(255,255,255,0.6)" />
                                    <span style={{
                                        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                        padding: '6px 16px', borderRadius: 20,
                                        fontSize: 13, fontWeight: 700, color: 'white',
                                        letterSpacing: '0.05em',
                                    }}>
                                        COMING SOON
                                    </span>
                                </div>
                                {/* Ribbon */}
                                <div style={{
                                    position: 'absolute', top: 14, right: -32,
                                    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                    padding: '4px 40px',
                                    transform: 'rotate(45deg)',
                                    fontSize: 10, fontWeight: 800, color: 'white',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                }}>
                                    SOON
                                </div>
                            </>
                        )}

                        {!course.comingSoon && course.tag && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.25 }}
                                className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white
                                    ${course.tag === 'Bestseller' ? 'bg-amber-500' : course.tag === 'New' ? 'bg-emerald-500' : 'bg-violet-600'}`}
                            >
                                {course.tag}
                            </motion.div>
                        )}

                        {/* Hover Play Overlay — not for coming soon */}
                        {!course.comingSoon && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-150 group-hover:bg-black/30">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                    <Play size={18} className="text-violet-600 ml-1" />
                                </div>
                            </div>
                        )}

                        {/* Shimmer effect on hover */}
                        {!course.comingSoon && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                        {showCategory && course.category && (
                            <div className="flex gap-2 mb-2">
                                <span className="badge bg-white/5 text-[var(--text-secondary)] px-2 py-0.5 text-[11px]">{course.category}</span>
                                <span className="badge bg-white/5 text-[var(--text-secondary)] px-2 py-0.5 text-[11px]">{course.level}</span>
                            </div>
                        )}

                        <h3 className="text-base font-bold mb-2 leading-tight text-[#f0f0f8]">{course.title}</h3>
                        <p className="text-[var(--text-secondary)] text-[13px] mb-4">By {course.instructor}</p>

                        <div className="flex gap-4 mb-5">
                            <span className="flex items-center gap-1 text-[13px] font-semibold text-amber-500">
                                <Star size={13} className="fill-amber-500" /> {course.rating}
                            </span>
                            <span className="flex items-center gap-1 text-[13px] text-[var(--text-muted)]">
                                <Users size={12} /> {course.students.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-[13px] text-[var(--text-muted)]">
                                <Clock size={12} /> {course.duration}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            {course.comingSoon ? (
                                <>
                                    <span style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                        {course.launchDate ? `Launching ${course.launchDate}` : 'Launching Soon'}
                                    </span>
                                    <motion.button
                                        onClick={handleEnrollClick}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '8px 16px', borderRadius: 8,
                                            background: 'rgba(124,58,237,0.15)',
                                            border: '1px solid rgba(124,58,237,0.3)',
                                            color: 'var(--primary-light, #9f5cf7)',
                                            fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                        }}
                                        whileHover={{ scale: 1.05, borderColor: 'rgba(124,58,237,0.6)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Bell size={14} /> Notify Me
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <span className="text-xl font-extrabold text-[#f0f0f8]">₹{course.price.toLocaleString()}</span>
                                        <span className="text-[13px] text-[var(--text-muted)] line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
                                        {discountPercent > 0 && (
                                            <span style={{
                                                marginLeft: 8, fontSize: 11, fontWeight: 700,
                                                color: '#10b981', background: 'rgba(16,185,129,0.1)',
                                                padding: '2px 6px', borderRadius: 4,
                                            }}>
                                                -{discountPercent}%
                                            </span>
                                        )}
                                    </div>
                                    <motion.button
                                        onClick={handleEnrollClick}
                                        className="btn-primary px-4 py-2 text-[13px]"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.93 }}
                                    >
                                        Enroll Now
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </Link>

            {/* Purchase Modal */}
            <PurchaseModal
                course={course}
                isOpen={showPurchase}
                onClose={() => setShowPurchase(false)}
            />
        </>
    );
}
