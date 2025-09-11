<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PaypayTransactionController;

Route::middleware(['auth', 'verified'])->group(function () {
    $dashboard = fn () => Inertia::render("dashboard");
    Route::get('dashboard', $dashboard)->name('dashboard');
    Route::get('/', $dashboard)->name('home');

    Route::post('/upload-csv' , [PaypayTransactionController::class, 'uploadCsv'])->name('upload-csv');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
