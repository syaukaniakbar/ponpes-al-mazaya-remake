// AboutUs.tsx
import { motion } from 'framer-motion';
import React, { useCallback } from 'react';

export function useScrollTo() {
    return useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
}

const About: React.FC = () => {
    const scrollTo = useScrollTo();
    return (
        <section className="mt-18 bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Image / Illustration */}
                    <motion.div
                        className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg lg:h-[28rem]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="/images/blog.jpg" // replace with your image
                            alt="Pondok Pesantren Al Mazaya"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Tentang Al-Mazaya</h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-700">
                            Pondok Pesantren Al Mazaya Paser, yang didirikan pada 2021 oleh H. Nashruddin, Lc, M.Pd, bertujuan mencetak generasi yang
                            berilmu, beriman, dan berakhlak. Terletak di Desa Sempulang, Tanah Grogot, Paser, pesantren ini berafiliasi dengan
                            Nahdhatul Ulama dan mengelola MTs serta MA.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-gray-700">
                            Al Mazaya menawarkan pendidikan yang mengintegrasikan ilmu agama, bahasa Arab dan Inggris, serta teknologi. Pendidikan
                            dibagi dalam tiga tingkatan: Ûlâ, Wushtha, dan Úlya.
                        </p>
                        <button
                            onClick={() => scrollTo('speech')}
                            className="mt-8 cursor-pointer rounded-lg bg-green-900 px-6 py-3 text-white shadow-md transition hover:bg-green-800"
                        >
                            Sambutan Pimpinan
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
