import MultiStep from '@/components/custom/multi-step';
import MainLayout from '@/layouts/main-layout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Blog() {
    const { auth } = usePage<SharedData>().props;

    return (
        <MainLayout title="Register | Ponpes Al-Mazaya" description="Welcome to Ponpes Al-Mazaya">
            <MultiStep />
        </MainLayout>
    );
}
