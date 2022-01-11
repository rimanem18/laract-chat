<?php

namespace App\Domain\Group\UseCases;

use App\Domain\Group\GroupEntity;
use App\Models\ChatGroup as Group;

/**
 * Group に関する更新を担うクラス
 */
class UpdateAction
{
    private Group $group_model_repository;

    public function __construct(Group $group_model_repository)
    {
        $this->group_model_repository = $group_model_repository;
    }

    /**
     * 引数1の ID のグループのグループ名を引数2のグループ名に上書きする
     *
     * @param int $id
     * @param string $name
     * @return void
     */
    public function updateGroupById(int $id, string $name): void
    {
        $this->group_model_repository->where('id', $id)->update(['name'=>$name]);
    }
}
