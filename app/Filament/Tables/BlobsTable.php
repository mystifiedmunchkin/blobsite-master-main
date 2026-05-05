<?php

namespace App\Filament\Tables;

use App\Models\Blob;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BlobsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Blob::query())
            ->columns([
                TextColumn::make('name')
                                    ->sortable()->toggleable(isToggledHiddenByDefault:false),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->recordActions([
                //
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    //
                ]),
            ]);
    }
}
