import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Siswa {
    id: number;
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
    kopiah: string;
    seragam: string;
    nama_pengirim: string;
    image_bukti_transaksi_url?: string;
    status_pendaftaran: string;
    created_at: string;
}

interface LocationData {
    id: string;
    name: string;
}

export default function RegisterCheck() {
    const [nisn, setNisn] = useState('');
    const [result, setResult] = useState<Siswa | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Location data states
    const [provinces, setProvinces] = useState<LocationData[]>([]);
    const [cities, setCities] = useState<LocationData[]>([]);
    const [districts, setDistricts] = useState<LocationData[]>([]);
    const [villages, setVillages] = useState<LocationData[]>([]);

    // Loading states for location data
    const [loadingLocations, setLoadingLocations] = useState(false);

    // Fetch location data when result is available
    useEffect(() => {
        if (result) {
            fetchLocationData();
        }
    }, [result]);

    const fetchLocationData = async () => {
        if (!result) return;

        setLoadingLocations(true);

        try {
            // Fetch all location data in parallel
            const [provincesData, citiesData, districtsData, villagesData] = await Promise.all([
                fetch('/api/regions/provinces').then((res) => res.json()),
                result.provinsi ? fetch(`/api/regions/cities/${result.provinsi}`).then((res) => res.json()) : Promise.resolve([]),
                result.kota ? fetch(`/api/regions/districts/${result.kota}`).then((res) => res.json()) : Promise.resolve([]),
                result.kecamatan ? fetch(`/api/regions/villages/${result.kecamatan}`).then((res) => res.json()) : Promise.resolve([]),
            ]);

            setProvinces(provincesData);
            setCities(citiesData);
            setDistricts(districtsData);
            setVillages(villagesData);
        } catch (err) {
            console.error('Error fetching location data:', err);
        } finally {
            setLoadingLocations(false);
        }
    };

    const checkNisn = async () => {
        if (!nisn.trim()) {
            setError('Silakan masukkan NISN.');
            setResult(null);
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // First check if NISN exists
            const existsResponse = await fetch(`/api/siswa/check-nisn/${nisn}`);
            const existsData = await existsResponse.json();

            if (existsData.exists) {
                const fullDataResponse = await fetch(`/api/siswa/get-by-nisn/${nisn}`);
                if (fullDataResponse.ok) {
                    const fullData = await fullDataResponse.json();
                    setResult(fullData.data);
                } else {
                    setError('Terjadi kesalahan saat mengambil data.');
                }
            } else {
                setError('NISN tidak ditemukan.');
            }
        } catch (err) {
            setError('Terjadi kesalahan server.');
        }

        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            checkNisn();
        }
    };

    // Helper function to get location name by ID
    const getLocationName = (id: string, locations: LocationData[]) => {
        if (!id) return '';
        const location = locations.find((loc) => loc.id === id);
        return location ? location.name : id;
    };

    // Group data for better organization
    const personalInfo = result
        ? [
              { label: 'Nama Lengkap', value: result.nama },
              { label: 'NISN', value: result.nisn },
              { label: 'NIK', value: result.nik },
              { label: 'Nomor KK', value: result.nomor_kk },
              { label: 'Tempat, Tanggal Lahir', value: `${result.tempat_lahir}, ${result.tanggal_lahir}` },
              { label: 'Jenis Kelamin', value: result.jenis_kelamin },
              { label: 'Program Pendidikan', value: result.program_pendidikan },
              { label: 'Asal Sekolah', value: result.asal_sekolah },
          ]
        : [];

    const addressInfo = result
        ? [
              { label: 'Alamat Domisili', value: result.alamat_domisili },
              { label: 'Provinsi', value: getLocationName(result.provinsi, provinces) },
              { label: 'Kota', value: getLocationName(result.kota, cities) },
              { label: 'Kecamatan', value: getLocationName(result.kecamatan, districts) },
              { label: 'Kelurahan', value: getLocationName(result.kelurahan, villages) },
              { label: 'Alamat KK', value: result.alamat_kk },
          ]
        : [];

    // Split family info into Ayah and Ibu sections
    const fatherInfo = result
        ? [
              { label: 'Nama Ayah', value: result.nama_ayah },
              { label: 'NIK Ayah', value: result.nik_ayah },
              { label: 'Pendidikan Ayah', value: result.pendidikan_ayah },
              { label: 'Pekerjaan Ayah', value: result.pekerjaan_ayah },
          ]
        : [];

    const motherInfo = result
        ? [
              { label: 'Nama Ibu', value: result.nama_ibu },
              { label: 'NIK Ibu', value: result.nik_ibu },
              { label: 'Pendidikan Ibu', value: result.pendidikan_ibu },
              { label: 'Pekerjaan Ibu', value: result.pekerjaan_ibu },
          ]
        : [];

    const familyInfo = result
        ? [
              { label: 'Jumlah Saudara', value: result.jumlah_saudara },
              { label: 'Anak Ke', value: result.anak_ke },
              { label: 'Penghasilan Orang Tua', value: result.penghasilan },
              { label: 'No HP Orang Tua', value: result.no_hp_orangtua },
          ]
        : [];

    const registrationInfo = result
        ? [
              ...(result.jenis_kelamin !== 'Perempuan' ? [{ label: 'Kopiah', value: result.kopiah }] : []),
              { label: 'Seragam', value: result.seragam },
              { label: 'Nama Pengirim', value: result.nama_pengirim },
          ]
        : [];

    const InfoSection = ({ title, items, columns = 2 }: { title: string; items: { label: string; value: string | number }[]; columns?: number }) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <div
                className={`grid grid-cols-1 gap-3 ${columns === 2 ? 'sm:grid-cols-2' : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-1'}`}
            >
                {items.map((item, index) => (
                    <div key={index} className="rounded-lg border bg-white p-4">
                        <p className="text-sm text-black">{item.label}</p>
                        <p className="font-medium text-black uppercase">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="relative container mx-auto overflow-hidden px-4 py-8 sm:mt-18 sm:py-12 lg:py-16">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-white"></div>

            <div className="relative container mx-auto py-8 sm:py-12">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Header */}
                    <motion.div className="mb-12 text-center sm:mb-16">
                        {/* Eyebrow text */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="text-sm font-semibold tracking-wide text-green-600 uppercase"
                        >
                            Pendaftaran Santri Baru
                        </motion.p>

                        {/* Main heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl"
                        >
                            Cek <span className="text-green-600">Status Pendaftaran</span>
                        </motion.h2>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
                        >
                            Masukkan NISN Anda untuk mengetahui status <br className="hidden sm:block" /> pendaftaran di Ponpes Al-Mazaya.
                        </motion.p>
                    </motion.div>

                    {/* Search Card */}
                    <Card className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-md">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-xl font-semibold text-gray-900">Pencarian Data Pendaftaran</CardTitle>
                            <CardDescription>Masukkan NISN untuk memeriksa status pendaftaran Anda</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {/* Search Input + Button grouped */}
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Masukkan NISN ..."
                                            className="pl-10 text-black"
                                            value={nisn}
                                            onChange={(e) => setNisn(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div>
                                    <Button
                                        onClick={checkNisn}
                                        disabled={loading}
                                        className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-2 font-medium text-white shadow-sm transition-all sm:w-40 ${
                                            loading ? 'cursor-not-allowed bg-green-400 opacity-80' : 'bg-green-600 hover:bg-green-700 active:scale-95'
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                <span>Memuat...</span>
                                            </>
                                        ) : (
                                            'Cari'
                                        )}
                                    </Button>
                                </div>

                                {/* Error message */}
                                {error && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results */}
                <div className="mx-auto mt-8 max-w-4xl sm:mt-12">
                    {loading && (
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <div className="animate-pulse space-y-6">
                                    <div className="h-8 w-1/3 rounded bg-muted"></div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="h-16 rounded bg-muted"></div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {result && !loading && (
                        <Card className="rounded-2xl border border-gray-200 bg-white shadow-lg transition hover:shadow-xl">
                            <CardHeader>
                                <div className="items-left flex flex-col justify-between gap-6 sm:flex-row">
                                    {/* Status Badge */}
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-full ${
                                                result.status_pendaftaran === 'Diterima' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {result.status_pendaftaran === 'Diterima' ? (
                                                <CheckCircle2 className="h-8 w-8" />
                                            ) : (
                                                <XCircle className="h-8 w-8" />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle
                                                className={`text-2xl font-extrabold tracking-tight ${
                                                    result.status_pendaftaran === 'Diterima' ? 'text-green-600' : 'text-red-600'
                                                }`}
                                            >
                                                {result.status_pendaftaran}
                                            </CardTitle>
                                            <CardDescription className="text-sm text-gray-500">Status Pendaftaran</CardDescription>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 shadow-sm">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                                            <CalendarDays className="h-5 w-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-semibold tracking-wide text-gray-500">Tanggal Daftar</p>
                                            <p className="text-base font-semibold text-gray-900">
                                                {new Date(result.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-8 sm:space-y-10">
                                {/* Info Sections */}
                                <InfoSection title="Informasi Pribadi" items={personalInfo} columns={2} />
                                <InfoSection title="Alamat" items={addressInfo} columns={2} />

                                {/* Split Family Info */}
                                <InfoSection title="Data Ayah" items={fatherInfo} columns={2} />
                                <InfoSection title="Data Ibu" items={motherInfo} columns={2} />
                                <InfoSection title="Informasi Keluarga" items={familyInfo} columns={2} />

                                <InfoSection title="Detail Pendaftaran" items={registrationInfo} columns={2} />

                                {/* Bukti Transaksi */}
                                {result.image_bukti_transaksi_url && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold text-gray-900">Bukti Transaksi</h3>
                                        <div className="overflow-hidden rounded-lg border bg-gray-50 shadow-sm">
                                            <img
                                                src={result.image_bukti_transaksi_url}
                                                alt="Bukti Transaksi"
                                                className="max-h-96 w-full object-contain transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Accepted Message */}
                                {result.status_pendaftaran === 'Diterima' && (
                                    <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-center shadow-sm">
                                        <p className="flex items-center justify-center gap-2 text-green-700">
                                            <CheckCircle2 className="h-5 w-5" />
                                            <span className="font-medium">Selamat! Anda diterima.</span>
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
