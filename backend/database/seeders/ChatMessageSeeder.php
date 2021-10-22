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

        for ($i=0; $i < 20; $i++) {
            $user_id = rand(1, 3);
            $group_id = rand(1, 3);

            $param = [
              'user_id' => $user_id,
              'group_id' => $group_id,
              'content' => $i.'番目の書き込み',
          ];
            \App\Models\ChatMessage::create($param);
        }
    }
}
