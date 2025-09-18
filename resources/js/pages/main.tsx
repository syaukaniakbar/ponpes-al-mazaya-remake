import Header from '@/components/custom/header';
import Highlight from '@/components/custom/highlight';
import HighlightNews from '@/components/custom/highlight-news';
import StaffTeacher from '@/components/custom/staff-teacher';
import VideoCard from '@/components/custom/video';
import MainLayout from '@/layouts/main-layout';
import { usePage } from '@inertiajs/react';
import type { Blog, Header as HeaderType, Staff, StudentCount, Video } from '../types/index';

type Props = {
    blogs: Blog[];
    videos: Video[];
    staffs: Staff[];
    studentCounts: StudentCount[];
    headers: HeaderType[];
};

export default function Main() {
    const { blogs, videos, staffs, studentCounts, headers } = usePage<Props>().props;
    return (
        <MainLayout title="Home | Ponpes Al-Mazaya" description="Welcome to Ponpes Al-Mazaya">
            <Header headers={headers} />
            <HighlightNews blogs={blogs} />
            <Highlight studentCounts={studentCounts} />
            <StaffTeacher staffs={staffs} />
            <VideoCard videos={videos} />
        </MainLayout>
    );
}
