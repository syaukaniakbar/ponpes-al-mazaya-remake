<?php

namespace App\Filament\Resources\JumlahSiswas;

use App\Filament\Resources\JumlahSiswas\Pages\CreateJumlahSiswa;
use App\Filament\Resources\JumlahSiswas\Pages\EditJumlahSiswa;
use App\Filament\Resources\JumlahSiswas\Pages\ListJumlahSiswas;
use App\Filament\Resources\JumlahSiswas\Schemas\JumlahSiswaForm;
use App\Filament\Resources\JumlahSiswas\Tables\JumlahSiswasTable;
use App\Models\JumlahSiswa;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class JumlahSiswaResource extends Resource
{
    protected static ?string $model = JumlahSiswa::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'JumlahSiswa';

    protected static ?string $navigationLabel = 'Jumlah Siswa';

        public static function getNavigationGroup(): ?string
    {
        return 'School Data';
    }

    public static function getNavigationSort(): ?int
    {
        return 2;
    }

    protected static ?string $pluralModelLabel = 'Data Jumlah Siswa';

    public static function form(Schema $schema): Schema
    {
        return JumlahSiswaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return JumlahSiswasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListJumlahSiswas::route('/'),
            'create' => CreateJumlahSiswa::route('/create'),
            'edit' => EditJumlahSiswa::route('/{record}/edit'),
        ];
    }
}
