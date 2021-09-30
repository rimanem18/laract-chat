<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class ChatMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('ja_JP');
        $user_id = 1;
        $group_id =1;

        for ($i=0; $i < 10; $i++) {
            $param = [
              'user_id' => $user_id,
              'group_id' => $group_id,
              'content' => $i.'番目の書き込み',
          ];
            \App\Models\ChatMessage::create($param);
        }
    }
}
