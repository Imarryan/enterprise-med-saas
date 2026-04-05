'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { CourseCard } from '@/components/ui/CourseCard';

const allCourses = [
    { id: 1, title: 'Advanced Cardiology for Practitioners', instructor: 'Dr. Priya Sharma', price: 4999, originalPrice: 9999, rating: 4.9, students: 8200, duration: '42 hours', level: 'Advanced', category: 'Cardiology', tag: 'Bestseller' },
    { id: 2, title: 'Emergency Medicine & Critical Care', instructor: 'Dr. Rahul Gupta', price: 3499, originalPrice: 7999, rating: 4.8, students: 5600, duration: '35 hours', level: 'Intermediate', category: 'Emergency', tag: 'New' },
    { id: 3, title: 'Neurology: From Basics to Advanced', instructor: 'Dr. Meera Iyer', price: 5999, originalPrice: 11999, rating: 4.9, students: 3100, duration: '58 hours', level: 'Advanced', category: 'Neurology', tag: 'Top Rated' },
    { id: 4, title: 'Pediatric Infectious Diseases', instructor: 'Dr. Anil Kumar', price: 2999, originalPrice: 5999, rating: 4.7, students: 4200, duration: '24 hours', level: 'Intermediate', category: 'Pediatrics', tag: '' },
    { id: 5, title: 'Fundamentals of Clinical Radiology', instructor: 'Dr. Sarah Johnson', price: 3999, originalPrice: 8999, rating: 4.8, students: 6500, duration: '40 hours', level: 'Beginner', category: 'Radiology', tag: 'Popular' },
    { id: 6, title: 'Surgical Skills Practicum', instructor: 'Dr. Rajesh Singh', price: 7999, originalPrice: 14999, rating: 5.0, students: 1200, duration: '60 hours', level: 'Advanced', category: 'Surgery', tag: 'Premium' }
];

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Cardiology', 'Emergency', 'Neurology', 'Pediatrics', 'Radiology', 'Surgery'];

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-[72px] pb-[100px]">
            {/* Header */}
            <section className="py-10 bg-gradient-to-b from-violet-600/5 to-transparent">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#f0f0f8]">
                        Explore <span className="gradient-text">Premium Courses</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mb-10">
                        Enhance your medical knowledge with our expertly crafted, verifiable certificate courses.
                    </p>

                    {/* Search and Filter */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1 min-w-[300px] relative bg-[var(--bg-elevated)] rounded-xl border border-[var(--border)] flex items-center px-4 transition-colors duration-200 focus-within:border-violet-500">
                            <Search size={20} className="text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search courses, specialties, or instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3.5 px-3 bg-transparent border-none text-[#f0f0f8] outline-none text-[15px] placeholder:text-[var(--text-muted)]"
                            />
                        </div>
                        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 shrink-0 max-w-full">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer
                                        ${activeCategory === cat ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white border-transparent' : 'bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-violet-500/50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Grid */}
            <section className="pt-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#f0f0f8]">{filteredCourses.length} Courses Found</h2>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border)]">
                            <Search size={48} className="text-white/10 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-[#f0f0f8]">No courses found</h3>
                            <p className="text-[var(--text-secondary)]">Try adjusting your search query or filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
