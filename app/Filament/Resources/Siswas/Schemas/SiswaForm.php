<?php

namespace App\Filament\Resources\Siswas\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;


class SiswaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
            TextInput::make('nisn')
            ->label('NISN')
            ->required(),
            TextInput::make('nama')->required(),
            TextInput::make('program_pendidikan')->required(),
            TextInput::make('nik')->required(),
            TextInput::make('nomor_kk')->required(),
            TextInput::make('tempat_lahir')->required(),
            DatePicker::make('tanggal_lahir')->required(),
            TextInput::make('jenis_kelamin')->required(),
            TextInput::make('tahun')->label('Tahun Masuk')->nullable(),
            TextInput::make('alamat_domisili')->required(),
           
            Select::make('provinsi')
                ->label('Provinsi')
                ->required()
                ->placeholder('Pilih provinsi')
                ->options(function () {
                    return Cache::remember('provinsi', 86400, function () {
                        $response = Http::get('https://syaukaniakbar.github.io/api-wilayah-indonesia/api/provinces.json');
                        return $response->successful()
                            ? collect($response->json())->pluck('name', 'id')->toArray()
                            : ['' => 'Gagal memuat provinsi'];
                    });
                })
                ->native(false)
                ->searchable()
                ->afterStateUpdated(fn (callable $set) => $set('kota', null)),

            Select::make('kota')
                ->label('Kota / Kabupaten')
                ->required()
                ->placeholder('Pilih kota')
                ->options(function (callable $get) {
                    $provinsiId = $get('provinsi');
                    if ($provinsiId) {
                        $response = Http::get("https://syaukaniakbar.github.io/api-wilayah-indonesia/api/regencies/{$provinsiId}.json");
                        return $response->successful()
                            ? collect($response->json())->pluck('name', 'id')->toArray()
                            : ['' => 'Gagal memuat kota'];
                    }
                    return [];
                })
                ->native(false)
                ->searchable()
                ->preload()
                ->live()
                ->afterStateUpdated(fn (callable $set) => $set('kecamatan', null))
                ->disabled(fn (callable $get) => empty($get('provinsi'))),

            Select::make('kecamatan')
                ->label('Kecamatan')
                ->required()
                ->placeholder('Pilih kecamatan')
                ->options(function (callable $get) {
                    $kotaId = $get('kota');
                    if ($kotaId) {
                        $response = Http::get("https://syaukaniakbar.github.io/api-wilayah-indonesia/api/districts/{$kotaId}.json");
                        return $response->successful()
                            ? collect($response->json())->pluck('name', 'id')->toArray()
                            : ['' => 'Gagal memuat kecamatan'];
                    }
                    return [];
                })
                ->native(false)
                ->searchable()
                ->preload()
                ->live()
                ->afterStateUpdated(fn (callable $set) => $set('kelurahan', null))
                ->disabled(fn (callable $get) => empty($get('kota'))),

            Select::make('kelurahan')
                ->label('Kelurahan / Desa')
                ->required()
                ->placeholder('Pilih kelurahan')
                ->options(function (callable $get) {
                    $kecamatanId = $get('kecamatan');
                    if ($kecamatanId) {
                        $response = Http::get("https://syaukaniakbar.github.io/api-wilayah-indonesia/api/villages/{$kecamatanId}.json");
                        return $response->successful()
                            ? collect($response->json())->pluck('name', 'id')->toArray()
                            : ['' => 'Gagal memuat kelurahan'];
                    }
                    return [];
                })
                ->native(false)
                ->searchable()
                ->preload()
                ->live()
                ->disabled(fn (callable $get) => empty($get('kecamatan'))),

            TextInput::make('jumlah_saudara')->numeric()->required(),
            TextInput::make('anak_ke')->numeric()->required(),
            TextInput::make('asal_sekolah')->required(),
            TextInput::make('nama_ayah')->required(),
            TextInput::make('nik_ayah')->required(),
            TextInput::make('pendidikan_ayah')->required(),
            TextInput::make('pekerjaan_ayah')->required(),
            TextInput::make('nama_ibu')->required(),
            TextInput::make('nik_ibu')->required(),
            TextInput::make('pendidikan_ibu')->required(),
            TextInput::make('pekerjaan_ibu')->required(),
            TextInput::make('penghasilan')->required(),
            TextInput::make('alamat_kk')->required(),
            TextInput::make('no_hp_orangtua')->tel()->required(),
            TextInput::make('kopiah')->numeric()->nullable(),
            TextInput::make('seragam')->required(),
            TextInput::make('nama_pengirim')->required(),
            FileUpload::make('image_bukti_transaksi_url')
                ->label('Bukti Transaksi')
                ->image()
                ->imagePreviewHeight(100)
                ->directory('transaction_images') 
                ->disk('public') 
                ->downloadable()
                ->openable()
                ->preserveFilenames()
                ->nullable(),
            Select::make('status_pendaftaran')
                ->options([
                    'menunggu verifikasi' => 'Menunggu Verifikasi',
                    'diterima' => 'Diterima',
                    'ditolak' => 'Ditolak',
                ])
                ->default('menunggu verifikasi')
                ->required(),
            ]);
    }
}
