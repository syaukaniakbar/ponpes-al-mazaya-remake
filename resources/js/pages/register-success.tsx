import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';
import { jsPDF } from 'jspdf';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Download,
    FileText,
    Printer,
    UserCheck,
} from 'lucide-react';

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
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;
        let y = 0;

        // 1. Header Section (Exact match to web bg-green-600)
        const headerHeight = 180;
        pdf.setFillColor(22, 163, 74); // bg-green-600
        pdf.rect(0, 0, pageWidth, headerHeight, 'F');

        // CheckCircle2 Icon Simulation
        const iconX = pageWidth / 2;
        const iconY = 65;
        const iconSize = 25;

        // Low opacity white circle (bg-white/20)
        // RGB (22, 163, 74) mixed with 20% White (255) => roughly (68, 181, 110)
        pdf.setFillColor(68, 181, 110);
        pdf.circle(iconX, iconY, 35, 'F');

        // White Icon
        pdf.setDrawColor(255, 255, 255);
        pdf.setLineWidth(3);
        pdf.setLineCap('round');
        pdf.setLineJoin('round');
        // Circle of CheckCircle2
        pdf.circle(iconX, iconY, 20, 'D');
        // Checkmark
        pdf.line(iconX - 7, iconY, iconX - 2, iconY + 5);
        pdf.line(iconX - 2, iconY + 5, iconX + 8, iconY - 6);

        // Header Text
        pdf.setFontSize(32);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Pendaftaran Berhasil!', pageWidth / 2, 135, { align: 'center' });

        y = headerHeight + 40;

        // 2. Detail Calon Santri Section
        pdf.setFontSize(14);
        pdf.setTextColor(31, 41, 55); // text-gray-800
        pdf.setFont('helvetica', 'bold');
        pdf.text('Detail Calon Santri', margin, y);
        y += 12;
        pdf.setDrawColor(229, 231, 235); // border-gray-200
        pdf.line(margin, y, pageWidth - margin, y);
        y += 25;

        // Data Card (bg-gray-50/50 ring-gray-200/60)
        const dataCardHeight = 140;
        pdf.setFillColor(249, 250, 251); // bg-gray-50
        pdf.roundedRect(margin, y, pageWidth - 2 * margin, dataCardHeight, 16, 16, 'F');
        pdf.setDrawColor(229, 231, 235);
        pdf.roundedRect(margin, y, pageWidth - 2 * margin, dataCardHeight, 16, 16, 'D');

        const col1 = margin + 25;
        const col2 = pageWidth / 2 + 10;
        let innerY = y + 35;

        const drawSection = (label: string, value: string, x: number, yPos: number, isBadge = false, badgeColor: number[] = []) => {
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(107, 114, 128); // text-gray-500
            pdf.text(label.toUpperCase(), x, yPos);

            if (isBadge) {
                const valStr = value || '-';
                pdf.setFontSize(11);
                pdf.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
                const badgeW = pdf.getTextWidth(valStr) + 16;
                pdf.roundedRect(x - 2, yPos + 8, badgeW, 20, 4, 4, 'F');
                pdf.setTextColor(badgeColor[3], badgeColor[4], badgeColor[5]);
                pdf.text(valStr, x + 6, yPos + 22);
            } else {
                pdf.setFontSize(14);
                pdf.setTextColor(17, 24, 39); // text-gray-900
                pdf.setFont('helvetica', 'bold');
                pdf.text(value || '-', x, yPos + 22);
            }
        };

        drawSection('Nama Lengkap', student.nama || '-', col1, innerY);
        drawSection('NISN (Nomor Induk)', student.nisn || '-', col2, innerY);

        innerY += 55;
        // Program Badge (Blue)
        drawSection('Program', student.program_pendidikan?.toUpperCase() || '-', col1, innerY, true, [219, 234, 254, 30, 64, 175]); // bg-blue-100, text-blue-800
        // Status Badge (Yellow)
        drawSection('Status Saat Ini', student.status_pendaftaran || '-', col2, innerY, true, [254, 243, 199, 146, 64, 14]); // bg-yellow-100, text-yellow-800

        y += dataCardHeight + 50;

        // 3. Langkah Selanjutnya (bg-blue-50/50 ring-blue-100)
        pdf.setFontSize(14);
        pdf.setTextColor(30, 58, 138); // text-blue-900
        pdf.setFont('helvetica', 'bold');
        pdf.text('Langkah Selanjutnya', margin, y);
        y += 20;

        const stepsHeight = 110;
        pdf.setFillColor(240, 249, 255); // bg-blue-50
        pdf.roundedRect(margin, y, pageWidth - 2 * margin, stepsHeight, 16, 16, 'F');
        pdf.setDrawColor(219, 234, 254);
        pdf.roundedRect(margin, y, pageWidth - 2 * margin, stepsHeight, 16, 16, 'D');

        // Step 1
        innerY = y + 35;
        pdf.setFillColor(255, 255, 255);
        pdf.circle(margin + 25, innerY - 5, 14, 'F'); // Numbered circle
        pdf.setDrawColor(219, 234, 254);
        pdf.circle(margin + 25, innerY - 5, 14, 'D');
        pdf.setFontSize(12);
        pdf.setTextColor(37, 99, 235);
        pdf.text('1', margin + 22, innerY - 1);

        pdf.setFontSize(12);
        pdf.setTextColor(17, 24, 39);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Daftar Ulang (Penting!)', margin + 50, innerY - 5);

        // Step Description with highlight
        innerY += 15;
        pdf.setFillColor(220, 252, 231, 0.5); // bg-green-100/50 simulated
        pdf.setFillColor(235, 253, 241);
        pdf.roundedRect(margin + 50, innerY, 320, 35, 8, 8, 'F');
        pdf.setDrawColor(187, 247, 208);
        pdf.roundedRect(margin + 50, innerY, 320, 35, 8, 8, 'D');

        pdf.setTextColor(21, 128, 61); // text-green-800
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Silakan datang ke Pondok Pesantren pada 02 Februari 2026', margin + 65, innerY + 15);
        pdf.setFont('helvetica', 'normal');
        pdf.text('untuk penyelesaian berkas fisik.', margin + 65, innerY + 28);

        // Footer
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(156, 163, 175);
        pdf.text('Dokumen ini adalah bukti pendaftaran resmi Ponpes Al-Mazaya yang dihasilkan secara otomatis.', pageWidth / 2, pageHeight - 40, { align: 'center' });

        // Save
        const filename = student.nisn ? `Bukti-Pendaftaran-${student.nisn}.pdf` : 'Bukti-Pendaftaran.pdf';
        pdf.save(filename);
    };

    return (
        <MainLayout
            title="Registration Success | Ponpes Al-Mazaya"
            description="Registration successful"
        >
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 my-6">
                <Head title="Registration Success" />

                <Card className="w-full max-w-2xl overflow-hidden border-none shadow-2xl ring-1 ring-gray-100 sm:rounded-2xl my-12">
                    <div className="bg-green-600 py-8 text-center text-white sm:py-12 rounded-t-2xl">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <CheckCircle2 className="h-12 w-12 text-white" />
                        </div>
                        <h1 className="px-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Pendaftaran Berhasil!
                        </h1>
                    </div>

                    <CardContent className="space-y-8 p-6 sm:p-10">
                        {/* Status Summary & Data Pendaftaran */}
                        <section>
                            <div className="mb-4 flex items-center gap-2 border-b pb-2">
                                <UserCheck className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-800">
                                    Detail Calon Santri
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6 rounded-2xl bg-gray-50/50 p-6 ring-1 ring-gray-200/60 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Nama Lengkap
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                        {student.nama}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        NISN (Nomor Induk)
                                    </p>
                                    <p className="mt-1 text-lg font-mono font-bold text-blue-700">
                                        {student.nisn}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Program
                                    </p>
                                    <p className="mt-1 flex items-center gap-2 font-bold text-gray-900">
                                        <span className="rounded bg-blue-100 px-2 py-0.5 text-sm font-black text-blue-800 uppercase">
                                            {student.program_pendidikan}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Status Saat Ini
                                    </p>
                                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-800 ring-1 ring-yellow-200">
                                        <Clock className="h-3.5 w-3.5" />
                                        {student.status_pendaftaran}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Next Steps - Very Important for Non-Tech Savvy */}
                        <section className="rounded-2xl bg-blue-50/50 p-6 ring-1 ring-blue-100 mx-1">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900">
                                <FileText className="h-5 w-5" />
                                Langkah Selanjutnya
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-bold text-blue-600 shadow-sm ring-1 ring-blue-200">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            Daftar Ulang (Penting!)
                                        </p>
                                        <div className="mt-1 flex items-start">
                                            <p className="text-sm font-medium text-green-800">
                                                Silakan datang ke Pondok
                                                Pesantren pada{' '}
                                                <span className="font-black underline">
                                                    02 Februari 2026
                                                </span>{' '}
                                                untuk penyelesaian berkas fisik.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Large, Easy to Click Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <button
                                onClick={() => window.print()}
                                className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
                            >
                                <Printer className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                                Cetak Bukti
                            </button>
                            <button
                                onClick={() => handleDownloadPDF(student)}
                                className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-700 hover:shadow-xl active:scale-95"
                            >
                                <Download className="h-5 w-5 animate-bounce" />
                                Simpan / Download PDF
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => (window.location.href = '/')}
                                className="text-sm font-bold text-gray-400 hover:text-blue-600 hover:underline"
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
