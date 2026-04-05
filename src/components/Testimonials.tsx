import { Star } from 'lucide-react';

const testimonials = [
    { name: 'Dr. Arjun Mehta', role: 'Resident, AIIMS Delhi', text: 'MedLearnPro completely transformed how I prepare for my clinical exams. The quality is unmatched.', rating: 5, avatar: '/avatar-1.jpg' },
    { name: 'Dr. Sneha Pillai', role: 'Cardiologist, Apollo Hospital', text: 'The cardiology course helped me understand complex cases better. The AI assistant is a game changer.', rating: 5, avatar: '/avatar-2.jpg' },
    { name: 'Dr. Vikram Singh', role: 'Emergency Physician, Manipal', text: 'Worth every rupee. The certificate is recognized by my hospital for CME credits.', rating: 5, avatar: '/avatar-3.jpg' },
];

export default function Testimonials() {
    return (
        <section className="section pb-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#f0f0f8]">
                        Trusted by <span className="gradient-text">50,000+ Doctors</span>
                    </h2>
                    <p className="text-[var(--text-secondary)]">Join the community that&apos;s changing healthcare education.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map(({ name, role, text, rating }) => (
                        <div key={name} className="card p-7">
                            <div className="flex gap-1 mb-4">
                                {[...Array(rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-5">&quot;{text}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white shrink-0">
                                    {name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-[#f0f0f8]">{name}</div>
                                    <div className="text-[var(--text-muted)] text-[13px]">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
