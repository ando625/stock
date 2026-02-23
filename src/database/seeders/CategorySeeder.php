<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'コスメ'],
            ['name' => 'アクセサリー'],
            ['name' => '家電'],
            ['name' => 'インテリア'],
            ['name' => '日用品'],
            ['name' => 'スポーツ'],
        ];
        foreach($categories as $category) {
            Category::create($category);
        }
    }
}
