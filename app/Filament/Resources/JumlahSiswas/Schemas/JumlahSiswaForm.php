<?php

namespace App\Filament\Resources\JumlahSiswas\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;

class JumlahSiswaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('tingkatan')
                    ->options([
                        'wustha'  => 'Wustha',
                        'ulya' => 'Ulya',
                        'mts' => 'MTs',
                        'ma' => 'MA',
                    ])
                    ->required()
                    ->label('Tingkatan'),

                TextInput::make('tahun')
                    ->numeric()
                    ->required()
                    ->minValue(1900)
                    ->maxValue(date('Y'))
                    ->label('Tahun'),

                TextInput::make('total_siswa')
                    ->numeric()
                    ->required()
                    ->minValue(0)
                    ->label('Total Siswa'),
            ]);
    }
}
