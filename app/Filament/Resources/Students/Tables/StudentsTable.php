<?php

namespace App\Filament\Resources\Students\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Actions\Action;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\StudentsExport;
use App\Models\Student;
use Illuminate\Support\Facades\Storage;
use ZipArchive;


class StudentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

            TextColumn::make('created_at')
                ->dateTime('d M Y H:i')
                ->sortable()
                ->label('Tanggal Pendaftaran'),

            TextColumn::make('nisn')
                ->searchable()
                ->sortable()
                ->label('NISN'),

            TextColumn::make('nama')
                ->searchable()
                ->sortable()
                ->formatStateUsing(fn ($state) => strtoupper($state))
                ->weight('bold')
                ->label('Nama'),

            TextColumn::make('program_pendidikan')
                ->badge()
                ->color('info')
                ->formatStateUsing(fn ($state) => strtoupper($state))
                ->label('Program'),

            TextColumn::make('asal_sekolah')
                ->limit(25)
                ->formatStateUsing(fn ($state) => strtoupper($state))
                ->tooltip(fn ($state) => $state)
                ->searchable()
                ->label('Asal Sekolah'),

            TextColumn::make('no_hp_orangtua')
                ->label('No HP Orang Tua'),

            ImageColumn::make('image_bukti_transaksi_url')
                ->disk('public')
                ->size(120)
                ->label('Bukti'),
        ])
        ->filters([
                SelectFilter::make('program_pendidikan')
                    ->label('Program Pendidikan')
                    ->options([
                        'wustha'  => 'Wustha',
                        'ulya' => 'Ulya',
                        'mts' => 'MTs',
                        'ma' => 'MA',
                    ])
                    ->searchable(),

                SelectFilter::make('jenis_kelamin')
                    ->label('Putra / Putri')
                    ->options([
                        'L' => 'Putra',
                        'P' => 'Putri',
                    ]),
        ])
        ->recordActions([
            ViewAction::make(),
            EditAction::make(),
        ])
        ->toolbarActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
            Action::make('export')
                ->label('Export Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->requiresConfirmation()
                ->modalHeading('Export Data Santri')
                ->modalDescription('Apakah Anda yakin ingin mengekspor data santri ke format Excel? Proses ini akan mengunduh file sesuai dengan filter yang sedang aktif.')
                ->modalSubmitActionLabel('Mulai Export')
                ->action(function ($livewire) {
                    $filters = $livewire->tableFilters;
                    return Excel::download(new StudentsExport($filters), 'data-santri-' . now()->format('Y-m-d') . '.xlsx');
                }),
            Action::make('download_images')
                ->label('Download Bukti')
                ->icon('heroicon-o-camera')
                ->color('info')
                ->requiresConfirmation()
                ->modalHeading('Download Bukti Transaksi (ZIP)')
                ->modalDescription('Sistem akan mengumpulkan semua gambar bukti transaksi dan mengemasnya dalam file ZIP. Proses ini mungkin memakan waktu beberapa detik tergantung pada jumlah data.')
                ->modalContent(view('filament.students.download-progress'))
                ->modalSubmitActionLabel('Mulai Download')
                ->action(function ($livewire) {
                    $filters = $livewire->tableFilters;
                    
                    $query = Student::query();
                    
                    // Replicate filtering logic
                    foreach ($filters as $key => $filter) {
                        $value = is_array($filter) && array_key_exists('value', $filter) ? $filter['value'] : $filter;
                        if ($value) {
                            $query->where($key, $value);
                        }
                    }

                    $students = $query->get();
                    
                    if ($students->isEmpty()) {
                        return;
                    }

                    $zip = new ZipArchive;
                    $fileName = 'bukti-transaksi-' . now()->format('Y-m-d-His') . '.zip';
                    $tempFile = tempnam(sys_get_temp_dir(), 'zip');

                    if ($zip->open($tempFile, ZipArchive::CREATE) === TRUE) {
                        foreach ($students as $student) {
                            if ($student->image_bukti_transaksi_url && Storage::disk('public')->exists($student->image_bukti_transaksi_url)) {
                                $fileContent = Storage::disk('public')->get($student->image_bukti_transaksi_url);
                                $extension = pathinfo($student->image_bukti_transaksi_url, PATHINFO_EXTENSION);
                                $cleanNama = preg_replace('/[^A-Za-z0-9\-_]/', '_', $student->nama);
                                $insideName = "{$student->nisn}_{$cleanNama}.{$extension}";
                                $zip->addFromString($insideName, $fileContent);
                            }
                        }
                        $zip->close();
                    }

                    return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
                }),
        ]);
    }
}
