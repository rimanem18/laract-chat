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
        $name = ["あいさつ","ざつだん","しつもん"];

        for ($i=0; $i < 3; $i++) {
            $param = [
              'name' => $name[$i]
          ];
            \App\Models\ChatGroup::create($param);
        }
    }
}
