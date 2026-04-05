import { NextResponse } from 'next/server';
import { registerUser, registerSchema } from '@/services/authService';

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 5;
const WINDOW = 60 * 1000; // 1 minute

export async function POST(req: Request) {
    try {
        // Rate limiting
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const windowStart = now - WINDOW;

        const currentData = rateLimit.get(ip) || { count: 0, lastReset: now };
        if (currentData.lastReset < windowStart) {
            currentData.count = 0;
            currentData.lastReset = now;
        }

        if (currentData.count >= LIMIT) {
            return NextResponse.json(
                { error: 'Too many registration attempts. Please try again later.' },
                { status: 429 }
            );
        }

        currentData.count++;
        rateLimit.set(ip, currentData);

        // Validate and register
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid input. Ensure your password is at least 6 characters.' },
                { status: 400 }
            );
        }

        const user = await registerUser(parsed.data);

        return NextResponse.json(
            { message: 'User created successfully', userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred during registration';

        if (message === 'User with this email already exists') {
            return NextResponse.json({ error: message }, { status: 409 });
        }

        console.error('Registration error:', error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
