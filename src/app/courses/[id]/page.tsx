'use client';

import Link from 'next/link';
import { Play, CheckCircle, Clock, Award, Star, Users } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function CourseDetailsPage() {
    const params = useParams();
    const id = params?.id || '1'; // Mock ID

    return (
        <div className="pt-[72px] pb-[100px]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 border-b border-white/5">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-center">
                    <div>
                        <div className="flex gap-3 mb-4">
                            <span className="badge badge-primary">Best Seller</span>
                            <span className="badge bg-white/10">Cardiology</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                            Advanced Cardiology for Practitioners (Course {id})
                        </h1>
                        <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-[600px]">
                            Master the latest ECG interpretation techniques, echocardiogram reads, and heart failure management protocols.
                        </p>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                                <Star size={16} className="fill-amber-500" /> 4.9 (1,245 reviews)
                            </span>
                            <span className="flex items-center gap-1.5 text-white/80">
                                <Users size={16} /> 8,200 Students
                            </span>
                            <span className="flex items-center gap-1.5 text-white/80">
                                <Clock size={16} /> 42 Hours
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white">PS</div>
                            <div>
                                <div className="text-white font-semibold">Dr. Priya Sharma</div>
                                <div className="text-white/60 text-[13px]">Senior Interventional Cardiologist</div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="card p-8 bg-[var(--bg-elevated)] border border-[var(--border)]">
                        <div className="w-full h-[200px] bg-violet-600/10 rounded-xl mb-6 flex items-center justify-center relative">
                            <Play size={48} className="fill-violet-600 text-violet-600 opacity-80" />
                        </div>
                        <div className="flex items-end gap-3 mb-6">
                            <div className="text-4xl font-extrabold text-[#f0f0f8]">₹4,999</div>
                            <div className="text-lg text-[var(--text-muted)] line-through pb-1">₹9,999</div>
                        </div>
                        <Link href="/auth/register" className="btn-primary w-full p-4 text-base flex justify-center mb-4">
                            Enroll Now
                        </Link>
                        <p className="text-center text-[var(--text-muted)] text-[13px]">30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-[#f0f0f8]">What you&apos;ll learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {[
                                'Advanced ECG interpretation in emergency settings',
                                'Echocardiogram basics for non-cardiologists',
                                'Latest AHA/ACC guidelines for heart failure management',
                                'Pharmacological interventions in acute coronary syndrome',
                                'Differentiating between unstable angina and NSTEMI',
                                'Post-MI care and rehabilitation protocols'
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-[var(--text-secondary)] leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-[#f0f0f8]">Course Curriculum</h2>
                        <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                            {[
                                { title: 'Module 1: ECG Fundamentals Refresher', duration: '4:20:00', topics: 8 },
                                { title: 'Module 2: Structural Heart Diseases', duration: '6:15:00', topics: 12 },
                                { title: 'Module 3: Heart Failure Management', duration: '8:45:00', topics: 15 },
                                { title: 'Module 4: Acute Coronary Syndromes', duration: '10:30:00', topics: 18 },
                            ].map((module, i) => (
                                <div key={i} className={`p-5 ${i === 3 ? '' : 'border-b border-[var(--border)]'} ${i === 0 ? 'bg-[var(--bg-elevated)]' : 'bg-transparent'}`}>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <h3 className="text-base font-semibold text-[#f0f0f8]">{module.title}</h3>
                                        <div className="flex gap-4 text-[var(--text-muted)] text-[13px]">
                                            <span>{module.topics} lectures</span>
                                            <span>{module.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-5 text-[#f0f0f8]">This course includes:</h3>
                        <div className="flex flex-col gap-4 mb-10">
                            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                <Play size={20} className="text-cyan-500" /> 42 hours on-demand video
                            </div>
                            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                <Award size={20} className="text-violet-600" /> 15 CME credits
                            </div>
                            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                <Star size={20} className="text-amber-500" /> Certificate of completion
                            </div>
                            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                                <Users size={20} className="text-emerald-500" /> Access to doctors community
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
