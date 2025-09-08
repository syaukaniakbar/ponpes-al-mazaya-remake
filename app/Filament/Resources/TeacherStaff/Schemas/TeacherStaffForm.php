<?php

namespace App\Filament\Resources\TeacherStaff\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;

class TeacherStaffForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama')
                    ->required()
                    ->maxLength(255),

                Select::make('role')
                    ->label('Role')
                    ->options([
                        'guru'   => 'Guru',
                        'staff'  => 'Staff',
                        'kepala' => 'Kepala Sekolah',
                    ])
                    ->required(),

                TextInput::make('role_detail')
                    ->label('Detail Jabatan')
                    ->maxLength(255),

                TextInput::make('nip')
                    ->label('NIP')
                    ->unique(ignoreRecord: true)
                    ->maxLength(50),

                TextInput::make('phone')
                    ->label('No. Telepon')
                    ->tel()
                    ->maxLength(20),

                FileUpload::make('image_path')
                    ->label('Foto')
                    ->image()
                    ->imagePreviewHeight('150')
                    ->directory('teacher_staff')
                    ->preserveFilenames()
                    ->required(),

                DatePicker::make('joined_date')
                    ->label('Tanggal Bergabung')
                    ->required(),

                Toggle::make('status')
                    ->label('Aktif')
                    ->default(true),
            ]);
    }
}
