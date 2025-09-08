<?php

namespace App\Filament\Resources\Videos\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;

class VideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                 TextInput::make('url')
                    ->label('URL')
                    ->url() // validasi otomatis URL
                    ->required()
                    ->maxLength(255),
            ]);
    }
}
