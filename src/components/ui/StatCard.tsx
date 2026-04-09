'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    suffix?: string;
    prefix?: string;
}

export function StatCard({ label, value, icon: Icon, color, suffix, prefix }: StatCardProps) {
    const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''), 10);
    const isNumeric = !isNaN(numericValue);

    return (
        <motion.div
            className="card p-5 lg:p-6 flex flex-col gap-3"
            whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}15` }}
            transition={{ duration: 0.25 }}
        >
            <div className="flex justify-between items-start">
                <div className="text-[28px] font-extrabold leading-none">
                    {isNumeric ? (
                        <AnimatedCounter end={numericValue} prefix={prefix || ''} suffix={suffix || ''} duration={2} />
                    ) : (
                        value
                    )}
                </div>
                <motion.div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}18` }}
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                >
                    <Icon size={18} color={color} />
                </motion.div>
            </div>
            <div className="text-[var(--text-secondary)] text-[13px]">{label}</div>
        </motion.div>
    );
}
