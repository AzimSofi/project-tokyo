<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PaypayTransactionController;
use App\Http\Controllers\ExpenseController;

Route::middleware(['auth', 'verified'])->group(function () {
    $dashboard = fn () => Inertia::render("dashboard");
    Route::get('dashboard', $dashboard)->name('dashboard');
    Route::get('/', $dashboard)->name('home');

    Route::post('/upload-csv' , [PaypayTransactionController::class, 'uploadCsv'])->name('upload-csv');
    Route::resource('expenses', ExpenseController::class);
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
