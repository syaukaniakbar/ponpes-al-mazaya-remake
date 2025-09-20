<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegionController;

Route::get('/regions/provinces', [RegionController::class, 'getProvinces']);
Route::get('/regions/cities/{provinceId}', [RegionController::class, 'getCities']);
Route::get('/regions/districts/{cityId}', [RegionController::class, 'getDistricts']);
Route::get('/regions/villages/{districtId}', [RegionController::class, 'getVillages']);