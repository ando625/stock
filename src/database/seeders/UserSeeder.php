<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 管理者ユーザー
        User::create([
            'name' => '管理者',
            'email' => 'admin@example.com',
            'password' => Hash::make('password1234'),
            'role' => 1,
        ]);


        // 一般スタッフ
        User::create([
            'name'=> 'スタッフ',
            'email' => 'staff@example.com',
            'password' => Hash::make('password123'),
            'role' => 2,
        ]);
    }
}
