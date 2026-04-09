'use client';

import Link from 'next/link';
import { CheckCircle, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const plans = [
    {
        name: 'Basic Access',
        description: 'Perfect for medical students getting started.',
        priceMonthly: 1499,
        priceAnnually: 1199,
        features: [
            'Access to 50+ basic courses',
            'Standard video quality (720p)',
            'Basic certificates of completion',
            'Community forum access',
            'Email support'
        ],
        buttonText: 'Start Free Trial',
        popular: false,
    },
    {
        name: 'Pro Practitioner',
        description: 'Everything you need to advance your career.',
        priceMonthly: 3999,
        priceAnnually: 2999,
        features: [
            'Access to all premium courses (200+)',
            'HD video quality (1080p) & offline downloads',
            'Verifiable blockchain certificates',
            'AI-powered learning assistant',
            'Smart timestamped notes',
            'Priority 24/7 WhatsApp support'
        ],
        buttonText: 'Upgrade to Pro',
        popular: true,
    },
    {
        name: 'Institute / Hospital',
        description: 'For organizations training their staff.',
        priceMonthly: 'Custom' as const,
        priceAnnually: 'Custom' as const,
        features: [
            'Everything in Pro Practitioner',
            'Admin dashboard for student tracking',
            'Custom branded certificates',
            'API access for LMS integration',
            'Dedicated success manager',
            'Volume licensing discounts'
        ],
        buttonText: 'Contact Sales',
        popular: false,
    }
];

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <PageTransition>
            <div style={{ paddingTop: 72, paddingBottom: 100 }}>
                {/* Header */}
                <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative' }}>
                    <motion.div
                        style={{
                            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
                            width: 600, height: 600, borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
                            pointerEvents: 'none', zIndex: -1
                        }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />

                    <div className="container">
                        <AnimatedSection variants={fadeInUp}>
                            <span className="badge badge-primary" style={{ marginBottom: 16 }}>Pricing Plans</span>
                            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, marginBottom: 20 }}>
                                Simple, <span className="gradient-text">Transparent Pricing</span>
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto 40px' }}>
                                Invest in your medical career with plans designed for students, practitioners, and organizations.
                            </p>
                        </AnimatedSection>

                        {/* Billing Toggle */}
                        <motion.div
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 12,
                                background: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: 99,
                                border: '1px solid var(--border)'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.button
                                onClick={() => setIsAnnual(false)}
                                style={{
                                    padding: '8px 20px', borderRadius: 99, fontSize: 14, fontWeight: 600,
                                    background: !isAnnual ? 'var(--bg-card)' : 'transparent',
                                    color: !isAnnual ? 'white' : 'var(--text-secondary)',
                                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                    boxShadow: !isAnnual ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Monthly
                            </motion.button>
                            <motion.button
                                onClick={() => setIsAnnual(true)}
                                style={{
                                    padding: '8px 20px', borderRadius: 99, fontSize: 14, fontWeight: 600,
                                    background: isAnnual ? 'var(--bg-card)' : 'transparent',
                                    color: isAnnual ? 'white' : 'var(--text-secondary)',
                                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                    boxShadow: isAnnual ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                                    display: 'flex', alignItems: 'center', gap: 6
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Annually <span style={{ color: '#10b981', fontSize: 11, background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 10 }}>Save 25%</span>
                            </motion.button>
                        </motion.div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section>
                    <div className="container">
                        <motion.div
                            style={{
                                display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center',
                                alignItems: 'stretch'
                            }}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {plans.map((plan, idx) => (
                                <motion.div
                                    key={plan.name}
                                    variants={scaleIn}
                                    whileHover={{ y: -10, boxShadow: plan.popular ? '0 20px 60px rgba(124,58,237,0.2)' : '0 16px 40px rgba(0,0,0,0.2)' }}
                                    style={{
                                        width: '100%', maxWidth: 360,
                                        background: plan.popular ? 'linear-gradient(180deg, rgba(124,58,237,0.1) 0%, rgba(30,30,40,0) 100%)' : 'var(--bg-card)',
                                        border: `1px solid ${plan.popular ? 'rgba(124,58,237,0.3)' : 'var(--border)'}`,
                                        borderRadius: 24, padding: 32,
                                        display: 'flex', flexDirection: 'column',
                                        position: 'relative',
                                        transform: plan.popular ? 'translateY(-16px)' : 'none',
                                    }}
                                >
                                    {plan.popular && (
                                        <motion.div
                                            style={{
                                                position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                                color: 'white', fontSize: 12, fontWeight: 700, padding: '4px 16px',
                                                borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4,
                                                boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
                                            }}
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Zap size={12} fill="currentColor" /> MOST POPULAR
                                        </motion.div>
                                    )}

                                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{plan.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, minHeight: 42, marginBottom: 24 }}>
                                        {plan.description}
                                    </p>

                                    <div style={{ marginBottom: 32 }}>
                                        {plan.priceMonthly === 'Custom' ? (
                                            <div style={{ fontSize: 40, fontWeight: 800 }}>Custom</div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                                <motion.span
                                                    key={isAnnual ? 'annual' : 'monthly'}
                                                    style={{ fontSize: 40, fontWeight: 800 }}
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ type: 'spring', stiffness: 200 }}
                                                >
                                                    ₹{isAnnual ? plan.priceAnnually : plan.priceMonthly}
                                                </motion.span>
                                                <span style={{ color: 'var(--text-secondary)' }}>/month</span>
                                            </div>
                                        )}
                                        {isAnnual && typeof plan.priceMonthly === 'number' && (
                                            <motion.div
                                                style={{ color: '#10b981', fontSize: 13, marginTop: 4 }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                Billed annually (₹{(plan.priceAnnually as number) * 12}/year)
                                            </motion.div>
                                        )}
                                    </div>

                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                        <Link href="/auth/register" style={{
                                            display: 'block', textAlign: 'center',
                                            padding: '12px 24px', borderRadius: 12,
                                            background: plan.popular ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(255,255,255,0.05)',
                                            color: 'white', fontWeight: 600, textDecoration: 'none',
                                            marginBottom: 32, border: plan.popular ? 'none' : '1px solid var(--border)',
                                            transition: 'all 0.2s',
                                        }}>
                                            {plan.buttonText}
                                        </Link>
                                    </motion.div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: 'var(--text-muted)' }}>
                                            WHAT&apos;S INCLUDED:
                                        </div>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {plan.features.map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                                                    <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
