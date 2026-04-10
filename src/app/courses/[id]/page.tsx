'use client';

import Link from 'next/link';
import { Play, CheckCircle, Clock, Award, Star, Users, ArrowLeft, MessageCircle, Lock, Bell, Calendar } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseModal from '@/components/PurchaseModal';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const coursesData: Record<string, {
  title: string; instructor: string; initials: string; role: string;
  price: number; originalPrice: number; rating: number; reviews: number;
  students: number; duration: string; category: string; tag: string;
  description: string; comingSoon?: boolean; launchDate?: string;
}> = {
  '1': { title: 'Advanced Cardiology for Practitioners', instructor: 'Priya Sharma', initials: 'PS', role: 'Senior Cardiology Instructor', price: 4999, originalPrice: 9999, rating: 4.9, reviews: 1245, students: 8200, duration: '42 Hours', category: 'Cardiology', tag: 'Bestseller', description: 'Master the latest ECG interpretation techniques, echocardiogram reads, and heart failure management protocols.' },
  '2': { title: 'Emergency Medicine & Critical Care', instructor: 'Rahul Gupta', initials: 'RG', role: 'Lead Emergency Medicine Instructor', price: 3499, originalPrice: 7999, rating: 4.8, reviews: 890, students: 5600, duration: '35 Hours', category: 'Emergency', tag: 'New', description: 'Comprehensive training in emergency triage, trauma management, and ICU critical care protocols.' },
  '3': { title: 'Neurology: From Basics to Advanced', instructor: 'Meera Iyer', initials: 'MI', role: 'Neurosciences Instructor', price: 5999, originalPrice: 11999, rating: 4.9, reviews: 678, students: 3100, duration: '58 Hours', category: 'Neurology', tag: 'Top Rated', description: 'Deep dive into neurological disorders, neuro-imaging, and latest treatment modalities for common neurological conditions.' },
  '4': { title: 'Pediatric Infectious Diseases', instructor: 'Anil Kumar', initials: 'AK', role: 'Pediatrics Instructor', price: 2999, originalPrice: 5999, rating: 4.7, reviews: 560, students: 4200, duration: '24 Hours', category: 'Pediatrics', tag: '', description: 'Evidence-based approach to diagnosing and managing common and rare infectious diseases in children.' },
  '5': { title: 'Fundamentals of Clinical Radiology', instructor: 'Sarah Johnson', initials: 'SJ', role: 'Lead Radiology Instructor', price: 3999, originalPrice: 8999, rating: 4.8, reviews: 920, students: 6500, duration: '40 Hours', category: 'Radiology', tag: 'Popular', description: 'Learn to interpret X-rays, CT scans, MRI, and ultrasound findings across all body systems.' },
  '6': { title: 'Surgical Skills Practicum', instructor: 'Rajesh Singh', initials: 'RS', role: 'Surgery Instructor', price: 7999, originalPrice: 14999, rating: 5.0, reviews: 340, students: 1200, duration: '60 Hours', category: 'Surgery', tag: 'Premium', description: 'Hands-on training covering suturing techniques, laparoscopic skills, and surgical anatomy.' },
  'cs-1': { title: 'Advanced Robotics AI', instructor: 'Dr. Vikram Patel', initials: 'VP', role: 'AI & Robotics Lead', price: 6999, originalPrice: 12999, rating: 0, reviews: 0, students: 0, duration: '45 Hours', category: 'AI & Robotics', tag: '', description: 'Explore the cutting edge of AI-driven robotics in medical applications, surgical automation, and intelligent diagnostic systems.', comingSoon: true, launchDate: 'July 2026' },
  'cs-2': { title: 'AI in Healthcare', instructor: 'Dr. Ananya Rao', initials: 'AR', role: 'Healthcare AI Researcher', price: 5499, originalPrice: 10999, rating: 0, reviews: 0, students: 0, duration: '38 Hours', category: 'AI & Healthcare', tag: '', description: 'Learn how artificial intelligence is transforming diagnostics, drug discovery, patient care, and medical imaging.', comingSoon: true, launchDate: 'August 2026' },
  'cs-3': { title: 'Generative AI Masterclass', instructor: 'Dr. Kiran Desai', initials: 'KD', role: 'Generative AI Expert', price: 8999, originalPrice: 16999, rating: 0, reviews: 0, students: 0, duration: '55 Hours', category: 'AI', tag: '', description: 'Master generative AI technologies including LLMs, diffusion models, and their applications in medical research and clinical practice.', comingSoon: true, launchDate: 'September 2026' },
};

const curriculum = [
  { title: 'Module 1: Foundations & Assessments', duration: '4:20:00', topics: 8 },
  { title: 'Module 2: Core Clinical Concepts', duration: '6:15:00', topics: 12 },
  { title: 'Module 3: Advanced Protocols', duration: '8:45:00', topics: 15 },
  { title: 'Module 4: Case Studies & Practicals', duration: '10:30:00', topics: 18 },
];

const learnings = [
  'Advanced assessment and diagnosis techniques',
  'Evidence-based management protocols',
  'Latest international guidelines and standards',
  'Pharmacological and non-pharmacological interventions',
  'Emergency and critical care management',
  'Post-treatment care and rehabilitation',
];

function CountdownTimer({ launchDate }: { launchDate: string }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(launchDate + ' 1, 2026').getTime();
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = target - now;
            if (diff <= 0) { clearInterval(interval); return; }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [launchDate]);

    return (
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
            ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                    <motion.div
                        key={value}
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            width: 56, height: 56, borderRadius: 12,
                            background: 'rgba(124,58,237,0.12)',
                            border: '1px solid rgba(124,58,237,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, fontWeight: 800, color: '#f0f0f8',
                        }}
                    >
                        {String(value).padStart(2, '0')}
                    </motion.div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4, display: 'block' }}>{label}</span>
                </div>
            ))}
        </div>
    );
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { status } = useSession();
  const id = (params?.id as string) || '1';
  const course = coursesData[id] || coursesData['1'];
  const [showPurchase, setShowPurchase] = useState(false);

  const isComingSoon = course.comingSoon;
  const discount = course.originalPrice - course.price;
  const discountPercent = Math.round((discount / course.originalPrice) * 100);

  const handleBuyNow = () => {
      if (status !== 'authenticated') {
          router.push(`/auth/login?callbackUrl=/courses/${id}`);
          return;
      }
      setShowPurchase(true);
  };

  const handleNotifyMe = () => {
      const message = encodeURIComponent(
          `Hi! I want to be notified when *${course.title}* launches! 🚀`
      );
      window.open(`https://wa.me/919981891051?text=${message}`, '_blank');
  };

  return (
    <PageTransition>
      <div style={{ paddingTop: 72, paddingBottom: 100 }}>

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
          padding: 'clamp(32px, 5vw, 64px) 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background animation */}
          <motion.div
            style={{
              position: 'absolute', top: -100, right: -100,
              width: 400, height: 400, borderRadius: '50%',
              background: isComingSoon
                ? 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link href="/courses" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14,
                marginBottom: 24, transition: 'color 0.2s',
              }}>
                <ArrowLeft size={16} /> Back to Courses
              </Link>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="course-hero-grid">
              <div>
                {/* Coming Soon Banner */}
                {isComingSoon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 20px', borderRadius: 20, marginBottom: 16,
                            background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.1))',
                            border: '1px solid rgba(245,158,11,0.3)',
                        }}
                    >
                        <Lock size={14} color="#f59e0b" />
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Coming Soon
                        </span>
                    </motion.div>
                )}

                <motion.div
                  style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {course.tag && <span className="badge badge-primary">{course.tag}</span>}
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{course.category}</span>
                  {isComingSoon && course.launchDate && (
                      <span className="badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
                          <Calendar size={12} style={{ marginRight: 4 }} />
                          Expected: {course.launchDate}
                      </span>
                  )}
                </motion.div>

                <motion.h1
                  style={{
                    fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800,
                    color: 'white', marginBottom: 16, lineHeight: 1.2,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {course.title}
                </motion.h1>

                <motion.p
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6, marginBottom: 24, maxWidth: 600 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {course.description}
                </motion.p>

                {!isComingSoon && (
                    <motion.div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b', fontWeight: 600 }}>
                        <Star size={16} className="fill-amber-500 text-amber-500" /> {course.rating} ({course.reviews.toLocaleString()} reviews)
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)' }}>
                        <Users size={16} /> {course.students.toLocaleString()} Students
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)' }}>
                        <Clock size={16} /> {course.duration}
                      </span>
                    </motion.div>
                )}

                <motion.div
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'var(--primary)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, color: 'white', fontSize: 14,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >{course.initials}</motion.div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>{course.instructor}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{course.role}</div>
                  </div>
                </motion.div>
              </div>

              {/* Pricing Card / Coming Soon Card */}
              <motion.div
                className="card"
                style={{ padding: 'clamp(20px, 4vw, 32px)', background: 'var(--bg-elevated)' }}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
              >
                {isComingSoon ? (
                    /* Coming Soon Card */
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            style={{
                                width: '100%', height: 160,
                                background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(124,58,237,0.1))',
                                borderRadius: 12, marginBottom: 24,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexDirection: 'column', gap: 8,
                            }}
                        >
                            <Lock size={40} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                            <span style={{ fontSize: 18, fontWeight: 800, color: '#f59e0b' }}>COMING SOON</span>
                        </motion.div>

                        {course.launchDate && (
                            <div style={{ marginBottom: 24 }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    Launching In
                                </p>
                                <CountdownTimer launchDate={course.launchDate} />
                            </div>
                        )}

                        <motion.div
                            style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 24, justifyContent: 'center' }}
                        >
                            <span style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: 'var(--text-muted)' }}>₹{course.price.toLocaleString()}</span>
                            <span style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'line-through', paddingBottom: 4, opacity: 0.6 }}>₹{course.originalPrice.toLocaleString()}</span>
                        </motion.div>

                        <motion.button
                            onClick={handleNotifyMe}
                            style={{
                                width: '100%', padding: '14px 0', borderRadius: 12,
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                color: 'white', border: 'none', cursor: 'pointer',
                                fontSize: 15, fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                minHeight: 48, marginBottom: 12,
                            }}
                            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(124,58,237,0.3)' }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Bell size={18} /> Notify Me on WhatsApp
                        </motion.button>

                        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 12 }}>
                            We&apos;ll notify you as soon as this course launches!
                        </p>
                    </div>
                ) : (
                    /* Normal Pricing Card */
                    <>
                        <motion.div
                          style={{
                            width: '100%', height: 180, background: 'rgba(124,58,237,0.1)',
                            borderRadius: 12, marginBottom: 24,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', cursor: 'pointer',
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Play size={48} style={{ color: 'var(--primary)', opacity: 0.8 }} />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 8 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <span style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800 }}>₹{course.price.toLocaleString()}</span>
                          <span style={{ fontSize: 16, color: 'var(--text-muted)', textDecoration: 'line-through', paddingBottom: 4 }}>₹{course.originalPrice.toLocaleString()}</span>
                        </motion.div>

                        {discountPercent > 0 && (
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '4px 12px', borderRadius: 6, marginBottom: 20,
                                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                            }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>
                                    🎉 You save ₹{discount.toLocaleString()} ({discountPercent}% off)
                                </span>
                            </div>
                        )}

                        <motion.button
                          onClick={handleBuyNow}
                          className="btn-primary"
                          style={{
                            width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 15, marginBottom: 12,
                            minHeight: 48, display: 'flex', border: 'none', cursor: 'pointer',
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Buy Now — ₹{course.price.toLocaleString()}
                        </motion.button>

                        <motion.button
                          onClick={handleBuyNow}
                          className="btn-outline"
                          style={{
                            width: '100%', justifyContent: 'center', padding: '14px 0', fontSize: 15,
                            display: 'flex', alignItems: 'center', gap: 8, minHeight: 48,
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <MessageCircle size={18} /> Pay via WhatsApp
                        </motion.button>

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, marginTop: 16 }}>
                          30-Day Money-Back Guarantee
                        </p>
                    </>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section style={{ padding: 'clamp(32px, 5vw, 64px) 0' }}>
          <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }} className="course-content-grid">
              <div>
                <AnimatedSection variants={fadeInLeft}>
                  <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, marginBottom: 24 }}>What you&apos;ll learn</h2>
                </AnimatedSection>
                <motion.div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {learnings.map((item, i) => (
                    <motion.div
                      key={i}
                      style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                      variants={fadeInUp}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring' }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle size={20} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                      </motion.div>
                      <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <AnimatedSection variants={fadeInLeft}>
                  <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, marginBottom: 24 }}>Course Curriculum</h2>
                </AnimatedSection>
                <motion.div
                  className="card"
                  style={{ overflow: 'hidden' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {curriculum.map((mod, i) => (
                    <motion.div
                      key={i}
                      style={{
                        padding: '16px 20px',
                        borderBottom: i < curriculum.length - 1 ? '1px solid var(--border)' : 'none',
                        background: i === 0 ? 'var(--bg-elevated)' : 'transparent',
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                        cursor: 'pointer',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ background: 'var(--bg-elevated)', x: 4 }}
                    >
                      <h3 style={{ fontWeight: 600, fontSize: 15 }}>{mod.title}</h3>
                      <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)', fontSize: 13 }}>
                        <span>{mod.topics} lectures</span>
                        <span>{mod.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <AnimatedSection variants={fadeInRight}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>This course includes:</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { icon: Play, text: `${course.duration} on-demand video`, color: '#06b6d4' },
                      { icon: Award, text: '15 CME credits', color: '#7c3aed' },
                      { icon: Star, text: 'Certificate of completion', color: '#f59e0b' },
                      { icon: Users, text: 'Access to learner community', color: '#10b981' },
                    ].map(({ icon: Icon, text, color }, i) => (
                      <motion.div
                        key={i}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 15 }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          <Icon size={20} style={{ color, flexShrink: 0 }} />
                        </motion.div>
                        {text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Purchase Modal */}
        <PurchaseModal
            course={{
                id: id,
                title: course.title,
                instructor: course.instructor,
                price: course.price,
                originalPrice: course.originalPrice,
                duration: course.duration,
                level: course.category,
            }}
            isOpen={showPurchase}
            onClose={() => setShowPurchase(false)}
        />

        <style>{`
          @media (min-width: 1024px) {
            .course-hero-grid { grid-template-columns: 1fr 380px !important; align-items: start; }
            .course-content-grid { grid-template-columns: 1fr 320px !important; }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
