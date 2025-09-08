<?php

namespace App\Filament\Resources\Headers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class HeadersTable
{
    public static function configure(Table $table): Table
    {
        return $table
           ->columns([
                TextColumn::make('id')->sortable(),
                ImageColumn::make('image_url')->label('Gambar'),
                TextColumn::make('label')->searchable(),
                TextColumn::make('nama_tombol_aksi')->label('Nama Tombol Aksi'),
                TextColumn::make('url_aksi')->label('URL Aksi'),
                TextColumn::make('title')->searchable(),
                TextColumn::make('description')->limit(50),
                TextColumn::make('created_at')->dateTime()->sortable(),
                TextColumn::make('updated_at')->dateTime()->sortable(),
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
