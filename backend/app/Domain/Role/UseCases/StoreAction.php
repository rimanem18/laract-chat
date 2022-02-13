<?php

namespace App\Domain\Role\UseCases;

use App\Models\Role;

/**
 * Role に関する新規作成を担うクラス
 */
class StoreAction
{
    private Role $role_model_repository;

    public function __construct(Role $role_model_repository)
    {
        $this->role_model_repository = $role_model_repository;
    }

    /**
     * 引数をもとにロールを新規追加する
     *
     * @param string $role_name
     * @param string $role_color
     *
     * @return void
     */
    public function createRole(string $role_name, string $role_color): void
    {
        $this->role_model_repository->reate([
          'name'=> $role_name,
          'color'=>$role_color,
        ]);
    }
}
