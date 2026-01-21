<?php

namespace App\Filament\Resources\Students\Pages;

use App\Filament\Resources\Students\StudentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStudents extends ListRecords
{
    protected static string $resource = StudentResource::class;

    public $downloadProgress = 0;
    public $isDownloading = false;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function startZipDownload(array $filters)
    {
        $this->isDownloading = true;
        $this->downloadProgress = 10;
        
        // This is a placeholder for the actual logic which we'll move here
        // if we want real progress, but for now we'll just keep the 
        // StudentsTable logic and use the UI to show its working.
    }
}
