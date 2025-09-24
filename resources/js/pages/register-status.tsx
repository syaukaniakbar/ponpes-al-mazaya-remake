import RegisterCheck from '@/components/custom/register-check';
import MainLayout from '@/layouts/main-layout';

export default function RegisterStatus() {
    return (
        <MainLayout title="Register Status | Ponpes Al-Mazaya" description="Check your registration status">
            <div className="justify flex min-h-screen items-center bg-white">
                <RegisterCheck />
            </div>
        </MainLayout>
    );
}
