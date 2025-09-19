import MainLayout from '@/layouts/main-layout';
import { usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function RegisterSuccess() {
    const { props } = usePage<any>();
    const successMessage = props.success || 'Pendaftaran berhasil!';
    
    return (
        <MainLayout title="Register Success | Ponpes Al-Mazaya" description="Registration successful">
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-2xl px-4">
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <div className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                                Pendaftaran Berhasil!
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {successMessage}
                            </p>
                            <div className="mt-8 rounded-lg bg-green-50 p-4">
                                <p className="text-green-800">
                                    Terima kasih telah mendaftar di Ponpes Al-Mazaya. Data Anda telah berhasil disimpan. 
                                    Tim kami akan segera menghubungi Anda untuk langkah selanjutnya.
                                </p>
                            </div>
                            <div className="mt-8">
                                <a
                                    href="/"
                                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Kembali ke Beranda
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
