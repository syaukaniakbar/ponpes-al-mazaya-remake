import { motion } from 'framer-motion';
import React from 'react';
import type { Video } from '../../types/index';

type Props = {
    videos: Video[];
};

// Function to extract YouTube video ID from various YouTube URL formats
const getYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

// Function to generate YouTube thumbnail URL
const getYouTubeThumbnail = (url: string): string => {
    const videoId = getYoutubeVideoId(url);
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    // Default thumbnail if not a valid YouTube URL
    return '/images/default-video-thumbnail.jpg';
};

// Default YouTube channel URL
const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/@ponpesalmazaya';

const VideoCard: React.FC<Props> = ({ videos }) => {
    // Filter out any videos without URLs or use default
    const validVideos = videos.filter((video) => video.url && video.url.trim() !== '');

    if (validVideos.length === 0) {
        return (
            <section id="headers" className="mt-18 bg-gray-50 py-24">
                <div className="text-center text-gray-500">Tidak ada video yang tersedia.</div>
            </section>
        );
    }

    return (
        <section className="relative z-10 bg-white py-28">
            <motion.div className="mb-16 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="text-sm font-medium tracking-wide text-green-600 uppercase"
                >
                    Galeri Video
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl"
                >
                    Al Mazaya <span className="text-green-600">Introduction</span>
                </motion.h2>
            </motion.div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center px-6">
                {validVideos.map((video, idx) => (
                    <motion.div
                        key={video.id ?? idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group w-full max-w-2xl cursor-pointer overflow-hidden rounded-xl shadow-lg"
                        onClick={() => {
                            // Open YouTube video in new tab if it's a YouTube URL, otherwise show alert
                            const videoUrl = video.url || DEFAULT_YOUTUBE_URL;
                            if (getYoutubeVideoId(videoUrl)) {
                                window.open(videoUrl, '_blank');
                            } else {
                                alert(`Klik video: ${video.title}`);
                            }
                        }}
                    >
                        {/* Thumbnail */}
                        <div className="relative">
                            <img
                                src={video.url ? getYouTubeThumbnail(video.url) : '/images/default-video-thumbnail.jpg'}
                                alt={video.title}
                                className="h-96 w-full object-cover"
                            />

                            {/* Overlay Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

                        {/* Title & Description */}
                        <div className="p-4 text-left">
                            <h3 className="mb-2 text-lg font-semibold text-gray-800">{video.title || 'Video Title'}</h3>
                            <p className="text-sm text-gray-600">{video.description || 'Video description not available.'}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default VideoCard;
