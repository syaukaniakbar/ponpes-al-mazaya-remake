import MainLayout from '@/layouts/main-layout';
import { Link, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function RegisterSuccess() {
    const { props } = usePage<any>();
    const successMessage = props.success || 'Pendaftaran berhasil!';
    const siswa = props.siswa;

    return (
        <MainLayout title="Register Success | Ponpes Al-Mazaya" description="Registration successful">
            <div className="mt-18 bg-green-100 py-24">
                <div className="mx-auto w-full max-w-md">
                    <div className="rounded-2xl bg-white p-12 shadow-md">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-10 w-10 animate-bounce text-green-600" />
                            </div>

                            {/* Optional Success Message */}
                            {successMessage && <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">{successMessage}</h1>}

                            {/* Confirmation Box */}
                            {siswa && (
                                <div className="mt-6 space-y-4 text-left text-gray-700">
                                    <p className="text-lg">
                                        Selamat, <strong className="text-gray-900">{siswa.nama}</strong>! Pendaftaran Anda di Ponpes Al-Mazaya telah
                                        berhasil.
                                    </p>
                                    <p className="text-lg">
                                        Anda telah terdaftar untuk program <strong className="text-gray-900">{siswa.program_pendidikan}</strong>{' '}
                                        dengan NISN <strong>{siswa.nisn}</strong>.
                                    </p>
                                    <p className="text-lg">
                                        Status pendaftaran Anda saat ini: <strong className="text-gray-900">{siswa.status_pendaftaran}</strong>.
                                    </p>
                                    <p className="text-lg">
                                        Tim kami akan segera menghubungi Anda untuk langkah selanjutnya. Pastikan kontak yang Anda berikan aktif agar
                                        informasi penting dapat diterima dengan lancar.
                                    </p>
                                </div>
                            )}

                            {/* Call to Action */}
                            <div className="mt-8">
                                <Link
                                    href="/"
                                    className="inline-flex w-full justify-center rounded-lg bg-green-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
