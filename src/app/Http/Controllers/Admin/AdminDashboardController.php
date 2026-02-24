<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $query= Product::with('categories');

        if($request->filled('search')){
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('categories.id', $request->input('category'));
            });
        }

        $products = $query->get();
        $categories = Category::all();

        // Reactの[Admin/Dashboard]へデータを渡す
        return Inertia::render('Admin/Dashboard', [
            'products'=> $products,
            'categories' => $categories
        ]);
    }

    
}
