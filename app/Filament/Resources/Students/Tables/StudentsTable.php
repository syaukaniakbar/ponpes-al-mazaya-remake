<?php

namespace App\Filament\Resources\Students\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Actions\Action;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\StudentsExport;


class StudentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

            TextColumn::make('created_at')
                ->dateTime('d M Y H:i')
                ->sortable()
                ->label('Tanggal Pendaftaran'),

            TextColumn::make('nisn')
                ->searchable()
                ->sortable()
                ->label('NISN'),

            TextColumn::make('nama')
                ->searchable()
                ->sortable()
                ->formatStateUsing(fn ($state) => strtoupper($state))
                ->weight('bold')
                ->label('Nama'),

            TextColumn::make('program_pendidikan')
                ->badge()
                ->color('info')
                ->formatStateUsing(fn ($state) => strtoupper($state))
                ->label('Program'),

            TextColumn::make('asal_sekolah')
                ->limit(25)
                ->formatStateUsing(fn ($state) => strtoupper($state))
                ->tooltip(fn ($state) => $state)
                ->searchable()
                ->label('Asal Sekolah'),

            TextColumn::make('no_hp_orangtua')
                ->label('No HP Orang Tua'),

            ImageColumn::make('image_bukti_transaksi_url')
                ->disk('public')
                ->size(120)
                ->label('Bukti'),
        ])
        ->filters([
                SelectFilter::make('program_pendidikan')
                    ->label('Program Pendidikan')
                    ->options([
                        'wustha'  => 'Wustha',
                        'ulya' => 'Ulya',
                        'mts' => 'MTs',
                        'ma' => 'MA',
                    ])
                    ->searchable(),

                SelectFilter::make('jenis_kelamin')
                    ->label('Putra / Putri')
                    ->options([
                        'laki-laki' => 'Putra',
                        'perempuan' => 'Putri',
                    ]),
        ])
        ->recordActions([
            ViewAction::make(),
            EditAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
            Action::make('export')
                ->label('Export Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->action(function ($livewire) {
                    $filters = $livewire->tableFilters;
                    return Excel::download(new StudentsExport($filters), 'data-santri-' . now()->format('Y-m-d') . '.xlsx');
                }),
        ]);
    }
}
