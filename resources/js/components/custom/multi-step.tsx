import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, CheckCircle2, CreditCard, Download, FileText, Globe, MousePointerClick, Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';

const steps = [
    { id: 1, title: 'Tahapan Pendaftaran' },
    { id: 2, title: 'Aturan Pondok Pesantren' },
    { id: 3, title: 'Unduh Surat Pernyataan' },
    { id: 4, title: 'Formulir Pendaftaran' },
];

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
                            <span className="rounded bg-green-700 px-2 py-1 font-semibold text-white">Rp200.000</span> ke rekening berikut:
                        </p>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                            <p className="font-semibold text-gray-900">Bank Syariah Indonesia (BSI)</p>
                            <p>
                                <span className="font-medium">No. Rekening:</span> 2220120239
                            </p>
                            <p>
                                <span className="font-medium">A/n :</span> YPI AZ ZAINI AL AZHARI PASER
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
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mx-auto max-w-6xl rounded-3xl bg-white/80 p-10 shadow-xl ring-1 ring-gray-100 backdrop-blur"
            >
                {/* Header */}
                <div className="mb-14 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Petunjuk Alur Pendaftaran</h1>
                    <p className="mt-3 text-base text-gray-600 sm:text-lg">Pondok Pesantren Al-Mazaya</p>
                </div>

                {/* Steps */}
                <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Icon Circle */}
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition group-hover:scale-110">
                                    <Icon className="h-6 w-6" />
                                </div>
                                {/* Step */}
                                <span className="mb-1 text-xs font-medium text-green-600">Langkah {item.step}</span>
                                {/* Title */}
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                                {/* Desc */}
                                <div className="text-sm leading-relaxed text-gray-600">{item.desc}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

const AturanPonpes = function AturanPonpes() {
    const [document, setDocument] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await fetch('/api/documents/category/aturan%20al%20mazaya');
                if (response.ok) {
                    const data = await response.json();
                    setDocument(data);
                } else {
                    setError('Dokumen aturan tidak ditemukan');
                }
            } catch (err) {
                setError('Gagal memuat dokumen aturan');
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, []);

    // Function to determine if we can preview the document
    const canPreview = (doc: any) => {
        if (!doc) return false;

        // Check if it's a PDF
        if (doc.extension === 'pdf' || doc.mime_type?.includes('pdf')) {
            return true;
        }

        // Check if it's an image
        if (doc.mime_type?.includes('image')) {
            return true;
        }

        return false;
    };

    // Function to render the appropriate preview
    const renderPreview = (doc: any) => {
        if (!doc) return null;

        // PDF preview
        if (doc.extension === 'pdf' || doc.mime_type?.includes('pdf')) {
            return <iframe src={`${doc.file_url}#view=fit`} className="h-96 w-full rounded-lg" title="Aturan Pondok Pesantren" frameBorder="0" />;
        }

        // Image preview
        if (doc.mime_type?.includes('image')) {
            return <img src={doc.file_url} alt={doc.name} className="h-96 w-full rounded-lg object-contain" />;
        }

        // Default message for unsupported types
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-gray-500">Pratinjau dokumen tidak tersedia untuk jenis file ini.</p>
            </div>
        );
    };

    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Aturan Pondok Pesantren</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan baca dan pahami aturan pondok pesantren berikut sebelum melanjutkan pendaftaran.
                </p>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="rounded-lg bg-red-50 p-4 text-red-700">
                        <p>{error}</p>
                    </div>
                ) : document ? (
                    <div className="space-y-6">
                        <div className="rounded-lg border border-gray-200 p-6">
                            <h2 className="mb-2 text-lg font-semibold text-gray-900">{document.name}</h2>
                            <p className="mb-4 text-gray-600">{document.description}</p>

                            {/* Document Viewer */}
                            <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 p-2">
                                {canPreview(document) ? (
                                    renderPreview(document)
                                ) : (
                                    <div className="flex h-96 items-center justify-center">
                                        <p className="text-gray-500">Pratinjau dokumen tidak tersedia untuk jenis file ini.</p>
                                    </div>
                                )}
                            </div>

                            <a
                                href={document.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Unduh Aturan
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg bg-yellow-50 p-4 text-yellow-700">
                        <p>Belum ada dokumen aturan yang tersedia.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SuratPernyataan = function SuratPernyataan() {
    const [document, setDocument] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await fetch('/api/documents/category/surat%20pernyataan');
                if (response.ok) {
                    const data = await response.json();
                    setDocument(data);
                } else {
                    setError('Dokumen surat pernyataan tidak ditemukan');
                }
            } catch (err) {
                setError('Gagal memuat dokumen surat pernyataan');
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, []);

    // Function to determine if we can preview the document
    const canPreview = (doc: any) => {
        if (!doc) return false;

        // Check if it's a PDF
        if (doc.extension === 'pdf' || doc.mime_type?.includes('pdf')) {
            return true;
        }

        // Check if it's an image
        if (doc.mime_type?.includes('image')) {
            return true;
        }

        return false;
    };

    // Function to render the appropriate preview
    const renderPreview = (doc: any) => {
        if (!doc) return null;

        // PDF preview
        if (doc.extension === 'pdf' || doc.mime_type?.includes('pdf')) {
            return <iframe src={`${doc.file_url}#view=fit`} className="h-96 w-full rounded-lg" title="Surat Pernyataan" frameBorder="0" />;
        }

        // Image preview
        if (doc.mime_type?.includes('image')) {
            return <img src={doc.file_url} alt={doc.name} className="h-96 w-full rounded-lg object-contain" />;
        }

        // Default message for unsupported types
        return (
            <div className="flex h-96 items-center justify-center">
                <p className="text-gray-500">Pratinjau dokumen tidak tersedia untuk jenis file ini.</p>
            </div>
        );
    };

    return (
        <div className="w-full px-4 sm:px-4">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
                {/* Header */}
                <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-2xl">Surat Pernyataan</h1>
                <p className="mb-8 text-sm text-gray-600 sm:text-base">
                    Silakan unduh dan cetak surat pernyataan berikut, lalu tanda tangani sebelum melanjutkan pendaftaran.
                </p>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="rounded-lg bg-red-50 p-4 text-red-700">
                        <p>{error}</p>
                    </div>
                ) : document ? (
                    <div className="space-y-6">
                        <div className="rounded-lg border border-gray-200 p-6">
                            <h2 className="mb-2 text-lg font-semibold text-gray-900">{document.name}</h2>
                            <p className="mb-4 text-gray-600">{document.description}</p>

                            {/* Document Viewer */}
                            <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 p-2">
                                {canPreview(document) ? (
                                    renderPreview(document)
                                ) : (
                                    <div className="flex h-96 items-center justify-center">
                                        <p className="text-gray-500">Pratinjau dokumen tidak tersedia untuk jenis file ini.</p>
                                    </div>
                                )}
                            </div>

                            <a
                                href={document.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Unduh Surat Pernyataan
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg bg-yellow-50 p-4 text-yellow-700">
                        <p>Belum ada dokumen surat pernyataan yang tersedia.</p>
                    </div>
                )}
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

    const fileInputRef = useRef<HTMLInputElement>(null);

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
                                                if (nisnChecked || nisnError) {
                                                    setNisnChecked(false);
                                                    setNisnAvailable(false);
                                                    setNisnError('');
                                                }
                                            }
                                        }}
                                        placeholder="Nomor Induk Siswa Nasional"
                                        maxLength={10} // safeguard
                                        inputMode="numeric" // keypad angka di HP
                                        pattern="\d{10}" // HTML5 validasi: wajib 10 digit
                                        className={`flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                            nisnError ? 'border-red-500' : ''
                                        }`}
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
                                    <div className="mt-2 flex items-center rounded bg-green-100 p-2 text-sm text-green-700">
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        NISN tersedia dan dapat digunakan
                                    </div>
                                )}
                                {nisnError && (
                                    <div className="mt-2 flex items-center rounded bg-red-100 p-2 text-sm text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {nisnError}
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
                                    <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                                    <option value="Rp. 500.000 - Rp. 1.000.000">Rp. 500.000 - Rp. 1.000.000</option>
                                    <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                                    <option value="Rp. 2.000.000 - Rp. 3.000.000">Rp. 2.000.000 - Rp. 3.000.000</option>
                                    <option value="Rp. 3.000.000 - Rp. 5.000.000">Rp. 3.000.000 - Rp. 5.000.000</option>
                                    <option value="Lebih dari Rp. 5.000.000">Lebih dari Rp. 5.000.000</option>
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
                                        <h3 className="text-lg font-semibold text-green-800">Informasi Transfer</h3>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3 px-5 py-4">
                                        <dl className="space-y-2">
                                            <div>
                                                <dt className="sr-only">Bank</dt>
                                                <dd className="text-base font-medium text-gray-900">Bank Syariah Indonesia (BSI)</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">No. Rekening</dt>
                                                <dd className="flex items-center gap-2 text-gray-800">
                                                    <span className="font-semibold">2220120239</span>
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 hover:bg-green-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                        onClick={() => navigator.clipboard.writeText('2220120239')}
                                                    >
                                                        Salin
                                                    </button>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">Atas Nama</dt>
                                                <dd className="font-semibold text-gray-800">YPI AZ ZAINI AL AZHARI PASER</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
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

                                {/* Hidden file input that's always available for both initial selection and change */}
                                <input
                                    type="file"
                                    name="image_bukti_transaksi_url"
                                    ref={fileInputRef}
                                    disabled={!nisnChecked || !nisnAvailable}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image_bukti_transaksi_url', e.target.files[0]);
                                        } else {
                                            setData('image_bukti_transaksi_url', null);
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
                                                    fileInputRef.current.value = ''; // Clear previous value
                                                    fileInputRef.current.click();
                                                }
                                            }}
                                            disabled={!nisnChecked || !nisnAvailable}
                                            className={`w-full rounded-lg border border-gray-200 px-3 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-base ${
                                                !nisnChecked || !nisnAvailable ? 'cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="text-left text-gray-500">Klik untuk mengunggah bukti pembayaran pendaftaran</div>
                                        </button>
                                        <p className="mt-1 text-sm text-gray-500">Unggah bukti pembayaran pendaftaran</p>
                                    </div>
                                ) : (
                                    // Preview and controls when file is selected
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <p className="mb-2 text-sm font-medium text-gray-900">Pratinjau Bukti Transaksi:</p>
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={URL.createObjectURL(data.image_bukti_transaksi_url)}
                                                    alt="Preview Bukti Transaksi"
                                                    className="max-h-48 w-auto rounded-md object-contain"
                                                />
                                                <div className="mt-3 flex space-x-2">
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                                        onClick={() => {
                                                            if (fileInputRef.current) {
                                                                fileInputRef.current.value = ''; // Clear previous value
                                                                fileInputRef.current.click();
                                                            }
                                                        }}
                                                    >
                                                        Ganti
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                                        onClick={() => setData('image_bukti_transaksi_url', null)}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

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

const MultiStep = function MultiStep() {
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
                <div className="flex- mt-10 flex gap-4 p-4 sm:flex-row sm:justify-end">
                    {/* Tombol Sebelumnya - hidden on first step */}
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            className="w-full rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 sm:w-auto"
                        >
                            ← Sebelumnya
                        </button>
                    )}

                    {/* Tombol Selanjutnya - shown on all steps but changes behavior on last step */}
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-green-700 sm:w-auto"
                        >
                            Selanjutnya →
                        </button>
                    ) : (
                        // On the last step, we don't show next/finish button since form is in the last step
                        // The form submission is handled within FormulirPendaftaran component
                        <div className="w-full sm:w-auto"></div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MultiStep;
