<?php

namespace App\Filament\Resources\Siswas\Pages;

use App\Filament\Resources\Siswas\SiswaResource;
use App\Filament\Resources\Siswas\Tables\SiswasTable;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Tables\Table;

class ListSiswas extends ListRecords
{
    protected static string $resource = SiswaResource::class;

    public function table(Table $table): Table
    {
        return SiswasTable::configure($table);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}