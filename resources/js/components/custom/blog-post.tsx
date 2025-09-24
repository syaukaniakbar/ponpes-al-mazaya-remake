// components/BlogSection.tsx
'use client';

import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import type { Blog } from '../../types';

// ✅ Variants reusable
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
};

// hook debounce
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

type Props = {
    blogs: {
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
    };
};

export default function BlogSection({ blogs }: Props) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 400);

    // Use the paginated blogs data directly, but filter based on search if needed
    const blogData = blogs.data; // Extract the actual blog data from the paginator
    const filteredBlogs = blogData.filter((post) => post.title.toLowerCase().includes(debouncedSearch.toLowerCase()));

    return (
        <section className="relative bg-white py-16">
            <div className="mx-auto max-w-6xl px-6">
                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-10 flex justify-center"
                >
                    <div className="relative w-full max-w-md">
                        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" size={20} aria-hidden="true" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari artikel blog berdasarkan judul..."
                            aria-label="Cari artikel blog"
                            className="w-full rounded-full border border-gray-300 py-3 pr-4 pl-10 text-sm text-black shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                </motion.div>

                {/* Blog */}
                <AnimatePresence mode="wait">
                    {filteredBlogs.length > 0 ? (
                        <motion.div
                            key="blog-grid"
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={containerVariants}
                            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {filteredBlogs.map((post: Blog) => (
                                <Link
                                    key={post.id}
                                    href={route('blog.show', { category: post.category, slug: post.slug })} // ⬅️ Link ke detail blog
                                    className="block"
                                >
                                    <motion.article
                                        variants={cardVariants}
                                        transition={{ duration: 0.4 }}
                                        whileHover={{ scale: 1.03, y: -4 }}
                                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                                    >
                                        <img
                                            src={post.image_url}
                                            alt={post.title || 'Blog thumbnail'}
                                            className="h-48 w-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-5">
                                            <span className="inline-block rounded bg-green-200 px-2 py-1 text-xs font-medium text-green-600 uppercase">
                                                {post.category}
                                            </span>
                                            <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-gray-900">{post.title}</h2>
                                            <p
                                                className="mt-2 line-clamp-3 text-xs text-gray-700 md:text-sm"
                                                dangerouslySetInnerHTML={{
                                                    __html: post.description,
                                                }}
                                            ></p>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-100">
                                <Search size={36} className="text-green-600" aria-hidden="true" />
                            </div>
                            <p className="text-lg font-medium text-gray-800">Tidak ada artikel ditemukan</p>
                            <p className="mt-2 text-sm text-gray-500">Coba gunakan kata kunci lain atau cek kembali nanti.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-12 flex flex-wrap justify-center gap-2"
                >
                    {blogs.prev_page_url && (
                        <a
                            href={blogs.prev_page_url}
                            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            ← Previous
                        </a>
                    )}
                    {blogs.links
                        .filter(
                            (link: { url: string | null; label: string; active: boolean }) =>
                                link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;',
                        ) // Filter out the default prev/next labels
                        .map((link: { url: string | null; label: string; active: boolean }, index: number) =>
                            link.url ? (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                        link.active ? 'bg-green-600 text-white shadow' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                                        link.active ? 'bg-green-600 text-white shadow' : 'border border-gray-300 text-gray-700'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ),
                        )}
                    {blogs.next_page_url && (
                        <a
                            href={blogs.next_page_url}
                            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Next →
                        </a>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
