<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JumlahSiswa;

class JumlahSiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studentCounts = [
            [
                'angkatan' => '2023/2024',
                'ma' => 165,
                'mts' => 205,
                'wustha' => 115,
                'ulya' => 90,
                'total_siswa' => 575,
            ],
            [
                'angkatan' => '2024/2025',
                'ma' => 175,
                'mts' => 210,
                'wustha' => 120,
                'ulya' => 95,
                'total_siswa' => 600,
            ],
        ];

        foreach ($studentCounts as $count) {
            JumlahSiswa::create($count);
        }
    }
}
