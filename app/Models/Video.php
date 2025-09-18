<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'video_profile';

    protected $fillable = [
        'title',
        'description',
        'url',
    ];

    protected $visible = [
        'id',
        'title',
        'description',
        'url',
    ];

    protected $attributes = [
        'url' => 'https://www.youtube.com/@ponpesalmazaya',
    ];
}
