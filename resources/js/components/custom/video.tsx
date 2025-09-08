import { motion } from 'framer-motion';
import React from 'react';

interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: string;
    views: string;
    channelTitle: string;
}

const VideoCard: React.FC = () => {
    // Data dummy video utama
    const video: Video = {
        id: '1',
        title: 'Big Buck Bunny - Video Pembelajaran',
        thumbnailUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '8:18',
        views: '24,969,123',
        channelTitle: 'Ponpes Al-Mazaya',
    };

    return (
        <section className="relative z-10 bg-white py-28">
            <div className="mx-auto max-w-6xl px-6 text-center">
                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-3 text-sm font-medium tracking-wider text-green-600 uppercase"
                >
                    Video Unggulan
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl"
                >
                    Tonton <span className="text-green-600">Video Terbaru</span>
                </motion.h2>

                {/* Video Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group mx-auto max-w-3xl cursor-pointer overflow-hidden rounded-xl shadow-lg"
                    onClick={() => alert(`Klik video: ${video.title}`)}
                >
                    {/* Thumbnail */}
                    <div className="relative">
                        <img src={video.thumbnailUrl} alt={video.title} className="w-full object-cover" />

                        {/* Overlay Play Icon */}
                        <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.054v5.892a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="bg-white p-6 text-left">
                        <h3 className="text-2xl font-bold text-gray-900">{video.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {video.duration} | {video.views} views
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{video.channelTitle}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoCard;
