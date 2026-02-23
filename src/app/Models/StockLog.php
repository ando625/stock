<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockLog extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'quantity',
        'type',
        'note',
    ];

    // この履歴はどの商品に対するか(多対１)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // この履歴は誰が作ったか(多対１)
    public function user()
    {
        return $this->belongsTo(User::class);
    }



    // inbound 入庫作業
    // outbound 出庫・販売作業
    // adjustment 棚卸し(実際の数と帳簿が合わない場合　破損など)
}
