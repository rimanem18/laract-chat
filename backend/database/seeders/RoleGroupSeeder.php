<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class RoleGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // スタッフ
        \App\Models\RoleGroup::create([
            'group_id'=>4,
            'role_id'=>3,
        ]);
    }
}
