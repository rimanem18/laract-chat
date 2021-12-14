<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Role::create([
            'name'=>"特権管理者",
            'color'=>"#c8336f"
        ]);
        \App\Models\Role::create([
            'name'=>"管理者",
            'color'=>"#e45c0b"
        ]);
        \App\Models\Role::create([
            'name'=>"スタッフ",
            'color'=>'#169824'
        ]);
    }
}
