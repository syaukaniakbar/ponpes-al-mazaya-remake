// components/BlogHeader.tsx
'use client';

import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { route } from 'ziggy-js';

const categories = ['Prestasi', 'Umum', 'Ilmiah'];

type Props = {
    selectedCategory?: string;
};

export default function BlogHeader({ selectedCategory }: Props) {
    return (
        <section className="mt-18 bg-gradient-to-b from-white to-gray-50 py-20">
            <div className="mx-auto max-w-5xl px-6 text-center">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                >
                    AL-MAZAYA <span className="text-green-600">BLOG</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                    className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 sm:text-xl"
                >
                    Meraih Ilmu, Membentuk Akhlak, Menggapai Ridha Ilahi.
                </motion.p>

                {/* Categories */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
                >
                    <Link 
                        href={route('blog.index')} 
                        className={`relative text-base font-medium transition-colors ${
                            !selectedCategory ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                        }`}
                    >
                        Semua
                        <motion.span
                            layoutId="underline"
                            className="absolute -bottom-1 left-0 h-[2px] w-0 bg-green-600"
                            initial={false}
                            animate={!selectedCategory ? { width: '100%' } : { width: '0%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                    </Link>
                    {categories.map((cat) => (
                        <Link 
                            key={cat} 
                            href={route('blog.index', { category: cat.toLowerCase() })} 
                            className={`relative text-base font-medium transition-colors ${
                                selectedCategory === cat.toLowerCase() ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                            }`}
                        >
                            {cat}
                            <motion.span
                                layoutId="underline"
                                className="absolute -bottom-1 left-0 h-[2px] w-0 bg-green-600"
                                initial={false}
                                animate={selectedCategory === cat.toLowerCase() ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </Link>
                    ))}
                </motion.nav>
            </div>
        </section>
    );
}
