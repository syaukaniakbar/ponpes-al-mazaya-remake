<?php

namespace App\Filament\Resources\JumlahSiswas\Pages;

use App\Filament\Resources\JumlahSiswas\JumlahSiswaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditJumlahSiswa extends EditRecord
{
    protected static string $resource = JumlahSiswaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
