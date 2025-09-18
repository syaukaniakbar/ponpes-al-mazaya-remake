<?php

namespace App\Filament\Resources\Headers\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use App\Models\Header;

class HeaderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                  FileUpload::make('image_url')
                    ->label('Image URL')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->directory('header_images')
                    ->preserveFilenames(),

                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->maxLength(255),

                TextInput::make('button_text')
                    ->label('Button Text')
                    ->maxLength(255),

                TextInput::make('button_url')
                    ->label('Button URL')
                    ->url()
                    ->maxLength(255),
            ]);
    }
}
