<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\RoleUser::create([
            'user_id'=>1,
            'role_id'=>4,
        ]);
        \App\Models\RoleUser::create([
            'user_id'=>2,
            'role_id'=>4,
        ]);
        \App\Models\RoleUser::create([
            'user_id'=>3,
            'role_id'=>4,
        ]);
    }
}
