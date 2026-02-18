<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable =[
        'sku',
        'name',
        'description',
        'price',
        'current_stock',
        'status',
        'image_url'
    ];

    // active  販売中
    // inactive　停止
    // out_of_stock　欠品

    
    // 商品はたくさんの履歴を持っている（1対多）
    public function stockLogs()
    {
        return $this->hasMany(StockLog::class);
    }

    // 商品は多くのカテゴリに属し、カテゴリも多くの商品を(多対多)
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
