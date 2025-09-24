<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have at least one user to reference
        $userId = \App\Models\User::first()?->id ?? \App\Models\User::factory()->create()->id;

        // Categories for the blog posts
        $categories = ['umum', 'prestasi', 'ilmiah'];

        // Sample data for each category
        $blogData = [
            'umum' => [
                [
                    'title' => 'Pentingnya Pendidikan Karakter di Pondok Pesantren',
                    'description' => '<p>Pendidikan karakter merupakan fondasi utama dalam pembentukan pribadi muslim yang berkualitas. Di Pondok Pesantren Al-Mazaya, pendidikan karakter tidak hanya diajarkan secara teori namun juga diterapkan dalam kehidupan sehari-hari santri.</p><p>Kegiatan ibadah, tata krama, dan disiplin merupakan bagian integral dari kurikulum kami yang bertujuan membentuk generasi yang berakhlak mulia serta berilmu pengetahuan.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Kegiatan Ekstrakurikuler di Al-Mazaya',
                    'description' => '<p>Di Pondok Pesantren Al-Mazaya, kami menyediakan berbagai kegiatan ekstrakurikuler yang mendukung pengembangan bakat dan minat santri. Mulai dari pramuka, qiroah, marawis, hingga olahraga dan seni.</p><p>Ekstrakurikuler ini bertujuan untuk membentuk santri yang tidak hanya unggul dalam ilmu agama dan umum, namun juga memiliki keahlian dan keterampilan di bidang lainnya.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
                ],
                [
                    'title' => 'Peran Santri dalam Masyarakat',
                    'description' => '<p>Santri di Pondok Pesantren Al-Mazaya tidak hanya belajar di lingkungan pesantren, namun juga didorong untuk berperan aktif dalam masyarakat. Kegiatan bakti sosial, pengajian umum, dan pengabdian masyarakat merupakan bagian penting dari pendidikan kami.</p><p>Hal ini bertujuan agar santri memiliki rasa empati dan kepedulian terhadap sesama serta mampu menjadi pelopor perubahan di masyarakat.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Tradisi dan Modernitas dalam Pendidikan',
                    'description' => '<p>Al-Mazaya menggabungkan antara tradisi kepesantrenan yang kuat dengan pendidikan modern yang relevan dengan kebutuhan zaman. Kami mengajarkan kitab kuning dengan metode yang kontemporer serta mengintegrasikan teknologi dalam proses pembelajaran.</p><p>Perpaduan ini menghasilkan santri yang tidak ketinggalan zaman namun tetap memiliki akar keislaman yang kuat.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1526628953300-1873f12eac38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Pengelolaan Lingkungan Hidup di Pesantren',
                    'description' => '<p>Di Al-Mazaya, kami sangat peduli terhadap lingkungan hidup. Kegiatan seperti penanaman pohon, pengolahan sampah, dan pertanian organik tidak hanya sebagai bentuk tanggung jawab terhadap lingkungan, namun juga sebagai bentuk implementasi nilai-nilai keislaman.</p><p>Santri dilibatkan langsung dalam kegiatan ini sebagai bentuk pendidikan karakter dan kepedulian terhadap bumi.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Peran Guru dan Ustadz dalam Pendidikan Santri',
                    'description' => '<p>Guru dan ustadz di Pondok Pesantren Al-Mazaya memegang peranan penting dalam membentuk kepribadian santri. Mereka tidak hanya sebagai pengajar, namun juga sebagai teladan dan mentor dalam kehidupan sehari-hari.</p><p>Kami memastikan bahwa para pengajar kami memiliki kompetensi tinggi dan akhlak yang terpuji serta mampu menjadi suri tauladan bagi santri.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ]
            ],
            'prestasi' => [
                [
                    'title' => 'Prestasi Santri dalam Olimpiade Sains Nasional',
                    'description' => '<p>Alhamdulillah, santri Pondok Pesantren Al-Mazaya kembali menorehkan prestasi gemilang dalam Olimpiade Sains Nasional tingkat provinsi. Dengan perolehan 2 medali emas dan 1 medali perak, membuktikan bahwa pendidikan di Al-Mazaya mampu bersaing di tingkat nasional.</p><p>Prestasi ini merupakan buah dari kerja keras para santri, ustadz, serta dukungan penuh dari orang tua dan masyarakat.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Juara 1 MTQ Tingkat Kabupaten',
                    'description' => '<p>Santri Al-Mazaya kembali mengharumkan nama pesantren dan daerah dalam Musabaqah Tilawatil Quran (MTQ) tingkat kabupaten. Dengan kemenangan ini, membuktikan bahwa pendidikan qiroah di Al-Mazaya berjalan dengan sangat baik.</p><p>Kami akan terus memberikan pendidikan terbaik untuk melahirkan qori dan qoriah yang berakhlak mulia serta mampu menjaga kelestarian Al-Quran.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1598171702492-209a4a4a6b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Prestasi dalam Perlombaan Hadrah dan Marawis',
                    'description' => '<p>Grup hadrah dan marawis Al-Mazaya berhasil menjadi juara 1 dalam perlombaan tingkat regional. Penampilan mereka yang penuh semangat dan kreatif membuat dewan juri terpukau.</p><p>Perlombaan ini tidak hanya sebagai ajang unjuk kemampuan, namun juga sebagai bentuk dakwah melalui seni yang indah dan bermakna.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Santri Raih Medali dalam Kompetisi Robotik',
                    'description' => '<p>Untuk pertama kalinya, santri Al-Mazaya berhasil meraih medali perak dalam kompetisi robotik tingkat nasional. Ini membuktikan bahwa pendidikan di Al-Mazaya tidak hanya berkonsentrasi pada ilmu agama, namun juga ilmu pengetahuan dan teknologi.</p><p>Kami terus mendorong kreativitas santri dalam bidang stematics untuk menghasilkan generasi yang inovatif dan kompetitif.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Juara 1 Lomba Pidato Bahasa Arab',
                    'description' => '<p>Santri Al-Mazaya berhasil menjadi juara 1 dalam lomba pidato bahasa Arab tingkat nasional. Dengan tema "Peran Pemuda dalam Menjaga Persatuan", pidato tersebut menyentuh hati dewan juri dan peserta.</p><p>Prestasi ini menunjukkan bahwa kualitas pendidikan bahasa di Al-Mazaya sangat baik dan mampu melahirkan orator yang handal.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1535982330050-f0e6a88d7e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Peraih Beasiswa LPDP dari Al-Mazaya',
                    'description' => '<p>Seorang alumni Al-Mazaya berhasil meraih beasiswa LPDP untuk melanjutkan studi S2 di luar negeri. Ini merupakan kebanggaan tersendiri bagi pesantren dan bukti kualitas pendidikan yang kami berikan.</p><p>Kami terus mendorong santri untuk berprestasi dan mengejar cita-cita mereka untuk kemudian kembali mengabdi pada masyarakat dan agama.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ]
            ],
            'ilmiah' => [
                [
                    'title' => 'Implementasi Teknologi dalam Pembelajaran Agama',
                    'description' => '<p>Pondok Pesantren Al-Mazaya mulai menerapkan teknologi dalam proses pembelajaran agama. Dengan menggunakan aplikasi digital dan e-learning, pembelajaran menjadi lebih interaktif dan efektif.</p><p>Kami percaya bahwa teknologi bukanlah penghalang dalam mempelajari agama, justru sebagai sarana untuk memperdalam pemahaman dan memperluas cakrawala.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Kajian Saintifik tentang Manfaat Puasa',
                    'description' => '<p>Tim peneliti dari Al-Mazaya melakukan kajian ilmiah tentang manfaat puasa dari segi kesehatan. Penelitian ini menggabungkan antara sisi agama dan sains untuk memberikan pemahaman yang utuh.</p><p>Hasil penelitian menunjukkan bahwa puasa memiliki manfaat luar biasa bagi kesehatan fisik dan mental yang sejalan dengan ajaran Islam.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1532996122724-e3c2824e4e79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Pengembangan Kurikulum Integratif',
                    'description' => '<p>Al-Mazaya tengah mengembangkan kurikulum integratif yang menggabungkan antara pendidikan agama dan umum secara seimbang. Kurikulum ini dirancang berdasarkan penelitian dan best practice dari lembaga pendidikan unggul.</p><p>Tujuannya adalah untuk melahirkan insan berilmu yang tidak hanya menguasai ilmu pengetahuan, namun juga berakhlak tinggi.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1512485694743-9c9538b4e4e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Kajian Ilmiah tentang Ekonomi Syariah',
                    'description' => '<p>Sebagai bagian dari pengembangan ekonomi Islam, Al-Mazaya menyelenggarakan kajian ilmiah tentang ekonomi syariah dengan melibatkan pakar ekonomi dan ulama. Hasil kajian ini diharapkan dapat memberikan kontribusi dalam pengembangan sistem ekonomi yang adil dan berkelanjutan.</p><p>Santri diberikan pemahaman yang mendalam tentang prinsip-prinsip ekonomi Islam yang relevan dengan kebutuhan zaman.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Pengamatan Ilmiah Peristiwa Gerhana',
                    'description' => '<p>Santri Al-Mazaya melakukan pengamatan ilmiah terhadap peristiwa gerhana matahari secara langsung dengan menggunakan teleskop dan peralatan ilmiah lainnya. Kegiatan ini sebagai bagian dari penerapan ilmu astronomi dalam konteks keislaman.</p><p>Santri juga diajarkan untuk menghargai kebesaran ciptaan Allah melalui fenomena alam yang menakjubkan ini.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ],
                [
                    'title' => 'Kajian tentang Integrasi Sains dan Agama',
                    'description' => '<p>Kajian ini membahas bagaimana sains dan agama tidak saling bertentangan namun justru saling melengkapi. Dengan pendekatan ini, santri Al-Mazaya diajak untuk menggali ilmu pengetahuan dengan semangat keislaman.</p><p>Kami percaya bahwa ilmu pengetahuan yang didasari oleh nilai-nilai agama akan menghasilkan penemuan yang bermanfaat bagi kemanusiaan.</p>',
                    'image_url' => 'https://images.unsplash.com/photo-1505840718177-6c0d1d0e57db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                ]
            ]
        ];

        foreach ($categories as $category) {
            foreach ($blogData[$category] as $data) {
                Blog::create([
                    'user_id' => $userId,
                    'title' => $data['title'],
                    'slug' => Str::slug($data['title']),
                    'description' => $data['description'],
                    'category' => $category,
                    'image_url' => $data['image_url'],
                ]);
            }
        }
    }
}