<?php

namespace App\Filament\Resources\Students\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class StudentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nisn')
                    ->searchable()
                    ->label('NISN'),
                TextColumn::make('nama')
                    ->searchable()
                    ->label('Nama'),
                TextColumn::make('program_pendidikan')
                    ->searchable()
                    ->label('Program Pendidikan'),
                TextColumn::make('nik')
                    ->searchable()
                    ->label('NIK'),
                TextColumn::make('nomor_kk')
                    ->searchable()
                    ->label('Nomor KK'),
                TextColumn::make('tempat_lahir')
                    ->searchable()
                    ->label('Tempat Lahir'),
                TextColumn::make('tanggal_lahir')
                    ->date()
                    ->sortable()
                    ->label('Tanggal Lahir'),
                TextColumn::make('jenis_kelamin')
                    ->searchable()
                    ->label('Jenis Kelamin'),
                TextColumn::make('alamat')
                    ->searchable()
                    ->label('Alamat'),
                TextColumn::make('provinsi')
                    ->searchable()
                    ->label('Provinsi'),
                TextColumn::make('kota')
                    ->searchable()
                    ->label('Kota'),
                TextColumn::make('kecamatan')
                    ->searchable()
                    ->label('Kecamatan'),
                TextColumn::make('kelurahan')
                    ->searchable()
                    ->label('Kelurahan'),
                TextColumn::make('asal_sekolah')
                    ->searchable()
                    ->label('Asal Sekolah'),
                TextColumn::make('nama_ayah')
                    ->searchable()
                    ->label('Nama Ayah'),
                TextColumn::make('nama_ibu')
                    ->searchable()
                    ->label('Nama Ibu'),
                TextColumn::make('no_hp_orangtua')
                    ->searchable()
                    ->label('No HP Orang Tua'),
                TextColumn::make('nama_pengirim')
                    ->searchable()
                    ->label('Nama Pengirim'),
                ImageColumn::make('image_bukti_transaksi_url'),
                TextColumn::make('status_pendaftaran')
                    ->searchable()
                    ->label('Status Pendaftaran'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->label('Created At'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->label('Updated At'),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
