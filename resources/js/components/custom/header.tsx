'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Header = {
    id: string;
    photo: string;
    title: string;
    description: string;
};

const headers: Header[] = [
    {
        id: '1',
        photo: '/images/header1.jpg',
        title: 'Two Students of Al Mazaya Islamic Junior High School Banjarmasin Seize the Golden Opportunity to Speak at RRI',
        description:
            'Nanda Syifa Khumaira and Rahma Kamila, two outstanding students of Al Mazaya Islamic Junior High School Banjarmasin, won a golden opportunity to speak at RRI!',
    },
    {
        id: '1',
        photo: '/images/header1.jpg',
        title: 'Two Students of Al Mazaya Islamic Junior High School Banjarmasin Seize the Golden Opportunity to Speak at RRI',
        description:
            'Nanda Syifa Khumaira and Rahma Kamila, two outstanding students of Al Mazaya Islamic Junior High School Banjarmasin, won a golden opportunity to speak at RRI!',
    },
];

export default function HeaderSection() {
    const [isReady, setIsReady] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!headers || headers.length === 0) {
        return (
            <section id="headers" className="mt-18 bg-gray-50 py-24">
                <div className="text-center text-gray-500">Tidak ada gambar header yang tersedia.</div>
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
                        {headers.map((header, idx) => (
                            <SwiperSlide key={header.id}>
                                <div className="relative overflow-hidden">
                                    {/* Gambar dengan zoom-in animasi */}
                                    <img
                                        src={header.photo}
                                        alt={header.title}
                                        className="h-80 w-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105 sm:h-96 md:h-[700px]"
                                        loading="lazy"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* Custom pagination */}
                <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
                    {headers.map((_, idx) => (
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
