import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';
import { jsPDF } from 'jspdf';

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
    const handleDownloadPDF = (student?: {
        nama?: string;
        nisn?: string;
        program_pendidikan?: string;
        status_pendaftaran?: string;
    }) => {
        if (!student) {
            alert('Data siswa tidak tersedia.');
            return;
        }

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });
        const pageWidth = pdf.internal.pageSize.getWidth();
        let y = 60;
        const margin = 40;

        // Judul
        pdf.setFontSize(24);
        pdf.setTextColor(34, 197, 94);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Registrasi Berhasil!', pageWidth / 2, y, { align: 'center' });

        y += 30;

        // Pesan sukses
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(51, 51, 51);
        pdf.text(
            'Terima kasih telah mendaftar di Pondok Pesantren Al-Mazaya. Tim kami akan segera memverifikasi data Anda.',
            margin,
            y,
            { maxWidth: pageWidth - margin * 2 },
        );

        y += 50;

        // Card biru modern dengan shadow tipis
        const cardHeight = 130;
        pdf.setFillColor(239, 246, 255); // warna biru lembut
        pdf.setDrawColor(200, 200, 200); // border abu-abu lembut
        pdf.setLineWidth(0.5);
        pdf.roundedRect(
            margin,
            y,
            pageWidth - 2 * margin,
            cardHeight,
            8,
            8,
            'FD', // Fill dan Draw
        );

        const padding = 20;
        let innerY = y + padding;

        // Data Pendaftaran Title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(30, 64, 175);
        pdf.text('Data Pendaftaran', margin + padding, innerY);

        innerY += 25;

        // Data Pendaftaran (grid 2 kolom)
        pdf.setFontSize(12);
        const lineSpacing = 22;
        const labelX = margin + padding;
        const valueX = labelX + 150;

        const data: [string, string][] = [
            ['Nama', String(student.nama ?? '')],
            ['NISN', String(student.nisn ?? '')],
            [
                'Program Pendidikan',
                String((student.program_pendidikan ?? '').toUpperCase()),
            ],
            ['Status Pendaftaran', String(student.status_pendaftaran ?? '')],
        ];

        data.forEach(([label, value]) => {
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(51, 51, 51);
            pdf.text(`${label}:`, labelX, innerY);

            pdf.setFont('helvetica', 'normal');

            if (label === 'Status Pendaftaran') {
                // Badge kuning modern
                const badgeWidth = pdf.getTextWidth(value) + 12;
                const badgeHeight = 16;
                pdf.setFillColor(254, 243, 199);
                pdf.roundedRect(
                    valueX - 2,
                    innerY - 12,
                    badgeWidth,
                    badgeHeight,
                    4,
                    4,
                    'F',
                );

                pdf.setTextColor(202, 138, 4);
                pdf.text(value, valueX, innerY);
                pdf.setTextColor(51, 51, 51);
            } else {
                pdf.text(value, valueX, innerY);
            }

            innerY += lineSpacing;
        });

        y += cardHeight + 40;

        // Simpan PDF
        const filename = student.nisn
            ? `Bukti-Pendaftaran-${student.nisn}.pdf`
            : 'Bukti-Pendaftaran.pdf';
        pdf.save(filename);
    };

    return (
        <MainLayout
            title="Registration Success | Ponpes Al-Mazaya"
            description="Registration successful"
        >
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
                <Head title="Registration Success" />

                <Card className="w-full max-w-2xl rounded-xl shadow-xl">
                    <CardHeader className="px-6 pt-6 text-center">
                        <CardTitle className="text-3xl font-extrabold text-green-600">
                            Registrasi Berhasil!
                        </CardTitle>
                        <p className="mt-2 text-sm text-gray-600 sm:text-base">
                            {success}
                        </p>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                        {/* Info Box */}
                        <div className="mb-6 rounded-lg border border-gray-200 bg-blue-50 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-blue-800">
                                Data Pendaftaran
                            </h3>
                            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
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
                                <div>
                                    <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                                        {student.status_pendaftaran}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                onClick={() => window.print()}
                                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow transition hover:bg-blue-700 sm:w-auto"
                            >
                                Cetak Bukti Pendaftaran
                            </button>
                            <button
                                onClick={() => handleDownloadPDF(student)}
                                className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow transition hover:bg-green-700 sm:w-auto"
                            >
                                Download PDF
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
