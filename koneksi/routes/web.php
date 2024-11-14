<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MallController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/data_mall.php', [MallController::class, 'getMalls']);

