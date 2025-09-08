import { CheckCircle2 } from 'lucide-react';

export default function RegisterCheck() {
    return (
        <section className="mt-18 bg-gray-50 py-24">
            <div className="mx-auto max-w-xl text-center">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Cek Status Pendaftaran | <span className="text-green-700">Ponpes Al-Mazaya</span>
                </h1>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Masukkan NISN ..."
                        className="flex-1 rounded-l-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <button className="rounded-r-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">Cari</button>
                </div>
            </div>

            {/* Hasil Cek */}
            <div className="mx-auto mt-18 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    {/* Contoh status diterima */}
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                    <h2 className="text-2xl font-bold text-green-700">Status Pendaftaran: Diterima</h2>
                </div>

                {/* Data Santri */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                        <p className="text-lg font-semibold text-gray-800">Ahmad Zaky</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">NISN</p>
                        <p className="text-lg font-semibold text-gray-800">1234567890</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">Program</p>
                        <p className="text-lg font-semibold text-gray-800">Tahfidz Al-Quran</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">Tanggal Daftar</p>
                        <p className="text-lg font-semibold text-gray-800">04 September 2025</p>
                    </div>
                </div>

                {/* Catatan */}
                <div className="mt-6 rounded-xl bg-green-50 p-4 text-green-700">
                    <p className="text-sm font-medium">Silakan datang ke pondok membawa berkas asli.</p>
                </div>
            </div>
        </section>
    );
}
