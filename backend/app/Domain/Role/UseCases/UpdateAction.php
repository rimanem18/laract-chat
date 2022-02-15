<?php

namespace App\Domain\Role\UseCases;

use App\Models\Role;

/**
 * Role に関する更新を担うクラス
 */
class UpdateAction
{
    private Role $role_model_repository;

    public function __construct(Role $role_model_repository)
    {
        $this->role_model_repository = $role_model_repository;
    }

    /**
     * 引数1の ID のロールの情報を上書きする
     *
     * @param int $id
     * @param string $name
     * @param string $color
     * @return void
     */
    public function updateRoleById(int $id, string $name, string $color): void
    {
        $this->role_model_repository->where('id', $id)->update([
          'name'=>$name,
          'color'=>$color
        ]);
    }
}
