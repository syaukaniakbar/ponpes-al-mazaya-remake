import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { Button } from '../ui/button';

export interface NavItem {
    title: string;
    href: string;
}

const navItemsData: NavItem[] = [
    { title: 'Beranda', href: route('main') },
    { title: 'Tentang Al-Mazaya', href: route('about-us') },
    { title: 'Al-Mazaya Blog', href: route('blog.index') },
];

const ctaItems: NavItem[] = [
    { title: 'Pendaftaran', href: route('pendaftaran.register-create') },
    { title: 'Cek Status Pendaftaran', href: route('pendaftaran.register-status') },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    // Handle scroll lock saat mobile menu terbuka
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Fungsi untuk mengecek apakah link aktif
    const checkActive = (href: string) => {
        try {
            const currentPath = new URL(url, window.location.origin).pathname.replace(/\/$/, '');
            const linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '');
            return currentPath === linkPath;
        } catch {
            return false;
        }
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img src="/images/logo_al_mazaya.png" alt="Logo Al-Mazaya" className="h-10 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center space-x-6 font-medium text-gray-700 md:flex">
                    {navItemsData.map(({ title, href }) => {
                        const isActive = checkActive(href);
                        return (
                            <Link
                                key={title}
                                href={href}
                                className={`flex items-center space-x-2 transition-colors ${
                                    isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'
                                }`}
                            >
                                <span>{title}</span>
                            </Link>
                        );
                    })}

                    {/* CTA Buttons */}
                    {ctaItems.map(({ title, href }) => (
                        <Button key={title} asChild className="bg-green-600 text-white hover:bg-green-700">
                            <Link href={href}>{title}</Link>
                        </Button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    aria-label="Toggle navigation"
                    className="z-50 rounded-lg p-2 text-black hover:bg-gray-100 md:hidden"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 mt-18 w-full bg-black/50 md:hidden"
                        onClick={() => setIsOpen(false)} // close jika klik background
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="absolute top-0 right-0 h-full w-full max-w-full bg-white shadow-lg"
                            onClick={(e) => e.stopPropagation()} // klik di dalam tidak menutup
                        >
                            <div className="flex flex-col space-y-6 px-6 py-6">
                                {navItemsData.map(({ title, href }) => {
                                    const isActive = checkActive(href);
                                    return (
                                        <Link
                                            key={title}
                                            href={href}
                                            className={`flex items-center space-x-2 text-lg transition-colors ${
                                                isActive ? 'font-semibold text-black' : 'text-gray-700 hover:text-black'
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="ml-2">{title}</span>
                                        </Link>
                                    );
                                })}

                                <div className="space-y-3 border-t pt-4">
                                    {ctaItems.map(({ title, href }) => (
                                        <Button key={title} asChild className="w-full bg-green-600 text-white hover:bg-green-700">
                                            <Link href={href}>{title}</Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
