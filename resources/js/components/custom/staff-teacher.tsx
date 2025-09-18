'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Staff } from '../../types/index';
import '../../../css/swiper.css';

type Props = {
    staffs: Staff[];
};

export default function StaffSection({ staffs }: Props) {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [swiperReady, setSwiperReady] = useState(false);

    // Filter only active staff
    const activeStaffs = staffs.filter(staff => staff.status === 'active');

    useEffect(() => {
        setSwiperReady(true);
    }, []);

    // Show fallback message if no staff data
    if (activeStaffs.length === 0) {
        return (
            <section id="speech" className="relative bg-gray-50 py-28">
                <div className="mx-auto max-w-6xl px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-3 text-sm font-medium tracking-wider text-green-600 uppercase"
                    >
                        Tenaga Pendidik
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
                    >
                        Guru <span className="text-green-600">dan</span> Staff
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mx-auto mb-16 max-w-2xl text-base text-gray-600"
                    >
                        Tenaga pendidik berpengalaman dan berdedikasi untuk membimbing generasi Qur’ani yang unggul dalam ilmu dan akhlak.
                    </motion.p>

                    <div className="py-10 text-gray-500">
                        Data staff belum tersedia.
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="speech" className="relative bg-gray-50 py-28">
            <div className="mx-auto max-w-6xl px-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-3 text-sm font-medium tracking-wider text-green-600 uppercase"
                >
                    Tenaga Pendidik
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
                >
                    Guru <span className="text-green-600">dan</span> Staff
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-2xl text-base text-gray-600"
                >
                    Tenaga pendidik berpengalaman dan berdedikasi untuk membimbing generasi Qur’ani yang unggul dalam ilmu dan akhlak.
                </motion.p>

                {/* Navigation Buttons */}
                <div
                    ref={prevRef}
                    className="absolute top-120 left-2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-green-900 p-2 shadow-lg hover:bg-green-700 sm:left-4 md:left-6 lg:left-32"
                >
                    <ChevronLeft size={28} color="white" />
                </div>

                <div
                    ref={nextRef}
                    className="absolute top-120 right-2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-green-900 p-2 shadow-lg hover:bg-green-700 sm:right-4 md:right-6 lg:right-32"
                >
                    <ChevronRight size={28} color="white" />
                </div>

                {/* Swiper */}
                {swiperReady && (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            1280: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                            768: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                        }}
                    >
                        {activeStaffs.map((staff, idx) => (
                            <SwiperSlide key={staff.id || idx}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileFocus={{ scale: 1.05 }}
                                    tabIndex={0}
                                    role="group"
                                    aria-label={`Staff: ${staff.name}, ${staff.role}`}
                                    className="p-4"
                                >
                                    {/* Gambar + border */}
                                    <div className="relative overflow-hidden border-transparent transition-all duration-300 group-hover:border-green-400">
                                        <img
                                            src={staff.image_path ? `/storage/${staff.image_path}` : '/images/default-staff.jpg'}
                                            alt={`Photo of ${staff.name}, ${staff.role}`}
                                            className="h-64 w-full rounded-2xl object-cover transition-transform duration-500 sm:h-72"
                                        />

                                        {/* Overlay teks */}
                                        <div className="absolute inset-0 flex flex-col justify-end rounded-2xl bg-gradient-to-t from-black/70 to-transparent p-5">
                                            <h3 className="text-lg font-semibold text-white">{staff.name}</h3>
                                            <p className="truncate text-sm text-green-300">{staff.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}
