import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// ─── Service Functions ────────────────────────────────────────────────────────

export async function registerUser(data: z.infer<typeof registerSchema>) {
    const existing = await db.user.findUnique({
        where: { email: data.email },
    });

    if (existing) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: hashedPassword,
            phone: data.phone,
            role: 'STUDENT',
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}

export async function verifyCredentials(email: string, password: string) {
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user || !user.passwordHash) {
        throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
        throw new Error('This account has been deactivated');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
    };
}

export async function getUserById(id: string) {
    return db.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            phone: true,
            isActive: true,
            createdAt: true,
        },
    });
}
