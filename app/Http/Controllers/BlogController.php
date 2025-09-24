<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;


class BlogController extends Controller
{
    public function index (Request $request) {
        $category = $request->query('category'); // Get category from query parameter

        $query = Blog::query();
        
        if ($category) {
            // Handle case-insensitive matching for categories
            $query->whereRaw('LOWER(category) = LOWER(?)', [$category]);
        }
        
        $blogs = $query->latest()->paginate(6)->through(function ($blog) {
            $blog->image_url = asset('storage/' . $blog->image_url);
            return $blog;
        });

        // Pass the original category parameter for frontend display
        return Inertia::render('blog', [
            'blogs' => $blogs,
            'selectedCategory' => $category, // Pass selected category to frontend
        ]);

    }

    public function show($category, $slug) {
        $blog = Blog::where('category', $category)->where('slug', $slug)->firstOrFail();

        // perbaiki URL image
        $blog->image_url = asset('storage/' . $blog->image_url);

        return Inertia::render('blog-detail', [
            'blog' => $blog,
        ]);
    }
}
