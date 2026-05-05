<?php

namespace App\Filament\Admin\Resources\Blobs\Pages;

use App\Filament\Admin\Resources\Blobs\BlobResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditBlob extends EditRecord
{
    protected static string $resource = BlobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
