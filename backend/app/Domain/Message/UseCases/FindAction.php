<?php

namespace App\Domain\Message\UseCases;

use App\Models\ChatMessage as Message;
use App\Models\Role;
use App\Models\RoleUser;
use Illuminate\Database\Eloquent\Collection;

/**
 * Message に関する取得を担うクラス
 */
class FindAction
{
    private Message $message_model_repository;
    private Role $role_model_repository;
    private RoleUser $role_user_model_repository;

    public function __construct(Message $message_model_repository, Role $role_model_repository, RoleUser $role_user_model_repository)
    {
        $this->message_model_repository = $message_model_repository;
        $this->role_model_repository = $role_model_repository;
        $this->role_user_model_repository = $role_user_model_repository;
    }

    /**
     * 渡されたグループ ID が紐ついているメッセージのみ取得
     *
     * @param array $group_ids
     * @return Collection
     */
    public function findMessageByGroupIds(array $group_ids): Collection
    {
        $messages =$this->message_model_repository
      ->from('chat_messages AS messages')
      ->join('users', 'messages.user_id', '=', 'users.id')
      ->whereIn('messages.group_id', $group_ids)
      ->select(
          'messages.id',
          'messages.user_id',
          'messages.group_id',
          'messages.content',
          'messages.created_at',
          'users.id AS user_id',
          'users.name'
      )
      ->orderBy('id')
      ->get();

        return $messages;
    }

    /**
     * すべてのロールを取得
     *
     * @return Collection
     */
    public function roleAll(): Collection
    {
        $roles = $this->role_model_repository->all();
        return $roles;
    }

    /**
     * すべてのロールとユーザーの紐付け情報を取得
     *
     * @return Collection
     */
    public function roleUserAll(): Collection
    {
        $role_user = $this->role_user_model_repository->all();
        return $role_user;
    }
}
