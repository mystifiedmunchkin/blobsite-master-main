<?php

namespace App\Filament\Admin\Resources\Blobs\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BlobForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('body')
                    ->columnSpanFull(),
                Textarea::make('head')
                    ->columnSpanFull(),
                Textarea::make('name')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
