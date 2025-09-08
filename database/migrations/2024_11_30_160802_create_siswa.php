<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->string('nisn')->unique();
            $table->string('nama');
            $table->string('program_pendidikan');
            $table->string('nik')->unique();
            $table->string('nomor_kk');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('jenis_kelamin');
            $table->string('alamat_domisili');
            $table->string('provinsi');
            $table->string('kota');
            $table->string('kecamatan');
            $table->string('kelurahan');
            $table->integer('jumlah_saudara');
            $table->integer('anak_ke');
            $table->string('asal_sekolah');
            $table->string('nama_ayah');
            $table->string('nik_ayah');
            $table->string('pendidikan_ayah');
            $table->string('pekerjaan_ayah');
            $table->string('nama_ibu');
            $table->string('nik_ibu');
            $table->string('pendidikan_ibu');
            $table->string('pekerjaan_ibu');
            $table->string('penghasilan');
            $table->string('alamat_kk');
            $table->string('no_hp_orangtua');
            $table->integer('kopiah')->nullable();
            $table->string('seragam');
            $table->string('nama_pengirim');
            $table->string('image_bukti_transaksi_url');
            $table->string('status_pendaftaran')->default('menunggu verifikasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
