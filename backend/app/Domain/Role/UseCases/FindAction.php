<?php

namespace App\Domain\Role\UseCases;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;

/**
 * Role に関する取得を担うクラス
 */
class FindAction
{
    private User $user_model_repository;
    private Role $role_model_repository;

    public function __construct(User $user_model_repository, Role $role_model_repository)
    {
        $this->user_model_repository = $user_model_repository;
        $this->role_model_repository = $role_model_repository;
    }

    /**
     * 渡されたユーザ ID が紐ついているロールのみ取得
     *
     * @param array $user_id
     * @return Collection
     */
    public function findRoleByUserId(int $user_id): Collection
    {
        $user = $this->user_model_repository->find($user_id);
        $roles = [];

        foreach ($user->roles as $role) {
            array_push(
                $roles,
                [
                  'id'=>$role->id,
                  'name'=>$role->name,
                  'color'=>$role->color
              ]
            );
        }

        return collect($roles);
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
}
