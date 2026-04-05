import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
    return (
        <div className="card p-5 lg:p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div className="text-[28px] font-extrabold leading-none">{value}</div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={18} color={color} />
                </div>
            </div>
            <div className="text-[var(--text-secondary)] text-[13px]">{label}</div>
        </div>
    );
}
