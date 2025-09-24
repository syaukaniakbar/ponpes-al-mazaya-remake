import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    image_url: string;
    created_at: string;
}

export interface BlogPaginator {
    data: Blog[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface Video {
    id: number;
    title: string;
    description: string;
    url: string;
}

export interface Staff {
    id: number;
    name: string;
    role: string;
    role_detail: string;
    nip: string;
    phone: string | null;
    image_path: string | null;
    joined_date: string;
    status: 'active' | 'inactive';
}

export interface StudentCount {
    id: number;
    angkatan: string;
    ma: number;
    mts: number;
    wustha: number;
    ulya: number;
    total_siswa: number;
}

export interface Header {
    id: number;
    title: string;
    description: string;
    button_text: string | null;
    button_url: string | null;
    image_url: string | null;
}
