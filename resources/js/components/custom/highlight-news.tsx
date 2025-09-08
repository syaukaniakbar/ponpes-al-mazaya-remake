import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { route } from 'ziggy-js';
import type { Blog } from '../../types/index';

type Props = {
    blogs: Blog[];
};

export default function NewsSection({ blogs }: Props) {
    return (
        <section className="relative z-10 bg-gray-50 py-28">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <motion.div className="mb-16 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="text-sm font-medium tracking-wide text-green-600 uppercase"
                    >
                        Berita Terbaru
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl"
                    >
                        Highlight <span className="text-green-600">News</span>
                    </motion.h2>
                </motion.div>

                {/* Content */}
                {blogs.length === 0 ? (
                    // Fallback jika tidak ada data
                    <div className="py-20 text-center text-gray-500">Tidak ada berita terbaru saat ini.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Featured News */}
                        {blogs[0] && (
                            <motion.a
                                href={route('blog.show', blogs[0].slug)}
                                aria-label={`Read more about ${blogs[0].title}`}
                                className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl shadow-lg transition-shadow hover:shadow-2xl md:col-span-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={blogs[0].image_url}
                                    alt={blogs[0].title}
                                    loading="lazy"
                                    className="h-80 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 md:h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-green-900/90 to-transparent p-6 text-white md:p-9">
                                    <span className="rounded bg-white p-2 text-sm font-semibold text-green-900 uppercase">{blogs[0].category}</span>
                                    <h3 className="mt-6 line-clamp-2 text-xl font-bold md:text-2xl">{blogs[0].title}</h3>
                                    <p
                                        className="mt-4 line-clamp-3 text-xs md:text-sm"
                                        dangerouslySetInnerHTML={{ __html: blogs[0].description }}
                                    ></p>
                                </div>
                            </motion.a>
                        )}

                        {/* Smaller News Cards */}
                        {blogs.slice(1).map((blog, idx) => (
                            <motion.a
                                key={blog.id}
                                href={route('blog.show', blog.slug)}
                                aria-label={`Read more about ${blog.title}`}
                                className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={blog.image_url}
                                    alt={blog.title}
                                    loading="lazy"
                                    className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                                <div className="p-4">
                                    <span className="text-xs font-semibold text-green-600 uppercase">{blog.category}</span>
                                    <h3 className="mt-1 line-clamp-2 text-lg font-bold text-gray-900">{blog.title}</h3>
                                    <p className="mt-1 line-clamp-3 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}

                {/* CTA */}
                {blogs.length > 0 && (
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href={route('blog.index')}
                            className="inline-block rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-green-700"
                        >
                            Lihat Semua Berita
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
