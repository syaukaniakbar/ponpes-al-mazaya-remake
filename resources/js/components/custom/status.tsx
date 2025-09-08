'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, UsersRound } from 'lucide-react';

type Stat = {
    value: number;
    label: string;
    icon: React.ElementType;
};

const stats: Stat[] = [
    { value: 4, label: 'Program Pendidikan', icon: BarChart3 },
    { value: 328, label: 'Santri Aktif', icon: Users },
    { value: 2, label: 'Guru', icon: UsersRound },
];

export default function Status() {
    return (
        <section className="relative z-10 bg-white py-20">
            <div className="mx-auto max-w-5xl px-6 md:px-12">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl"
                >
                    Sekilas Data <br /> Pondok Pesantren &nbsp; <span className="text-green-600">Al-Mazaya</span>
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mx-auto mb-12 max-w-2xl text-center text-gray-600"
                >
                    Sekilas data tentang program, santri, dan guru.
                </motion.p>

                {/* Stats grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="flex flex-col items-center rounded-2xl bg-green-50 p-10 shadow-sm transition hover:bg-green-100 hover:shadow-md"
                        >
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 shadow-lg">
                                <stat.icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="mb-2 text-4xl font-extrabold text-green-700">{stat.value}</div>
                            <p className="text-base font-medium text-green-900">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
