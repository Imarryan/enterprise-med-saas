'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Eye, Palette, Save, Loader2, Check, Trash2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        whatsappNotifications: true,
    });

    const [privacy, setPrivacy] = useState({
        profileVisible: true,
    });

    const [passwords, setPasswords] = useState({
        current: '',
        newPassword: '',
        confirm: '',
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/settings');
        }
        if (session?.user) {
            setProfile({
                name: session.user.name || '',
                email: session.user.email || '',
                phone: '',
            });
        }
    }, [session, status, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: activeTab,
                    data: activeTab === 'profile' ? profile
                        : activeTab === 'notifications' ? notifications
                        : activeTab === 'privacy' ? privacy
                        : activeTab === 'password' ? passwords
                        : {},
                }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error('Save failed:', err);
        } finally {
            setSaving(false);
        }
    };

    if (status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)' }} />
            </div>
        );
    }

    if (status === 'unauthenticated') return null;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Eye },
    ];

    return (
        <PageTransition>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 100px' }}>
                <motion.div
                    style={{ marginBottom: 36 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Settings</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                        Manage your account preferences
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }} className="settings-grid">
                    {/* Sidebar */}
                    <motion.nav
                        className="card"
                        style={{ padding: 8, height: 'fit-content', position: 'sticky', top: 100 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <motion.button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                    padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                                    fontSize: 14, fontWeight: 500, textAlign: 'left',
                                    background: activeTab === id ? 'rgba(124,58,237,0.12)' : 'transparent',
                                    color: activeTab === id ? 'var(--primary-light)' : 'var(--text-secondary)',
                                    transition: 'all 0.15s ease',
                                }}
                                whileHover={{ x: 4 }}
                            >
                                <Icon size={16} />
                                {label}
                            </motion.button>
                        ))}
                    </motion.nav>

                    {/* Content */}
                    <motion.div
                        className="card"
                        style={{ padding: 32 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        key={activeTab}
                    >
                        {activeTab === 'profile' && (
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Profile Settings</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label>Full Name</label>
                                        <input
                                            value={profile.name}
                                            onChange={e => setProfile({ ...profile, name: e.target.value })}
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label>Email Address</label>
                                        <input
                                            value={profile.email}
                                            onChange={e => setProfile({ ...profile, email: e.target.value })}
                                            placeholder="you@example.com"
                                            type="email"
                                        />
                                    </div>
                                    <div>
                                        <label>Phone Number</label>
                                        <input
                                            value={profile.phone}
                                            onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            type="tel"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Change Password</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            value={passwords.current}
                                            onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            value={passwords.newPassword}
                                            onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            placeholder="Min 8 characters"
                                        />
                                    </div>
                                    <div>
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                            placeholder="Repeat new password"
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: 32, padding: '20px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#ef4444', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Trash2 size={16} /> Danger Zone
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
                                        Once you delete your account, there is no going back.
                                    </p>
                                    <button
                                        style={{
                                            padding: '8px 20px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.4)',
                                            background: 'transparent', color: '#ef4444', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                        }}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Notification Preferences</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {[
                                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive course updates and announcements via email' },
                                        { key: 'whatsappNotifications', label: 'WhatsApp Notifications', desc: 'Get instant notifications on WhatsApp' },
                                    ].map(({ key, label, desc }) => (
                                        <div key={key} style={{
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)',
                                            background: 'var(--bg-elevated)',
                                        }}>
                                            <div>
                                                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{label}</div>
                                                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{desc}</div>
                                            </div>
                                            <button
                                                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                                                style={{
                                                    width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
                                                    background: notifications[key as keyof typeof notifications] ? 'var(--primary)' : 'var(--bg)',
                                                    position: 'relative', transition: 'background 0.2s',
                                                }}
                                            >
                                                <motion.div
                                                    style={{
                                                        width: 22, height: 22, borderRadius: '50%', background: 'white',
                                                        position: 'absolute', top: 3,
                                                    }}
                                                    animate={{ left: notifications[key as keyof typeof notifications] ? 23 : 3 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Privacy Settings</h2>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)',
                                    background: 'var(--bg-elevated)',
                                }}>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Profile Visibility</div>
                                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Allow other students to see your profile</div>
                                    </div>
                                    <button
                                        onClick={() => setPrivacy(prev => ({ ...prev, profileVisible: !prev.profileVisible }))}
                                        style={{
                                            width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
                                            background: privacy.profileVisible ? 'var(--primary)' : 'var(--bg)',
                                            position: 'relative', transition: 'background 0.2s',
                                        }}
                                    >
                                        <motion.div
                                            style={{
                                                width: 22, height: 22, borderRadius: '50%', background: 'white',
                                                position: 'absolute', top: 3,
                                            }}
                                            animate={{ left: privacy.profileVisible ? 23 : 3 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <motion.div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
                            <motion.button
                                onClick={handleSave}
                                className="btn-primary"
                                disabled={saving}
                                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px' }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
                                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .settings-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </div>
        </PageTransition>
    );
}
