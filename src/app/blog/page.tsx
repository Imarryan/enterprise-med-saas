'use client';

import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const featuredPost = {
    id: 1,
    title: 'The Future of AI in Medical Diagnostics: What Every Doctor Should Know',
    excerpt: 'Artificial intelligence is rapidly transforming how we diagnose and treat complex cases. Learn how to leverage these new tools in your daily clinical practice without losing the human touch.',
    category: 'Technology',
    author: 'Dr. Sameer Patel',
    date: 'March 14, 2026',
    readTime: '8 min read',
    image: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' // Placeholder gradient
};

const posts = [
    {
        id: 2,
        title: 'Navigating New Guidelines for Hypertension Management',
        excerpt: 'A comprehensive breakdown of the latest AHA/ACC guidelines and how they affect your prescribing patterns.',
        category: 'Clinical Updates',
        author: 'Dr. Priya Sharma',
        date: 'March 10, 2026',
        readTime: '5 min read',
        image: 'linear-gradient(135deg, #1f4037, #99f2c8)'
    },
    {
        id: 3,
        title: 'Burnout in Healthcare: Strategies for Senior Residents',
        excerpt: 'Recognizing the signs of burnout and practical, evidence-based interventions to maintain mental wellbeing during residency.',
        category: 'Wellness',
        author: 'Dr. Amit Singh',
        date: 'March 5, 2026',
        readTime: '6 min read',
        image: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)'
    },
    {
        id: 4,
        title: 'Case Study: Atypical Presentation of Pulmonary Embolism',
        excerpt: 'An in-depth look at a recent challenging case from the ER, highlighting the importance of clinical suspicion over classic symptoms.',
        category: 'Case Studies',
        author: 'Dr. Rahul Gupta',
        date: 'February 28, 2026',
        readTime: '10 min read',
        image: 'linear-gradient(135deg, #2c3e50, #3498db)'
    },
    {
        id: 5,
        title: 'Telemedicine Best Practices Post-Pandemic',
        excerpt: 'What we&apos;ve learned from years of remote care and how to optimize your digital consultations for better patient outcomes.',
        category: 'Practice Management',
        author: 'Dr. Sarah Johnson',
        date: 'February 20, 2026',
        readTime: '7 min read',
        image: 'linear-gradient(135deg, #4b6cb7, #182848)'
    },
    {
        id: 6,
        title: 'Understanding the New CME Requirements for 2026',
        excerpt: 'Everything you need to know about the updated continuing medical education mandates and how to fulfill them efficiently.',
        category: 'Career',
        author: 'MedLearnPro Team',
        date: 'February 15, 2026',
        readTime: '4 min read',
        image: 'linear-gradient(135deg, #1e1366, #2a0845)'
    }
];

export default function BlogPage() {
    return (
        <div style={{ paddingTop: 72, paddingBottom: 100 }}>
            {/* Header */}
            <section style={{ padding: '80px 0 40px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, marginBottom: 20 }}>
                        Medical <span className="gradient-text">Insights & Updates</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
                        Expert articles, clinical updates, and career advice for healthcare professionals.
                    </p>
                </div>
            </section>

            {/* Featured Post */}
            <section style={{ marginBottom: 80 }}>
                <div className="container">
                    <Link href={`/blog/${featuredPost.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card" style={{
                            display: 'flex', flexDirection: 'column', overflow: 'hidden',
                            cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s',
                            border: '1px solid rgba(124,58,237,0.3)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                height: 300, background: featuredPost.image,
                                display: 'flex', alignItems: 'flex-end', padding: 32
                            }}>
                                <span className="badge badge-primary">{featuredPost.category}</span>
                            </div>
                            <div style={{ padding: '32px 40px' }}>
                                <div style={{ display: 'flex', gap: 20, marginBottom: 16, color: 'var(--text-muted)', fontSize: 14 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> {featuredPost.date}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} /> {featuredPost.readTime}</span>
                                </div>
                                <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{featuredPost.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
                                    {featuredPost.excerpt}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: '50%', background: '#7c3aed',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                        }}>
                                            SP
                                        </div>
                                        <span style={{ fontWeight: 600 }}>{featuredPost.author}</span>
                                    </div>
                                    <span style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: 14 }}>
                                        Read Article <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Grid Posts */}
            <section>
                <div className="container">
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Latest Articles</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card" style={{
                                    height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                                    cursor: 'pointer', transition: 'all 0.3s'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                    }}>
                                    <div style={{ height: 200, background: post.image, padding: 20, display: 'flex', alignItems: 'flex-start' }}>
                                        <span style={{
                                            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                                            color: 'white', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 99
                                        }}>
                                            {post.category}
                                        </span>
                                    </div>
                                    <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: 16, marginBottom: 12, color: 'var(--text-muted)', fontSize: 12 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {post.date}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>{post.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                                            {post.excerpt}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                                            <User size={16} color="var(--text-muted)" />
                                            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{post.author}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
