<?php

namespace App\Filament\Admin\Resources\Blobs\Pages;

use App\Filament\Admin\Resources\Blobs\BlobResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBlobs extends ListRecords
{
    protected static string $resource = BlobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
