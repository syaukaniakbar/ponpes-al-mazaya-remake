<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\SiswaController;
use App\Models\Document;
use App\Models\NavLink;

Route::get('/regions/provinces', [RegionController::class, 'getProvinces']);
Route::get('/regions/cities/{provinceCode}', [RegionController::class, 'getCities']);
Route::get('/regions/districts/{cityCode}', [RegionController::class, 'getDistricts']);
Route::get('/regions/villages/{districtCode}', [RegionController::class, 'getVillages']);

Route::get('/siswa/check-nisn/{nisn}', [SiswaController::class, 'checkNisn']);
Route::get('/siswa/get-by-nisn/{nisn}', [SiswaController::class, 'getByNisn']);

// Document routes
Route::get('/documents/category/{category}', function ($category) {
    $document = Document::where('category', $category)->first();
    
    if ($document) {
        // Add the full URL to the document, properly encoding the file path
        $filePath = str_replace(' ', '%20', $document->file_path);
        $document->file_url = asset('storage/' . $filePath);
        return response()->json($document);
    }
    
    return response()->json(['message' => 'Document not found'], 404);
});

// NavLink routes
Route::get('/nav-links', function () {
    $navLinks = NavLink::where('is_active', true)->get();
    
    return response()->json($navLinks);
});