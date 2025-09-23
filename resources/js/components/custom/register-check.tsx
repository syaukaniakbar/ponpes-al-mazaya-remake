import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Search, XCircle } from 'lucide-react';
import { useState } from 'react';

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

export default function RegisterCheck() {
    const [nisn, setNisn] = useState('');
    const [result, setResult] = useState<Siswa | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            const response = await fetch(`/api/siswa/check-nisn/${nisn}`);
            const data = await response.json();

            if (data.exists) {
                setResult(data.data);
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
              { label: 'Provinsi', value: result.provinsi },
              { label: 'Kota', value: result.kota },
              { label: 'Kecamatan', value: result.kecamatan },
              { label: 'Kelurahan', value: result.kelurahan },
              { label: 'Alamat KK', value: result.alamat_kk },
          ]
        : [];

    const familyInfo = result
        ? [
              { label: 'Jumlah Saudara', value: result.jumlah_saudara },
              { label: 'Anak Ke', value: result.anak_ke },
              { label: 'Nama Ayah', value: result.nama_ayah },
              { label: 'NIK Ayah', value: result.nik_ayah },
              { label: 'Pendidikan / Pekerjaan Ayah', value: `${result.pendidikan_ayah} / ${result.pekerjaan_ayah}` },
              { label: 'Nama Ibu', value: result.nama_ibu },
              { label: 'NIK Ibu', value: result.nik_ibu },
              { label: 'Pendidikan / Pekerjaan Ibu', value: `${result.pendidikan_ibu} / ${result.pekerjaan_ibu}` },
              { label: 'Penghasilan Orang Tua', value: result.penghasilan },
              { label: 'No HP Orang Tua', value: result.no_hp_orangtua },
          ]
        : [];

    const registrationInfo = result
        ? [
              { label: 'Kopiah', value: result.kopiah },
              { label: 'Seragam', value: result.seragam },
              { label: 'Nama Pengirim', value: result.nama_pengirim },
              { label: 'Tanggal Daftar', value: result.created_at },
          ]
        : [];

    const InfoSection = ({ title, items }: { title: string; items: { label: string; value: string | number }[] }) => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((item, index) => (
                    <div key={index} className="rounded-lg border bg-card p-4">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="container w-full bg-green-50 py-12 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
                <div className="mb-12">
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Cek Status Pendaftaran</h1>
                    <p className="text-lg text-muted-foreground">Ponpes Al-Mazaya</p>
                    <p className="mt-3 text-muted-foreground">Masukkan NISN Anda untuk melihat status pendaftaran</p>
                </div>

                <Card className="mx-auto w-full max-w-xl border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Pencarian Data Pendaftaran</CardTitle>
                        <CardDescription>Masukkan NISN Anda untuk memeriksa status pendaftaran</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Masukkan NISN ..."
                                    className="pl-10"
                                    value={nisn}
                                    onChange={(e) => setNisn(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <Button className="w-full" onClick={checkNisn} disabled={loading}>
                                {loading ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                        Memuat...
                                    </>
                                ) : (
                                    'Cari Status Pendaftaran'
                                )}
                            </Button>
                            {error && <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">{error}</div>}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
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
                    <Card className="border-border shadow-sm">
                        <CardHeader>
                            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div className="flex items-center gap-3">
                                    {result.status_pendaftaran === 'Diterima' ? (
                                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                                    ) : (
                                        <XCircle className="h-10 w-10 text-destructive" />
                                    )}
                                    <div>
                                        <CardTitle
                                            className={`text-2xl ${result.status_pendaftaran === 'Diterima' ? 'text-green-600' : 'text-destructive'}`}
                                        >
                                            {result.status_pendaftaran}
                                        </CardTitle>
                                        <CardDescription>Status Pendaftaran</CardDescription>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-muted px-4 py-2 text-center">
                                    <p className="text-sm text-muted-foreground">Tanggal Daftar</p>
                                    <p className="font-medium">{result.created_at}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <InfoSection title="Informasi Pribadi" items={personalInfo} />

                            <InfoSection title="Alamat" items={addressInfo} />

                            <InfoSection title="Informasi Keluarga" items={familyInfo} />

                            <InfoSection title="Detail Pendaftaran" items={registrationInfo} />

                            {result.image_bukti_transaksi_url && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground">Bukti Transaksi</h3>
                                    <div className="overflow-hidden rounded-lg border">
                                        <img src={result.image_bukti_transaksi_url} alt="Bukti Transaksi" className="w-full object-cover" />
                                    </div>
                                </div>
                            )}

                            {result.status_pendaftaran === 'Diterima' && (
                                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-900/20">
                                    <p className="font-medium text-green-700 dark:text-green-400">
                                        Selamat! Anda diterima. Silakan datang ke pondok membawa berkas asli.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    );
}
