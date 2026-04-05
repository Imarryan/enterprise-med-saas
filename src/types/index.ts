// ─── Global TypeScript Types ──────────────────────────────────────────────────

export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'SUSPENDED';
export type PaymentGateway = 'razorpay' | 'stripe';
export type VideoProvider = 'youtube' | 'vimeo' | 'bunny' | 'mux';

export interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role: Role;
    phone?: string | null;
    isActive: boolean;
    createdAt: Date;
}

export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail?: string | null;
    price: number;
    discountPrice?: number | null;
    currency: string;
    level: CourseLevel;
    status: CourseStatus;
    isFeatured: boolean;
    duration?: number | null;
    category?: string | null;
    tags: string[];
    createdAt: Date;
}

export interface Section {
    id: string;
    title: string;
    position: number;
    courseId: string;
    lectures?: Lecture[];
}

export interface Lecture {
    id: string;
    title: string;
    description?: string | null;
    position: number;
    duration?: number | null;
    videoUrl?: string | null;
    videoProvider?: VideoProvider | null;
    isFree: boolean;
    sectionId: string;
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    status: EnrollmentStatus;
    progress: number;
    createdAt: Date;
    course?: Course;
}

export interface Payment {
    id: string;
    userId: string;
    courseId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    gateway: PaymentGateway;
    gatewayOrderId?: string | null;
    createdAt: Date;
}

export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    issueDate: Date;
    certificateUrl?: string | null;
    verifyToken: string;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}
