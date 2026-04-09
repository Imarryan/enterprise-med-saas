'use client';

import Link from 'next/link';
import { Shield, Users, Award, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from '@/lib/animations';

export default function AboutPage() {
    return (
        <PageTransition>
            <div style={{ paddingTop: 72, paddingBottom: 100 }}>
                {/* Header */}
                <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                        style={{
                            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
                            width: 600, height: 600, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                        }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <div className="container">
                        <AnimatedSection variants={fadeInUp}>
                            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, marginBottom: 20 }}>
                                Empowering Healthcare <span className="gradient-text">Professionals</span>
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
                                We are on a mission to democratize premium medical education and make clinical excellence accessible to every healthcare professional.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Our Story */}
                <section style={{ marginBottom: 80 }}>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
                        <AnimatedSection variants={fadeInLeft}>
                            <div>
                                <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 20 }}>Our Story</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                                    MedLearnPro was founded by a team of passionate instructors and technologists who recognized a critical gap in continuing medical education. Traditional CME courses were often outdated, expensive, and difficult to access for busy practitioners.
                                </p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                                    We set out to build a platform that combines the world&apos;s best medical expertise with cutting-edge technology. Today, we serve over 50,000 healthcare professionals across the globe.
                                </p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection variants={fadeInRight}>
                            <motion.div
                                style={{
                                    height: 400, borderRadius: 24,
                                    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    overflow: 'hidden',
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.div
                                    style={{ textAlign: 'center' }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Globe size={64} color="#7c3aed" style={{ marginBottom: 16, opacity: 0.8 }} />
                                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f0f0f8' }}>Global Impact</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8 }}>
                                        <AnimatedCounter end={50000} suffix="+" /> professionals served
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Core Values */}
                <section style={{ padding: '60px 0', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                    <div className="container">
                        <AnimatedSection>
                            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                                <h2 style={{ fontSize: 32, fontWeight: 700 }}>Our Core Values</h2>
                            </div>
                        </AnimatedSection>
                        <motion.div
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {[
                                { icon: Award, title: 'Excellence', desc: 'We partner only with the most renowned medical experts to ensure top-tier educational quality.' },
                                { icon: Users, title: 'Community', desc: 'We foster a collaborative environment where practitioners can learn from each other.' },
                                { icon: Shield, title: 'Integrity', desc: 'We uphold the highest standards of scientific accuracy and unbiased clinical information.' }
                            ].map((value) => (
                                <motion.div
                                    key={value.title}
                                    className="card"
                                    style={{ padding: 32, textAlign: 'center' }}
                                    variants={scaleIn}
                                    whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(124,58,237,0.1)' }}
                                >
                                    <motion.div
                                        style={{
                                            width: 64, height: 64, borderRadius: '50%', background: 'rgba(6,182,212,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
                                        }}
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <value.icon size={28} color="#06b6d4" />
                                    </motion.div>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{value.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{value.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA */}
                <AnimatedSection>
                    <section style={{ padding: '80px 0 40px', textAlign: 'center' }}>
                        <div className="container">
                            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 20 }}>Join the Future of Medical Education</h2>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/auth/register" className="btn-primary" style={{ padding: '12px 32px', fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    Get Started Today <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </AnimatedSection>
            </div>
        </PageTransition>
    );
}
