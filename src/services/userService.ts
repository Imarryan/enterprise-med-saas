import { db } from '@/lib/db';

// ─── User Queries ─────────────────────────────────────────────────────────────

export async function getAllUsers(page = 1, perPage = 20) {
    const [users, total] = await Promise.all([
        db.user.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                _count: { select: { enrollments: true } },
            },
        }),
        db.user.count(),
    ]);

    return {
        data: users,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
    };
}

export async function getUserEnrollments(userId: string) {
    return db.enrollment.findMany({
        where: { userId },
        include: {
            course: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnail: true,
                    duration: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
}

export async function updateUserRole(userId: string, role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN') {
    return db.user.update({
        where: { id: userId },
        data: { role },
        select: { id: true, name: true, email: true, role: true },
    });
}

export async function deactivateUser(userId: string) {
    return db.user.update({
        where: { id: userId },
        data: { isActive: false },
        select: { id: true, email: true, isActive: true },
    });
}

export async function getDashboardStats() {
    const [totalUsers, totalCourses, totalEnrollments] = await Promise.all([
        db.user.count(),
        db.course.count(),
        db.enrollment.count(),
    ]);

    return { totalUsers, totalCourses, totalEnrollments };
}
