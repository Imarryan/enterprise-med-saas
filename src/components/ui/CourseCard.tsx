import Link from 'next/link';
import { BookOpen, Star, Users, Clock, Play } from 'lucide-react';

interface Course {
    id: string | number;
    title: string;
    instructor: string;
    price: number;
    originalPrice: number;
    rating: number;
    students: number;
    duration: string;
    level: string;
    category?: string;
    tag?: string;
}

export function CourseCard({ course, showCategory = true }: { course: Course; showCategory?: boolean }) {
    return (
        <Link href={`/courses/${course.id}`} className="block h-full no-underline text-inherit rounded-xl group">
            <div className="card h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(124,58,237,0.15)] hover:border-cyan-500/40 border border-[var(--border)] bg-[var(--bg-elevated)]">

                {/* Thumbnail */}
                <div className="relative h-[180px] flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                    <BookOpen size={48} className="text-white/15" />

                    {course.tag && (
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white
                            ${course.tag === 'Bestseller' ? 'bg-amber-500' : course.tag === 'New' ? 'bg-emerald-500' : 'bg-violet-600'}`
                        }>
                            {course.tag}
                        </div>
                    )}

                    {/* Hover Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <Play size={18} className="text-violet-600 ml-1" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    {showCategory && course.category && (
                        <div className="flex gap-2 mb-2">
                            <span className="badge bg-white/5 text-[var(--text-secondary)] px-2 py-0.5 text-[11px]">{course.category}</span>
                            <span className="badge bg-white/5 text-[var(--text-secondary)] px-2 py-0.5 text-[11px]">{course.level}</span>
                        </div>
                    )}

                    <h3 className="text-base font-bold mb-2 leading-tight text-[#f0f0f8]">{course.title}</h3>
                    <p className="text-[var(--text-secondary)] text-[13px] mb-4">By {course.instructor}</p>

                    <div className="flex gap-4 mb-5">
                        <span className="flex items-center gap-1 text-[13px] font-semibold text-amber-500">
                            <Star size={13} className="fill-amber-500" /> {course.rating}
                        </span>
                        <span className="flex items-center gap-1 text-[13px] text-[var(--text-muted)]">
                            <Users size={12} /> {course.students.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-[13px] text-[var(--text-muted)]">
                            <Clock size={12} /> {course.duration}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <span className="text-xl font-extrabold text-[#f0f0f8]">₹{course.price.toLocaleString()}</span>
                            <span className="text-[13px] text-[var(--text-muted)] line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
                        </div>
                        {!showCategory && (
                            <span className="btn-primary px-4 py-2 text-[13px]">Enroll Now</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
