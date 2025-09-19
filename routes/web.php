<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\BlogController;
use App\Models\Blog;
use App\Models\Video;
use App\Models\TeacherStaff;
use App\Models\JumlahSiswa;
use App\Models\Header;

Route::get('/', function () {
    $blogs = Blog::latest()->take(3)->get()->map(function ($blog) {
        $blog->image_url = asset('storage/' . $blog->image_url);
        return $blog;
    });

    $videos = Video::latest()->take(1)->get();
    
    $staffs = TeacherStaff::where('status', 'active')->get();
    
    $studentCounts = JumlahSiswa::all();
    
    $headers = Header::all();

    return Inertia::render('main', [
        'blogs' => $blogs,
        'videos' => $videos, // Pass videos (plural) to match the frontend
        'staffs' => $staffs,
        'studentCounts' => $studentCounts,
        'headers' => $headers,
    ]);
})->name('main');


Route::get('about-us', function () {
    return Inertia::render('about-us');
})->name('about-us');

Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('index');
    Route::get('/{slug}', [BlogController::class, 'show'])->name('show');
});


Route::prefix('pendaftaran')->name('pendaftaran.')->group(function () {
    Route::get('/', [SiswaController::class, 'create'])->name('register-create'); 
    Route::post('/', [SiswaController::class, 'store'])->name('register-store');  

    Route::get('/status-pendaftaran', [SiswaController::class, 'registerStatus'])->name('register-status');
    Route::get('/success', [SiswaController::class, 'registerSuccess'])->name('register.success');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
