<?php

namespace App\Filament\Resources\Documents\Schemas;

use App\Models\Document;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Illuminate\Http\UploadedFile;
use Closure;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->label('Document Name'),

                Select::make('category')
                    ->options([
                        'surat pernyataan' => 'Surat Pernyataan',
                        'aturan al mazaya' => 'Aturan Al Mazaya',
                    ])
                    ->required()
                    ->label('Category')
                    ->unique(ignoreRecord: true)
                    ->rules([
                        function () {
                            return function (string $attribute, $value, Closure $fail) {
                                if (Document::categoryExists($value)) {
                                    $fail('A document with this category already exists.');
                                }
                            };
                        }
                    ]),

                FileUpload::make('file_path')
                    ->disk('public')
                    ->directory('documents')
                    ->preserveFilenames()
                    ->required()
                    ->label('Upload File')
                    ->helperText('Mime type and extension will be filled automatically after file selection')
                    ->afterStateUpdated(function ($state, callable $set) {
                        if ($state instanceof UploadedFile) {
                            // Set mime type
                            $set('mime_type', $state->getMimeType());
                            
                            // Set extension
                            $set('extension', $state->getClientOriginalExtension());
                        }
                    })
                    ->reactive()
                    ->storeFileNamesIn('file_name'), // Store original filename

                TextInput::make('mime_type')
                    ->maxLength(255)
                    ->nullable()
                    ->disabled()
                    ->helperText('Automatically filled from uploaded file'),

                TextInput::make('extension')
                    ->maxLength(10)
                    ->nullable()
                    ->disabled()
                    ->helperText('Automatically filled from uploaded file'),

                TextInput::make('head')
                    ->maxLength(255)
                    ->nullable(),

                Textarea::make('description')
                    ->maxLength(65535)
                    ->nullable()
                    ->rows(3),
            ]);
    }
}
