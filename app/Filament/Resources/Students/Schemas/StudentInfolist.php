<?php

namespace App\Filament\Resources\Students\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class StudentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('nisn'),
                TextEntry::make('nama'),
                TextEntry::make('program_pendidikan'),
                TextEntry::make('nik'),
                TextEntry::make('nomor_kk'),
                TextEntry::make('tempat_lahir'),
                TextEntry::make('tanggal_lahir')
                    ->date(),
                TextEntry::make('jenis_kelamin'),
                TextEntry::make('alamat'),
                TextEntry::make('provinsi'),
                TextEntry::make('kota'),
                TextEntry::make('kecamatan'),
                TextEntry::make('kelurahan'),
                TextEntry::make('asal_sekolah'),
                TextEntry::make('nama_ayah'),
                TextEntry::make('nama_ibu'),
                TextEntry::make('no_hp_orangtua'),
                TextEntry::make('nama_pengirim'),
                ImageEntry::make('image_bukti_transaksi_url'),
                TextEntry::make('status_pendaftaran'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
