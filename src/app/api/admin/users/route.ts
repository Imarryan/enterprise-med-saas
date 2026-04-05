import { NextResponse } from 'next/server';
import { getAllUsers } from '@/services/userService';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '20');

        const result = await getAllUsers(page, perPage);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Admin users error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
