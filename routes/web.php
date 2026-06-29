<?php

use Illuminate\Support\Facades\Route;
use App\Models\Blob;
Route::get('/', function () {
    return view('layouts.welcome');
});

Route::get('/blobs/{blob}', function (Blob $blob) {
    return view('layouts.blobs', ['js' => $blob->body, 'css' => $blob->head, 'name' => $blob->name]);
})->where('id', '[0-9]+');
