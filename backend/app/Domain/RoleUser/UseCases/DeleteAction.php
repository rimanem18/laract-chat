<?php

namespace App\Domain\RoleUser\UseCases;

use App\Models\RoleUser;

/**
 * RoleUser に関する削除を担うクラス
 */
class DeleteAction
{
    private RoleUser $roleUser_model_repository;

    public function __construct(RoleUser $roleUser_model_repository)
    {
        $this->roleUser_model_repository = $roleUser_model_repository;
    }

    /**
     * ユーザー ID とロール ID を指定して関連付けを解除する
     *
     * @param int $user_id
     * @param int $role_id
     * @return void
     */
    public function deleteRoleUserById(int $user_id, int $role_id): void
    {
        $this->roleUser_model_repository->where([
          ['user_id','=',$user_id],
          ['role_id','=',$role_id],
      ])
      ->delete();
    }
}
