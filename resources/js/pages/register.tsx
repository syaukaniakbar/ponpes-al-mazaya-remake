import MultiStep from '@/components/custom/multi-step';
import MainLayout from '@/layouts/main-layout';

export default function Blog() {
    return (
        <MainLayout
            title="Register | Ponpes Al-Mazaya"
            description="Welcome to Ponpes Al-Mazaya"
        >
            <MultiStep />
        </MainLayout>
    );
}
