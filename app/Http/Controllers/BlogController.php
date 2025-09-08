<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;


class BlogController extends Controller
{
    public function index () {

        $blogs = Blog::latest()->get()->map(function ($blog) {
            $blog->image_url = asset('storage/' . $blog->image_url);
            return $blog;
        });

        return Inertia::render('blog', [
            'blogs' => $blogs,
        ]);

    }

    public function show($slug) {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        // perbaiki URL image
        $blog->image_url = asset('storage/' . $blog->image_url);

        return Inertia::render('blog-detail', [
            'blog' => $blog,
        ]);
    }
}
