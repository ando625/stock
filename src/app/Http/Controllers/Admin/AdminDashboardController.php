<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $products = Product::with('categories')->get();

        $categories = Category::all();

        // Reactの[Admin/Dashboard]へデータを渡す
        return Inertia::render('Admin/Dashboard', [
            'products'=> $products,
            'categories' => $categories
        ]);
    }

    
}
