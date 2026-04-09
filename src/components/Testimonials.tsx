'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import AnimatedSection from '@/components/AnimatedSection';

const testimonials = [
    { name: 'Arjun Mehta', role: 'Senior Learner, AIIMS Delhi', text: 'MedLearnPro completely transformed how I prepare for my clinical exams. The quality is unmatched.', rating: 5 },
    { name: 'Sneha Pillai', role: 'Cardiology Student, Apollo', text: 'The cardiology course helped me understand complex cases better. The AI assistant is a game changer.', rating: 5 },
    { name: 'Vikram Singh', role: 'Emergency Medicine Learner', text: 'Worth every rupee. The certificate is recognized by my hospital for CME credits.', rating: 5 },
];

export default function Testimonials() {
    return (
        <section className="section pb-24">
            <div className="container mx-auto px-4">
                <AnimatedSection variants={fadeInUp}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#f0f0f8]">
                            Trusted by <span className="gradient-text">50,000+ Learners</span>
                        </h2>
                        <p className="text-[var(--text-secondary)]">Join the community that&apos;s changing healthcare education.</p>
                    </div>
                </AnimatedSection>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {testimonials.map(({ name, role, text, rating }) => (
                        <motion.div
                            key={name}
                            variants={fadeInUp}
                            whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(124,58,237,0.1)' }}
                            className="card p-7 transition-all duration-200"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(rating)].map((_, j) => (
                                    <motion.div
                                        key={j}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + j * 0.06, type: 'spring', stiffness: 300 }}
                                        viewport={{ once: true }}
                                    >
                                        <Star size={14} className="fill-amber-500 text-amber-500" />
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-5">&quot;{text}&quot;</p>
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white shrink-0"
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {name.charAt(0)}
                                </motion.div>
                                <div>
                                    <div className="font-bold text-sm text-[#f0f0f8]">{name}</div>
                                    <div className="text-[var(--text-muted)] text-[13px]">{role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
