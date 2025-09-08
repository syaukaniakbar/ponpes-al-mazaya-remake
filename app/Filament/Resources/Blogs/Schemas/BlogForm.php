<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\Hidden;


class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('user_id')->default(fn () => Auth::id()),
                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255)
                    ->afterStateUpdated(function ($state, callable $set) {
                        // otomatis generate slug
                        $set('slug', Str::slug($state));
                    }),

                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),

                Select::make('category')
                    ->label('Category')
                    ->options([
                        'umum' => 'Umum',
                        'prestasi' => 'Prestasi',
                        'ilmiah' => 'Ilmiah',
                    ])
                    ->required(),

                FileUpload::make('image_url')
                    ->label('Image URL')
                    ->disk('public')               
                    ->directory('blog_images')      
                    ->visibility('public')          
                    ->image()                       
                    ->imagePreviewHeight('150')    
                    ->downloadable()
                    ->openable()
                    ->preserveFilenames()      
                    ->required(),


                RichEditor::make('description')
                    ->label('Description')
                    ->required()
                    ->columnSpan('full')
                    ->extraAttributes([
                        'style' => 'min-height:400px;',
                    ]),

                // user_id tidak perlu field di form, akan ditambahkan otomatis
            ]);
    }
}
