<?php

namespace App\Domain\RoleUser\UseCases;

use App\Models\RoleUser;
use Illuminate\Database\Eloquent\Collection;

/**
 * RoleUser に関する取得を担うクラス
 */
class FindAction
{
    private RoleUser $roleUser_model_repository;

    public function __construct(RoleUser $roleUser_model_repository)
    {
        $this->roleUser_model_repository = $roleUser_model_repository;
    }

    /**
     * すべてのロールを取得
     *
     * @return Collection
     */
    public function roleUserAll(): Collection
    {
        $roleUser = $this->roleUser_model_repository->all();
        return $roleUser;
    }
}
