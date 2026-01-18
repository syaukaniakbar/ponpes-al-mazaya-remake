import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

interface RegisterSuccessProps {
    success: string;
    student: {
        id: number;
        nama: string;
        nisn: string;
        program_pendidikan: string;
        status_pendaftaran: string;
    };
}

export default function RegisterSuccess({
    success,
    student,
}: RegisterSuccessProps) {
    return (
        <MainLayout
            title="Registration Success | Ponpes Al-Mazaya"
            description="Registration successful"
        >
            <div className="container mx-auto py-8">
                <Head title="Registration Success" />

                <Card className="mx-auto mt-16 max-w-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-green-600">
                            Registrasi Berhasil!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 text-center">
                            <p className="text-lg text-gray-700">{success}</p>
                        </div>

                        <div className="mb-6 rounded-lg bg-blue-50 p-4">
                            <h3 className="mb-3 text-lg font-semibold text-blue-800">
                                Data Pendaftaran:
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="font-medium text-gray-700">
                                    Nama:
                                </div>
                                <div className="text-gray-900">
                                    {student.nama}
                                </div>

                                <div className="font-medium text-gray-700">
                                    NISN:
                                </div>
                                <div className="text-gray-900">
                                    {student.nisn}
                                </div>

                                <div className="font-medium text-gray-700">
                                    Program Pendidikan:
                                </div>
                                <div className="text-gray-900">
                                    {student.program_pendidikan}
                                </div>

                                <div className="font-medium text-gray-700">
                                    Status Pendaftaran:
                                </div>
                                <div className="text-gray-900">
                                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                        {student.status_pendaftaran}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="mb-4 text-gray-600">
                                Terima kasih telah mendaftar di Pondok Pesantren
                                Al-Mazaya. Tim kami akan segera memverifikasi
                                data Anda.
                            </p>
                            <button
                                onClick={() => window.print()}
                                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                Cetak Bukti Pendaftaran
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
