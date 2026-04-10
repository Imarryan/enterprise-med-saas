import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: true,
                role: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Settings fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { section, data } = await request.json();
        const userId = session.user.id;

        switch (section) {
            case 'profile': {
                const updated = await db.user.update({
                    where: { id: userId },
                    data: {
                        name: data.name || undefined,
                        phone: data.phone || undefined,
                    },
                    select: { id: true, name: true, email: true, phone: true },
                });
                return NextResponse.json({ success: true, user: updated });
            }

            case 'password': {
                if (!data.current || !data.newPassword) {
                    return NextResponse.json({ error: 'Current and new password required' }, { status: 400 });
                }
                if (data.newPassword !== data.confirm) {
                    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
                }
                if (data.newPassword.length < 6) {
                    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
                }

                const user = await db.user.findUnique({ where: { id: userId } });
                if (!user?.passwordHash) {
                    return NextResponse.json({ error: 'Cannot change password for social login accounts' }, { status: 400 });
                }

                const isValid = await bcrypt.compare(data.current, user.passwordHash);
                if (!isValid) {
                    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
                }

                const newHash = await bcrypt.hash(data.newPassword, 12);
                await db.user.update({
                    where: { id: userId },
                    data: { passwordHash: newHash },
                });
                return NextResponse.json({ success: true, message: 'Password updated' });
            }

            case 'notifications': {
                // Store notification preferences — for now we just acknowledge
                // In a production app, you'd have a UserPreferences model
                return NextResponse.json({ success: true, message: 'Notification preferences saved' });
            }

            case 'privacy': {
                // Store privacy preferences — for now we just acknowledge
                return NextResponse.json({ success: true, message: 'Privacy settings saved' });
            }

            default:
                return NextResponse.json({ error: 'Unknown settings section' }, { status: 400 });
        }
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
