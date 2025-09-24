<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\UploadedFile;

class Document extends Model
{
 
    protected $table = 'documents';

    protected $fillable = [
        'name', 
        'category',
        'file_path',
        'mime_type',
        'extension',
        'head',
        'description'
    ];

    public const CATEGORY_SURAT_PERNYATAAN = 'surat pernyataan';
    public const CATEGORY_ATURAN_AL_MAZAYA = 'aturan al mazaya';

    public const CATEGORIES = [
        self::CATEGORY_SURAT_PERNYATAAN => 'Surat Pernyataan',
        self::CATEGORY_ATURAN_AL_MAZAYA => 'Aturan Al Mazaya',
    ];

    /**
     * Check if a document with the specified category already exists
     *
     * @param string $category
     * @return bool
     */
    public static function categoryExists(string $category): bool
    {
        return self::where('category', $category)->exists();
    }

    /**
     * Get the mime type attribute, auto-detecting if not set
     */
    public function getMimeTypeAttribute($value)
    {
        if ($value) {
            return $value;
        }

        $filePath = $this->attributes['file_path'] ?? null;
        if ($filePath) {
            $fullPath = storage_path('app/public/' . $filePath);
            if (file_exists($fullPath)) {
                return File::mimeType($fullPath);
            }
        }
        
        return null;
    }

    /**
     * Get the extension attribute, auto-detecting if not set
     */
    public function getExtensionAttribute($value)
    {
        if ($value) {
            return $value;
        }

        $filePath = $this->attributes['file_path'] ?? null;
        if ($filePath) {
            return pathinfo($filePath, PATHINFO_EXTENSION);
        }
        
        return null;
    }
}

