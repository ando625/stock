<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name'
    ];

    // カテゴリはたくさんの商品を持つ（多対多）
    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
