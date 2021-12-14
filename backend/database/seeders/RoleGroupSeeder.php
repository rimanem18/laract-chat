<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use \App\Models\RoleGroup;

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
        RoleGroup::create([
            'group_id'=>4,
            'role_id'=>3,
        ]);
        // 管理者
        RoleGroup::create([
          'group_id'=>5,
          'role_id'=>2,
        ]);

        // 管理者兼スタッフ
        RoleGroup::create([
          'group_id'=>6,
          'role_id'=>2,
        ]);
        RoleGroup::create([
          'group_id'=>6,
          'role_id'=>3,
        ]);
    }
}
