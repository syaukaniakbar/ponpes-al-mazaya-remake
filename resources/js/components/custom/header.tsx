'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Header as HeaderType } from '../../types/index';

type Props = {
    headers: HeaderType[];
};

export default function HeaderSection({ headers }: Props) {
    const [isReady, setIsReady] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        setIsReady(true);
    }, []);

    // Filter out headers without image_url
    const validHeaders = headers.filter((header) => header.image_url);

    if (!validHeaders || validHeaders.length === 0) {
        return (
            <section id="headers" className="mt-18 bg-gray-50 py-24">
                <div className="text-center text-gray-500">Tidak ada header yang tersedia.</div>
            </section>
        );
    }

    return (
        <section id="headers" className="mt-18 bg-gray-50">
            <div className="relative mx-auto text-center">
                {isReady && (
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {validHeaders.map((header) => (
                            <SwiperSlide key={header.id}>
                                <div className="relative overflow-hidden">
                                    {/* Gambar dengan zoom-in animasi */}
                                    <img
                                        src={header.image_url ? `/storage/${header.image_url}` : '/images/default-header.jpg'}
                                        alt={header.title}
                                        className="h-80 w-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105 sm:h-96 md:h-[700px]"
                                        loading="lazy"
                                    />
                                    
                                    {/* Overlay content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center text-white md:p-8">
                                        <h1 className="mb-4 text-2xl font-bold md:text-4xl lg:text-5xl">
                                            {header.title}
                                        </h1>
                                        <p className="mb-6 max-w-3xl text-sm md:text-lg">
                                            {header.description}
                                        </p>
                                        {header.button_text && header.button_url && (
                                            <a
                                                href={header.button_url}
                                                className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700 md:px-8 md:py-4"
                                            >
                                                {header.button_text}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* Custom pagination */}
                <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
                    {validHeaders.map((_, idx) => (
                        <button
                            key={idx}
                            className={clsx(
                                'h-2 w-2 rounded-full transition-all focus:ring-2 focus:ring-green-400 focus:outline-none',
                                activeIndex === idx ? 'scale-125 bg-green-500' : 'bg-gray-300',
                            )}
                            onClick={() => swiperRef.current?.slideToLoop(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
