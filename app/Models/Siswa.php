<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Siswa extends Model
{
    protected $table = 'siswa';

    protected $fillable = [
        'nisn',
        'nama',
        'program_pendidikan',
        'nik',
        'nomor_kk',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat_domisili',
        'provinsi',
        'kota',
        'kecamatan',
        'kelurahan',
        'jumlah_saudara',
        'anak_ke',
        'asal_sekolah',
        'nama_ayah',
        'nik_ayah',
        'pendidikan_ayah',
        'pekerjaan_ayah',
        'nama_ibu',
        'nik_ibu',
        'pendidikan_ibu',
        'pekerjaan_ibu',
        'penghasilan',
        'alamat_kk',
        'no_hp_orangtua',
        'kopiah',
        'seragam',
        'nama_pengirim',
        'image_bukti_transaksi_url',
        'status_pendaftaran'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'jumlah_saudara' => 'integer',
        'anak_ke' => 'integer',
        'kopiah' => 'integer',
    ];

    use HasFactory;

    /**
     * Delete the associated transaction image when the record is deleted.
     */
    protected static function booted()
    {
        static::deleting(function ($siswa) {
            if ($siswa->image_bukti_transaksi_url) {
                // Delete the associated transaction image file
                if (Storage::disk('public')->exists($siswa->image_bukti_transaksi_url)) {
                    Storage::disk('public')->delete($siswa->image_bukti_transaksi_url);
                }
            }
        });
    }
}
