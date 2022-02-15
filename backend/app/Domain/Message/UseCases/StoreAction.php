<?php

namespace App\Domain\Message\UseCases;

use App\Models\ChatMessage as Message;

/**
 * Message に関する新規作成を担うクラス
 */
class StoreAction
{
    private Message $message_model_repository;

    public function __construct(Message $message_model_repository)
    {
        $this->message_model_repository = $message_model_repository;
    }

    /**
     * 引数をもとにメッセージを新規投稿する
     *
     * @param integer $user_id
     * @param integer $group_id
     * @param string $content
     * @return void
     */
    public function createMessage(int $user_id, int $group_id, string $content): void
    {
        $this->message_model_repository
        ->create([
          'user_id'=> $user_id,
          'group_id'=> $group_id,
          'content'=>$content
        ]);
    }
}
