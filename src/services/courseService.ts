import { db } from '@/lib/db';

// ─── Course Queries ───────────────────────────────────────────────────────────

export async function getAllCourses() {
    return db.course.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            sections: {
                include: {
                    lectures: {
                        select: { id: true, title: true, duration: true, isFree: true },
                    },
                },
                orderBy: { position: 'asc' },
            },
            _count: {
                select: { enrollments: true },
            },
        },
    });
}

export async function getFeaturedCourses(limit = 6) {
    return db.course.findMany({
        where: { status: 'PUBLISHED', isFeatured: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
            _count: {
                select: { enrollments: true },
            },
        },
    });
}

export async function getCourseBySlug(slug: string) {
    return db.course.findUnique({
        where: { slug },
        include: {
            sections: {
                include: {
                    lectures: {
                        orderBy: { position: 'asc' as const },
                    },
                },
                orderBy: { position: 'asc' as const },
            },
            _count: {
                select: { enrollments: true },
            },
        },
    });
}

export async function getCourseById(id: string) {
    return db.course.findUnique({
        where: { id },
        include: {
            sections: {
                include: { lectures: { orderBy: { position: 'asc' } } },
                orderBy: { position: 'asc' },
            },
            _count: {
                select: { enrollments: true },
            },
        },
    });
}

export async function searchCourses(query: string, category?: string) {
    return db.course.findMany({
        where: {
            status: 'PUBLISHED',
            ...(query && {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            }),
            ...(category && { category }),
        },
        orderBy: { createdAt: 'desc' },
        include: {
            _count: { select: { enrollments: true } },
        },
    });
}
