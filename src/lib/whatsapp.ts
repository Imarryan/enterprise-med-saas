const WHATSAPP_PHONE = '919981891051';

export function sendWhatsAppMessage(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

export function buildCourseBookingMessage(data: {
  name: string;
  email: string;
  phone: string;
  course: string;
  date: string;
  notes?: string;
}): string {
  return `🎓 *New Course Booking Request*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
📚 *Course:* ${data.course}
📅 *Preferred Date:* ${data.date}${data.notes ? `\n📝 *Notes:* ${data.notes}` : ''}

Please confirm this booking. Thank you!`;
}

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_PHONE}`;
