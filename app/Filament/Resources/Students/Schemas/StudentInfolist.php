<?php

namespace App\Filament\Resources\Students\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\TextSize;
use Illuminate\Support\Facades\Storage;

class StudentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Header Section - Most Important Info
                Section::make()
                    ->schema([
                        TextEntry::make('nama')
                            ->label('Nama Lengkap Santri')
                            ->size(TextSize::Large)
                            ->weight(FontWeight::Bold)
                            ->icon('heroicon-o-user-circle')
                            ->iconColor('primary')
                            ->columnSpanFull(),
                        
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('nisn')
                                    ->label('NISN')
                                    ->size(TextSize::Medium)
                                    ->copyable()
                                    ->copyMessage('NISN disalin!')
                                    ->icon('heroicon-o-identification'),
                                
                                TextEntry::make('program_pendidikan')
                                    ->label('Program')
                                    ->badge()
                                    ->size(TextSize::Medium)
                                    ->color('info')
                                    ->icon('heroicon-o-academic-cap'),
                                
                                TextEntry::make('status_pendaftaran')
                                    ->label('Status Pendaftaran')
                                    ->badge()
                                    ->size(TextSize::Medium)
                                    ->color(fn (string $state): string => match ($state) {
                                        'menunggu verifikasi' => 'warning',
                                        'diterima' => 'success',
                                        'ditolak' => 'danger',
                                        default => 'gray',
                                    }),
                            ]),
                    ])
                    ->columnSpanFull(),

                // Personal Data Section
                Section::make('Data Pribadi Santri')
                    ->description('Informasi identitas dan kelahiran')
                    ->icon('heroicon-o-identification')
                    ->collapsible()
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('nik')
                                    ->label('NIK')
                                    ->size(TextSize::Medium)
                                    ->copyable()
                                    ->copyMessage('NIK disalin!')
                                    ->icon('heroicon-o-credit-card'),
                                
                                TextEntry::make('nomor_kk')
                                    ->label('Nomor KK')
                                    ->size(TextSize::Medium)
                                    ->copyable()
                                    ->copyMessage('Nomor KK disalin!')
                                    ->icon('heroicon-o-document-text'),
                                
                                TextEntry::make('jenis_kelamin')
                                    ->label('Jenis Kelamin')
                                    ->size(TextSize::Medium)
                                    ->badge()
                                    ->color(fn (string $state): string => match (strtolower($state)) {
                                        'laki-laki', 'l' => 'info',
                                        'perempuan', 'p' => 'danger',
                                        default => 'gray',
                                    }),
                            ]),
                        
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('tempat_lahir')
                                    ->label('Tempat Lahir')
                                    ->size(TextSize::Medium)
                                    ->icon('heroicon-o-map-pin'),
                                
                                TextEntry::make('tanggal_lahir')
                                    ->label('Tanggal Lahir')
                                    ->size(TextSize::Medium)
                                    ->date('d F Y')
                                    ->icon('heroicon-o-cake'),
                            ]),
                        
                        TextEntry::make('asal_sekolah')
                            ->label('Asal Sekolah')
                            ->size(TextSize::Medium)
                            ->icon('heroicon-o-building-library')
                            ->columnSpanFull(),
                    ]),

                // Address Section
                Section::make('Alamat & Kontak')
                    ->description('Informasi tempat tinggal dan nomor telepon')
                    ->icon('heroicon-o-map')
                    ->collapsible()
                    ->schema([
                        TextEntry::make('alamat')
                            ->label('Alamat Lengkap')
                            ->size(TextSize::Medium)
                            ->icon('heroicon-o-home')
                            ->columnSpanFull(),
                        
                        Grid::make(4)
                            ->schema([
                                TextEntry::make('kelurahan')
                                    ->label('Kelurahan/Desa')
                                    ->size(TextSize::Medium),
                                
                                TextEntry::make('kecamatan')
                                    ->label('Kecamatan')
                                    ->size(TextSize::Medium),
                                
                                TextEntry::make('kota')
                                    ->label('Kota/Kabupaten')
                                    ->size(TextSize::Medium),
                                
                                TextEntry::make('provinsi')
                                    ->label('Provinsi')
                                    ->size(TextSize::Medium),
                            ]),
                        
                        TextEntry::make('no_hp_orangtua')
                            ->label('Nomor HP Orang Tua')
                            ->size(TextSize::Medium)
                            ->icon('heroicon-o-phone')
                            ->iconColor('success')
                            ->copyable()
                            ->copyMessage('Nomor HP disalin!')
                            ->url(fn ($record) => "tel:{$record->no_hp_orangtua}")
                            ->color('success')
                            ->weight(FontWeight::SemiBold),
                    ]),

                // Parents Data Section
                Section::make('Data Orang Tua')
                    ->description('Informasi ayah dan ibu kandung')
                    ->icon('heroicon-o-users')
                    ->collapsible()
                    ->columns(2)
                    ->schema([
                        TextEntry::make('nama_ayah')
                            ->label('Nama Ayah Kandung')
                            ->size(TextSize::Medium)
                            ->icon('heroicon-o-user')
                            ->iconColor('info'),
                        
                        TextEntry::make('nama_ibu')
                            ->label('Nama Ibu Kandung')
                            ->size(TextSize::Medium)
                            ->icon('heroicon-o-user')
                            ->iconColor('danger'),
                    ]),

                // Payment Section
                Section::make('Bukti Pembayaran Pendaftaran')
                    ->description('Foto bukti transfer pembayaran')
                    ->icon('heroicon-o-banknotes')
                    ->collapsible()
                    ->schema([
                        TextEntry::make('nama_pengirim')
                            ->label('Nama Pengirim (Sesuai Rekening)')
                            ->size(TextSize::Medium)
                            ->icon('heroicon-o-user')
                            ->weight(FontWeight::SemiBold)
                            ->columnSpanFull(),
                        
                        ImageEntry::make('image_bukti_transaksi_url')
                            ->disk('public')
                            ->label('Foto Bukti Transfer (Klik gambar untuk memperbesar)')
                            ->hiddenLabel()
                            ->columnSpanFull()
                            ->height(600)
                            ->width('100%')
                            ->extraImgAttributes([
                                'class' => 'rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200',
                                'style' => 'object-fit: contain; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 1rem;',
                            ])
                            ->url(fn ($record) => $record->image_bukti_transaksi_url 
                                ? Storage::disk('public')->url($record->image_bukti_transaksi_url) 
                                : null)
                            ->openUrlInNewTab(),
                    ]),
            ]);
    }
}
