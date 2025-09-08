<?php

namespace App\Filament\Resources\Blogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class BlogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                ImageColumn::make('image_url')
                ->label('Image')
                ->width(100)
                ->height(100)
                ->getStateUsing(fn ($record) => $record->image_url
                    ? asset('storage/' . $record->image_url)
                    : null)
                ->url(fn ($record) => $record->image_url
                    ? asset('storage/' . $record->image_url)
                    : null)
                ->openUrlInNewTab(),
                TextColumn::make('title')->searchable(),
                TextColumn::make('slug')->searchable(),
                TextColumn::make('description')
                ->label('Deskripsi')
                ->sortable()
                ->searchable()
                ->getStateUsing(fn ($record) => strip_tags($record->description))
                ->limit(100),
                TextColumn::make('category')->sortable(),
                TextColumn::make('created_at')->dateTime()->sortable(),
                TextColumn::make('updated_at')->dateTime()->sortable(),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
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
