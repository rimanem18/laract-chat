<?php

namespace App\Domain\Group\UseCases;

use App\Models\ChatGroup as Group;

/**
 * Group に関する削除を担うクラス
 */
class DeleteAction
{
    private Group $group_model_repository;

    public function __construct(Group $group_model_repository)
    {
        $this->group_model_repository = $group_model_repository;
    }

    /**
     * 引数の ID のグループを削除する。関連する書き込みデータは残る。
     *
     * @param int $id
     * @return void
     */
    public function deleteGroupById(int $id): void
    {
        $this->group_model_repository->where('id', $id)->delete();
    }
}
