<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
    {

    protected $fillable = [
        'nisn',
        'nama',
        'program_pendidikan',
        'nik',
        'nomor_kk',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'provinsi',
        'kota',
        'kecamatan',
        'kelurahan',
        'asal_sekolah',
        'nama_ayah',
        'nama_ibu',
        'no_hp_orangtua',
        'nama_pengirim',
        'image_bukti_transaksi_url',
        'status_pendaftaran'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];



}