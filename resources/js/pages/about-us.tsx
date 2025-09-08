import About from '@/components/custom/about';
import Address from '@/components/custom/address';
import History from '@/components/custom/history';
import Speech from '@/components/custom/speech';
import Status from '@/components/custom/status';
import VisionMission from '@/components/custom/vission-mission';
import MainLayout from '@/layouts/main-layout';

export default function AboutUs() {
    return (
        <MainLayout title="About| Ponpes Al-Mazaya" description="Welcome to Ponpes Al-Mazaya">
            <About />
            <Speech />
            <History />
            <Status />
            <VisionMission />
            <Address />
        </MainLayout>
    );
}
