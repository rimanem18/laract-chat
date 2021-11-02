<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            'name'=>"Demo user",
            'email'=>"demo@example.com",
            'password'=>Hash::make("cX3/ZNa-")
        ]);
        \App\Models\User::create([
            'name'=>"太郎",
            'email'=>"taro@example.com",
            'password'=>Hash::make("taroPass")
        ]);
        \App\Models\User::create([
            'name'=>"Mike",
            'email'=>"mike@example.com",
            'password'=>Hash::make("mikePass")
        ]);
    }
}
