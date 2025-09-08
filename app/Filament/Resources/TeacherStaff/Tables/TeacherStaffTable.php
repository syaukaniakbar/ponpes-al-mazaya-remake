<?php

namespace App\Filament\Resources\TeacherStaff\Tables;

use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

class TeacherStaffTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
               ImageColumn::make('image_path')
               ->label('Image')
               ->width(100)
               ->height(100)
               ->getStateUsing(fn ($record) => $record->image_path
               ? asset('storage/' . $record->image_path)
               : null)
               ->url(fn ($record) => $record->image_path
               ? asset('storage/' . $record->image_path)
               : null)
               ->openUrlInNewTab(),
               TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
               TextColumn::make('role')
                    ->label('Jabatan')
                    ->sortable(),
               TextColumn::make('role_detail')
                    ->label('Detail Jabatan')
                    ->toggleable(isToggledHiddenByDefault: true),
               TextColumn::make('nip')
                    ->label('NIP')
                    ->sortable()
                    ->searchable(),
               TextColumn::make('phone')
                    ->label('Telepon'),
               TextColumn::make('joined_date')
                    ->label('Bergabung')
                    ->date('d M Y')
                    ->sortable(),
               BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'active',
                        'danger' => 'inactive',
                    ]),
               TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y H:i')
                    ->toggleable(isToggledHiddenByDefault: true),
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
