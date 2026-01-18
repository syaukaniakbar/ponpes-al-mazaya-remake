<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\StudentController;

// halaman form (boleh tetap di root)
Route::get('/', function () {
    return Inertia::render('register');
})->name('register');

// submit form (PINDAH PATH, INI PENTING)
Route::post('/register', [StudentController::class, 'store'])
    ->name('register.store');

// success page
Route::get('/register/success', [StudentController::class, 'registerSuccess'])
    ->name('register.success');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
