import { NextResponse } from 'next/server';
import { getAllCourses, searchCourses } from '@/services/courseService';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q') || '';
        const category = searchParams.get('category') || '';

        const courses = query || category
            ? await searchCourses(query, category || undefined)
            : await getAllCourses();

        return NextResponse.json(courses);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}
