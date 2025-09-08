<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherStaff extends Model
{
    protected $table = 'teacher_staff';

    protected $fillable = [
        'name',
        'role',
        'role_detail',
        'nip',
        'phone',
        'image_path',
        'joined_date',
        'status',
    ];
}
