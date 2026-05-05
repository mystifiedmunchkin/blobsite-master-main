<?php

namespace App\Filament\Admin\Resources\Blobs\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BlobInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('body')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('head')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('name')
                    ->columnSpanFull(),
            ]);
    }
}
