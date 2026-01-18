<?php

namespace App\Filament\Resources\Students\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class StudentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nisn')
                    ->required(),
                TextInput::make('nama')
                    ->required(),
                TextInput::make('program_pendidikan')
                    ->required(),
                TextInput::make('nik')
                    ->required(),
                TextInput::make('nomor_kk')
                    ->required(),
                TextInput::make('tempat_lahir')
                    ->required(),
                DatePicker::make('tanggal_lahir')
                    ->required(),
                TextInput::make('jenis_kelamin')
                    ->required(),
                TextInput::make('alamat')
                    ->required(),
                TextInput::make('provinsi')
                    ->required(),
                TextInput::make('kota')
                    ->required(),
                TextInput::make('kecamatan')
                    ->required(),
                TextInput::make('kelurahan')
                    ->required(),
                TextInput::make('asal_sekolah')
                    ->required(),
                TextInput::make('nama_ayah')
                    ->required(),
                TextInput::make('nama_ibu')
                    ->required(),
                TextInput::make('no_hp_orangtua')
                    ->required(),
                TextInput::make('nama_pengirim')
                    ->required(),
                FileUpload::make('image_bukti_transaksi_url')
                    ->image()
                    ->required(),
                TextInput::make('status_pendaftaran')
                    ->required()
                    ->default('menunggu verifikasi'),
            ]);
    }
}
