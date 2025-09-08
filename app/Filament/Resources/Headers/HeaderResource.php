<?php

namespace App\Filament\Resources\Headers;

use App\Filament\Resources\Headers\Pages\CreateHeader;
use App\Filament\Resources\Headers\Pages\EditHeader;
use App\Filament\Resources\Headers\Pages\ListHeaders;
use App\Filament\Resources\Headers\Schemas\HeaderForm;
use App\Filament\Resources\Headers\Tables\HeadersTable;
use App\Models\Header;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class HeaderResource extends Resource
{
    protected static ?string $model = Header::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'nama';

    protected static ?string $navigationLabel = 'Header';

    public static function getNavigationGroup(): ?string
    {
        return 'Content Management';
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }

    protected static ?string $pluralModelLabel = 'Data Header';

    public static function form(Schema $schema): Schema
    {
        return HeaderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HeadersTable::configure($table);
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
            'index' => ListHeaders::route('/'),
            'create' => CreateHeader::route('/create'),
            'edit' => EditHeader::route('/{record}/edit'),
        ];
    }
}
