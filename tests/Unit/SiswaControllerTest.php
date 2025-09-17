<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\SiswaController;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Mockery;

class SiswaControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function controller_can_be_instantiated()
    {
        $controller = new SiswaController();
        $this->assertInstanceOf(SiswaController::class, $controller);
    }

    /** @test */
    public function create_method_returns_correct_view()
    {
        // Mock Inertia to avoid actual rendering
        Inertia::fake();
        
        $controller = new SiswaController();
        $response = $controller->create();
        
        Inertia::assertViewIs('register');
    }

    /** @test */
    public function store_method_creates_siswa_record()
    {
        Storage::fake('public');
        
        $data = [
            'nama_lengkap' => 'Budi Santoso',
            'program_pendidikan' => 'MTS',
            'tanggal_lahir' => '2008-05-15',
            'nik' => '3501234567890001',
            'kk' => '3501234567890002',
            'jenis_kelamin' => 'L',
            'alamat' => 'Jl. Raya No. 123',
            'no_hp' => '081234567890',
            'ukuran_seragam' => 'L',
            'nama_pengirim' => 'Budi Santoso',
        ];
        
        $request = Request::create('/pendaftaran', 'POST', $data);
        $request->setLaravelSession($this->app['session']->driver());
        
        $controller = new SiswaController();
        $response = $controller->store($request);
        
        $this->assertDatabaseHas('siswa', [
            'nama' => 'Budi Santoso',
            'program_pendidikan' => 'MTS',
            'nik' => '3501234567890001',
            'nomor_kk' => '3501234567890002',
            'jenis_kelamin' => 'L',
            'status_pendaftaran' => 'pending',
        ]);
    }

    /** @test */
    public function register_status_method_returns_correct_view()
    {
        // Mock Inertia to avoid actual rendering
        Inertia::fake();
        
        $controller = new SiswaController();
        $response = $controller->registerStatus();
        
        Inertia::assertViewIs('register-status');
    }
}