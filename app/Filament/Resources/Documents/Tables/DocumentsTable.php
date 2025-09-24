<?php

namespace App\Filament\Resources\Documents\Tables;

use App\Models\Document;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\IconColumn;

class DocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        Document::CATEGORY_SURAT_PERNYATAAN => 'success',
                        Document::CATEGORY_ATURAN_AL_MAZAYA => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => Document::CATEGORIES[$state] ?? $state)
                    ->sortable()
                    ->searchable(),
                TextColumn::make('file_path')
                    ->label('File Path')
                    ->url(fn($record) => asset('storage/documents/'.$record->file_path), true),
                TextColumn::make('extension')
                    ->badge()
                    ->sortable(),
                TextColumn::make('head')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('description')->limit(50),
                TextColumn::make('created_at')->dateTime(),
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
