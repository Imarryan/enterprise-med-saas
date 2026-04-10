import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET — get a single enrollment
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const enrollment = await db.enrollment.findUnique({
            where: { id },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        thumbnail: true,
                        price: true,
                        discountPrice: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        if (!enrollment) {
            return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
        }

        return NextResponse.json({ enrollment });
    } catch (error) {
        console.error('Enrollment fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch enrollment' }, { status: 500 });
    }
}

// PUT — update enrollment status (admin confirms payment)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { role: true },
        });

        if (user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden — Admin only' }, { status: 403 });
        }

        const { id } = await params;
        const { status } = await request.json();

        if (!['ACTIVE', 'payment_pending', 'cancelled'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const enrollment = await db.enrollment.update({
            where: { id },
            data: { status },
            include: {
                course: { select: { id: true, title: true } },
                user: { select: { id: true, name: true, email: true } },
            },
        });

        return NextResponse.json({ enrollment });
    } catch (error) {
        console.error('Enrollment update error:', error);
        return NextResponse.json({ error: 'Failed to update enrollment' }, { status: 500 });
    }
}
