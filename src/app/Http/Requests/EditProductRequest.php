<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditProductRequest extends FormRequest
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
        $productId = $this->route('product')->id;
        return [
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku,' . $productId, 
            'price' => 'required|integer|min:0',
            'current_stock' => 'required|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'new_category_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive,out_of_stock',
            'image' => 'nullable|image|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '商品の名前を入力してください',
            'sku.required' => 'SKUを入力してください',
            'sku.unique' => 'この商品コードはすでに登録されています',
            'price.required' => '商品価格を入力してください',
            'current_stock.required' => '現在の在庫数を入力してください',
            'category_id.required' => 'カテゴリを選択してください',
        ];
    }
}
