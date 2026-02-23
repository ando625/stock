<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'unique:products,sku'],
            'price' => ['required', 'integer', 'min:0'],
            'current_stock' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
            // カテゴリは「既存」か「新規」のどちらかが必要
            'category_id' => ['required_without:new_category_name'],
            'new_category_name' => ['required_without:category_id', 'nullable', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '商品の名前を入力してください',
            'sku.required' => '商品コードを入力してください',
            'sku.unique' => 'この商品コードはすでに登録されています',
            'price.required' => '商品価格を入力してください',
            'current_stock' => '仕入または発送数を入力してください',
            'category_id.required_without' => 'カテゴリを選択してください',
            'new_category_name.required_without' => 'カテゴリを選択するか、新規入力してください',
        ];
    }
}