<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    // simpan data siswa
    public function store(Request $request)
    {
        // Validasi
        $validated = $request->validate([
            'nisn' => 'required|string|size:10|unique:students,nisn|regex:/^[0-9]{10}$/',
            'nama' => 'required|string|max:255',
            'program_pendidikan' => 'required|string|max:50',
            'nik' => 'required|string|max:20|unique:students,nik|regex:/^[0-9]{16}$/',
            'nomor_kk' => 'required|string|max:20|regex:/^[0-9]{16}$/',
            'tempat_lahir' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string', // Changed from 'alamat_domisili' to match the model
            'provinsi' => 'required|string|max:100',
            'kota' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100',
            'kelurahan' => 'required|string|max:100',
            'asal_sekolah' => 'required|string|max:100',
            'nama_ayah' => 'required|string|max:100',
            'nama_ibu' => 'required|string|max:100',
            'no_hp_orangtua' => 'required|string|max:20',
            'nama_pengirim' => 'required|string|max:100',
            'image_bukti_transaksi_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'nisn.unique' => 'NISN sudah terdaftar.',
            'nisn.regex' => 'NISN harus berupa 10 digit angka.',
            'nik.unique' => 'NIK sudah terdaftar.',
            'nik.regex' => 'NIK harus berupa 16 digit angka.',
            'nomor_kk.regex' => 'Nomor KK harus berupa 16 digit angka.',
        ]);

        $validated['status_pendaftaran'] = 'menunggu verifikasi';

         // Handle file upload — guaranteed to exist due to 'required' rule
        try {
            $file = $request->file('image_bukti_transaksi_url');
            // Generate filename using nisn_nama format
            $extension = $file->getClientOriginalExtension();
            $nisn = $validated['nisn'];
            $nama = preg_replace('/[^A-Za-z0-9\-_.]/', '_', $validated['nama']); // Clean nama from special characters
            $fileName = $nisn . '_' . $nama . '.' . $extension;
            $filePath = $file->storeAs('transaction_images', $fileName, 'public');
            $validated['image_bukti_transaksi_url'] = $filePath;
        } catch (\Exception $e) {
            Log::error('File upload failed during student registration: ' . $e->getMessage());
            return back()->withErrors([
                'image_bukti_transaksi_url' => 'Gagal mengunggah bukti transaksi. Silakan coba lagi.'
            ])->withInput();
        }

        // Simpan ke database
        $student = Student::create($validated);

        // Redirect ke halaman sukses dengan data siswa
        return redirect()->route('register.success')->with([
            'success' => 'Pendaftaran berhasil!',
            'student' => $student->only([
                'id',
                'nama',
                'nisn',
                'program_pendidikan',
                'status_pendaftaran'
            ])
        ]);
    }


    public function registerSuccess()
    {
        $success = session('success');
        $student = session('student');

        if (!$success || !$student) {
            return redirect()->route('register')->with('error', 'Data pendaftaran tidak ditemukan.');
        }

        return Inertia::render('register-success', [
            'success' => $success,
            'student' => $student,
        ]);
    }

    public function checkNisn($nisn)
    {
        $exists = Student::where('nisn', $nisn)->exists();

        return response()->json([
            'exists' => $exists
        ]);
    }

}