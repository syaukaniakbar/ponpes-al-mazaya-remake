import Header from '@/components/custom/header';
import Highlight from '@/components/custom/highlight';
import HighlightNews from '@/components/custom/highlight-news';
import StaffTeacher from '@/components/custom/staff-teacher';
import VideoCard from '@/components/custom/video';
import MainLayout from '@/layouts/main-layout';
import { usePage } from '@inertiajs/react';
import type { Blog } from '../types/index';

type Props = {
    blogs: Blog[];
};

export default function Main() {
    const { blogs } = usePage<Props>().props;
    return (
        <MainLayout title="Home | Ponpes Al-Mazaya" description="Welcome to Ponpes Al-Mazaya">
            <Header />
            <HighlightNews blogs={blogs} />
            <Highlight />
            <StaffTeacher />
            <VideoCard />
        </MainLayout>
    );
}
