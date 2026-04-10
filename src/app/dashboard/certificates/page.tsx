'use client';

import { Award, Download, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const certificates = [
    {
        id: 1,
        courseName: 'Advanced Cardiology for Practitioners',
        instructor: 'Priya Sharma',
        issueDate: 'March 15, 2026',
        certId: 'CERT-MLP-2026-001',
        grade: 'Distinction',
        credits: '15 CME',
    },
];

const inProgress = [
    { id: 2, courseName: 'Emergency Medicine & Critical Care', progress: 45, remaining: '19h left' },
    { id: 3, courseName: 'Neurology: From Basics to Advanced', progress: 18, remaining: '47h left' },
];

export default function CertificatesPage() {
    return (
        <PageTransition>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <motion.div
                    style={{ marginBottom: 32 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 800, marginBottom: 6 }}>Certificates</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                        {certificates.length} earned · {inProgress.length} in progress
                    </p>
                </motion.div>

                {/* Earned Certificates */}
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {certificates.map((cert) => (
                        <motion.div
                            key={cert.id}
                            className="card"
                            style={{
                                padding: 'clamp(20px, 4vw, 28px)',
                                background: 'linear-gradient(135deg, var(--bg-card), rgba(124,58,237,0.05))',
                                borderColor: 'rgba(124,58,237,0.15)',
                            }}
                            variants={fadeInUp}
                            whileHover={{ y: -2, borderColor: 'rgba(124,58,237,0.3)' }}
                        >
                            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <motion.div
                                    style={{
                                        width: 64, height: 64, borderRadius: 16,
                                        background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.15))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                >
                                    <Award size={28} color="#9f5cf7" />
                                </motion.div>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f0f8', marginBottom: 4 }}>{cert.courseName}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                                        Instructor: {cert.instructor}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)' }}>
                                            <Calendar size={12} /> {cert.issueDate}
                                        </span>
                                        <span className="badge badge-primary" style={{ fontSize: 11, padding: '2px 10px' }}>{cert.grade}</span>
                                        <span className="badge" style={{ fontSize: 11, padding: '2px 10px', background: 'rgba(6,182,212,0.12)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>
                                            {cert.credits}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <motion.button
                                        className="btn-primary"
                                        style={{ padding: '8px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, minHeight: 36 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Download size={13} /> Download
                                    </motion.button>
                                    <motion.button
                                        className="btn-outline"
                                        style={{ padding: '8px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, minHeight: 36 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink size={13} /> Verify
                                    </motion.button>
                                </div>
                            </div>
                            <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: 'var(--bg)', fontSize: 12, color: 'var(--text-muted)' }}>
                                Certificate ID: {cert.certId}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* In Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>In Progress</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {inProgress.map((course, i) => (
                            <motion.div
                                key={course.id}
                                className="card"
                                style={{ padding: '16px 20px' }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{course.courseName}</div>
                                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{course.remaining}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ flex: 1, height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                                        <motion.div
                                            style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                                        />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{course.progress}%</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
