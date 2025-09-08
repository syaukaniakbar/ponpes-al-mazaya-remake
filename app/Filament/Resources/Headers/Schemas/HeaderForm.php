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
                    ->preserveFilenames()
                    ->required(),


                TextInput::make('label')
                    ->label('Label')
                    ->required()
                    ->maxLength(255),

                TextInput::make('nama_tombol_aksi')
                    ->label('Nama Tombol Aksi')
                    ->required()
                    ->maxLength(255),

                TextInput::make('url_aksi')
                    ->label('URL Aksi')
                    ->required()
                    ->url()
                    ->maxLength(255),

                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->required()
                    ->maxLength(255)
            ]);
    }
}
