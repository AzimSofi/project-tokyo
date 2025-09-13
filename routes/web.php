<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\PaypayTransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    $dashboard = fn () => Inertia::render("dashboard");
    Route::get('dashboard', $dashboard)->name('dashboard');
    Route::get('/', $dashboard)->name('home');

    Route::post('/upload-csv' , [PaypayTransactionController::class, 'uploadCsv'])->name('upload-csv');
    Route::post('/save-location' , [LocationController::class, 'saveLocation'])->name('save-location');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
