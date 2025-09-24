import BlogHeader from '@/components/custom/blog-header';
import Blogs from '@/components/custom/blog-post';
import MainLayout from '@/layouts/main-layout';
import { usePage } from '@inertiajs/react';
import type { Blog } from '../types/index';

type Props = {
    blogs: Blog[];
};

export default function Blog() {
    const { blogs, selectedCategory } = usePage<Props & { selectedCategory?: string }>().props;

    return (
        <MainLayout title="Blog | Ponpes Al-Mazaya" description="Al-Mazaya Blog">
            <BlogHeader selectedCategory={selectedCategory} />
            <Blogs blogs={blogs} />
        </MainLayout>
    );
}
