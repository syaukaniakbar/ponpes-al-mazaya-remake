'use client';

import { motion } from 'framer-motion';
import { BookOpen, Landmark, Plane, Users } from 'lucide-react';

// ====== Type & Data ======
type HistoryItem = {
    year: string;
    title: string;
    description: string;
    icon?: React.ElementType;
};

const historyData: HistoryItem[] = [
    {
        year: '2021',
        title: 'Pendirian Pesantren',
        description:
            'Pondok Pesantren Al Mazaya Paser didirikan pada pertengahan tahun 2021 oleh Ustadz H. Nashruddin, Lc, M.Pd atas arahan Dr. Habib Segaf Baharun.',
        icon: Landmark,
    },
    {
        year: '2021',
        title: 'Awal Perjalanan',
        description:
            'Awalnya menempati 2 rumah sewa untuk menampung santri Al Mazaya Center Paser yang akan melanjutkan studi ke Universitas Al Azhar, Mesir.',
        icon: Users,
    },
    {
        year: '2022',
        title: 'Santri ke Mesir',
        description:
            '6 santri pertama berangkat ke Universitas Al Azhar, Kairo. Februari 2022 dibuka pendaftaran santri baru, dan diterima 98 santri.',
        icon: Plane,
    },
    {
        year: '2023',
        title: 'Generasi Kedua',
        description: '12 santri tambahan menyusul ke Mesir, memperkuat kiprah Al Mazaya sebagai lembaga pendidikan Qur’ani dan akademik modern.',
        icon: BookOpen,
    },
];

export default function HistorySection() {
    return (
        <section className="z-10 bg-gradient-to-b from-white to-gray-50 py-28">
            <div className="mx-auto max-w-6xl px-7 md:px-12">
                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3 text-center text-sm font-medium tracking-wider text-green-600 uppercase"
                >
                    Sejarah
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 text-center text-4xl font-bold text-gray-900 md:text-5xl"
                >
                    Pondok Pesantren <span className="text-green-600">Al-Mazaya</span>
                </motion.h2>

                {/* Short description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mx-auto mb-16 max-w-2xl text-center text-base text-gray-600"
                >
                    Perjalanan Pondok Pesantren Al Mazaya sejak berdiri hingga kini, melahirkan generasi Qur’ani yang berwawasan global.
                </motion.p>

                {/* Timeline */}
                <div className="relative mx-auto max-w-3xl">
                    {/* vertical line */}
                    <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-green-300" />

                    <div className="space-y-16">
                        {historyData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className={`relative flex flex-col items-center md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Icon */}
                                <div className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-2 transform">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 shadow-lg">
                                        {item.icon && <item.icon className="h-6 w-6 text-white" />}
                                    </div>
                                </div>

                                {/* Card */}
                                <div className={`mt-12 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                                    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
                                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                            {item.year} — {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
