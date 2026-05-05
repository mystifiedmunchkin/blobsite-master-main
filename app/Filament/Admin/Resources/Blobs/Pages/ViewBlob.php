<?php

namespace App\Filament\Admin\Resources\Blobs\Pages;

use App\Filament\Admin\Resources\Blobs\BlobResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewBlob extends ViewRecord
{
    protected static string $resource = BlobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
