<?php

namespace App\Filament\Resources\Videos\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

class VideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255),
                Textarea::make('description')
                    ->label('Description')
                    ->required()
                    ->maxLength(65535),
                TextInput::make('url')
                    ->label('URL')
                    ->url() // validasi otomatis URL
                    ->required()
                    ->maxLength(255),
            ]);
    }
}
