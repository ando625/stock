<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStockRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'quantity' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'in:inbound,outbound'],
            'note'=> ['nullable', 'string', 'max:255'],
        ];
    }

    public function withValidator($validator)
    {
        // 発送（outbound）の時だけチェックする
        if ($this->type === 'outbound') {
            // ルートから商品データを確実に取得する魔法
            $product = $this->route('product');

            // もし $product が ID（数字）だけだった場合のために、念のためモデルから取得
            if (is_numeric($product)) {
                $product = \App\Models\Product::find($product);
            }

            // ここで在庫チェック！
            if ($product && $product->current_stock < $this->quantity) {
                $validator->after(function ($validator) { // after を使うのが今の主流です
                    $validator->errors()->add('quantity', '在庫不足！現在の在庫は' . $this->product->current_stock . '個です。');
                });
            }

            // 停止中(inactive)、欠品(out_of_stock)の場合出荷できないように
            if ($product->status === 'inactive' || $product->status === 'out_of_stock') {
                $validator->after(function ($validator) {
                    $validator->errors()->add('quantity', '現在この商品は「停止中」または「欠品」のため、発送できません。');
                });
            }
        }
    }

    public function messages(): array
    {
        return[
            'quantity.min' => '正の数を入力してください。'
        ];
    }


}
