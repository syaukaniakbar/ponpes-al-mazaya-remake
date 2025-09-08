<?php

namespace App\Filament\Resources\NavLinks\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;


class NavLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->label('Slug (URL)')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                RichEditor::make('content')
                    ->label('Content')
                    ->required()
                    ->columnSpan('full')
                    ->extraAttributes([
                        'style' => 'min-height:400px;',
                    ]),
                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ]);
            
    }
}
