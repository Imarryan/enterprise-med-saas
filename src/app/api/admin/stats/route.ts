import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/services/userService';

export async function GET() {
    try {
        const stats = await getDashboardStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
