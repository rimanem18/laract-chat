<?php

namespace App\Domain\RoleUser\UseCases;

use App\Models\RoleUser;

/**
 * RoleUser に関する新規作成を担うクラス
 */
class StoreAction
{
    private RoleUser $roleUser_model_repository;

    public function __construct(RoleUser $roleUser_model_repository)
    {
        $this->roleUser_model_repository = $roleUser_model_repository;
    }

    /**
     * 引数をもとにユーザーにロールを付与する
     *
     * @param int $user_id
     * @param int $role_id
     *
     * @return void
     */
    public function createRoleUser(int $user_id, int $role_id): void
    {
        $this->roleUser_model_repository->create([
          'user_id'=> $user_id,
          'role_id'=>$role_id
        ]);
    }
}
