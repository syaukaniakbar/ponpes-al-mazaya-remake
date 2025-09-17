<?php

namespace App\Filament\Resources\JumlahSiswas\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;

class JumlahSiswaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('angkatan')
                    ->required()
                    ->label('Angkatan')
                    ->placeholder('Contoh: 2025')
                    ->columnSpanFull(),

                TextInput::make('ma')
                    ->numeric()
                    ->required()
                    ->minValue(0)
                    ->label('MA (Madrasah Aliyah)')
                    ->placeholder('Jumlah siswa MA')
                    ->columnSpan(2)
                    ->live()
                    ->afterStateUpdated(function (callable $get, callable $set) {
                        $ma = (int) $get('ma') ?? 0;
                        $mts = (int) $get('mts') ?? 0;
                        $wustha = (int) $get('wustha') ?? 0;
                        $ulya = (int) $get('ulya') ?? 0;
                        $total = $ma + $mts + $wustha + $ulya;
                        $set('total_siswa', $total);
                    })
                    ->step(1),

                TextInput::make('mts')
                    ->numeric()
                    ->required()
                    ->minValue(0)
                    ->label('MTs (Madrasah Tsanawiyah)')
                    ->placeholder('Jumlah siswa MTs')
                    ->columnSpan(2)
                    ->live()
                    ->afterStateUpdated(function (callable $get, callable $set) {
                        $ma = (int) $get('ma') ?? 0;
                        $mts = (int) $get('mts') ?? 0;
                        $wustha = (int) $get('wustha') ?? 0;
                        $ulya = (int) $get('ulya') ?? 0;
                        $total = $ma + $mts + $wustha + $ulya;
                        $set('total_siswa', $total);
                    })
                    ->step(1),

                TextInput::make('wustha')
                    ->numeric()
                    ->required()
                    ->minValue(0)
                    ->label('Wustha')
                    ->placeholder('Jumlah siswa Wustha')
                    ->columnSpan(2)
                    ->live()
                    ->afterStateUpdated(function (callable $get, callable $set) {
                        $ma = (int) $get('ma') ?? 0;
                        $mts = (int) $get('mts') ?? 0;
                        $wustha = (int) $get('wustha') ?? 0;
                        $ulya = (int) $get('ulya') ?? 0;
                        $total = $ma + $mts + $wustha + $ulya;
                        $set('total_siswa', $total);
                    })
                    ->step(1),

                TextInput::make('ulya')
                    ->numeric()
                    ->required()
                    ->minValue(0)
                    ->label('Ulya')
                    ->placeholder('Jumlah siswa Ulya')
                    ->columnSpan(2)
                    ->live()
                    ->afterStateUpdated(function (callable $get, callable $set) {
                        $ma = (int) $get('ma') ?? 0;
                        $mts = (int) $get('mts') ?? 0;
                        $wustha = (int) $get('wustha') ?? 0;
                        $ulya = (int) $get('ulya') ?? 0;
                        $total = $ma + $mts + $wustha + $ulya;
                        $set('total_siswa', $total);
                    })
                    ->step(1),

                TextInput::make('total_siswa')
                    ->numeric()
                    ->required()
                    ->minValue(0)
                    ->label('Total Siswa')
                    ->placeholder('Total otomatis dihitung')
                    ->columnSpanFull()
                    ->readOnly()
                    ->step(1),
            ]);
    }
}
