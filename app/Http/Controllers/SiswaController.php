<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;

class SiswaController extends Controller
{
    public function create()
    {
        return Inertia::render('register');
    }

    // simpan data siswa
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'program_pendidikan' => 'required|string|max:50',
            'nik' => 'required|string|max:20',
            'nomor_kk' => 'required|string|max:20',
            'tempat_lahir' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat_domisili' => 'required|string',
            'provinsi' => 'nullable|string|max:100',
            'kota' => 'nullable|string|max:100',
            'kecamatan' => 'nullable|string|max:100',
            'kelurahan' => 'nullable|string|max:100',
            'jumlah_saudara' => 'nullable|integer|min:0',
            'anak_ke' => 'nullable|integer|min:1',
            'asal_sekolah' => 'nullable|string|max:100',
            'nama_ayah' => 'required|string|max:100',
            'nik_ayah' => 'nullable|string|max:20',
            'pendidikan_ayah' => 'nullable|string|max:50',
            'pekerjaan_ayah' => 'nullable|string|max:100',
            'nama_ibu' => 'required|string|max:100',
            'nik_ibu' => 'nullable|string|max:20',
            'pendidikan_ibu' => 'nullable|string|max:50',
            'pekerjaan_ibu' => 'nullable|string|max:100',
            'penghasilan' => 'nullable|string|max:50',
            'alamat_kk' => 'nullable|string',
            'no_hp_orangtua' => 'required|string|max:20',
            'kopiah' => 'nullable|integer|min:0',
            'seragam' => 'nullable|string|max:10',
            'nama_pengirim' => 'nullable|string|max:100',
            'image_bukti_transaksi_url' => 'nullable|string|max:255',
            'status_pendaftaran' => 'nullable|string|max:20',
        ]);

        // Set default status pendaftaran if not provided
        $validated['status_pendaftaran'] = $validated['status_pendaftaran'] ?? 'pending';
        // Set default image_bukti_transaksi_url if not provided
        $validated['image_bukti_transaksi_url'] = $validated['image_bukti_transaksi_url'] ?? '';

        $siswa = Siswa::create($validated);

        // Redirect to success page
        return redirect()->route('pendaftaran.register.success')
                         ->with('success', 'Pendaftaran berhasil!')
                         ->with('siswa_id', $siswa->id);
    }

    // cek status pendaftaran
    public function registerStatus()
    {
        return Inertia::render('register-status');
    }
    
    // halaman sukses pendaftaran
    public function registerSuccess()
    {
        return Inertia::render('register.success');
    }
    
}
