<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    protected $table = 'header';

    protected $fillable = [
        'title',
        'description',
        'button_text',
        'button_url',
        'image_url',
    ];
}
