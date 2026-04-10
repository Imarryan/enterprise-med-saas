import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET — admin: list all enrollments
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { role: true },
        });

        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const enrollments = await db.enrollment.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true },
                },
                course: {
                    select: { id: true, title: true, slug: true, price: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ enrollments });
    } catch (error) {
        console.error('Admin enrollments error:', error);
        return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
    }
}
