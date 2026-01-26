import { useForm } from '@inertiajs/react';
import {
    BookOpen,
    CalendarCheck,
    CheckCircle2,
    CreditCard,
    Download,
    FileText,
    Globe,
    MousePointerClick,
    Pencil,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { FaDownload, FaFilePdf } from 'react-icons/fa6';

const steps = [
    { id: 1, title: 'Tahapan Pendaftaran' },
    { id: 2, title: 'Aturan Pondok Pesantren' },
    { id: 3, title: 'Unduh Surat Pernyataan' },
    { id: 4, title: 'Formulir Pendaftaran' },
];

interface FormulirPendaftaranData {
    nisn: string;
    nama: string;
    program_pendidikan: string;
    nik: string;
    nomor_kk: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat: string;
    provinsi: string; // Province name entered manually
    kota: string; // City name entered manually
    kecamatan: string; // District name entered manually
    kelurahan: string; // Village name entered manually
    asal_sekolah: string;
    nama_ayah: string;
    nama_ibu: string;
    no_hp_orangtua: string;
    nama_pengirim: string;
    image_bukti_transaksi_url: File | null;
    status_pendaftaran?: string; // default di DB
}

interface Region {
    id: string;
    name: string;
}

const TahapanPendaftaran = () => {
    const steps = [
        {
            step: '1',
            title: 'Akses Website Resmi',
            desc: 'Calon santri atau orang tua/wali mengunjungi situs resmi Pondok Pesantren Al Mazaya Paser yaitu almazayapaser.ponpes.id.',
            icon: Globe,
        },
        {
            step: '2',
            title: 'Klik Menu Pendaftaran',
            desc: "Pada halaman utama, terdapat menu/tombol 'Pendaftaran' yang akan mengarahkan ke halaman pendaftaran.",
            icon: MousePointerClick,
        },
        {
            step: '3',
            title: 'Membaca Alur Pendaftaran',
            desc: 'Calon santri/orang tua membaca tahap demi tahap pendaftaran yang telah ditentukan.',
            icon: BookOpen,
        },
        {
            step: '4',
            title: 'Membaca Peraturan Pondok',
            desc: 'Mempelajari peraturan pondok pesantren dan menyetujui ketentuan yang berlaku.',
            icon: FileText,
        },
        {
            step: '5',
            title: 'Mendownload Surat Pernyataan',
            desc: 'Surat pernyataan di-download, dicetak, ditandatangani orang tua/wali, dan dibubuhi materai Rp10.000.',
            icon: Download,
        },
        {
            step: '6',
            title: 'Mengisi Form Pendaftaran',
            desc: 'Calon santri/orang tua mengisi form pendaftaran online sesuai data yang diminta.',
            icon: Pencil,
        },
        {
            step: '7',
            title: 'Membayar Biaya Administrasi',
            desc: (
                <>
                    <div className="space-y-3">
                        <p className="font-medium text-gray-800">
                            Silakan transfer biaya pendaftaran sebesar{' '}
                            <span className="rounded bg-green-700 px-2 py-1 font-semibold text-white">
                                Rp200.000
                            </span>{' '}
                            ke rekening berikut:
                        </p>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                            <p className="font-semibold text-gray-900">
                                Bank Syariah Indonesia (BSI)
                            </p>
                            <p>
                                <span className="font-medium">
                                    No. Rekening:
                                </span>{' '}
                                2220120239
                            </p>
                            <p>
                                <span className="font-medium">A/n :</span> YPI
                                AZ ZAINI AL AZHARI PASER
                            </p>
                        </div>
                    </div>
                </>
            ),
            icon: CreditCard,
        },
        {
            step: '8',
            title: 'Selesai Pendaftaran Online',
            desc: 'Setelah form terkirim, halaman konfirmasi akan muncul terkait daftar ulang.',
            icon: CheckCircle2,
        },
        {
            step: '9',
            title: 'Daftar Ulang',
            desc: 'Calon santri melakukan pendaftaran ulang pada tanggal 2 Februari 2026 di lokasi Pondok Pesantren.',
            icon: CalendarCheck,
        },
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl bg-white/80 p-10 shadow-xl ring-1 ring-gray-100 backdrop-blur">
                {/* Header */}
                <div className="mb-14 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Petunjuk Alur Pendaftaran
                    </h1>
                    <p className="mt-3 text-base text-gray-600 sm:text-lg">
                        Pondok Pesantren Al-Mazaya
                    </p>
                </div>

                {/* Steps */}
                <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {steps.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Icon Circle */}
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition group-hover:scale-110">
                                    <Icon className="h-6 w-6" />
                                </div>
                                {/* Step */}
                                <span className="mb-1 text-xs font-medium text-green-600">
                                    Langkah {item.step}
                                </span>
                                {/* Title */}
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                {/* Desc */}
                                <div className="text-sm leading-relaxed text-gray-600">
                                    {item.desc}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

interface AturanPonpesProps {
    onApprovalChange: (approved: boolean) => void;
}

const AturanPonpes = ({ onApprovalChange }: AturanPonpesProps) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        onApprovalChange(isChecked); // Notify parent about the change
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ flex: 1, marginBottom: '1rem' }}>
                <iframe
                    src="/documents/aturan.pdf"
                    title="Aturan Ponpes"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                ></iframe>
            </div>

            <div className="flex items-start gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-50">
                {/* Container Checkbox dengan Touch Target yang lebih besar */}
                <div className="flex h-6 items-center">
                    <input
                        id="readRules"
                        name="readRules"
                        type="checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary transition duration-150 ease-in-out focus:ring-primary"
                    />
                </div>

                {/* Label dengan teks yang lebih lega */}
                <label
                    htmlFor="readRules"
                    className="cursor-pointer text-sm leading-6 text-gray-700 select-none sm:text-base"
                >
                    Saya telah membaca dan menyetujui seluruh{' '}
                    <button
                        type="button"
                        onClick={() => {
                            /* Logika buka modal atau link */
                        }}
                        className="inline-block rounded font-semibold text-primary transition hover:underline focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none"
                    >
                        aturan dan ketentuan
                    </button>
                </label>
            </div>
        </div>
    );
};

const SuratPernyataan = function SuratPernyataan() {
    const pdfUrl = '/documents/surat_pernyataan.pdf';

    return (
        <div className="flex h-screen w-full flex-col bg-green-50 p-4">
            {/* Keterangan dan tombol download */}
            <div className="mb-6 flex flex-col items-stretch gap-6 rounded-xl border border-slate-100 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between lg:p-8">
                <div className="flex items-start gap-4 sm:items-center">
                    {/* Icon Pendukung untuk Konteks Visual */}
                    <div className="hidden rounded-full bg-green-50 p-3 text-green-600 sm:block">
                        <FaFilePdf className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900">
                            Surat Pernyataan
                        </h3>
                        <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                            Dokumen sudah siap. Anda dapat melihatnya langsung
                            di bawah atau mengunduhnya untuk keperluan cetak.
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center">
                    <a
                        href={pdfUrl}
                        download
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 sm:w-auto"
                    >
                        <FaDownload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                        <span>Download PDF</span>
                    </a>
                </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1">
                <iframe
                    src={pdfUrl}
                    title="Surat Pernyataan"
                    className="h-full w-full rounded-lg border-none shadow-inner"
                ></iframe>
            </div>
        </div>
    );
};

const FormulirPendaftaran = function FormulirPendaftaran() {
    const { data, setData, post, processing, errors } =
        useForm<FormulirPendaftaranData>({
            nisn: '',
            nama: '',
            program_pendidikan: '',
            nik: '',
            nomor_kk: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            jenis_kelamin: '',
            alamat: '',
            provinsi: '',
            kota: '',
            kecamatan: '',
            kelurahan: '',
            asal_sekolah: '',
            nama_ayah: '',
            nama_ibu: '',
            no_hp_orangtua: '',
            nama_pengirim: '',
            image_bukti_transaksi_url: null,
            status_pendaftaran: 'menunggu verifikasi',
        });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [nisnChecked, setNisnChecked] = useState(false);
    const [nisnAvailable, setNisnAvailable] = useState(false);
    const [checkingNisn, setCheckingNisn] = useState(false);
    const [nisnError, setNisnError] = useState('');

    // Region Data State
    const [provinces, setProvinces] = useState<Region[]>([]);
    const [cities, setCities] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [villages, setVillages] = useState<Region[]>([]);

    const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
    const [selectedCityCode, setSelectedCityCode] = useState('');
    const [selectedDistrictCode, setSelectedDistrictCode] = useState('');

    useEffect(() => {
        fetch('/api/regions/provinces')
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((err) => console.error(err));
    }, []);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = provinces.find((p) => p.id == code)?.name || '';

        setSelectedProvinceCode(code);
        setCities([]);
        setDistricts([]);
        setVillages([]);
        setSelectedCityCode('');
        setSelectedDistrictCode('');

        setData({
            ...data,
            provinsi: name,
            kota: '',
            kecamatan: '',
            kelurahan: '',
        });

        if (code) {
            fetch(`/api/regions/cities/${code}`)
                .then((res) => res.json())
                .then((data) => setCities(data))
                .catch((err) => console.error(err));
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = cities.find((c) => c.id == code)?.name || '';

        setSelectedCityCode(code);
        setDistricts([]);
        setVillages([]);
        setSelectedDistrictCode('');

        setData({
            ...data,
            kota: name,
            kecamatan: '',
            kelurahan: '',
        });

        if (code) {
            fetch(`/api/regions/districts/${code}`)
                .then((res) => res.json())
                .then((data) => setDistricts(data))
                .catch((err) => console.error(err));
        }
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = districts.find((d) => d.id == code)?.name || '';

        setSelectedDistrictCode(code);
        setVillages([]);

        setData({
            ...data,
            kecamatan: name,
            kelurahan: '',
        });

        if (code) {
            fetch(`/api/regions/villages/${code}`)
                .then((res) => res.json())
                .then((data) => setVillages(data))
                .catch((err) => console.error(err));
        }
    };

    const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = villages.find((v) => v.id == code)?.name || '';
        if (code) {
            setData({ ...data, kelurahan: name });
        } else {
            setData({ ...data, kelurahan: '' });
        }
    };

    // Function to check NISN availability
    const checkNisn = async () => {
        if (!data.nisn) {
            setNisnError('NISN harus diisi');
            setNisnAvailable(false);
            setNisnChecked(false);
            return;
        }

        if (data.nisn.length !== 10) {
            setNisnError('NISN harus 10 digit');
            setNisnAvailable(false);
            setNisnChecked(false);
            return;
        }

        // Validate that NISN contains only numbers
        if (!/^\d{10}$/.test(data.nisn)) {
            setNisnError('NISN hanya boleh berisi angka');
            setNisnAvailable(false);
            setNisnChecked(false);
            return;
        }

        setCheckingNisn(true);
        setNisnError('');

        try {
            const response = await fetch(`/api/siswa/check-nisn/${data.nisn}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.exists) {
                setNisnAvailable(false);
                setNisnError('NISN sudah terdaftar');
                setNisnChecked(true); // Mark as checked even if not available
            } else {
                setNisnAvailable(true);
                setNisnError('');
                setNisnChecked(true);
            }
        } catch (error) {
            console.error('Error checking NISN:', error);
            setNisnAvailable(false);
            setNisnError('Gagal memeriksa NISN. Silakan coba lagi.');
            setNisnChecked(false);
        } finally {
            setCheckingNisn(false);
        }
    };

    // Custom submit function to handle region names
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Post the form data directly since regions are already stored as names
        post('/register', {
            ...data,
            forceFormData: true,
        });
    };

    return (
        <section className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    Formulir Pendaftaran
                </h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan lengkapi data berikut dengan benar untuk melanjutkan
                    proses pendaftaran.
                </p>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="space-y-10 text-black sm:space-y-12"
                >
                    {/* Informasi Pribadi */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">
                            Informasi Pribadi
                        </h2>
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* NISN */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="nisn"
                                    className="mb-1 block text-sm font-medium text-gray-900 sm:text-base"
                                >
                                    NISN
                                </label>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <input
                                        id="nisn"
                                        type="text"
                                        name="nisn"
                                        value={data.nisn}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    '',
                                                );
                                            if (value.length <= 10) {
                                                setData('nisn', value);
                                                if (nisnChecked || nisnError) {
                                                    setNisnChecked(false);
                                                    setNisnAvailable(false);
                                                    setNisnError('');
                                                }
                                            }
                                        }}
                                        placeholder="Nomor Induk Siswa Nasional"
                                        maxLength={10}
                                        inputMode="numeric"
                                        pattern="\d{10}"
                                        className={`w-full flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${nisnError
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={checkNisn}
                                        disabled={
                                            checkingNisn ||
                                            !data.nisn ||
                                            data.nisn.length !== 10
                                        }
                                        className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none sm:w-auto sm:text-base ${checkingNisn ||
                                                !data.nisn ||
                                                data.nisn.length !== 10
                                                ? 'cursor-not-allowed bg-gray-400'
                                                : 'bg-indigo-600 hover:bg-indigo-700'
                                            }`}
                                    >
                                        {checkingNisn
                                            ? 'MEMERIKSA...'
                                            : 'CEK NISN'}
                                    </button>
                                </div>

                                {/* Status & Error */}
                                {nisnChecked && nisnAvailable && (
                                    <div className="mt-2 flex items-center rounded bg-green-100 p-2 text-sm text-green-700">
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        NISN tersedia dan dapat digunakan
                                    </div>
                                )}
                                {nisnError && (
                                    <div className="mt-2 flex items-center rounded bg-red-100 p-2 text-sm text-red-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {nisnError}
                                    </div>
                                )}
                                {errors.nisn && (
                                    <div className="mt-1 text-sm text-red-700 sm:text-base">
                                        {errors.nisn}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nama Lengkap */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Nama Lengkap */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-900 sm:text-base">
                                    Nama Lengkap (Sesuai Akta/KTP)
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData('nama', e.target.value)
                                    }
                                    placeholder={
                                        nisnChecked && !nisnAvailable
                                            ? 'NISN tidak tersedia'
                                            : 'Nama Pendaftar'
                                    }
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : 'bg-white'
                                        }`}
                                />
                                {errors.nama && (
                                    <p className="mt-1 text-sm text-red-600 sm:text-base">
                                        {errors.nama}
                                    </p>
                                )}
                            </div>

                            {/* Program Pendidikan */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Program Pendidikan
                                </label>
                                <select
                                    name="program_pendidikan"
                                    value={data.program_pendidikan}
                                    onChange={(e) =>
                                        setData(
                                            'program_pendidikan',
                                            e.target.value,
                                        )
                                    }
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                >
                                    <option
                                        value=""
                                        disabled={!nisnChecked || nisnAvailable}
                                    >
                                        {nisnChecked && !nisnAvailable
                                            ? 'NISN tidak tersedia'
                                            : 'Pilih Program Pendidikan'}
                                    </option>
                                    <option value="ma">MA</option>
                                    <option value="mts">MTs</option>
                                    <option value="wustha">Wustha</option>
                                    <option value="ulya">Ulya</option>
                                </select>
                                {errors.program_pendidikan && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.program_pendidikan}
                                    </p>
                                )}
                            </div>

                            {/* NIK */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Nomor Induk Kependudukan (NIK)
                                </label>
                                <input
                                    type="text"
                                    name="nik"
                                    value={data.nik}
                                    onChange={(e) => {
                                        // hanya angka
                                        const value = e.target.value.replace(
                                            /\D/g,
                                            '',
                                        );

                                        // maksimal 16 digit
                                        if (value.length <= 16) {
                                            setData('nik', value);
                                        }
                                    }}
                                    placeholder={
                                        nisnChecked && !nisnAvailable
                                            ? 'NISN tidak tersedia'
                                            : 'Masukkan NIK'
                                    }
                                    maxLength={16} // tambahan pembatas
                                    inputMode="numeric" // agar di HP muncul keypad angka
                                    pattern="\d{16}" // HTML5 pattern: validasi 16 digit
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.nik && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.nik}
                                    </p>
                                )}
                            </div>

                            {/* Nomor KK */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Nomor Kartu Keluarga
                                </label>
                                <input
                                    type="text"
                                    name="nomor_kk"
                                    value={data.nomor_kk}
                                    onChange={(e) => {
                                        // hanya angka
                                        const value = e.target.value.replace(
                                            /\D/g,
                                            '',
                                        );

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
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />

                                {errors.nomor_kk && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.nomor_kk}
                                    </p>
                                )}
                            </div>

                            {/* Tempat Lahir */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Tempat Lahir
                                </label>
                                <input
                                    type="text"
                                    name="tempat_lahir"
                                    value={data.tempat_lahir}
                                    onChange={(e) =>
                                        setData('tempat_lahir', e.target.value)
                                    }
                                    placeholder="Masukkan Tempat Lahir"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.tempat_lahir && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.tempat_lahir}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    name="tanggal_lahir"
                                    value={data.tanggal_lahir}
                                    onChange={(e) =>
                                        setData('tanggal_lahir', e.target.value)
                                    }
                                    onClick={(e) => {
                                        const input =
                                            e.target as HTMLInputElement;
                                        if (input.showPicker) {
                                            input.showPicker();
                                        }
                                    }}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.tanggal_lahir && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.tanggal_lahir}
                                    </p>
                                )}
                            </div>

                            {/* Jenis Kelamin */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Jenis Kelamin
                                </label>
                                <select
                                    name="jenis_kelamin"
                                    value={data.jenis_kelamin}
                                    onChange={(e) =>
                                        setData('jenis_kelamin', e.target.value)
                                    }
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                >
                                    <option value="">
                                        Pilih Jenis Kelamin
                                    </option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                                {errors.jenis_kelamin && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.jenis_kelamin}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Kontak & Alamat */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">
                            Kontak & Alamat
                        </h2>
                        <div className="space-y-6">
                            {/* Alamat */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Alamat
                                </label>
                                <textarea
                                    name="alamat"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData('alamat', e.target.value)
                                    }
                                    placeholder="Contoh: Jl. Pangeran Antasari No. 45 RT 03/RW 05, Kel. Air Putih, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur, 75119"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`min-h-[100px] w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.alamat && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.alamat}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Provinsi */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Provinsi
                                    </label>
                                    <select
                                        name="provinsi"
                                        value={selectedProvinceCode}
                                        onChange={handleProvinceChange}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                                ? 'cursor-not-allowed bg-gray-100'
                                                : ''
                                            }`}
                                        disabled={
                                            !nisnChecked || !nisnAvailable
                                        }
                                    >
                                        <option value="">Pilih Provinsi</option>
                                        {provinces.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.provinsi && (
                                        <div className="mt-1 text-sm text-red-700">
                                            {errors.provinsi}
                                        </div>
                                    )}
                                </div>

                                {/* Kota */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Kota / Kabupaten
                                    </label>
                                    <select
                                        name="kota"
                                        value={selectedCityCode}
                                        onChange={handleCityChange}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                                ? 'cursor-not-allowed bg-gray-100'
                                                : ''
                                            }`}
                                        disabled={
                                            !nisnChecked ||
                                            !nisnAvailable ||
                                            !selectedProvinceCode
                                        }
                                    >
                                        <option value="">
                                            Pilih Kota/Kabupaten
                                        </option>
                                        {cities.map((city) => (
                                            <option
                                                key={city.id}
                                                value={city.id}
                                            >
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kota && (
                                        <div className="mt-1 text-sm text-red-700">
                                            {errors.kota}
                                        </div>
                                    )}
                                </div>

                                {/* Kecamatan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Kecamatan
                                    </label>
                                    <select
                                        name="kecamatan"
                                        value={selectedDistrictCode}
                                        onChange={handleDistrictChange}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                                ? 'cursor-not-allowed bg-gray-100'
                                                : ''
                                            }`}
                                        disabled={
                                            !nisnChecked ||
                                            !nisnAvailable ||
                                            !selectedCityCode
                                        }
                                    >
                                        <option value="">
                                            Pilih Kecamatan
                                        </option>
                                        {districts.map((district) => (
                                            <option
                                                key={district.id}
                                                value={district.id}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kecamatan && (
                                        <div className="mt-1 text-sm text-red-700">
                                            {errors.kecamatan}
                                        </div>
                                    )}
                                </div>

                                {/* Kelurahan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Kelurahan / Desa
                                    </label>
                                    <select
                                        name="kelurahan"
                                        onChange={handleVillageChange}
                                        className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                                ? 'cursor-not-allowed bg-gray-100'
                                                : ''
                                            }`}
                                        disabled={
                                            !nisnChecked ||
                                            !nisnAvailable ||
                                            !selectedDistrictCode
                                        }
                                    >
                                        <option value="">
                                            Pilih Kelurahan/Desa
                                        </option>
                                        {villages.map((village) => (
                                            <option
                                                key={village.id}
                                                value={village.id}
                                            >
                                                {village.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kelurahan && (
                                        <div className="mt-1 text-sm text-red-700">
                                            {errors.kelurahan}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sekolah Asal */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">
                            Sekolah Asal
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Nama Sekolah Asal
                                </label>
                                <input
                                    type="text"
                                    name="asal_sekolah"
                                    value={data.asal_sekolah}
                                    onChange={(e) =>
                                        setData('asal_sekolah', e.target.value)
                                    }
                                    placeholder="Nama Sekolah Asal"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.asal_sekolah && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.asal_sekolah}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Data Ayah */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">
                            Data Orang Tua
                        </h2>
                        <div className="grid grid-cols-1 space-y-6">
                            {/* Nama Ayah */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Nama Ayah
                                </label>
                                <input
                                    type="text"
                                    name="nama_ayah"
                                    value={data.nama_ayah}
                                    onChange={(e) =>
                                        setData('nama_ayah', e.target.value)
                                    }
                                    placeholder="Nama Ayah"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.nama_ayah && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.nama_ayah}
                                    </div>
                                )}
                            </div>

                            {/* Nama Ibu */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Nama Ibu
                                </label>
                                <input
                                    type="text"
                                    name="nama_ibu"
                                    value={data.nama_ibu}
                                    onChange={(e) =>
                                        setData('nama_ibu', e.target.value)
                                    }
                                    placeholder="Nama Ibu"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.nama_ibu && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.nama_ibu}
                                    </div>
                                )}
                            </div>

                            {/* No HP Orang Tua */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    No. HP Orang Tua (WhatsApp)
                                </label>
                                <input
                                    type="text"
                                    name="no_hp_orangtua"
                                    value={data.no_hp_orangtua}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    onChange={(e) => {
                                        // Hanya ambil angka dari input
                                        const onlyNumbers =
                                            e.target.value.replace(/\D/g, '');
                                        setData('no_hp_orangtua', onlyNumbers);
                                    }}
                                    placeholder="08xxxxxxxxx"
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />

                                {errors.no_hp_orangtua && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.no_hp_orangtua}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Informasi Tambahan */}
                    <div>
                        <h2 className="mb-6 border-b pb-2 text-base font-semibold text-gray-800 sm:text-lg">
                            Informasi Tambahan
                        </h2>
                        <div className="grid grid-cols-1">
                            {/* Bank Information */}
                            <div className="md:col-span-2">
                                <div className="relative overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm">
                                    {/* Header */}
                                    <div className="flex items-center gap-2 border-b border-green-100 bg-green-50 px-5 py-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M5 6h14M9 14h6m-7 4h8M4 20h16"
                                            />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-green-800">
                                            Informasi Transfer
                                        </h3>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3 px-5 py-4">
                                        <dl className="space-y-2">
                                            <div>
                                                <dt className="sr-only">
                                                    Bank
                                                </dt>
                                                <dd className="text-base font-medium text-gray-900">
                                                    Bank Syariah Indonesia (BSI)
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    No. Rekening
                                                </dt>
                                                <dd className="flex items-center gap-2 text-gray-800">
                                                    <span className="font-semibold">
                                                        2220120239
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 hover:bg-green-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(
                                                                '2220120239',
                                                            )
                                                        }
                                                    >
                                                        Salin
                                                    </button>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">
                                                    Atas Nama
                                                </dt>
                                                <dd className="font-semibold text-gray-800">
                                                    YPI AZ ZAINI AL AZHARI PASER
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            {/* Nama Pengirim */}
                            <div className="md:col-span-2">
                                <label className="mt-4 block text-sm font-medium text-gray-900">
                                    Nama Pengirim (Sesuai Rekening)
                                </label>
                                <input
                                    type="text"
                                    name="nama_pengirim"
                                    disabled={!nisnChecked || !nisnAvailable}
                                    value={data.nama_pengirim}
                                    onChange={(e) =>
                                        setData('nama_pengirim', e.target.value)
                                    }
                                    placeholder="Nama Pengirim"
                                    className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                            ? 'cursor-not-allowed bg-gray-100'
                                            : ''
                                        }`}
                                />
                                {errors.nama_pengirim && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.nama_pengirim}
                                    </div>
                                )}
                            </div>

                            {/* Bukti Transaksi */}
                            <div className="md:col-span-2">
                                <label className="mt-4 block text-sm font-medium text-gray-900 sm:text-base">
                                    Bukti Transaksi
                                </label>

                                {/* Hidden file input that's always available for both initial selection and change */}
                                <input
                                    type="file"
                                    name="image_bukti_transaksi_url"
                                    ref={fileInputRef}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setData(
                                                'image_bukti_transaksi_url',
                                                e.target.files[0],
                                            );
                                        } else {
                                            setData(
                                                'image_bukti_transaksi_url',
                                                null,
                                            );
                                        }
                                    }}
                                    accept="image/*"
                                    className="hidden"
                                />

                                {!data.image_bukti_transaksi_url ? (
                                    // File input when no file is selected
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value =
                                                        ''; // Clear previous value
                                                    fileInputRef.current.click();
                                                }
                                            }}
                                            disabled={
                                                !nisnChecked || !nisnAvailable
                                            }
                                            className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${!nisnChecked || !nisnAvailable
                                                    ? 'cursor-not-allowed bg-gray-100'
                                                    : 'bg-white hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="text-left text-gray-500">
                                                Klik untuk mengunggah bukti
                                                pembayaran pendaftaran
                                            </div>
                                        </button>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Unggah bukti pembayaran pendaftaran
                                        </p>
                                    </div>
                                ) : (
                                    // Preview and controls when file is selected
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <p className="mb-2 text-sm font-medium text-gray-900">
                                                Pratinjau Bukti Transaksi:
                                            </p>
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={URL.createObjectURL(
                                                        data.image_bukti_transaksi_url,
                                                    )}
                                                    alt="Preview Bukti Transaksi"
                                                    className="max-h-48 w-auto rounded-md object-contain"
                                                />
                                                <div className="mt-3 flex space-x-2">
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                                        onClick={() => {
                                                            if (
                                                                fileInputRef.current
                                                            ) {
                                                                fileInputRef.current.value =
                                                                    ''; // Clear previous value
                                                                fileInputRef.current.click();
                                                            }
                                                        }}
                                                    >
                                                        Ganti
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                                        onClick={() =>
                                                            setData(
                                                                'image_bukti_transaksi_url',
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {errors.image_bukti_transaksi_url && (
                                    <div className="mt-1 text-sm text-red-700">
                                        {errors.image_bukti_transaksi_url}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={
                                processing || !nisnChecked || !nisnAvailable
                            }
                            className={`w-full cursor-pointer rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-md transition focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-75 sm:text-base ${processing || !nisnChecked || !nisnAvailable ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} `}
                        >
                            {processing
                                ? 'Memproses...'
                                : !nisnChecked || !nisnAvailable
                                    ? 'Silakan cek NISN terlebih dahulu'
                                    : 'Daftar Sekarang'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

// Tipe untuk fungsi scroll ke atas
type ScrollToTopOptions = {
    behavior?: 'auto' | 'smooth';
    top?: number;
};

// Fungsi untuk scroll ke atas dengan animasi smooth
const scrollToTop = (options: ScrollToTopOptions = { behavior: 'smooth', top: 0 }) => {
    window.scrollTo({
        top: options.top ?? 0,
        behavior: options.behavior ?? 'smooth'
    });
};

const MultiStep = function MultiStep() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAturanApproved, setIsAturanApproved] = useState(false);

    const nextStep = () => {
        // Check if current step is AturanPonpes (step 1) and validate
        if (currentStep === 1) {
            if (!isAturanApproved) {
                alert(
                    'Harap centang bahwa Anda telah membaca aturan sebelum melanjutkan.',
                );
                return;
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);

            // Smooth scroll to top after changing step
            scrollToTop();
        }
    };

    const handleAturanApprovalChange = (approved: boolean) => {
        setIsAturanApproved(approved);
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);

            // Smooth scroll to top after changing step
            scrollToTop();
        }
    };

    return (
        <section className="mt-12 bg-white px-4 py-24">
            <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-linear-to-br from-green-50 to-white py-12 shadow-lg">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
                        Pendaftaran{' '}
                        <span className="text-green-600">Santri Baru</span>
                    </h2>
                    <p className="mt-3 text-base font-medium tracking-wide text-gray-600">
                        Ikuti setiap langkah dengan benar untuk melengkapi
                        proses pendaftaran.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 hidden items-center justify-between md:flex">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex flex-1 items-center justify-center"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${index <= currentStep
                                            ? 'border-green-600 bg-green-600 text-white'
                                            : 'border-gray-300 bg-white text-gray-400'
                                        }`}
                                >
                                    {index < currentStep ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <span
                                    className={`mt-2 text-sm font-medium ${index === currentStep
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
                    <span className="mt-2 text-sm font-medium text-green-600">
                        {steps[currentStep].title}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">
                        Langkah {currentStep + 1} dari {steps.length}
                    </p>
                </div>

                {/* Step Content */}
                <div className="mb-12">
                    {currentStep === 0 && <TahapanPendaftaran />}
                    {currentStep === 1 && (
                        <AturanPonpes
                            onApprovalChange={handleAturanApprovalChange}
                        />
                    )}
                    {currentStep === 2 && <SuratPernyataan />}
                    {currentStep === 3 && <FormulirPendaftaran />}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-10 flex flex-col-reverse gap-3 border-t border-gray-100 p-4 pt-6 sm:flex-row sm:justify-end sm:gap-4 sm:p-6">
                    {/* Tombol SEBELUMNYA */}
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            type="button"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-600 ring-1 ring-gray-300 transition-all ring-inset hover:bg-gray-50 active:scale-95 sm:w-auto"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Sebelumnya
                        </button>
                    )}

                    {/* Tombol SELANJUTNYA */}
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            disabled={currentStep === 1 && !isAturanApproved}
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all active:scale-95 sm:w-auto ${!(currentStep === 1 && !isAturanApproved)
                                    ? 'bg-green-600 hover:bg-green-700 hover:shadow-green-300'
                                    : 'cursor-not-allowed bg-gray-300 shadow-none'
                                }`}
                        >
                            Selanjutnya
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    ) : /* Render tombol submit di sini jika form pendaftaran selesai */
                        null}
                </div>
            </div>
        </section>
    );
};

export default MultiStep;
