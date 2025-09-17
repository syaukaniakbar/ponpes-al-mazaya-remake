<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Siswa;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SiswaTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function siswa_model_can_be_created()
    {
        $siswa = Siswa::create([
            'nama' => 'Ahmad Rifai',
            'program_pendidikan' => 'mts',
            'nik' => '3501234567890001',
            'nomor_kk' => '3501234567890002',
            'tanggal_lahir' => '2008-05-15',
            'jenis_kelamin' => 'L',
            'alamat_domisili' => 'Jl. Raya No. 123',
            'no_hp_orangtua' => '081234567890',
            'seragam' => 'L',
            'nama_pengirim' => 'Budi Santoso',
            'status_pendaftaran' => 'pending',
        ]);

        $this->assertDatabaseHas('siswa', [
            'nama' => 'Ahmad Rifai',
            'program_pendidikan' => 'mts',
            'nik' => '3501234567890001',
        ]);
    }

    /** @test */
    public function siswa_model_has_correct_fillable_fields()
    {
        $siswa = new Siswa();
        $fillable = $siswa->getFillable();
        
        $this->assertContains('nama', $fillable);
        $this->assertContains('program_pendidikan', $fillable);
        $this->assertContains('nik', $fillable);
        $this->assertContains('nomor_kk', $fillable);
        $this->assertContains('tanggal_lahir', $fillable);
        $this->assertContains('jenis_kelamin', $fillable);
        $this->assertContains('alamat_domisili', $fillable);
        $this->assertContains('no_hp_orangtua', $fillable);
        $this->assertContains('seragam', $fillable);
        $this->assertContains('nama_pengirim', $fillable);
        $this->assertContains('image_bukti_transaksi_url', $fillable);
        $this->assertContains('status_pendaftaran', $fillable);
    }

    /** @test */
    public function siswa_model_has_correct_table_name()
    {
        $siswa = new Siswa();
        $this->assertEquals('siswa', $siswa->getTable());
    }

    /** @test */
    public function tanggal_lahir_is_cast_to_date()
    {
        $siswa = Siswa::create([
            'nama' => 'Siti Aminah',
            'program_pendidikan' => 'ma',
            'nik' => '3501234567890003',
            'nomor_kk' => '3501234567890004',
            'tanggal_lahir' => '2012-03-20',
            'jenis_kelamin' => 'P',
            'alamat_domisili' => 'Jl. Melati No. 45',
            'no_hp_orangtua' => '081298765432',
            'seragam' => 'M',
            'nama_pengirim' => 'Ani Rahmawati',
            'status_pendaftaran' => 'pending',
        ]);

        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $siswa->tanggal_lahir);
        $this->assertEquals('2012-03-20', $siswa->tanggal_lahir->format('Y-m-d'));
    }
}