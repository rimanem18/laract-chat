<?php

namespace App\Domain\User\UseCases;

use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Database\Eloquent\Collection;

/**
 * User に関する取得を担うクラス
 */
class FindAction
{
    private User $user_model_repository;
    private RoleUser $roleUser_model_repository;

    public function __construct(User $user_model_repository, RoleUser $roleUser_model_repository)
    {
        $this->user_model_repository = $user_model_repository;
        $this->roleUser_model_repository = $roleUser_model_repository;
    }

    /**
     * ユーザーIDからユーザーを取得
     *
     * @param integer $user_id
     * @return void
     */
    public function findUserById(int $user_id): Collection
    {
        $user = $this->user_model_repository->where('users.id', $user_id)
      ->select(
          'id',
          'name',
          'email',
      )
      ->get();

        return $user;
    }

    /**
     * ユーザーIDからロールの関連付け情報を取得する
     *
     * @param integer $user_id
     * @return Collection
     */
    public function findRoleUserById(int $user_id): Collection
    {
        $role_user = $this->roleUser_model_repository
        ->join('users', 'role_user.user_id', '=', 'users.id')
        ->where('users.id', $user_id)
        ->select(
            'user_id',
            "role_id"
        )
        ->get();

        return $role_user;
    }
}
