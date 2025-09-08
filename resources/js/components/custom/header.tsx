'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// ====== Type & Data ======
type HeroContent = {
    tagline: string;
    title: string;
    highlight: string;
    description: string;
    ctas: {
        label: string;
        variant: 'primary' | 'outline';
        href: string;
    }[];
};

const heroData: HeroContent = {
    tagline: 'Pendidikan Islam Modern',
    title: 'Selamat Datang di',
    highlight: 'Pondok Pesantren Al-Mazaya',
    description: 'Bersama membangun generasi Qur’ani yang berilmu, berakhlak mulia, dan siap menghadapi tantangan zaman.',
    ctas: [
        {
            label: 'Daftar Santri Baru',
            variant: 'primary',
            href: '/daftar',
        },
        {
            label: 'Kenal Lebih Dekat',
            variant: 'outline',
            href: '/tentang',
        },
    ],
};

// ====== Component ======
export default function Hero() {
    return (
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden text-center text-white">
            {/* Background */}
            <img
                src="images/dummy_header.jpg"
                alt="Pondok Pesantren Al-Mazaya"
                className="absolute inset-0 h-full w-full object-cover object-center blur-md"
                loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

            {/* Konten */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-5xl px-6"
            >
                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2 font-semibold tracking-wide text-green-300 uppercase"
                >
                    {heroData.tagline}
                </motion.p>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-4 text-3xl leading-tight font-bold md:text-6xl lg:text-7xl"
                >
                    {heroData.title} <span className="text-green-400">{heroData.highlight}</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6 text-base text-gray-200 md:text-xl"
                >
                    {heroData.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col justify-center gap-4 sm:flex-row"
                >
                    {heroData.ctas.map((cta, index) => (
                        <Button
                            key={index}
                            size="lg"
                            aria-label={cta.label}
                            className={`rounded-2xl px-8 py-4 text-lg ${
                                cta.variant === 'primary'
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'border border-white text-black hover:bg-white hover:text-black'
                            }`}
                        >
                            {cta.label}
                        </Button>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
