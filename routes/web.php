<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    $dashboard = fn () => Inertia::render("dashboard");
    Route::get('dashboard', $dashboard)->name('dashboard');
    Route::get('/', $dashboard)->name('home');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
