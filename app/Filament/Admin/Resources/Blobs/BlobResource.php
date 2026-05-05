<?php

namespace App\Filament\Admin\Resources\Blobs;

use App\Filament\Admin\Resources\Blobs\Pages\CreateBlob;
use App\Filament\Admin\Resources\Blobs\Pages\EditBlob;
use App\Filament\Admin\Resources\Blobs\Pages\ListBlobs;
use App\Filament\Admin\Resources\Blobs\Pages\ViewBlob;
use App\Filament\Admin\Resources\Blobs\Schemas\BlobForm;
use App\Filament\Admin\Resources\Blobs\Schemas\BlobInfolist;
use App\Filament\Admin\Resources\Blobs\Tables\BlobsTable;
use App\Models\Blob;
use BackedEnum;
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

    public static function infolist(Schema $schema): Schema
    {
        return BlobInfolist::configure($schema);
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
