<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\EditProductRequest;

class AdminProductController extends Controller
{
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        // DB:transactionは中のものはセットで保存か失敗で
        DB::transaction(function () use ($request, $validated) {
            $categoryId = $request->category_id;

            //新しいカテゴリがあれば作る
            if ($request->filled('new_category_name')) {
                $newCategory = Category::create([
                    'name' => $request->new_category_name
                ]);
                $categoryId = $newCategory->id;
            }

            $path = null;
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
            }

            //商品を保存
            $product = Product::create([
                'name' => $validated['name'],
                'sku' => $validated['sku'],
                'price' => $validated['price'],
                'current_stock' => $validated['current_stock'],
                'description' => $validated['description'],
                'status' => $validated['status'],
                'image_url' => $path,
            ]);

            //カテゴリと紐付け
            if ($categoryId) {
                $product->categories()->attach($categoryId);
            }
        });

        return redirect()->route('admin.dashboard');
    }

    // 既存カード編集
    public function update(EditProductRequest $request, Product $product){
        $validated = $request->validated();

        DB::transaction(function () use ($request,$product,$validated) {
            $oldStock = $product->current_stock;
            $newStock = $validated['current_stock'];

            // 画像保存
            if($request->hasFile('image')){
                $path = $request->file('image')->store('products', 'public');
                $product->image_url = $path;
            }

            // 新しいカテゴリ作成
            $categoryId = $validated['category_id'];
            if ($request->filled('new_category_name')){
                $newCategory = Category::firstOrCreate([
                    'name' => $validated['new_category_name']
                ]);
                $categoryId = $newCategory->id;
            }

            // 商品情報の更新
            $product->update($validated);

            // 在庫調整の履歴を残す
            if($oldStock !== $newStock) {
                $product->stockLogs()->create([
                    'user_id' => auth()->id(),
                    'quantity' => $newStock - $oldStock,
                    'type' => 'adjustment',
                    'note' => '管理者による棚卸し調整',
                ]);
            }

            if($categoryId) {
                $product->categories()->sync([$categoryId]);
            }

        });

        return redirect()->route('admin.dashboard')->with('message', '商品情報を更新しました');
    }

    //商品削除
    public function productDestroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.dashboard')->with('message', '商品を削除しました');
    }


    // カテゴリ削除
    public function destroy(Category $category)
    {
        // 救済と削除をセットで処理するため
        DB::transaction(function () use ($category) {

            $uncategorized = Category::firstOrCreate([
                'name' => '未選択'
            ]);

            $products = $category->products;

            // 今のカテゴリを切って、未選択と結ぶ
            foreach($products as $product){
                $product->categories()->sync([$uncategorized->id]);
            }

            // 未選択のカテゴリは消せないようにする
            if($category->id !== $uncategorized->id) {
                $category->delete();
            }
        });

        return redirect()->route('admin.dashboard')->with('message', 'カテゴリを削除し、商品は「未選択」へ移動しました');
    }
}
