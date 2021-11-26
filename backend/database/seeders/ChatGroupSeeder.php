<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class ChatGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ["あいさつ","ざつだん","しつもん","スタッフ専用"];

        foreach ($names as $name) {
            $param = [
              'name' => $name
          ];
            \App\Models\ChatGroup::create($param);
        }
    }
}
