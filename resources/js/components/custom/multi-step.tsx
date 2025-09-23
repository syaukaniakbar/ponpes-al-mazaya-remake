import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
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
        tanggal_lahir: string;
        jenis_kelamin: string;
        alamat_domisili: string;
        provinsi: string;
        kota: string;
        kecamatan: string;
        kelurahan: string;
        jumlah_saudara: number | null;
        anak_ke: number | null;
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
        jumlah_saudara: null,
        anak_ke: null,
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

    const [nisnChecked, setNisnChecked] = useState(false);
    const [nisnAvailable, setNisnAvailable] = useState(false);
    const [checkingNisn, setCheckingNisn] = useState(false);
    const [nisnError, setNisnError] = useState('');

    const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);
    const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
    const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
    const [villages, setVillages] = useState<{ id: string; name: string }[]>([]);

    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    // Get names for the selected IDs
    const getSelectedProvinceName = () => {
        const province = provinces.find((p) => p.id === data.provinsi);
        return province ? province.name : '';
    };

    const getSelectedCityName = () => {
        const city = cities.find((c) => c.id === data.kota);
        return city ? city.name : '';
    };

    const getSelectedDistrictName = () => {
        const district = districts.find((d) => d.id === data.kecamatan);
        return district ? district.name : '';
    };

    const getSelectedVillageName = () => {
        const village = villages.find((v) => v.id === data.kelurahan);
        return village ? village.name : '';
    };

    // Fetch Provinces saat komponen pertama kali dimuat
    useEffect(() => {
        const fetchProvinces = async () => {
            setLoadingProvinces(true);
            try {
                const response = await fetch('/api/regions/provinces');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error('Gagal mengambil data provinsi:', error);
            } finally {
                setLoadingProvinces(false);
            }
        };

        fetchProvinces();
    }, []);

    // Fetch Cities saat provinsi dipilih
    useEffect(() => {
        if (!data.provinsi) {
            setCities([]);
            setDistricts([]);
            setVillages([]);
            setData('kota', '');
            setData('kecamatan', '');
            setData('kelurahan', '');
            return;
        }

        const fetchCities = async () => {
            setLoadingCities(true);
            try {
                const response = await fetch(`/api/regions/cities/${data.provinsi}`);
                const dataCities = await response.json();
                setCities(dataCities);
                setDistricts([]);
                setVillages([]);
                setData('kota', '');
                setData('kecamatan', '');
                setData('kelurahan', '');
            } catch (error) {
                console.error('Gagal mengambil data kota:', error);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, [data.provinsi]);

    // Fetch Districts saat kota dipilih
    useEffect(() => {
        if (!data.kota) {
            setDistricts([]);
            setVillages([]);
            setData('kecamatan', '');
            setData('kelurahan', '');
            return;
        }

        const fetchDistricts = async () => {
            setLoadingDistricts(true);
            try {
                const response = await fetch(`/api/regions/districts/${data.kota}`);
                const dataDistricts = await response.json();
                setDistricts(dataDistricts);
                setVillages([]);
                setData('kecamatan', '');
                setData('kelurahan', '');
            } catch (error) {
                console.error('Gagal mengambil data kecamatan:', error);
            } finally {
                setLoadingDistricts(false);
            }
        };

        fetchDistricts();
    }, [data.kota]);

    // Fetch Villages saat kecamatan dipilih
    useEffect(() => {
        if (!data.kecamatan) {
            setVillages([]);
            setData('kelurahan', '');
            return;
        }

        const fetchVillages = async () => {
            try {
                const response = await fetch(`/api/regions/villages/${data.kecamatan}`);
                const dataVillages = await response.json();
                setVillages(dataVillages);
                setData('kelurahan', '');
            } catch (error) {
                console.error('Gagal mengambil data kelurahan:', error);
            }
        };

        fetchVillages();
    }, [data.kecamatan]);

    // Function to check NISN availability
    const checkNisn = async () => {
        if (!data.nisn || data.nisn.length !== 10) {
            setNisnError('NISN harus 10 digit');
            return;
        }

        setCheckingNisn(true);
        setNisnError('');

        try {
            const response = await fetch(`/api/siswa/check-nisn/${data.nisn}`);
            const result = await response.json();

            if (result.exists) {
                setNisnAvailable(false);
                setNisnError('NISN sudah terdaftar');
            } else {
                setNisnAvailable(true);
                setNisnError('');
                setNisnChecked(true);
            }
        } catch (error) {
            setNisnAvailable(false);
            setNisnError('Gagal memeriksa NISN. Silakan coba lagi.');
        } finally {
            setCheckingNisn(false);
        }
    };

    // Custom submit function to handle region names
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('pendaftaran.register-store'), {
            forceFormData: true,
            onBefore: () => {
                // transform sebelum dikirim
                setData({
                    ...data,
                    provinsi: getSelectedProvinceName(),
                    kota: getSelectedCityName(),
                    kecamatan: getSelectedDistrictName(),
                    kelurahan: getSelectedVillageName(),
                });
            },
        });
    }

    console.log('Selected Provinsi:', data.provinsi);
    console.log('Cities:', cities);
    console.log('Districts:', districts);
    console.log('Villages:', villages);

    return (
        <section className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Formulir Pendaftaran</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan proses pendaftaran.
                </p>

                {/* Form */}
                <form onSubmit={submit} className="space-y-10 text-black sm:space-y-12">
                    {/* Informasi Pribadi */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Informasi Pribadi</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* NISN */}
                            <div className="mb-4 md:col-span-2">
                                <label htmlFor="nisn" className="mb-2 block text-sm font-medium text-gray-900">
                                    NISN
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="nisn"
                                        type="text"
                                        name="nisn"
                                        value={data.nisn}
                                        onChange={(e) => {
                                            // hanya angka
                                            const value = e.target.value.replace(/\D/g, '');

                                            // maksimal 10 digit
                                            if (value.length <= 10) {
                                                setData('nisn', value);
                                                // Reset validation when user types
                                                if (nisnChecked) {
                                                    setNisnChecked(false);
                                                    setNisnAvailable(false);
                                                }
                                            }
                                        }}
                                        placeholder="Nomor Induk Siswa Nasional"
                                        maxLength={10} // safeguard
                                        inputMode="numeric" // keypad angka di HP
                                        pattern="\d{10}" // HTML5 validasi: wajib 10 digit
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={checkNisn}
                                        disabled={checkingNisn || !data.nisn || data.nisn.length !== 10}
                                        className={`cursor-pointer rounded-lg px-6 py-2 text-sm font-semibold text-white transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none ${
                                            checkingNisn || !data.nisn || data.nisn.length !== 10
                                                ? 'cursor-not-allowed bg-gray-400'
                                                : 'bg-indigo-600 hover:bg-indigo-700'
                                        }`}
                                    >
                                        {checkingNisn ? 'MEMERIKSA...' : 'CEK NISN'}
                                    </button>
                                </div>
                                {nisnChecked && nisnAvailable && (
                                    <div className="mt-2 inline-block rounded bg-green-700 p-2 text-sm text-white">
                                        NISN tersedia dan dapat digunakan
                                    </div>
                                )}
                                {errors.nisn && <div className="mt-1 text-sm text-red-700">{errors.nisn}</div>}
                            </div>
                        </div>

                        {/* Nama Lengkap */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Nama Lengkap */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Lengkap (Sesuai Akta/KTP)</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Nama Pendaftar"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.nama && <p className="mt-2 text-sm text-red-600">{errors.nama}</p>}
                            </div>

                            {/* Program Pendidikan */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Program Pendidikan</label>
                                <select
                                    name="program_pendidikan"
                                    value={data.program_pendidikan}
                                    onChange={(e) => setData('program_pendidikan', e.target.value)}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                >
                                    <option value="">Pilih Program Pendidikan</option>
                                    <option value="ma">MA</option>
                                    <option value="mts">MTs</option>
                                    <option value="wustha">Wustha</option>
                                    <option value="ulya">Ulya</option>
                                </select>
                                {errors.program_pendidikan && <p className="mt-2 text-sm text-red-600">{errors.program_pendidikan}</p>}
                            </div>

                            {/* NIK */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Induk Kependudukan (NIK)</label>
                                <input
                                    type="text"
                                    name="nik"
                                    value={data.nik}
                                    onChange={(e) => {
                                        // hanya angka
                                        const value = e.target.value.replace(/\D/g, '');

                                        // maksimal 16 digit
                                        if (value.length <= 16) {
                                            setData('nik', value);
                                        }
                                    }}
                                    placeholder="Masukkan NIK"
                                    maxLength={16} // tambahan pembatas
                                    inputMode="numeric" // agar di HP muncul keypad angka
                                    pattern="\d{16}" // HTML5 pattern: validasi 16 digit
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.nik && <p className="mt-2 text-sm text-red-600">{errors.nik}</p>}
                            </div>

                            {/* Nomor KK */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nomor Kartu Keluarga</label>
                                <input
                                    type="text"
                                    name="nomor_kk"
                                    value={data.nomor_kk}
                                    onChange={(e) => {
                                        // hanya angka
                                        const value = e.target.value.replace(/\D/g, '');

                                        // maksimal 16 digit
                                        if (value.length <= 16) {
                                            setData('nomor_kk', value);
                                        }
                                    }}
                                    placeholder="Masukkan Nomor KK"
                                    maxLength={16} // safeguard
                                    inputMode="numeric" // agar keypad HP angka
                                    pattern="\d{16}" // HTML5 pattern: wajib 16 digit
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />

                                {errors.nomor_kk && <p className="mt-2 text-sm text-red-600">{errors.nomor_kk}</p>}
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.tempat_lahir && <p className="mt-2 text-sm text-red-600">{errors.tempat_lahir}</p>}
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="tanggal_lahir"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    onClick={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        if (input.showPicker) {
                                            input.showPicker();
                                        }
                                    }}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.tanggal_lahir && <p className="mt-2 text-sm text-red-600">{errors.tanggal_lahir}</p>}
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.jumlah_saudara && <p className="mt-2 text-sm text-red-600">{errors.jumlah_saudara}</p>}
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.anak_ke && <p className="mt-2 text-sm text-red-600">{errors.anak_ke}</p>}
                            </div>

                            {/* Jenis Kelamin */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Jenis Kelamin</label>
                                <select
                                    name="jenis_kelamin"
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                                {errors.jenis_kelamin && <p className="mt-2 text-sm text-red-600">{errors.jenis_kelamin}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Kontak & Alamat */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Kontak & Alamat</h2>
                        <div className="space-y-6">
                            {/* Alamat */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Alamat Domisili</label>
                                <textarea
                                    name="alamat_domisili"
                                    value={data.alamat_domisili}
                                    onChange={(e) => setData('alamat_domisili', e.target.value)}
                                    placeholder="Contoh: Jl. Pangeran Antasari No. 45 RT 03/RW 05, Kel. Air Putih, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur, 75119"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`min-h-[100px] w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.alamat_domisili && <div className="mt-1 text-sm text-red-700">{errors.alamat_domisili}</div>}
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Provinsi */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">Provinsi</label>
                                    <select
                                        name="provinsi"
                                        value={data.provinsi}
                                        onChange={(e) => setData('provinsi', e.target.value)}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                            !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                        }`}
                                        disabled={loadingProvinces || !nisnChecked || !nisnAvailable}
                                    >
                                        <option value="">Pilih Provinsi</option>
                                        {provinces.map((province) => (
                                            <option key={province.id} value={province.id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.provinsi && <div className="mt-1 text-sm text-red-700">{errors.provinsi}</div>}
                                </div>

                                {/* Kota */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">Kota / Kabupaten</label>
                                    <select
                                        name="kota"
                                        value={data.kota}
                                        onChange={(e) => setData('kota', e.target.value)}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                            !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                        }`}
                                        disabled={loadingCities || !data.provinsi || !nisnChecked || !nisnAvailable}
                                    >
                                        <option value="">Pilih Kota / Kabupaten</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kota && <div className="mt-1 text-sm text-red-700">{errors.kota}</div>}
                                </div>

                                {/* Kecamatan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">Kecamatan</label>
                                    <select
                                        name="kecamatan"
                                        value={data.kecamatan}
                                        onChange={(e) => setData('kecamatan', e.target.value)}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                            !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                        }`}
                                        disabled={loadingDistricts || !data.kota || !nisnChecked || !nisnAvailable}
                                    >
                                        <option value="">Pilih Kecamatan</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kecamatan && <div className="mt-1 text-sm text-red-700">{errors.kecamatan}</div>}
                                </div>

                                {/* Kelurahan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">Kelurahan / Desa</label>
                                    <select
                                        name="kelurahan"
                                        value={data.kelurahan}
                                        onChange={(e) => setData('kelurahan', e.target.value)}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                            !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                        }`}
                                        disabled={!data.kecamatan || !nisnChecked || !nisnAvailable}
                                    >
                                        <option value="">Pilih Kelurahan / Desa</option>
                                        {villages.map((village) => (
                                            <option key={village.id} value={village.id}>
                                                {village.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kelurahan && <div className="mt-1 text-sm text-red-700">{errors.kelurahan}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sekolah Asal */}
                    <div>
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.asal_sekolah && <div className="mt-1 text-sm text-red-700">{errors.asal_sekolah}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Data Ayah */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Data Ayah</h2>
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.nama_ayah && <div className="mt-1 text-sm text-red-700">{errors.nama_ayah}</div>}
                            </div>

                            {/* NIK Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">NIK Ayah</label>
                                <input
                                    type="text"
                                    name="nik_ayah"
                                    value={data.nik_ayah}
                                    onChange={(e) => {
                                        // allow only numbers
                                        const value = e.target.value.replace(/\D/g, '');

                                        // limit to 16 digits
                                        if (value.length <= 16) {
                                            setData('nik_ayah', value);
                                        }
                                    }}
                                    placeholder="NIK Ayah"
                                    maxLength={16} // just in case
                                    inputMode="numeric" // mobile keyboard will show numbers
                                    pattern="\d{16}" // HTML5 validation pattern (16 digits)
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />

                                {errors.nik_ayah && <div className="mt-1 text-sm text-red-700">{errors.nik_ayah}</div>}
                            </div>

                            {/* Pendidikan Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Pendidikan Terakhir Ayah</label>
                                <select
                                    name="pendidikan_ayah"
                                    value={data.pendidikan_ayah}
                                    onChange={(e) => setData('pendidikan_ayah', e.target.value)}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                >
                                    <option value="">Pilih Pendidikan Terakhir</option>
                                    <option value="sd">SD / Sederajat</option>
                                    <option value="smp">SMP / Sederajat</option>
                                    <option value="sma">SMA / Sederajat</option>
                                    <option value="d1">Diploma I (D1)</option>
                                    <option value="d2">Diploma II (D2)</option>
                                    <option value="d3">Diploma III (D3)</option>
                                    <option value="d4">Diploma IV (D4)</option>
                                    <option value="s1">Sarjana (S1)</option>
                                    <option value="s2">Magister (S2)</option>
                                    <option value="s3">Doktor (S3)</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>

                                {errors.pendidikan_ayah && <div className="mt-1 text-sm text-red-700">{errors.pendidikan_ayah}</div>}
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.pekerjaan_ayah && <div className="mt-1 text-sm text-red-700">{errors.pekerjaan_ayah}</div>}
                            </div>

                            <h2 className="col-span-2 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Data Ibu</h2>

                            {/* Nama Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Ibu</label>
                                <input
                                    type="text"
                                    name="nama_ibu"
                                    value={data.nama_ibu}
                                    onChange={(e) => setData('nama_ibu', e.target.value)}
                                    placeholder="Nama Ibu"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.nama_ibu && <div className="mt-1 text-sm text-red-700">{errors.nama_ibu}</div>}
                            </div>

                            {/* NIK Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">NIK Ibu</label>
                                <input
                                    type="text"
                                    name="nik_ibu"
                                    value={data.nik_ibu}
                                    onChange={(e) => {
                                        // hanya angka
                                        const value = e.target.value.replace(/\D/g, '');

                                        // maksimal 16 digit
                                        if (value.length <= 16) {
                                            setData('nik_ibu', value);
                                        }
                                    }}
                                    placeholder="NIK Ibu"
                                    maxLength={16} // extra safeguard
                                    inputMode="numeric" // supaya di HP muncul keyboard angka
                                    pattern="\d{16}" // HTML5 pattern: wajib 16 digit
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />

                                {errors.nik_ibu && <div className="mt-1 text-sm text-red-700">{errors.nik_ibu}</div>}
                            </div>

                            {/* Pendidikan Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">Pendidikan Terakhir Ibu</label>
                                <select
                                    name="pendidikan_ibu"
                                    value={data.pendidikan_ibu}
                                    onChange={(e) => setData('pendidikan_ibu', e.target.value)}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                >
                                    <option value="">Pilih Pendidikan Terakhir</option>
                                    <option value="sd">SD / Sederajat</option>
                                    <option value="smp">SMP / Sederajat</option>
                                    <option value="sma">SMA / Sederajat</option>
                                    <option value="d1">Diploma I (D1)</option>
                                    <option value="d2">Diploma II (D2)</option>
                                    <option value="d3">Diploma III (D3)</option>
                                    <option value="d4">Diploma IV (D4)</option>
                                    <option value="s1">Sarjana (S1)</option>
                                    <option value="s2">Magister (S2)</option>
                                    <option value="s3">Doktor (S3)</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>

                                {errors.pendidikan_ibu && <div className="mt-1 text-sm text-red-700">{errors.pendidikan_ibu}</div>}
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
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.pekerjaan_ibu && <div className="mt-1 text-sm text-red-700">{errors.pekerjaan_ibu}</div>}
                            </div>

                            {/* Penghasilan */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Penghasilan Orang Tua (Rp)</label>
                                <select
                                    name="penghasilan"
                                    value={data.penghasilan}
                                    onChange={(e) => setData('penghasilan', e.target.value)}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                >
                                    <option value="">Pilih Rentang Penghasilan</option>
                                    <option value="income_1">Kurang dari Rp 500.000</option>
                                    <option value="income_2">Rp 500.000 - Rp 1.000.000</option>
                                    <option value="income_3">Rp 1.000.000 - Rp 2.000.000</option>
                                    <option value="income_4">Rp 2.000.000 - Rp 3.000.000</option>
                                    <option value="income_5">Rp 3.000.000 - Rp 5.000.000</option>
                                    <option value="income_6">Lebih dari Rp 5.000.000</option>
                                </select>

                                {errors.penghasilan && <div className="mt-1 text-sm text-red-700">{errors.penghasilan}</div>}
                            </div>

                            {/* No HP Orang Tua */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">No. HP Orang Tua (WhatsApp)</label>
                                <input
                                    type="text"
                                    name="no_hp_orangtua"
                                    value={data.no_hp_orangtua}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    onChange={(e) => setData('no_hp_orangtua', e.target.value)}
                                    placeholder="08xxxxxxxxx"
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.no_hp_orangtua && <div className="mt-1 text-sm text-red-700">{errors.no_hp_orangtua}</div>}
                            </div>

                            {/* Alamat KK */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Alamat KK</label>
                                <textarea
                                    name="alamat_kk"
                                    value={data.alamat_kk}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    onChange={(e) => setData('alamat_kk', e.target.value)}
                                    placeholder="Alamat sesuai Kartu Keluarga"
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.alamat_kk && <div className="mt-1 text-sm text-red-700">{errors.alamat_kk}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Informasi Tambahan */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">Informasi Tambahan</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Ukuran Kopiah - Hanya untuk laki-laki */}
                            {data.jenis_kelamin !== 'P' && (
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">Ukuran Kopiah</label>
                                    <select
                                        name="kopiah"
                                        value={data.kopiah ?? ''} // Jika null/undefined, tampilkan opsi kosong
                                        disabled={!nisnChecked || !nisnAvailable}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setData('kopiah', val === '' ? null : Number(val)); // Konversi ke number, atau null jika kosong
                                        }}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                            !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                        }`}
                                    >
                                        <option value="">Pilih Ukuran Kopiah</option>
                                        {[2, 3, 4, 5, 6, 7, 8, 9].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kopiah && <div className="mt-1 text-sm text-red-700">{errors.kopiah}</div>}
                                </div>
                            )}

                            {/* Ukuran Seragam */}
                            <div className="mb-4">
                                <label htmlFor="seragam" className="mb-2 block text-sm font-medium text-gray-900">
                                    Ukuran Seragam
                                </label>
                                <select
                                    id="seragam"
                                    name="seragam"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    value={data.seragam}
                                    onChange={(e) => setData('seragam', e.target.value)}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                >
                                    <option value="">Pilih Ukuran Seragam</option>
                                    {['s', 'm', 'l', 'xl', 'xxl', 'xxxl'].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}{' '}
                                </select>{' '}
                                {errors.seragam && <div className="mt-1 text-sm text-red-700">{errors.seragam}</div>}
                            </div>

                            {/* Nama Pengirim */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Nama Pengirim (Sesuai Rekening)</label>
                                <input
                                    type="text"
                                    name="nama_pengirim"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    value={data.nama_pengirim}
                                    onChange={(e) => setData('nama_pengirim', e.target.value)}
                                    placeholder="Nama Pengirim"
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                {errors.nama_pengirim && <div className="mt-1 text-sm text-red-700">{errors.nama_pengirim}</div>}
                            </div>

                            {/* Bukti Transaksi */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-900">Bukti Transaksi</label>
                                <input
                                    type="file"
                                    name="image_bukti_transaksi_url"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image_bukti_transaksi_url', e.target.files[0]);
                                        } else {
                                            setData('image_bukti_transaksi_url', null);
                                        }
                                    }}
                                    accept="image/*"
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                        !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : ''
                                    }`}
                                />
                                <p className="mt-1 text-sm text-gray-500">Unggah bukti pembayaran pendaftaran</p>
                                {errors.image_bukti_transaksi_url && (
                                    <div className="mt-1 text-sm text-red-700">{errors.image_bukti_transaksi_url}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing || !nisnChecked || !nisnAvailable}
                            className={`w-full cursor-pointer rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-md transition focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-75 sm:text-base ${processing || !nisnChecked || !nisnAvailable ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} `}
                        >
                            {processing ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
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
