<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Header;

class HeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $headers = [
            [
                'title' => 'Two Students of Al Mazaya Islamic Junior High School Banjarmasin Seize the Golden Opportunity to Speak at RRI',
                'description' => 'Nanda Syifa Khumaira and Rahma Kamila, two outstanding students of Al Mazaya Islamic Junior High School Banjarmasin, won a golden opportunity to speak at RRI!',
                'button_text' => 'Read More',
                'button_url' => '/blog/rri-opportunity',
                'image_url' => 'header1.jpg',
            ],
            [
                'title' => 'Al Mazaya Pondok Pesantren Celebrates Annual Graduation Ceremony',
                'description' => 'The annual graduation ceremony was held with great enthusiasm, celebrating the achievements of our students.',
                'button_text' => 'View Gallery',
                'button_url' => '/gallery/graduation-2024',
                'image_url' => 'header2.jpg',
            ],
        ];

        foreach ($headers as $header) {
            Header::create($header);
        }
    }
}
