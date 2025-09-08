<?php

namespace App\Filament\Resources\Documents\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

               Select::make('type')
                    ->required()
                    ->options([
                        'pdf' => 'PDF',
                        'docx' => 'Word Document',
                        'xlsx' => 'Excel Sheet',
                        'image' => 'Image',
                    ]),

                FileUpload::make('path')
                    ->directory('documents')
                    ->preserveFilenames()
                    ->required()
                    ->label('Upload File'),
            ]);
    }
}
