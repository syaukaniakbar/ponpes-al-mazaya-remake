<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'name', 
        'category',
        'file_path',
        'mime_type',
        'extension',
        'head',
        'description'
    ];

}
