<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Siswa;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SiswaRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_registration_page()
    {
        $response = $this->get('/pendaftaran');
        
        $response->assertStatus(200);
    }

    public function test_user_can_view_registration_status_page()
    {
        $response = $this->get('/pendaftaran/status-pendaftaran');
        
        $response->assertStatus(200);
    }
    
    public function test_siswa_model_can_be_created_with_all_fields()
    {
        $siswa = Siswa::create([
            // Data Siswa
            'nisn' => '1234567890',
            'nama' => 'Ahmad Rifai',
            'program_pendidikan' => 'mts',
            'nik' => '3501234567890001',
            'nomor_kk' => '3501234567890002',
            'tempat_lahir' => 'Sumedang',
            'tanggal_lahir' => '2008-05-15',
            'jenis_kelamin' => 'L',
            'alamat_domisili' => 'Jl. Raya No. 123, Desa Sukamaju',
            'provinsi' => 'Jawa Barat',
            'kota' => 'Sumedang',
            'kecamatan' => 'Sukaraja',
            'kelurahan' => 'Sukamaju',
            'jumlah_saudara' => 2,
            'anak_ke' => 1,
            'asal_sekolah' => 'SDN 1 Sukamaju',
            
            // Data Orang Tua
            'nama_ayah' => 'Budi Santoso',
            'nik_ayah' => '3501234567890003',
            'pendidikan_ayah' => 'SMA',
            'pekerjaan_ayah' => 'Wiraswasta',
            'nama_ibu' => 'Siti Aminah',
            'nik_ibu' => '3501234567890004',
            'pendidikan_ibu' => 'SMP',
            'pekerjaan_ibu' => 'Ibu Rumah Tangga',
            'penghasilan' => '2.000.000 - 3.000.000',
            'alamat_kk' => 'Jl. Raya No. 123, Desa Sukamaju, Kec. Sukaraja, Kab. Sumedang, Jawa Barat',
            'no_hp_orangtua' => '081234567890',
            
            // Data Tambahan
            'kopiah' => 5,
            'seragam' => 'L',
            'nama_pengirim' => 'Budi Santoso',
            'status_pendaftaran' => 'menunggu verifikasi',
        ]);
        
        $this->assertDatabaseHas('siswa', [
            'nisn' => '1234567890',
            'nama' => 'Ahmad Rifai',
            'program_pendidikan' => 'mts',
            'nik' => '3501234567890001',
            'nomor_kk' => '3501234567890002',
            'tempat_lahir' => 'Sumedang',
            'jenis_kelamin' => 'L',
            'jumlah_saudara' => 2,
            'anak_ke' => 1,
            'nama_ayah' => 'Budi Santoso',
            'nama_ibu' => 'Siti Aminah',
            'seragam' => 'L',
            'status_pendaftaran' => 'menunggu verifikasi',
        ]);
    }
    
    public function test_siswa_registration_form_submission()
    {
        // Disable middleware to avoid CSRF issues
        $this->withoutMiddleware();
        
        Storage::fake('public');
        
        $response = $this->post('/pendaftaran', [
            // Data Siswa
            'nisn' => '1234567890',
            'nama' => 'Ahmad Rifai',
            'program_pendidikan' => 'mts',
            'nik' => '3501234567890001',
            'nomor_kk' => '3501234567890002',
            'tempat_lahir' => 'Sumedang',
            'tanggal_lahir' => '2008-05-15',
            'jenis_kelamin' => 'L',
            'alamat_domisili' => 'Jl. Raya No. 123, Desa Sukamaju',
            'provinsi' => 'Jawa Barat',
            'kota' => 'Sumedang',
            'kecamatan' => 'Sukaraja',
            'kelurahan' => 'Sukamaju',
            'jumlah_saudara' => 2,
            'anak_ke' => 1,
            'asal_sekolah' => 'SDN 1 Sukamaju',
            
            // Data Orang Tua
            'nama_ayah' => 'Budi Santoso',
            'nik_ayah' => '3501234567890003',
            'pendidikan_ayah' => 'SMA',
            'pekerjaan_ayah' => 'Wiraswasta',
            'nama_ibu' => 'Siti Aminah',
            'nik_ibu' => '3501234567890004',
            'pendidikan_ibu' => 'SMP',
            'pekerjaan_ibu' => 'Ibu Rumah Tangga',
            'penghasilan' => '2.000.000 - 3.000.000',
            'alamat_kk' => 'Jl. Raya No. 123, Desa Sukamaju, Kec. Sukaraja, Kab. Sumedang, Jawa Barat',
            'no_hp_orangtua' => '081234567890',
            
            // Data Tambahan
            'kopiah' => 5,
            'seragam' => 'L',
            'nama_pengirim' => 'Budi Santoso',
        ]);
        
        // Check if the response is successful
        $response->assertRedirect('/pendaftaran/status-pendaftaran');
        $response->assertSessionHas('success');
        
        $this->assertDatabaseHas('siswa', [
            'nisn' => '1234567890',
            'nama' => 'Ahmad Rifai',
            'program_pendidikan' => 'mts',
            'nik' => '3501234567890001',
            'nomor_kk' => '3501234567890002',
            'tempat_lahir' => 'Sumedang',
            'jenis_kelamin' => 'L',
            'jumlah_saudara' => 2,
            'anak_ke' => 1,
            'nama_ayah' => 'Budi Santoso',
            'nama_ibu' => 'Siti Aminah',
            'seragam' => 'L',
            'status_pendaftaran' => 'menunggu verifikasi',
        ]);
    }
    
    public function test_siswa_registration_validation()
    {
        // Disable middleware to avoid CSRF issues
        $this->withoutMiddleware();
        
        // Test validation errors
        $response = $this->post('/pendaftaran', [
            // Missing required fields should cause validation errors
        ]);
        
        // Check that we get validation errors
        $response->assertSessionHasErrors([
            'nama',
            'program_pendidikan',
            'nik',
            'nomor_kk',
            'tempat_lahir',
            'tanggal_lahir',
            'jenis_kelamin',
            'alamat_domisili',
            'provinsi',
            'kota',
            'kecamatan',
            'kelurahan',
            'jumlah_saudara',
            'anak_ke',
            'asal_sekolah',
            'nama_ayah',
            'nik_ayah',
            'pendidikan_ayah',
            'pekerjaan_ayah',
            'nama_ibu',
            'nik_ibu',
            'pendidikan_ibu',
            'pekerjaan_ibu',
            'penghasilan',
            'alamat_kk',
            'no_hp_orangtua',
            'seragam',
            'nama_pengirim',
        ]);
    }
}