import { Form } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const steps = [
    { id: 1, title: 'Tahapan Pendaftaran' },
    { id: 2, title: 'Aturan Pondok Pesantren' },
    { id: 3, title: 'Unduh Surat Pernyataan' },
    { id: 4, title: 'Formulir Pendaftaran' },
];

const TahapanPendaftaran = function TahapanPendaftaran() {
    return (
        <div className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Tahapan Pendaftaran 1</h2>
            <p className="text-lg text-gray-600">Mulai proses pendaftaran dengan mengikuti langkah-langkah awal yang telah ditentukan.</p>
        </div>
    );
};

const AturanPonpes = function AturanPonpes() {
    return (
        <div className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Tahapan Pendaftaran 2</h2>
            <p className="text-lg text-gray-600">Mulai proses pendaftaran dengan mengikuti langkah-langkah awal yang telah ditentukan.</p>
        </div>
    );
};

const SuratPernyataan = function SuratPernyataan() {
    return (
        <div className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Tahapan Pendaftaran 3</h2>
            <p className="text-lg text-gray-600">Mulai proses pendaftaran dengan mengikuti langkah-langkah awal yang telah ditentukan.</p>
        </div>
    );
};

const FormulirPendaftaran = function FormulirPendaftaran() {
    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Formulir Pendaftaran</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan proses pendaftaran.
                </p>

                {/* Form */}
                <Form action="/pendaftaran" method="post" className="space-y-10 text-black sm:space-y-12">
                    {/* Informasi Pribadi */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Informasi Pribadi</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Nama Lengkap */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Lengkap (Sesuai Akta/KTP)</label>
                                <input
                                    type="text"
                                    name="nama_lengkap"
                                    placeholder="Nama Pendaftar"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>

                            {/* Program Pendidikan */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Program Pendidikan</label>
                                <select
                                    name="program_pendidikan"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                >
                                    <option value="">Pilih Program Pendidikan</option>
                                    <option value="MI">MI</option>
                                    <option value="MTS">MTS</option>
                                </select>
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="tanggal_lahir"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>

                            {/* NIK */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Induk Kependudukan (NIK)</label>
                                <input
                                    type="text"
                                    name="nik"
                                    placeholder="Masukkan NIK"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>

                            {/* Nomor KK */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Kartu Keluarga</label>
                                <input
                                    type="text"
                                    name="kk"
                                    placeholder="Masukkan Nomor KK"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>

                            {/* Jenis Kelamin */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Jenis Kelamin</label>
                                <select
                                    name="jenis_kelamin"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Kontak & Alamat */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Kontak & Alamat</h2>
                        <div className="space-y-6">
                            {/* Alamat */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Alamat Domisili</label>
                                <textarea
                                    name="alamat"
                                    placeholder="Contoh: Jalan Mawar No. 12, Kelurahan Suka Maju, ..."
                                    className="min-h-[100px] w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>

                            {/* Nomor HP */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Hp Orang tua (WhatsApp)</label>
                                <input
                                    type="text"
                                    name="no_hp"
                                    placeholder="08xxxxxxxxx"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Informasi Tambahan */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Informasi Tambahan</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Ukuran Seragam */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Ukuran Seragam</label>
                                <select
                                    name="ukuran_seragam"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                >
                                    <option value="">Pilih Ukuran Seragam</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>

                            {/* Nama Pengirim */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Pengirim (Sesuai Rekening)</label>
                                <input
                                    type="text"
                                    name="nama_pengirim"
                                    placeholder="Masukkan Nama Pengirim"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 sm:text-base"
                        >
                            Daftar Sekarang
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default function MultiStep() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <section className="mt-12 bg-white px-4 py-24">
            <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-white py-12 shadow-lg">
                {/* Header */}
                <motion.div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl"
                    >
                        Pendaftaran <span className="text-green-600">Santri Baru</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="mt-3 text-base font-medium tracking-wide text-gray-600"
                    >
                        Ikuti setiap langkah dengan benar untuk melengkapi proses pendaftaran.
                    </motion.p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-12 hidden items-center justify-between md:flex">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-1 items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                        index <= currentStep ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white text-gray-400'
                                    }`}
                                >
                                    {index < currentStep ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                                </div>
                                <span
                                    className={`mt-2 text-sm font-medium ${
                                        index === currentStep
                                            ? 'font-semibold text-green-600'
                                            : index < currentStep
                                              ? 'text-gray-500'
                                              : 'text-gray-400'
                                    }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile */}
                <div className="mb-12 flex flex-col items-center md:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600 bg-green-600 text-white">
                        {currentStep + 1}
                    </div>
                    <span className="mt-2 text-sm font-medium text-green-600">{steps[currentStep].title}</span>
                    <p className="mt-1 text-xs text-gray-500">
                        Langkah {currentStep + 1} dari {steps.length}
                    </p>
                </div>

                {/* Step Content */}
                <div className="mb-12">
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && <TahapanPendaftaran />}
                        {currentStep === 1 && <AturanPonpes />}
                        {currentStep === 2 && <SuratPernyataan />}
                        {currentStep === 3 && <FormulirPendaftaran />}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex- mt-10 flex gap-4 p-4 sm:flex-row sm:justify-between">
                    {/* Tombol Sebelumnya */}
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`w-full rounded-xl px-6 py-3 text-sm font-medium transition-all sm:w-auto ${
                            currentStep === 0 ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        ← Sebelumnya
                    </button>

                    {/* Tombol Selanjutnya / Selesai */}
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-green-700 sm:w-auto"
                        >
                            Selanjutnya →
                        </button>
                    ) : (
                        <button className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-green-700 sm:w-auto">
                            Selesai ✓
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
