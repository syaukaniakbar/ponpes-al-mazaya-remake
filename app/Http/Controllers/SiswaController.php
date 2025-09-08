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
            'email' => 'required|email|unique:siswas,email',
            'no_hp' => 'required|string|max:20',
            // tambah field lain sesuai kebutuhan
        ]);

        Siswa::create($validated);

        return redirect()->route('pendaftaran.status')
                         ->with('success', 'Pendaftaran berhasil!');
    }

    // cek status pendaftaran
    public function registerStatus()
    {
        return Inertia::render('register-status');
    }
}
