<?php

namespace App\Filament\Resources\JumlahSiswas\Pages;

use App\Filament\Resources\JumlahSiswas\JumlahSiswaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListJumlahSiswas extends ListRecords
{
    protected static string $resource = JumlahSiswaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
