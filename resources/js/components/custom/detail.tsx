import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, MessageCircle, X as XIcon } from 'lucide-react';
import { route } from 'ziggy-js';
import type { Blog } from '../../types/index';
import { Button } from '../ui/button';

type Props = {
    blog: Blog;
};

export default function Detail({ blog }: Props) {
    const wordCount = blog.description.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <article className="relative mt-18 bg-white py-18">
            {/* Hero */}
            <section className="relative mx-auto flex h-[60vh] justify-center overflow-hidden">
                {/* Image container relative */}
                <div className="relative h-full w-full max-w-5xl">
                    <img
                        src={blog.image_url}
                        alt={blog.title || `Ilustrasi terkait artikel: ${blog.title}`}
                        className="h-full w-full rounded-2xl object-cover"
                        loading="lazy"
                    />

                    {/* Back Button overlay di atas gambar */}
                    <Button asChild className="absolute top-4 left-4 z-50">
                        <motion.div
                            className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow backdrop-blur transition-colors hover:bg-white"
                            whileHover={{ scale: 1.05, x: -3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href={route('blog.index')} className="flex items-center gap-2" aria-label="Kembali ke daftar blog">
                                <ArrowLeft size={16} />
                                <span>Kembali</span>
                            </Link>
                        </motion.div>
                    </Button>
                </div>
            </section>

            {/* Konten */}
            <section className="mx-auto max-w-3xl px-6 py-12">
                {/* Header */}
                <motion.div className="mb-8 text-left" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    {/* Category */}
                    <span className="inline-block rounded bg-green-100 px-3 py-1 text-xs font-semibold tracking-wide text-green-600 uppercase">
                        {blog.category}
                    </span>

                    {/* Title */}
                    <h1 className="mt-3 text-xl leading-snug font-extrabold text-gray-900 sm:text-3xl">{blog.title}</h1>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <span>
                            Dipublikasikan pada{' '}
                            {new Date(blog.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{readingTime} menit baca</span>
                    </div>
                </motion.div>

                {/* Isi artikel */}
                <motion.div
                    className="prose prose-lg prose-green max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                />

                {/* Share */}
                <motion.div
                    className="mt-12 border-t pt-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <p className="mb-4 text-sm font-medium text-gray-600">Bagikan artikel ini:</p>
                    <div className="flex flex-wrap gap-3">
                        {/* X / Twitter */}
                        <motion.a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                blog.title,
                            )}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded bg-black px-4 py-2 text-white hover:bg-neutral-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <XIcon size={16} />
                            <span className="text-sm font-medium">Twitter / X</span>
                        </motion.a>

                        {/* WhatsApp */}
                        <motion.a
                            href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MessageCircle size={16} />
                            <span className="text-sm font-medium">WhatsApp</span>
                        </motion.a>

                        {/* LinkedIn */}
                        <motion.a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Linkedin size={16} />
                            <span className="text-sm font-medium">LinkedIn</span>
                        </motion.a>
                    </div>
                </motion.div>
            </section>
        </article>
    );
}
