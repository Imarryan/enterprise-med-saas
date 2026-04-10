'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardSettingsPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/settings');
    }, [router]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
    );
}
