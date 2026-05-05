<?php

namespace App\Filament\Resources\Blobs\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\Layout\Grid;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\Layout\Stack;
class BlobForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                        Textarea::make('name'),
                        Textarea::make('head'),
                        Textarea::make('body')
                    ]);

    }
}
