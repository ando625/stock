<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\StockLog;


class StockLogController extends Controller
{
    public function index()
    {
        $logs = StockLog::with(['product', 'user'])->latest()->paginate(20);
        $categories = Category::all();

        // ↓ ここ！ 'Stock/LogIndex' ではなく場所を直接指定する
        return Inertia::render('Admin/LogIndex', [
            'logs' => $logs,
            'categories' => $categories
        ]);
    }
}
