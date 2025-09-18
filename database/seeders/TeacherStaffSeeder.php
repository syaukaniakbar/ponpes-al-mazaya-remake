<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TeacherStaff;

class TeacherStaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staffs = [
            [
                'name' => 'Dr. Ahmad Fauzi, M.Pd',
                'role' => 'Kepala Pondok',
                'role_detail' => 'Kepala Pondok Pesantren',
                'nip' => '198001012005121001',
                'phone' => '081234567890',
                'image_path' => null,
                'joined_date' => '2020-01-15',
                'status' => 'active',
            ],
            [
                'name' => 'Dra. Siti Aminah',
                'role' => 'Wakil Kurikulum',
                'role_detail' => 'Wakil Kepala Bidang Kurikulum',
                'nip' => '198205102008122001',
                'phone' => '081234567891',
                'image_path' => null,
                'joined_date' => '2019-07-20',
                'status' => 'active',
            ],
            [
                'name' => 'Muhammad Rizky, S.Pd.I',
                'role' => 'Guru Tahfidz',
                'role_detail' => 'Guru Pembimbing Tahfidz Quran',
                'nip' => '199003152015121002',
                'phone' => '081234567892',
                'image_path' => null,
                'joined_date' => '2021-08-10',
                'status' => 'active',
            ],
            [
                'name' => 'Nurul Hidayah, S.Pd.I',
                'role' => 'Guru Bahasa Arab',
                'role_detail' => 'Guru Bahasa Arab dan Nahwu Shorof',
                'nip' => '199207202018122001',
                'phone' => '081234567893',
                'image_path' => null,
                'joined_date' => '2020-09-01',
                'status' => 'active',
            ],
            [
                'name' => 'Ali Mustofa, S.Si',
                'role' => 'Guru IPA',
                'role_detail' => 'Guru Ilmu Pengetahuan Alam',
                'nip' => '198811252012121001',
                'phone' => '081234567894',
                'image_path' => null,
                'joined_date' => '2018-07-15',
                'status' => 'active',
            ],
        ];

        foreach ($staffs as $staff) {
            TeacherStaff::create($staff);
        }
    }
}
