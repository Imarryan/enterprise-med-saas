import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { buildCourseBookingMessage, sendWhatsAppMessage } from '@/lib/whatsapp';
import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  course: z.string().min(2),
  date: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid booking data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Save to database
    const booking = await db.whatsAppBooking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        course: data.course,
        date: data.date,
        notes: data.notes,
        status: 'pending_whatsapp',
      },
    });

    // Build WhatsApp URL
    const message = buildCourseBookingMessage(data);
    const whatsappUrl = sendWhatsAppMessage(message);

    // Update record with URL
    await db.whatsAppBooking.update({
      where: { id: booking.id },
      data: { whatsappUrl },
    });

    return NextResponse.json({ success: true, whatsappUrl, bookingId: booking.id }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await db.whatsAppBooking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
