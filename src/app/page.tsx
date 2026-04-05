import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowRight, Star, Shield, Award, BookOpen,
  CheckCircle, Play, Zap, Globe,
} from 'lucide-react';
import { CourseCard } from '@/components/ui/CourseCard';

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="py-24 text-center text-[var(--text-muted)] animate-pulse">Loading testimonials...</div>
});

const stats = [
  { value: '50,000+', label: 'Students Enrolled' },
  { value: '200+', label: 'Expert Courses' },
  { value: '150+', label: 'Top Doctors' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const features = [
  { icon: Play, title: 'Dual Playback System', desc: "Watch on our secure player or YouTube's interface. 1080p HD quality with offline downloads.", color: 'violet-600' },
  { icon: Award, title: 'Verifiable Certificates', desc: 'Industry-recognized certificates with blockchain-backed verification links.', color: 'cyan-500' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption, watermarked videos, and DRM protection for all content.', color: 'emerald-500' },
  { icon: Zap, title: 'AI Learning Assistant', desc: 'Get instant answers to your medical questions with our GPT-powered study assistant.', color: 'amber-500' },
  { icon: BookOpen, title: 'Smart Notes System', desc: 'Take timestamped notes while watching and export them as PDFs anytime.', color: 'red-500' },
  { icon: Globe, title: 'WhatsApp Notifications', desc: 'Get course updates, reminders, and support directly on WhatsApp.', color: 'purple-500' },
];

const courses = [
  { id: 1, title: 'Advanced Cardiology for Practitioners', instructor: 'Dr. Priya Sharma', price: 4999, originalPrice: 9999, rating: 4.9, students: 8200, duration: '42 hours', level: 'Advanced', thumbnail: '/course-1.jpg', tag: 'Bestseller' },
  { id: 2, title: 'Emergency Medicine & Critical Care', instructor: 'Dr. Rahul Gupta', price: 3499, originalPrice: 7999, rating: 4.8, students: 5600, duration: '35 hours', level: 'Intermediate', thumbnail: '/course-2.jpg', tag: 'New' },
  { id: 3, title: 'Neurology: From Basics to Advanced', instructor: 'Dr. Meera Iyer', price: 5999, originalPrice: 11999, rating: 4.9, students: 3100, duration: '58 hours', level: 'Advanced', thumbnail: '/course-3.jpg', tag: 'Top Rated' },
];

export default function HomePage() {
  return (
    <div className="pt-[72px]">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute -top-52 -left-52 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-24 -right-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto text-center relative z-10 px-4">
          <div className="mb-5 inline-flex">
            <span className="badge badge-primary flex items-center gap-1.5 px-3 py-1 text-sm">
              <Zap size={14} /> India&apos;s #1 Medical Education Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-[#f0f0f8]">
            Learn Medicine from<br />
            <span className="gradient-text">India&apos;s Best Doctors</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium video courses, AI-powered learning, and verifiable certificates — all in one place.
            Join 50,000+ healthcare professionals advancing their careers.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link href="/auth/register" className="btn-outline text-base px-8 py-3.5 flex items-center gap-2">
              <Play size={18} /> Watch Free Preview
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-[var(--text-secondary)] text-sm">4.9/5 from 12,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#f0f0f8] mb-1">
                  <span className="gradient-text">{value}</span>
                </div>
                <div className="text-[var(--text-secondary)] text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="badge badge-primary mb-4 inline-block px-3 py-1 text-sm">Why MedLearnPro</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f0f0f8]">
              Everything You Need to <span className="gradient-text">Excel in Medicine</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-base">
              Built for healthcare professionals who demand the best learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_16px_48px_rgba(124,58,237,0.1)]">
                <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center mb-4`}>
                  <Icon size={22} className={`text-${color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#f0f0f8]">{title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
            <div>
              <span className="badge badge-primary mb-3 inline-block px-3 py-1 text-sm">Featured Courses</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f8]">
                Start Your Medical<br /><span className="gradient-text">Learning Journey</span>
              </h2>
            </div>
            <Link href="/courses" className="btn-outline py-2 px-4 text-sm flex items-center gap-2 whitespace-nowrap self-start md:self-auto">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} showCategory={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="section pb-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-violet-600/15 to-cyan-500/10 border border-violet-600/25 rounded-3xl p-10 md:py-16 md:px-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.15)_0%,transparent_70%)] pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10 text-[#f0f0f8]">
              Ready to Advance Your<br /><span className="gradient-text">Medical Career?</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-9 relative z-10">
              Join thousands of doctors who are already learning smarter with MedLearnPro.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link href="/auth/register" className="btn-primary text-base px-9 py-3.5 flex items-center gap-2">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link href="/courses" className="btn-outline text-base px-9 py-3.5">
                Browse Courses
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center mt-8 relative z-10">
              {['No credit card required', '7-day free trial', 'Cancel anytime'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm">
                  <CheckCircle size={14} className="text-emerald-500" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
