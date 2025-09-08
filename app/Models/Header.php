<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    protected $table = 'header';

    protected $fillable = [
        'title',
        'label',
        'nama_tombol_aksi',
        'url_aksi',
        'image_url',
        'description',
    ];
}
