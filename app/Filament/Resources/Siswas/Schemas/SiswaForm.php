<?php

namespace App\Filament\Resources\Siswas\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Cache;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Village;


class SiswaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // DATA PRIBADI SISWA
                TextInput::make('nisn')
                    ->label('NISN')
                    ->required()
                    ->columnSpanFull(),
                   
                TextInput::make('nama')
                    ->label('Nama Lengkap')
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('nik')
                    ->label('NIK')
                    ->required()
                    ->columnSpan(1),

                TextInput::make('nomor_kk')
                    ->label('Nomor KK')
                    ->required()
                    ->columnSpan(1),

                TextInput::make('tempat_lahir')
                    ->label('Tempat Lahir')
                    ->required()
                    ->columnSpan(1),

                DatePicker::make('tanggal_lahir')
                    ->label('Tanggal Lahir')
                    ->required()
                    ->columnSpan(1),
                Select::make('jenis_kelamin')
                    ->label('Jenis Kelamin')
                    ->options([
                        'laki-laki' => 'Laki-laki',
                        'perempuan' => 'Perempuan',
                    ])
                    ->required()
                    ->native(false)
                    ->columnSpan(1),
                    
                Select::make('program_pendidikan')
                    ->label('Program Pendidikan')
                    ->options([
                        'ma' => 'MA (Madrasah Aliyah)',
                        'mts' => 'MTS (Madrasah Tsanawiyah)',
                        'wustha' => 'Wustha',
                        'ulya' => 'Ulya',
                    ])
                    ->required()
                    ->native(false)
                    ->columnSpan(1),
                TextInput::make('jumlah_saudara')
                    ->label('Jumlah Saudara')
                    ->numeric()
                    ->required()
                    ->columnSpan(1),
                TextInput::make('anak_ke')
                    ->label('Anak Ke-')
                    ->numeric()
                    ->required()
                    ->columnSpan(1),
                Textarea::make('alamat_domisili')
                    ->label('Alamat Domisili')
                    ->required()
                    ->columnSpanFull()
                    ->rows(4), 
                Select::make('provinsi')
                    ->label('Provinsi')
                    ->required()
                    ->placeholder('Pilih provinsi')
                    ->options(function () {
                        return Cache::remember('provinsi', 86400, function () {
                            return Province::pluck('name', 'code')->toArray();
                        });
                    })
                    ->native(false)
                    ->searchable()
                    ->afterStateUpdated(fn (callable $set) => $set('kota', null))
                    ->columnSpan(1),
                Select::make('kota')
                    ->label('Kota / Kabupaten')
                    ->required()
                    ->placeholder('Pilih kota')
                    ->options(function (callable $get) {
                        $provinsiCode = $get('provinsi');
                        if ($provinsiCode) {
                            return City::where('province_code', $provinsiCode)
                                ->pluck('name', 'code')
                                ->toArray();
                        }
                        return [];
                    })
                    ->native(false)
                    ->searchable()
                    ->preload()
                    ->live()
                    ->afterStateUpdated(fn (callable $set) => $set('kecamatan', null))
                    ->disabled(fn (callable $get) => empty($get('provinsi')))
                    ->columnSpan(1),
                Select::make('kecamatan')
                    ->label('Kecamatan')
                    ->required()
                    ->placeholder('Pilih kecamatan')
                    ->options(function (callable $get) {
                        $kotaCode = $get('kota');
                        if ($kotaCode) {
                            return District::where('city_code', $kotaCode)
                                ->pluck('name', 'code')
                                ->toArray();
                        }
                        return [];
                    })
                    ->native(false)
                    ->searchable()
                    ->preload()
                    ->live()
                    ->afterStateUpdated(fn (callable $set) => $set('kelurahan', null))
                    ->disabled(fn (callable $get) => empty($get('kota')))
                    ->columnSpan(1),
                Select::make('kelurahan')
                    ->label('Kelurahan / Desa')
                    ->required()
                    ->placeholder('Pilih kelurahan')
                    ->options(function (callable $get) {
                        $kecamatanCode = $get('kecamatan');
                        if ($kecamatanCode) {
                            return Village::where('district_code', $kecamatanCode)
                                ->pluck('name', 'code')
                                ->toArray();
                        }
                        return [];
                    })
                    ->native(false)
                    ->searchable()
                    ->preload()
                    ->live()
                    ->disabled(fn (callable $get) => empty($get('kecamatan')))
                    ->columnSpan(1),
                
                TextInput::make('asal_sekolah')
                    ->label('Nama Sekolah Asal')
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('nama_ayah')
                    ->label('Nama Ayah')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('nik_ayah')
                    ->label('NIK Ayah')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('pendidikan_ayah')
                    ->label('Pendidikan Terakhir Ayah')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('pekerjaan_ayah')
                    ->label('Pekerjaan Ayah')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('nama_ibu')
                    ->label('Nama Ibu')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('nik_ibu')
                    ->label('NIK Ibu')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('pendidikan_ibu')
                    ->label('Pendidikan Terakhir Ibu')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('pekerjaan_ibu')
                    ->label('Pekerjaan Ibu')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('penghasilan')
                    ->label('Penghasilan Orang Tua (Rp)')
                    ->required()
                    ->numeric()
                    ->columnSpanFull(),
                TextInput::make('no_hp_orangtua')
                    ->label('No. HP Orang Tua')
                    ->tel()
                    ->required()
                    ->columnSpan(1),
                TextInput::make('alamat_kk')
                    ->label('Alamat KK')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('kopiah')
                    ->label('Ukuran Kopiah')
                    ->numeric()
                    ->nullable()
                    ->columnSpan(1),
                TextInput::make('seragam')
                    ->label('Ukuran Seragam')
                    ->required()
                    ->columnSpan(1),
                TextInput::make('nama_pengirim')
                    ->label('Nama Pengirim')
                    ->required()
                    ->columnSpanFull(),

                // BUKTI TRANSAKSI
                FileUpload::make('image_bukti_transaksi_url')
                    ->label('Bukti Transaksi')
                    ->image()
                    ->imagePreviewHeight(100)
                    ->directory('transaction_images') 
                    ->disk('public') 
                    ->downloadable()
                    ->openable()
                    ->preserveFilenames()
                    ->nullable()
                    ->imagePreviewHeight('350') 
                    ->columnSpanFull(),
                
                // STATUS PENDAFTARAN
                Select::make('status_pendaftaran')
                    ->label('Status Pendaftaran')
                    ->options([
                        'menunggu verifikasi' => 'Menunggu Verifikasi',
                        'diterima' => 'Diterima',
                        'ditolak' => 'Ditolak',
                    ])
                    ->default('menunggu verifikasi')
                    ->required()
                    ->native(false)
                    ->columnSpanFull(),
            ]);
    }
}