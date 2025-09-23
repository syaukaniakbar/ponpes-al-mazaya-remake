<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
 
    protected $table = 'documents';

    protected $fillable = [
        'name', 
        'file_path',
        'mime_type',
        'extension',
        'head',
        'description'
    ];
}

