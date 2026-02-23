<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateStockRequest;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProductStockController extends Controller
{
    public function update(UpdateStockRequest $request, Product $product)
    {
        DB::transaction(function() use ($request, $product) {
            if($request->type === 'inbound'){
                $product->increment('current_stock', $request->quantity);
            } else {
                $product->decrement('current_stock', $request->quantity);
            }

            // 履歴の保存
            $product->stockLogs()->create([
                'user_id' => Auth::id(),
                'quantity' => $request->quantity,
                'type' => $request->type,
                'note' => $request->note,
            ]);
        });

        return back()->with('message', '在庫を更新しました');
    }
}
