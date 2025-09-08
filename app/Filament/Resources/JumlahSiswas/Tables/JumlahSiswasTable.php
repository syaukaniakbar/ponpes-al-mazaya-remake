<?php

namespace App\Filament\Resources\JumlahSiswas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class JumlahSiswasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('tingkatan')
                    ->sortable()
                    ->searchable()
                    ->label('Tingkatan'),

                TextColumn::make('tahun')
                    ->sortable()
                    ->searchable()
                    ->label('Tahun'),

                TextColumn::make('total_siswa')
                    ->sortable()
                    ->label('Total Siswa'),

                TextColumn::make('created_at')
                    ->dateTime('d M Y H:i')
                    ->label('Dibuat'),

                TextColumn::make('updated_at')
                    ->dateTime('d M Y H:i')
                    ->label('Diubah'),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
