<?php

namespace App\Filament\Resources\TeacherStaff;

use App\Filament\Resources\TeacherStaff\Pages\CreateTeacherStaff;
use App\Filament\Resources\TeacherStaff\Pages\EditTeacherStaff;
use App\Filament\Resources\TeacherStaff\Pages\ListTeacherStaff;
use App\Filament\Resources\TeacherStaff\Schemas\TeacherStaffForm;
use App\Filament\Resources\TeacherStaff\Tables\TeacherStaffTable;
use App\Models\TeacherStaff;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class TeacherStaffResource extends Resource
{
    protected static ?string $model = TeacherStaff::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationLabel = 'Teacher Staff';

    protected static ?string $pluralModelLabel = 'Daftar Guru dan Staff';

        public static function getNavigationGroup(): ?string
    {
        return 'School Data';
    }

    public static function getNavigationSort(): ?int
    {
        return 2;
    }

    public static function form(Schema $schema): Schema
    {
        return TeacherStaffForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TeacherStaffTable::configure($table);
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
            'index' => ListTeacherStaff::route('/'),
            'create' => CreateTeacherStaff::route('/create'),
            'edit' => EditTeacherStaff::route('/{record}/edit'),
        ];
    }
}
