'use client';

import { Play, FileText, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CourseLearnPage() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg-default)', overflow: 'hidden' }}>
            {/* Sidebar Curriculum */}
            <div style={{ width: 350, borderRight: '1px solid var(--border)', background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
                    <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, marginBottom: 16 }}>
                        <ChevronLeft size={16} /> Back to Dashboard
                    </Link>
                    <h2 style={{ fontSize: 16, fontWeight: 700 }}>Advanced Cardiology</h2>
                    <div style={{ marginTop: 12, height: 6, background: 'var(--bg-default)', borderRadius: 99 }}>
                        <div style={{ width: '72%', height: '100%', background: '#7c3aed', borderRadius: 99 }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>72% Complete</div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
                    <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Module 1: ECG Fundamentals</h3>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>4/8 Completed</div>
                    </div>

                    {[
                        { title: '1. Introduction to ECG', duration: '15:20', completed: true },
                        { title: '2. Normal Sinus Rhythm', duration: '22:45', completed: true },
                        { title: '3. Atrial Fibrillation', duration: '18:30', completed: true },
                        { title: '4. Ventricular Tachycardia', duration: '25:10', completed: true },
                        { title: '5. AV Blocks (I, II, III)', duration: '30:00', completed: false, active: true },
                        { title: '6. Bundle Branch Blocks', duration: '20:15', completed: false },
                    ].map((lecture, i) => (
                        <div key={i} style={{
                            padding: '16px 20px', display: 'flex', gap: 12, cursor: 'pointer',
                            background: lecture.active ? 'rgba(124,58,237,0.1)' : 'transparent',
                            borderLeft: lecture.active ? '3px solid #7c3aed' : '3px solid transparent',
                            color: lecture.active ? '#f0f0f8' : 'var(--text-secondary)',
                            transition: 'background 0.2s'
                        }}
                            onMouseEnter={(e) => { if (!lecture.active) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                            onMouseLeave={(e) => { if (!lecture.active) e.currentTarget.style.background = 'transparent' }}>
                            {lecture.completed ? (
                                <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                            ) : lecture.active ? (
                                <Play size={16} color="#7c3aed" style={{ flexShrink: 0, marginTop: 2 }} />
                            ) : (
                                <FileText size={16} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                            )}
                            <div>
                                <div style={{ fontSize: 14, fontWeight: lecture.active ? 600 : 400, marginBottom: 4, lineHeight: 1.4 }}>{lecture.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lecture.duration}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Player Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
                <div style={{ background: '#000', width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 20, right: 20, padding: '4px 8px', background: 'rgba(0,0,0,0.5)', borderRadius: 4, color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'monospace' }}>
                        drm-protected-stream-xyz-123
                    </div>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(124,58,237,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Play size={32} fill="#fff" color="#fff" style={{ marginLeft: 6 }} />
                    </div>
                </div>

                <div style={{ padding: 40, maxWidth: 900, margin: '0 auto', width: '100%' }}>
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>5. AV Blocks (First, Second, and Third Degree)</h1>
                    <div style={{ display: 'flex', gap: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)', marginBottom: 24 }}>
                        <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: '#f0f0f8', cursor: 'pointer' }}>Overview</button>
                        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Q&A</button>
                        <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Notes</button>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                        In this lecture, we cover the critical distinguishing factors between Mobitz Type I and Mobitz Type II second-degree AV blocks, and why this distinction is vital for emergency interventions. We also review complete heart block presentations and the indications for temporary vs. permanent pacing.
                    </p>

                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Resources for this lecture:</h3>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ display: 'inline-flex', padding: '12px 16px', gap: 12, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, alignItems: 'center', cursor: 'pointer' }}>
                            <FileText size={18} color="#06b6d4" />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500 }}>AV_Block_Algorithm.pdf</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>1.2 MB</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
