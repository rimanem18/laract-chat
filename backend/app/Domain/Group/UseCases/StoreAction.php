<?php

namespace App\Domain\Group\UseCases;

use App\Domain\Group\GroupEntity;
use App\Models\ChatGroup as Group;

/**
 * Group に関する新規作成を担うクラス
 */
class StoreAction
{
    private Group $group_model_repository;

    public function __construct(Group $group_model_repository)
    {
        $this->group_model_repository = $group_model_repository;
    }

    /**
     * 引数をグループ名にしてグループを新規作成する
     *
     * @param string $name
     * @return void
     */
    public function createGroupByName(string $name): void
    {
        $this->group_model_repository->create([
        'name'=> $name
      ]);
    }
}
