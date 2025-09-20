<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravolt\Indonesia\Models\Province;
use Laravolt\Indonesia\Models\City;
use Laravolt\Indonesia\Models\District;
use Laravolt\Indonesia\Models\Village;

class RegionController extends Controller
{
    public function getProvinces()
    {
        $provinces = Province::all(['code as id', 'name']);
        return response()->json($provinces);
    }

    public function getCities($provinceCode)
    {
        $cities = City::where('province_code', $provinceCode)->get(['code as id', 'name']);
        return response()->json($cities);
    }

    public function getDistricts($cityCode)
    {
        $districts = District::where('city_code', $cityCode)->get(['code as id', 'name']);
        return response()->json($districts);
    }

    public function getVillages($districtCode)
    {
        $villages = Village::where('district_code', $districtCode)->get(['code as id', 'name']);
        return response()->json($villages);
    }
}