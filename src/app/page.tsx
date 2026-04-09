'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, Shield, Award, BookOpen,
  CheckCircle, Play, Zap, Globe,
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { CourseCard } from '@/components/ui/CourseCard';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import AnimatedText from '@/components/AnimatedText';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, staggerContainer, bounceIn, glowPulse } from '@/lib/animations';

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="py-24 text-center text-[var(--text-muted)] animate-pulse">Loading testimonials...</div>
});

const stats = [
  { value: 50000, suffix: '+', label: 'Students Enrolled' },
  { value: 200, suffix: '+', label: 'Expert Courses' },
  { value: 150, suffix: '+', label: 'Top Instructors' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

const features = [
  { icon: Play, title: 'Dual Playback System', desc: "Watch on our secure player or YouTube's interface. 1080p HD quality with offline downloads.", color: '#8b5cf6' },
  { icon: Award, title: 'Verifiable Certificates', desc: 'Industry-recognized certificates with blockchain-backed verification links.', color: '#06b6d4' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption, watermarked videos, and DRM protection for all content.', color: '#10b981' },
  { icon: Zap, title: 'AI Learning Assistant', desc: 'Get instant answers to your medical questions with our GPT-powered study assistant.', color: '#f59e0b' },
  { icon: BookOpen, title: 'Smart Notes System', desc: 'Take timestamped notes while watching and export them as PDFs anytime.', color: '#ef4444' },
  { icon: Globe, title: 'WhatsApp Notifications', desc: 'Get course updates, reminders, and support directly on WhatsApp.', color: '#a855f7' },
];

const courses = [
  { id: 1, title: 'Advanced Cardiology for Practitioners', instructor: 'Priya Sharma', price: 4999, originalPrice: 9999, rating: 4.9, students: 8200, duration: '42 hours', level: 'Advanced', thumbnail: '/course-1.jpg', tag: 'Bestseller' },
  { id: 2, title: 'Emergency Medicine & Critical Care', instructor: 'Rahul Gupta', price: 3499, originalPrice: 7999, rating: 4.8, students: 5600, duration: '35 hours', level: 'Intermediate', thumbnail: '/course-2.jpg', tag: 'New' },
  { id: 3, title: 'Neurology: From Basics to Advanced', instructor: 'Meera Iyer', price: 5999, originalPrice: 11999, rating: 4.9, students: 3100, duration: '58 hours', level: 'Advanced', thumbnail: '/course-3.jpg', tag: 'Top Rated' },
];

export default function HomePage() {
  return (
    <div>

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated gradient background — uses CSS animation (off main thread) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2, #6B8DD6, #8E37D7)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 8s ease infinite',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Background elements — CSS-animated for zero JS overhead */}
        <div
          className="absolute -top-52 -left-52 w-[800px] h-[800px] rounded-full pointer-events-none animate-float"
          style={{
            background: 'radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        <div
          className="absolute top-24 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none animate-float"
          style={{
            background: 'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)',
            animationDelay: '2s',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.div
            className="mb-5 inline-flex"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="badge badge-primary flex items-center gap-1.5 px-3 py-1 text-sm">
              <Zap size={14} />India&apos;s #1 Medical Education Platform
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-[#f0f0f8]">
            <AnimatedText text="Learn Medicine from" delay={0.3} />
            <br />
            <span className="gradient-text">
              <AnimatedText text="India's Best Instructors" delay={0.6} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Premium video courses, AI-powered learning, and verifiable certificates — all in one place.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-[var(--primary-light)] max-w-2xl mx-auto mb-10 h-[32px]"
          >
            <TypeAnimation
              sequence={[
                'Book AI Courses Instantly',
                2000,
                'Learn from Experts',
                2000,
                'Transform Your Career',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div {...glowPulse}>
                <Link href="/courses" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
                  Explore Courses <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth/register" className="btn-outline text-base px-8 py-3.5 flex items-center gap-2">
                <Play size={18} /> Watch Free Preview
              </Link>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.08, type: 'spring' }}
                  >
                    <Star size={16} className="fill-amber-500 text-amber-500" />
                  </motion.div>
                ))}
              </div>
              <span className="text-[var(--text-secondary)] text-sm">4.9/5 from 12,000+ reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map(({ value, suffix, label }, i) => (
              <motion.div key={label} className="text-center" variants={bounceIn}>
                <div className="text-3xl md:text-4xl font-extrabold text-[#f0f0f8] mb-1">
                  <span className="gradient-text">
                    <AnimatedCounter end={value} suffix={suffix} duration={2.5} />
                  </span>
                </div>
                <motion.div
                  className="text-[var(--text-secondary)] text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  {label}
                </motion.div>
                {/* Animated underline */}
                <motion.div
                  className="h-[2px] mx-auto mt-2 rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection variants={fadeInDown}>
            <div className="text-center mb-16">
              <span className="badge badge-primary mb-4 inline-block px-3 py-1 text-sm">Why MedLearnPro</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0f0f8]">
                Everything You Need to <span className="gradient-text">Excel in Medicine</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-base">
                Built for healthcare professionals who demand the best learning experience.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(124,58,237,0.12)' }}
                className="card p-7 transition-all duration-200 hover:border-violet-500/40"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}18` }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon size={22} style={{ color }} />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-[#f0f0f8]">{title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section pb-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
              <div>
                <span className="badge badge-primary mb-3 inline-block px-3 py-1 text-sm">Featured Courses</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f8]">
                  Start Your Medical<br /><span className="gradient-text">Learning Journey</span>
                </h2>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/courses" className="btn-outline py-2 px-4 text-sm flex items-center gap-2 whitespace-nowrap self-start md:self-auto">
                  View All <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {courses.map((course) => (
              <motion.div key={course.id} variants={fadeInUp}>
                <CourseCard course={course} showCategory={false} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <AnimatedSection>
        <section className="section pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="bg-gradient-to-br from-violet-600/15 to-cyan-500/10 border border-violet-600/25 rounded-3xl p-10 md:py-16 md:px-12 text-center relative overflow-hidden"
              whileInView={{ scale: [0.97, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Animated background orb — CSS animation for zero JS cost */}
              <div
                className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 70%)',
                  animation: 'spin 20s linear infinite',
                  transform: 'translate3d(0, 0, 0)',
                }}
              />
              <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10 text-[#f0f0f8]">
                Ready to Advance Your<br /><span className="gradient-text">Medical Career?</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-9 relative z-10">
                Join thousands of professionals who are already learning smarter with MedLearnPro.
              </p>
              <motion.div
                className="flex flex-wrap gap-4 justify-center relative z-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth/register" className="btn-primary text-base px-9 py-3.5 flex items-center gap-2">
                    Start Free Trial <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/courses" className="btn-outline text-base px-9 py-3.5">
                    Browse Courses
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-6 justify-center mt-8 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {['No credit card required', '7-day free trial', 'Cancel anytime'].map((item) => (
                  <motion.span key={item} variants={fadeInUp} className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm">
                    <CheckCircle size={14} className="text-emerald-500" /> {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
