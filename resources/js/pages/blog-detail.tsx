// pages/BlogDetail.tsx
import Detail from '@/components/custom/detail';
import MainLayout from '@/layouts/main-layout';
import type { Blog } from '@/types';
import { usePage } from '@inertiajs/react';

export default function BlogDetailPage() {
    // Ambil data blog dari Inertia
    const { blog } = usePage<{ blog: Blog }>().props;

    return (
        <MainLayout title={`${blog.title} | Ponpes Al-Mazaya`} description={blog.description}>
            <Detail blog={blog} />
        </MainLayout>
    );
}
