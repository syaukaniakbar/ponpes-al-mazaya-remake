import RegisterCheck from '@/components/custom/register-check';
import MainLayout from '@/layouts/main-layout';

export default function RegisterStatus() {
    return (
        <MainLayout title="Register Status | Ponpes Al-Mazaya" description="Check your registration status">
            <RegisterCheck />
        </MainLayout>
    );
}
