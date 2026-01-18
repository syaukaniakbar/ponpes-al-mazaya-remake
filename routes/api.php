<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\StudentController;
use App\Models\Student;
use App\Models\Document;

Route::get('/regions/provinces', [RegionController::class, 'getProvinces']);
Route::get('/regions/cities/{provinceCode}', [RegionController::class, 'getCities']);
Route::get('/regions/districts/{cityCode}', [RegionController::class, 'getDistricts']);
Route::get('/regions/villages/{districtCode}', [RegionController::class, 'getVillages']);

Route::get('/siswa/check-nisn/{nisn}', [StudentController::class, 'checkNisn']);
