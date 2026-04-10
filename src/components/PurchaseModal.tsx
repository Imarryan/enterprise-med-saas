'use client';

import { useState } from 'react';
import { X, MessageCircle, ShoppingCart, Clock, Award, BookOpen, CheckCircle, Loader2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CourseInfo {
    id: string | number;
    title: string;
    instructor?: string;
    price: number;
    originalPrice: number;
    duration?: string;
    level?: string;
    category?: string;
}

interface PurchaseModalProps {
    course: CourseInfo;
    isOpen: boolean;
    onClose: () => void;
}

export default function PurchaseModal({ course, isOpen, onClose }: PurchaseModalProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [enrolling, setEnrolling] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    const isFree = course.price === 0;
    const discount = course.originalPrice - course.price;
    const discountPercent = Math.round((discount / course.originalPrice) * 100);

    const handleWhatsAppPurchase = async () => {
        if (status !== 'authenticated') {
            router.push(`/auth/login?callbackUrl=/courses/${course.id}`);
            onClose();
            return;
        }

        setEnrolling(true);
        try {
            // Save enrollment with payment_pending
            await fetch('/api/enrollments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: String(course.id),
                    status: 'payment_pending',
                }),
            });

            // Open WhatsApp
            const message = encodeURIComponent(
                `Hi! I want to purchase *${course.title}*\n\n` +
                `💰 Price: ₹${course.price.toLocaleString()}\n` +
                `👤 Name: ${session?.user?.name || 'Student'}\n` +
                `📧 Email: ${session?.user?.email || ''}\n\n` +
                `Please confirm my enrollment! 🙏`
            );
            window.open(`https://wa.me/919981891051?text=${message}`, '_blank');
            setEnrolled(true);
        } catch (err) {
            console.error('Enrollment error:', err);
        } finally {
            setEnrolling(false);
        }
    };

    const handleFreeEnroll = async () => {
        if (status !== 'authenticated') {
            router.push(`/auth/login?callbackUrl=/courses/${course.id}`);
            onClose();
            return;
        }

        setEnrolling(true);
        try {
            await fetch('/api/enrollments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: String(course.id),
                }),
            });
            setEnrolled(true);
        } catch (err) {
            console.error('Enrollment error:', err);
        } finally {
            setEnrolling(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 16,
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.85, y: 60, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.85, y: 60, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                        style={{
                            width: '100%', maxWidth: 480,
                            background: 'var(--bg-card, #1a1a2e)',
                            border: '1px solid var(--border, rgba(255,255,255,0.1))',
                            borderRadius: 20,
                            overflow: 'hidden',
                            maxHeight: '90vh', overflowY: 'auto',
                        }}
                    >
                        {/* Header with gradient */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)',
                            padding: '24px 28px 20px',
                            borderBottom: '1px solid var(--border, rgba(255,255,255,0.1))',
                            position: 'relative',
                        }}>
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute', top: 16, right: 16,
                                    background: 'rgba(255,255,255,0.08)', border: 'none',
                                    borderRadius: 8, width: 32, height: 32,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: 'var(--text-muted, #888)',
                                }}
                            >
                                <X size={16} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <ShoppingCart size={20} style={{ color: 'var(--primary, #7c3aed)' }} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-light, #9f5cf7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {isFree ? 'Free Enrollment' : 'Purchase Course'}
                                </span>
                            </div>

                            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0f8', marginBottom: 6, paddingRight: 32 }}>
                                {course.title}
                            </h2>
                            {course.instructor && (
                                <p style={{ color: 'var(--text-secondary, #9090b0)', fontSize: 14 }}>
                                    By {course.instructor}
                                </p>
                            )}
                        </div>

                        {enrolled ? (
                            /* Success State */
                            <div style={{ padding: '48px 28px', textAlign: 'center' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    style={{
                                        width: 72, height: 72, borderRadius: '50%',
                                        background: 'rgba(16,185,129,0.12)',
                                        border: '2px solid rgba(16,185,129,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 20px',
                                    }}
                                >
                                    <CheckCircle size={36} color="#10b981" />
                                </motion.div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                                    {isFree ? 'Enrolled Successfully!' : 'Enrollment Initiated!'}
                                </h3>
                                <p style={{ color: 'var(--text-secondary, #9090b0)', fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
                                    {isFree
                                        ? 'You can now access this course from your dashboard.'
                                        : 'Complete your payment via WhatsApp to unlock the course. Check your dashboard for enrollment status.'}
                                </p>
                                <motion.button
                                    onClick={() => { onClose(); router.push('/my-courses'); }}
                                    className="btn-primary"
                                    style={{ padding: '12px 32px', width: '100%', justifyContent: 'center' }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Go to My Courses
                                </motion.button>
                            </div>
                        ) : (
                            /* Purchase State */
                            <div style={{ padding: '24px 28px 28px' }}>
                                {/* Price */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    marginBottom: 20, padding: '16px 20px',
                                    background: 'rgba(124,58,237,0.08)',
                                    borderRadius: 12, border: '1px solid rgba(124,58,237,0.15)',
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                                            <span style={{ fontSize: 32, fontWeight: 800, color: '#f0f0f8' }}>
                                                {isFree ? 'FREE' : `₹${course.price.toLocaleString()}`}
                                            </span>
                                            {!isFree && (
                                                <span style={{ fontSize: 16, color: 'var(--text-muted, #888)', textDecoration: 'line-through' }}>
                                                    ₹{course.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        {!isFree && discount > 0 && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                                <Tag size={13} color="#10b981" />
                                                <span style={{ fontSize: 13, fontWeight: 600, color: '#10b981' }}>
                                                    You save ₹{discount.toLocaleString()} ({discountPercent}% off)
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* What's included */}
                                <div style={{ marginBottom: 24 }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-secondary, #9090b0)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        What&apos;s Included
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {[
                                            { icon: BookOpen, text: `Full course access${course.level ? ` • ${course.level}` : ''}`, color: '#7c3aed' },
                                            { icon: Clock, text: course.duration ? `${course.duration} of content` : 'Self-paced learning', color: '#06b6d4' },
                                            { icon: Award, text: 'Certificate of completion', color: '#f59e0b' },
                                            { icon: MessageCircle, text: 'Priority WhatsApp support', color: '#10b981' },
                                        ].map(({ icon: Icon, text, color }, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.05 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary, #9090b0)' }}
                                            >
                                                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <Icon size={14} style={{ color }} />
                                                </div>
                                                {text}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {isFree ? (
                                        <motion.button
                                            onClick={handleFreeEnroll}
                                            disabled={enrolling}
                                            className="btn-primary"
                                            style={{
                                                width: '100%', padding: '14px', justifyContent: 'center',
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                fontSize: 15, fontWeight: 700,
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {enrolling ? <Loader2 size={18} className="animate-spin" /> : <BookOpen size={18} />}
                                            {enrolling ? 'Enrolling...' : 'Enroll Free'}
                                        </motion.button>
                                    ) : (
                                        <>
                                            <motion.button
                                                onClick={handleWhatsAppPurchase}
                                                disabled={enrolling}
                                                style={{
                                                    width: '100%', padding: '14px', borderRadius: 12,
                                                    background: '#25D366', color: 'white', border: 'none',
                                                    cursor: enrolling ? 'not-allowed' : 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                                    fontSize: 15, fontWeight: 700,
                                                    opacity: enrolling ? 0.7 : 1,
                                                    transition: 'all 0.2s',
                                                }}
                                                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(37,211,102,0.3)' }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                {enrolling ? (
                                                    <Loader2 size={18} className="animate-spin" />
                                                ) : (
                                                    <MessageCircle size={18} />
                                                )}
                                                {enrolling ? 'Processing...' : 'Buy Now — Pay via WhatsApp'}
                                            </motion.button>
                                            <motion.button
                                                onClick={handleFreeEnroll}
                                                disabled={enrolling}
                                                className="btn-outline"
                                                style={{
                                                    width: '100%', padding: '12px', justifyContent: 'center',
                                                    display: 'flex', alignItems: 'center', gap: 8,
                                                    fontSize: 14,
                                                }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <BookOpen size={16} />
                                                Enroll Now
                                            </motion.button>
                                        </>
                                    )}
                                </div>

                                <p style={{ textAlign: 'center', color: 'var(--text-muted, #666)', fontSize: 12, marginTop: 16 }}>
                                    🔒 Secure enrollment • 30-day money-back guarantee
                                </p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
