import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const steps = [
    { id: 1, title: 'Tahapan Pendaftaran' },
    { id: 2, title: 'Aturan Pondok Pesantren' },
    { id: 3, title: 'Unduh Surat Pernyataan' },
    { id: 4, title: 'Formulir Pendaftaran' },
];

const TahapanPendaftaran = function TahapanPendaftaran() {
    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Formulir Pendaftaran</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan proses pendaftaran.
                </p>
            </div>
        </div>
    );
};

const AturanPonpes = function AturanPonpes() {
    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Formulir Pendaftaran</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan proses pendaftaran.
                </p>
            </div>
        </div>
    );
};

const SuratPernyataan = function SuratPernyataan() {
    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Formulir Pendaftaran</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan proses pendaftaran.
                </p>
            </div>
        </div>
    );
};

const FormulirPendaftaran = function FormulirPendaftaran() {
    type FormulirPendaftaranData = {
        nisn: string;
        nama: string;
        program_pendidikan: string;
        nik: string;
        nomor_kk: string;
        tempat_lahir: string;
        tanggal_lahir: string; // YYYY-MM-DD
        jenis_kelamin: string;
        alamat_domisili: string;
        provinsi: string;
        kota: string;
        kecamatan: string;
        kelurahan: string;
        jumlah_saudara: number;
        anak_ke: number;
        asal_sekolah: string;
        nama_ayah: string;
        nik_ayah: string;
        pendidikan_ayah: string;
        pekerjaan_ayah: string;
        nama_ibu: string;
        nik_ibu: string;
        pendidikan_ibu: string;
        pekerjaan_ibu: string;
        penghasilan: string;
        alamat_kk: string;
        no_hp_orangtua: string;
        kopiah: number | null;
        seragam: string;
        nama_pengirim: string;
        image_bukti_transaksi_url: File | null;
        status_pendaftaran?: string; // default di DB
    };

    const { data, setData, post, processing, errors } = useForm<FormulirPendaftaranData>({
        nisn: '',
        nama: '',
        program_pendidikan: '',
        nik: '',
        nomor_kk: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat_domisili: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        kelurahan: '',
        jumlah_saudara: 0,
        anak_ke: 0,
        asal_sekolah: '',
        nama_ayah: '',
        nik_ayah: '',
        pendidikan_ayah: '',
        pekerjaan_ayah: '',
        nama_ibu: '',
        nik_ibu: '',
        pendidikan_ibu: '',
        pekerjaan_ibu: '',
        penghasilan: '',
        alamat_kk: '',
        no_hp_orangtua: '',
        kopiah: null,
        seragam: '',
        nama_pengirim: '',
        image_bukti_transaksi_url: null,
        status_pendaftaran: 'menunggu verifikasi',
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('pendaftaran.register-store'), {
            forceFormData: true,
        });
    }

    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Formulir Pendaftaran</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan proses pendaftaran.
                </p>

                {/* Form */}
                <form onSubmit={submit} className="space-y-10 text-black sm:space-y-12">
                    {/* Informasi Pribadi */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Informasi Pribadi</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* NISN */}
                            <div className="mb-4">
                                <label htmlFor="nisn" className="mb-2 block text-sm font-medium text-gray-900">
                                    NISN
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="nisn"
                                        type="text"
                                        name="nisn"
                                        value={data.nisn}
                                        onChange={(e) => setData('nisn', e.target.value)}
                                        placeholder="Nomor Induk Siswa Nasional"
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                    />
                                    <button
                                        type="button"
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none"
                                    >
                                        CEK NISN
                                    </button>
                                </div>
                                {errors.nisn && <div className="mt-1 text-sm text-red-700">{errors.nisn}</div>}
                            </div>

                            {/* Nama Lengkap */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Lengkap (Sesuai Akta/KTP)</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Nama Pendaftar"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.nama && <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nama}</div>}
                            </div>
                        </div>

                        {/* Program Pendidikan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Program Pendidikan</label>
                            <select
                                name="program_pendidikan"
                                value={data.program_pendidikan}
                                onChange={(e) => setData('program_pendidikan', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            >
                                <option value="">Pilih Program Pendidikan</option>
                                <option value="ma">MA</option>
                                <option value="mts">MTs</option>
                                <option value="wustha">Wustha</option>
                                <option value="ulya">Ulya</option>
                            </select>
                            {errors.program_pendidikan && (
                                <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.program_pendidikan}</div>
                            )}
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Tanggal Lahir</label>
                            <input
                                type="date"
                                name="tanggal_lahir"
                                value={data.tanggal_lahir}
                                onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            />
                            {errors.tanggal_lahir && (
                                <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.tanggal_lahir}</div>
                            )}
                        </div>

                        {/* NIK */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Induk Kependudukan (NIK)</label>
                            <input
                                type="text"
                                name="nik"
                                value={data.nik}
                                onChange={(e) => setData('nik', e.target.value)}
                                placeholder="Masukkan NIK"
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            />
                            {errors.nik && <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nik}</div>}
                        </div>

                        {/* Nomor KK */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Kartu Keluarga</label>
                            <input
                                type="text"
                                name="nomor_kk"
                                value={data.nomor_kk}
                                onChange={(e) => setData('nomor_kk', e.target.value)}
                                placeholder="Masukkan Nomor KK"
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            />
                            {errors.nomor_kk && <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nomor_kk}</div>}
                        </div>

                        {/* Tempat Lahir */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Tempat Lahir</label>
                            <input
                                type="text"
                                name="tempat_lahir"
                                value={data.tempat_lahir}
                                onChange={(e) => setData('tempat_lahir', e.target.value)}
                                placeholder="Masukkan Tempat Lahir"
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            />
                            {errors.tempat_lahir && (
                                <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.tempat_lahir}</div>
                            )}
                        </div>

                        {/* Jumlah Saudara */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Jumlah Saudara</label>
                            <input
                                type="number"
                                name="jumlah_saudara"
                                value={data.jumlah_saudara}
                                onChange={(e) => setData('jumlah_saudara', Number(e.target.value))}
                                placeholder="Masukkan Jumlah Saudara"
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            />
                            {errors.jumlah_saudara && (
                                <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.jumlah_saudara}</div>
                            )}
                        </div>

                        {/* Anak Ke */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Anak ke-</label>
                            <input
                                type="number"
                                name="anak_ke"
                                value={data.anak_ke}
                                onChange={(e) => setData('anak_ke', Number(e.target.value))}
                                placeholder="Masukkan Anak Ke-"
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            />
                            {errors.anak_ke && <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.anak_ke}</div>}
                        </div>

                        {/* Jenis Kelamin */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900">Jenis Kelamin</label>
                            <select
                                name="jenis_kelamin"
                                value={data.jenis_kelamin}
                                onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            {errors.jenis_kelamin && (
                                <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.jenis_kelamin}</div>
                            )}
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
                                    name="alamat_domisili"
                                    value={data.alamat_domisili}
                                    onChange={(e) => setData('alamat_domisili', e.target.value)}
                                    placeholder="Contoh: Jalan Mawar No. 12, Kelurahan Suka Maju, ..."
                                    className="min-h-[100px] w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.alamat_domisili && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.alamat_domisili}</div>
                                )}
                            </div>

                            {/* Provinsi */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Provinsi</label>
                                <input
                                    type="text"
                                    name="provinsi"
                                    value={data.provinsi}
                                    onChange={(e) => setData('provinsi', e.target.value)}
                                    placeholder="Provinsi"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.provinsi && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.provinsi}</div>
                                )}
                            </div>

                            {/* Kota */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Kota / Kabupaten</label>
                                <input
                                    type="text"
                                    name="kota"
                                    value={data.kota}
                                    onChange={(e) => setData('kota', e.target.value)}
                                    placeholder="Kota / Kabupaten"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.kota && <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.kota}</div>}
                            </div>

                            {/* Kecamatan */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Kecamatan</label>
                                <input
                                    type="text"
                                    name="kecamatan"
                                    value={data.kecamatan}
                                    onChange={(e) => setData('kecamatan', e.target.value)}
                                    placeholder="Kecamatan"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.kecamatan && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.kecamatan}</div>
                                )}
                            </div>

                            {/* Kelurahan */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Kelurahan / Desa</label>
                                <input
                                    type="text"
                                    name="kelurahan"
                                    value={data.kelurahan}
                                    onChange={(e) => setData('kelurahan', e.target.value)}
                                    placeholder="Kelurahan / Desa"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.kelurahan && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.kelurahan}</div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Sekolah Asal */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Sekolah Asal</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Sekolah Asal</label>
                                <input
                                    type="text"
                                    name="asal_sekolah"
                                    value={data.asal_sekolah}
                                    onChange={(e) => setData('asal_sekolah', e.target.value)}
                                    placeholder="Nama Sekolah Asal"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.asal_sekolah && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.asal_sekolah}</div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Data Orang Tua */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Data Orang Tua</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Nama Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Ayah</label>
                                <input
                                    type="text"
                                    name="nama_ayah"
                                    value={data.nama_ayah}
                                    onChange={(e) => setData('nama_ayah', e.target.value)}
                                    placeholder="Nama Ayah"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.nama_ayah && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nama_ayah}</div>
                                )}
                            </div>

                            {/* NIK Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">NIK Ayah</label>
                                <input
                                    type="text"
                                    name="nik_ayah"
                                    value={data.nik_ayah}
                                    onChange={(e) => setData('nik_ayah', e.target.value)}
                                    placeholder="NIK Ayah"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.nik_ayah && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nik_ayah}</div>
                                )}
                            </div>

                            {/* Pendidikan Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Pendidikan Terakhir Ayah</label>
                                <input
                                    type="text"
                                    name="pendidikan_ayah"
                                    value={data.pendidikan_ayah}
                                    onChange={(e) => setData('pendidikan_ayah', e.target.value)}
                                    placeholder="Pendidikan Terakhir Ayah"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.pendidikan_ayah && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.pendidikan_ayah}</div>
                                )}
                            </div>

                            {/* Pekerjaan Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Pekerjaan Ayah</label>
                                <input
                                    type="text"
                                    name="pekerjaan_ayah"
                                    value={data.pekerjaan_ayah}
                                    onChange={(e) => setData('pekerjaan_ayah', e.target.value)}
                                    placeholder="Pekerjaan Ayah"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.pekerjaan_ayah && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.pekerjaan_ayah}</div>
                                )}
                            </div>

                            <hr className="col-span-2 my-4 border-t border-gray-200" />

                            {/* Nama Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Ibu</label>
                                <input
                                    type="text"
                                    name="nama_ibu"
                                    value={data.nama_ibu}
                                    onChange={(e) => setData('nama_ibu', e.target.value)}
                                    placeholder="Nama Ibu"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.nama_ibu && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nama_ibu}</div>
                                )}
                            </div>

                            {/* NIK Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">NIK Ibu</label>
                                <input
                                    type="text"
                                    name="nik_ibu"
                                    value={data.nik_ibu}
                                    onChange={(e) => setData('nik_ibu', e.target.value)}
                                    placeholder="NIK Ibu"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.nik_ibu && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nik_ibu}</div>
                                )}
                            </div>

                            {/* Pendidikan Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Pendidikan Terakhir Ibu</label>
                                <input
                                    type="text"
                                    name="pendidikan_ibu"
                                    value={data.pendidikan_ibu}
                                    onChange={(e) => setData('pendidikan_ibu', e.target.value)}
                                    placeholder="Pendidikan Terakhir Ibu"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.pendidikan_ibu && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.pendidikan_ibu}</div>
                                )}
                            </div>

                            {/* Pekerjaan Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Pekerjaan Ibu</label>
                                <input
                                    type="text"
                                    name="pekerjaan_ibu"
                                    value={data.pekerjaan_ibu}
                                    onChange={(e) => setData('pekerjaan_ibu', e.target.value)}
                                    placeholder="Pekerjaan Ibu"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.pekerjaan_ibu && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.pekerjaan_ibu}</div>
                                )}
                            </div>

                            {/* Penghasilan */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Penghasilan Orang Tua (Rp)</label>
                                <input
                                    type="number"
                                    name="penghasilan"
                                    value={data.penghasilan}
                                    onChange={(e) => setData('penghasilan', e.target.value)}
                                    placeholder="Penghasilan Orang Tua"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.penghasilan && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.penghasilan}</div>
                                )}
                            </div>

                            {/* No HP Orang Tua */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">No. HP Orang Tua (WhatsApp)</label>
                                <input
                                    type="text"
                                    name="no_hp_orangtua"
                                    value={data.no_hp_orangtua}
                                    onChange={(e) => setData('no_hp_orangtua', e.target.value)}
                                    placeholder="08xxxxxxxxx"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.no_hp_orangtua && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.no_hp_orangtua}</div>
                                )}
                            </div>

                            {/* Alamat KK */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Alamat KK</label>
                                <textarea
                                    name="alamat_kk"
                                    value={data.alamat_kk}
                                    onChange={(e) => setData('alamat_kk', e.target.value)}
                                    placeholder="Alamat sesuai Kartu Keluarga"
                                    className="min-h-[100px] w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.alamat_kk && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.alamat_kk}</div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Informasi Tambahan */}
                    <section>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Informasi Tambahan</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Ukuran Kopiah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Ukuran Kopiah</label>
                                <input
                                    type="number"
                                    name="kopiah"
                                    value={data.kopiah ?? ''} // kalau null, tampilkan string kosong
                                    onChange={(e) => setData('kopiah', e.target.value === '' ? null : Number(e.target.value))}
                                    placeholder="Ukuran Kopiah"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.kopiah && <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.kopiah}</div>}
                            </div>

                            {/* Ukuran Seragam */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Ukuran Seragam</label>
                                <input
                                    type="text"
                                    name="seragam"
                                    value={data.seragam}
                                    onChange={(e) => setData('seragam', e.target.value)}
                                    placeholder="Ukuran Seragam"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.seragam && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.seragam}</div>
                                )}
                            </div>
                            {/* Nama Pengirim */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Pengirim (Sesuai Rekening)</label>
                                <input
                                    type="text"
                                    name="nama_pengirim"
                                    value={data.nama_pengirim}
                                    onChange={(e) => setData('nama_pengirim', e.target.value)}
                                    placeholder="Nama Pengirim"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                {errors.nama_pengirim && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">{errors.nama_pengirim}</div>
                                )}
                            </div>

                            {/* Bukti Transaksi */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Bukti Transaksi</label>
                                <input
                                    type="file"
                                    name="image_bukti_transaksi_url"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image_bukti_transaksi_url', e.target.files[0]);
                                        } else {
                                            setData('image_bukti_transaksi_url', null);
                                        }
                                    }}
                                    accept="image/*"
                                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                />
                                <p className="mt-1 text-sm text-gray-500">Unggah bukti pembayaran pendaftaran</p>
                                {errors.image_bukti_transaksi_url && (
                                    <div className="mt-2 inline-block rounded bg-red-700 p-2 text-sm text-white">
                                        {errors.image_bukti_transaksi_url}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full cursor-pointer rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-75 sm:text-base"
                        >
                            {processing ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>
                    </div>
                </form>
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
