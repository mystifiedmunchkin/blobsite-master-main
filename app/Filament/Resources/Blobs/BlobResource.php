<?php

namespace App\Filament\Resources\Blobs;

use App\Filament\Resources\Blobs\Pages\CreateBlob;
use App\Filament\Resources\Blobs\Pages\EditBlob;
use App\Filament\Resources\Blobs\Pages\ListBlobs;
use App\Filament\Resources\Blobs\Pages\ViewBlob;
use App\Filament\Resources\Blobs\Schemas\BlobForm;
use App\Filament\Resources\Blobs\Tables\BlobsTable;
use BackedEnum;
use App\Models\Blob;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BlobResource extends Resource
{
    protected static ?string $model = Blob::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return BlobForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BlobsTable::configure($table);
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
            'index' => ListBlobs::route('/'),
            'create' => CreateBlob::route('/create'),
            'view' => ViewBlob::route('/{record}'),
            'edit' => EditBlob::route('/{record}/edit'),
        ];
    }
}
