'use client';

import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseCard } from '@/components/ui/CourseCard';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { fadeInDown, fadeInUp, staggerContainer } from '@/lib/animations';

const allCourses = [
    { id: 1, title: 'Advanced Cardiology for Practitioners', instructor: 'Priya Sharma', price: 4999, originalPrice: 9999, rating: 4.9, students: 8200, duration: '42 hours', level: 'Advanced', category: 'Cardiology', tag: 'Bestseller', comingSoon: false },
    { id: 2, title: 'Emergency Medicine & Critical Care', instructor: 'Rahul Gupta', price: 3499, originalPrice: 7999, rating: 4.8, students: 5600, duration: '35 hours', level: 'Intermediate', category: 'Emergency', tag: 'New', comingSoon: false },
    { id: 3, title: 'Neurology: From Basics to Advanced', instructor: 'Meera Iyer', price: 5999, originalPrice: 11999, rating: 4.9, students: 3100, duration: '58 hours', level: 'Advanced', category: 'Neurology', tag: 'Top Rated', comingSoon: false },
    { id: 4, title: 'Pediatric Infectious Diseases', instructor: 'Anil Kumar', price: 2999, originalPrice: 5999, rating: 4.7, students: 4200, duration: '24 hours', level: 'Intermediate', category: 'Pediatrics', tag: '', comingSoon: false },
    { id: 5, title: 'Fundamentals of Clinical Radiology', instructor: 'Sarah Johnson', price: 3999, originalPrice: 8999, rating: 4.8, students: 6500, duration: '40 hours', level: 'Beginner', category: 'Radiology', tag: 'Popular', comingSoon: false },
    { id: 6, title: 'Surgical Skills Practicum', instructor: 'Rajesh Singh', price: 7999, originalPrice: 14999, rating: 5.0, students: 1200, duration: '60 hours', level: 'Advanced', category: 'Surgery', tag: 'Premium', comingSoon: false },
];

const comingSoonCourses = [
    { id: 'cs-1', title: 'Advanced Robotics AI', instructor: 'Dr. Vikram Patel', price: 6999, originalPrice: 12999, rating: 0, students: 0, duration: '45 hours', level: 'Advanced', category: 'AI & Robotics', tag: '', comingSoon: true, launchDate: 'July 2026' },
    { id: 'cs-2', title: 'AI in Healthcare', instructor: 'Dr. Ananya Rao', price: 5499, originalPrice: 10999, rating: 0, students: 0, duration: '38 hours', level: 'Intermediate', category: 'AI & Healthcare', tag: '', comingSoon: true, launchDate: 'August 2026' },
    { id: 'cs-3', title: 'Generative AI Masterclass', instructor: 'Dr. Kiran Desai', price: 8999, originalPrice: 16999, rating: 0, students: 0, duration: '55 hours', level: 'Advanced', category: 'AI', tag: '', comingSoon: true, launchDate: 'September 2026' },
];

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isFocused, setIsFocused] = useState(false);

    const categories = ['All', 'Cardiology', 'Emergency', 'Neurology', 'Pediatrics', 'Radiology', 'Surgery'];

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <PageTransition>
            <div className="pb-[100px]">
                {/* Header */}
                <section className="py-14 bg-gradient-to-b from-violet-600/5 to-transparent relative overflow-hidden">
                    {/* Background glow orb */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                         style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

                    <div className="container mx-auto px-4 relative z-10">
                        <AnimatedSection variants={fadeInDown}>
                            <h1 className="heading-3d text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-[-0.03em] leading-[1.1]">
                                Explore{' '}
                                <span className="heading-3d-gradient">Premium Courses</span>
                            </h1>
                            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mb-10 leading-relaxed">
                                Enhance your medical knowledge with our expertly crafted, verifiable certificate courses.
                            </p>
                        </AnimatedSection>

                        {/* Search and Filter */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <motion.div
                                className="flex-1 min-w-[300px] relative bg-[var(--bg-elevated)] rounded-xl border flex items-center px-4"
                                animate={{
                                    borderColor: isFocused ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.07)',
                                    boxShadow: isFocused ? '0 0 20px rgba(124,58,237,0.15)' : '0 0 0 transparent',
                                    scale: isFocused ? 1.01 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    animate={{ rotate: isFocused ? 90 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Search size={20} className="text-[var(--text-muted)]" />
                                </motion.div>
                                <input
                                    type="text"
                                    placeholder="Search courses, specialties, or instructors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className="w-full py-3.5 px-3 bg-transparent border-none text-[#f0f0f8] outline-none text-[15px] placeholder:text-[var(--text-muted)]"
                                    style={{ boxShadow: 'none' }}
                                />
                            </motion.div>
                            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 shrink-0 max-w-full">
                                {categories.map(cat => (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer relative overflow-hidden
                                            ${activeCategory === cat ? 'text-white border-transparent' : 'bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-violet-500/50'}`}
                                    >
                                        {activeCategory === cat && (
                                            <motion.div
                                                layoutId="activeFilter"
                                                className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-full"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{cat}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Course Grid */}
                <section className="pt-8">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="flex justify-between items-center mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-xl font-bold text-[#f0f0f8]">
                                <motion.span
                                    key={filteredCourses.length}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {filteredCourses.length}
                                </motion.span> Courses Found
                            </h2>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {filteredCourses.length > 0 ? (
                                <motion.div
                                    key={activeCategory + searchQuery}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {filteredCourses.map((course) => (
                                        <motion.div
                                            key={course.id}
                                            variants={fadeInUp}
                                            layout
                                        >
                                            <CourseCard course={course} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-16 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border)]"
                                >
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Search size={48} className="text-white/10 mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2 text-[#f0f0f8]">No courses found</h3>
                                    <p className="text-[var(--text-secondary)]">Try adjusting your search query or filters.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Coming Soon Section */}
                <section className="pt-20">
                    <div className="container mx-auto px-4">
                        <AnimatedSection variants={fadeInUp}>
                            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                                <motion.div
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 8,
                                        padding: '8px 20px', borderRadius: 20,
                                        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
                                        border: '1px solid rgba(124,58,237,0.2)',
                                        marginBottom: 16,
                                    }}
                                >
                                    <Sparkles size={16} color="#9f5cf7" />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#9f5cf7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        Coming Soon
                                    </span>
                                </motion.div>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#f0f0f8]">
                                    Be the First to Know
                                </h2>
                                <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
                                    Exciting new courses are on the way. Get notified when they launch!
                                </p>
                            </div>
                        </AnimatedSection>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {comingSoonCourses.map((course) => (
                                <motion.div key={course.id} variants={fadeInUp}>
                                    <CourseCard course={course} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
