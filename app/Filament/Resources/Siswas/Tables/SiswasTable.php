<?php

namespace App\Filament\Resources\Siswas\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ActionGroup;
use Filament\Tables\Columns\ImageColumn;

class SiswasTable
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
                ->label('Nama')
                ->formatStateUsing(fn ($state) => strtoupper($state)),
                TextColumn::make('program_pendidikan')
                ->label('Program Pendidikan')
                ->formatStateUsing(fn ($state) => strtoupper($state)),
                TextColumn::make('jenis_kelamin')
                ->label('Jenis Kelamin')
                ->formatStateUsing(fn ($state) => strtoupper($state)),
                TextColumn::make('tanggal_lahir')->date()
                ->label('Tanggal Lahir'),
                TextColumn::make('asal_sekolah')
                ->label('Asal Sekolah'),
                ImageColumn::make('image_bukti_transaksi_url')
                    ->label('Bukti Transaksi')
                    ->width(100)
                    ->height(100)
                    ->getStateUsing(fn ($record) => $record->image_bukti_transaksi_url 
                        ? asset('storage/' . $record->image_bukti_transaksi_url) 
                        : null)
                    ->url(fn ($record) => $record->image_bukti_transaksi_url 
                        ? asset('storage/' . $record->image_bukti_transaksi_url) 
                        : null)
                    ->openUrlInNewTab(),

    ])
        ->filters([
                    SelectFilter::make('program_pendidikan')
                    ->options([
                        'wustha' => 'Wustha',
                        'ulya'   => 'Ulya',
                        'mts'    => 'MTS',
                        'ma'     => 'MA',
                    ])
            ->label('Program Pendidikan'),
                ])
            ->actions([
                EditAction::make(),  // Tombol untuk edit
            ])
            ->bulkActions([
                // Menambahkan aksi Bulk untuk menghapus data
                DeleteBulkAction::make(),
            ]);
    }
}
