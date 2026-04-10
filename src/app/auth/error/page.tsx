'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration. Please contact support if this persists.',
    AccessDenied: 'Access denied. You do not have permission to sign in.',
    Verification: 'The verification link has expired or has already been used.',
    OAuthSignin: 'Could not start the sign-in process. Please try again.',
    OAuthCallback: 'Could not complete the sign-in process. Please try again.',
    OAuthCreateAccount: 'Could not create your account. An account with this email may already exist.',
    EmailCreateAccount: 'Could not create your account using email. Please try a different method.',
    Callback: 'An error occurred during the authentication callback.',
    OAuthAccountNotLinked: 'This email is already associated with another sign-in method. Please use the original method.',
    Default: 'An unexpected authentication error occurred. Please try again.',
};

function AuthErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error') || 'Default';
    const message = errorMessages[error] || errorMessages.Default;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px 48px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow */}
            <motion.div
                style={{
                    position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            <motion.div
                style={{ width: '100%', maxWidth: 480, textAlign: 'center', position: 'relative' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                {/* Icon */}
                <motion.div
                    style={{
                        width: 72, height: 72, borderRadius: 20,
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px',
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <AlertTriangle size={32} color="#ef4444" />
                </motion.div>

                <motion.h1
                    style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Authentication Error
                </motion.h1>

                <motion.p
                    style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {message}
                </motion.p>

                <motion.p
                    style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 32 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                >
                    Error code: {error}
                </motion.p>

                <motion.div
                    style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/auth/login" className="btn-primary" style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <RefreshCw size={16} /> Try Again
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/" className="btn-outline" style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="animate-spin" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} />
            </div>
        }>
            <AuthErrorContent />
        </Suspense>
    );
}
