<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {    
        $table->id();
        $table->string('name'); // Nama dokumen, contoh: "Surat Pernyataan"
        $table->string('category')->nullable(); // contoh: "pendaftaran"
        $table->string('file_path'); // path file
        $table->string('mime_type')->nullable(); // application/pdf, image/png, dll
        $table->string('extension', 10)->nullable(); // pdf, docx, png, dll
        $table->text('description')->nullable(); // penjelasan singkat
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
