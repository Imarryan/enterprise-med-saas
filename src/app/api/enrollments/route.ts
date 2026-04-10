import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET — list authenticated user's enrollments
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const enrollments = await db.enrollment.findMany({
            where: { userId: session.user.id },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        thumbnail: true,
                        duration: true,
                        level: true,
                        category: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ enrollments });
    } catch (error) {
        console.error('Enrollments fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
    }
}

// POST — create a new enrollment
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { courseId } = await request.json();
        if (!courseId) {
            return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
        }

        // Check if course exists
        const course = await db.course.findUnique({ where: { id: courseId } });
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Check for existing enrollment
        const existing = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
        });

        if (existing) {
            return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 409 });
        }

        const enrollment = await db.enrollment.create({
            data: {
                userId: session.user.id,
                courseId,
                status: 'ACTIVE',
                amount: Number(course.discountPrice ?? course.price),
            },
            include: {
                course: {
                    select: { id: true, title: true, slug: true },
                },
            },
        });

        return NextResponse.json({ enrollment }, { status: 201 });
    } catch (error) {
        console.error('Enrollment creation error:', error);
        return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 });
    }
}
