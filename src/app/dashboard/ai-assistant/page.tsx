'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

type Message = {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

const suggestions = [
    'Explain the pathophysiology of heart failure',
    'What are the Glasgow Coma Scale categories?',
    'Differential diagnosis for acute chest pain',
    'Key differences between Type 1 and Type 2 diabetes',
];

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: 'assistant',
            content: 'Hello! I\'m your AI study assistant. I can help you with medical concepts, quiz preparation, and course-related questions. How can I help you today?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text?: string) => {
        const msg = text || input.trim();
        if (!msg) return;

        const userMsg: Message = {
            id: Date.now(),
            role: 'user',
            content: msg,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI response (in production, this would call an API)
        setTimeout(() => {
            const aiMsg: Message = {
                id: Date.now() + 1,
                role: 'assistant',
                content: getSimulatedResponse(msg),
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <PageTransition>
            <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)' }}>
                {/* Header */}
                <motion.div
                    style={{ marginBottom: 20, flexShrink: 0 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                        <motion.div
                            style={{
                                width: 40, height: 40, borderRadius: 12,
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Sparkles size={20} color="white" />
                        </motion.div>
                        <div>
                            <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800 }}>AI Study Assistant</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Powered by GPT-4 · Medical knowledge base</p>
                        </div>
                    </div>
                </motion.div>

                {/* Messages */}
                <div
                    className="card"
                    style={{
                        flex: 1, overflow: 'auto', padding: 'clamp(12px, 2vw, 20px)',
                        display: 'flex', flexDirection: 'column', gap: 16,
                        marginBottom: 16,
                    }}
                >
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex', gap: 12,
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                            }}
                        >
                            <div style={{
                                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                                background: msg.role === 'assistant'
                                    ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                                    : 'rgba(124,58,237,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {msg.role === 'assistant' ? <Bot size={16} color="white" /> : <User size={16} color="#9f5cf7" />}
                            </div>
                            <div style={{
                                padding: '12px 16px', borderRadius: 14,
                                background: msg.role === 'user' ? 'rgba(124,58,237,0.15)' : 'var(--bg-elevated)',
                                border: '1px solid',
                                borderColor: msg.role === 'user' ? 'rgba(124,58,237,0.2)' : 'var(--border)',
                                fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)',
                            }}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                        >
                            <div style={{
                                width: 32, height: 32, borderRadius: 10,
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Bot size={16} color="white" />
                            </div>
                            <div style={{
                                padding: '12px 16px', borderRadius: 14,
                                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                display: 'flex', gap: 4,
                            }}>
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary-light)' }}
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                    <motion.div
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {suggestions.map((s, i) => (
                            <motion.button
                                key={i}
                                onClick={() => handleSend(s)}
                                style={{
                                    padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                    color: 'var(--text-secondary)', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                }}
                                whileHover={{ borderColor: 'rgba(124,58,237,0.4)', color: '#f0f0f8', scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <BookOpen size={12} /> {s}
                            </motion.button>
                        ))}
                    </motion.div>
                )}

                {/* Input */}
                <motion.div
                    style={{
                        display: 'flex', gap: 10, flexShrink: 0,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder="Ask a medical question..."
                        style={{
                            flex: 1, padding: '12px 16px', borderRadius: 12,
                            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                            color: 'var(--text-primary)', fontSize: 14, outline: 'none',
                            minHeight: 48,
                        }}
                    />
                    <motion.button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="btn-primary"
                        style={{ padding: '12px 18px', borderRadius: 12, minWidth: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Send size={18} />
                    </motion.button>
                </motion.div>
            </div>
        </PageTransition>
    );
}

function getSimulatedResponse(question: string): string {
    const q = question.toLowerCase();
    if (q.includes('heart failure') || q.includes('cardiology'))
        return 'Heart failure occurs when the heart muscle doesn\'t pump blood as well as it should. Key pathophysiology includes: (1) Reduced cardiac output leading to neurohormonal activation, (2) RAAS activation causing sodium/water retention, (3) Sympathetic nervous system activation, and (4) Ventricular remodeling. Treatment follows the GDMT guidelines with ACEi/ARB, beta-blockers, and diuretics as first-line therapy.';
    if (q.includes('glasgow') || q.includes('gcs'))
        return 'The Glasgow Coma Scale (GCS) has three components:\n\n• Eye Opening (E): 4-Spontaneous, 3-To voice, 2-To pain, 1-None\n• Verbal Response (V): 5-Oriented, 4-Confused, 3-Inappropriate words, 2-Incomprehensible sounds, 1-None\n• Motor Response (M): 6-Obeys commands, 5-Localizes pain, 4-Withdrawal, 3-Abnormal flexion, 2-Extension, 1-None\n\nTotal score ranges from 3-15. Severe: ≤8, Moderate: 9-12, Mild: 13-15.';
    if (q.includes('chest pain'))
        return 'Differential diagnosis for acute chest pain includes:\n\n• Cardiac: ACS (STEMI/NSTEMI), stable angina, pericarditis, myocarditis, aortic dissection\n• Pulmonary: PE, pneumothorax, pneumonia, pleuritis\n• GI: GERD, esophageal spasm, peptic ulcer, pancreatitis\n• MSK: Costochondritis, rib fracture, muscle strain\n• Other: Anxiety/panic attack, herpes zoster\n\nAlways rule out the life-threatening causes first (ACS, PE, aortic dissection, tension pneumothorax).';
    if (q.includes('diabetes'))
        return 'Key differences between Type 1 and Type 2 diabetes:\n\n• Type 1: Autoimmune destruction of β-cells, absolute insulin deficiency, typically presents in youth, requires insulin therapy, associated with DKA\n• Type 2: Insulin resistance ± relative deficiency, typically presents in adults, associated with obesity/metabolic syndrome, managed initially with lifestyle + metformin, associated with HHS\n\nBoth share complications: retinopathy, nephropathy, neuropathy, and cardiovascular disease.';
    return 'That\'s a great question! Based on current medical literature, I\'d recommend reviewing the latest guidelines on this topic. The key concepts to focus on include the underlying pathophysiology, diagnostic criteria, and evidence-based management approaches. Would you like me to dive deeper into any specific aspect of this topic?';
}
