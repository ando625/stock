<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;




class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('categories');

        // カテゴリ選択ありなら絞り込み、なしなら全表示
        if($request->filled('category')){
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('categories.id', $request->category);
            });
        }

        // 部分検索
        if($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        $products = $query->get();

        $categories = Category::all();

        return Inertia::render('Dashboard', [
            'products' => $products,
            'categories' => $categories
        ]);

    }

    
    
}
