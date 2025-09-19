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
        // Validasi
        $validated = $request->validate([
            'nisn' => 'required|string|max:20|unique:siswa,nisn',
            'nama' => 'required|string|max:255',
            'program_pendidikan' => 'required|string|max:50',
            'nik' => 'required|string|max:20|unique:siswa,nik',
            'nomor_kk' => 'required|string|max:20',
            'tempat_lahir' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat_domisili' => 'required|string',
            'provinsi' => 'required|string|max:100',
            'kota' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100',
            'kelurahan' => 'required|string|max:100',
            'jumlah_saudara' => 'nullable|integer|min:0',
            'anak_ke' => 'nullable|integer|min:1',
            'asal_sekolah' => 'required|string|max:100',
            'nama_ayah' => 'required|string|max:100',
            'nik_ayah' => 'required|string|max:20',
            'pendidikan_ayah' => 'required|string|max:50',
            'pekerjaan_ayah' => 'required|string|max:100',
            'nama_ibu' => 'required|string|max:100',
            'nik_ibu' => 'required|string|max:20',
            'pendidikan_ibu' => 'required|string|max:50',
            'pekerjaan_ibu' => 'required|string|max:100',
            'penghasilan' => 'nullable|string|max:50',
            'alamat_kk' => 'required|string',
            'no_hp_orangtua' => 'required|string|max:20',
            'kopiah' => 'nullable|integer|min:0',
            'seragam' => 'required|string|max:10',
            'nama_pengirim' => 'required|string|max:100',
            'image_bukti_transaksi_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Default status pendaftaran
        $validated['status_pendaftaran'] = 'menunggu-verifikasi';

         // Handle file upload — guaranteed to exist due to 'required' rule
        try {
            $file = $request->file('image_bukti_transaksi_url');
            $filePath = $file->store('bukti_transaksi', 'public');
            $validated['bukti_transaksi_path'] = $filePath; // 👈 Renamed for clarity (see migration note below)
        } catch (\Exception $e) {
            Log::error('File upload failed during student registration: ' . $e->getMessage());
            return back()->withErrors([
                'image_bukti_transaksi_url' => 'Gagal mengunggah bukti transaksi. Silakan coba lagi.'
            ])->withInput();
        }

        // Simpan ke database
        $siswa = Siswa::create($validated);

        // Redirect ke success page dengan data siswa
       return Inertia::render('register-success', [
            'success' => 'Pendaftaran berhasil!',
            'siswa' => $siswa->only([
                'id',
                'nama',
                'nisn',
                'program_pendidikan',
                'status_pendaftaran'
            ]),
        ]);
    }

    // cek status pendaftaran
    public function registerStatus()
    {
        return Inertia::render('register-status');
    }
    public function registerSuccess()
    {
        return Inertia::render('register-success');
    }
        
}
