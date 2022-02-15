<?php

namespace App\Domain\Group\UseCases;

use App\Domain\Group\GroupEntity;
use App\Models\ChatGroup as Group;
use App\Models\RoleGroup;
use Illuminate\Database\Eloquent\Collection;

/**
 * Group に関する取得を担うクラス
 */
class FindAction
{
    private Group $group_model_repository;
    private RoleGroup $role_group_model_repository;

    public function __construct(Group $group_model_repository, RoleGroup $role_group_model_repository)
    {
        $this->group_model_repository = $group_model_repository;
        $this->role_group_model_repository = $role_group_model_repository;
    }

    /**
     * グループIDをもとにグループを取得
     *
     * @param integer $id
     * @return GroupEntity|null
     */
    public function findEntityById(int $id): ?GroupEntity
    {
        $model = $this->group_model_repository->find($id);
        if (is_null($model)) {
            return null;
        }

        return GroupEntity::convertModelIntoEntity($model);
    }

    /**
     * ロール中間テーブルに紐ついていないグループを取得
     *
     * @return Collection
     */
    public function findPublicGroups(): Collection
    {
        $public_groups = $this->group_model_repository->from('chat_groups AS groups')
              ->leftJoin('role_group', 'groups.id', '=', 'role_group.group_id')
              ->where('role_group.role_id', '=', null)
              ->select(
                  'groups.id',
                  'groups.name',
              )
              ->distinct('groups.id')
              ->get();

        return $public_groups;
    }

    /**
     *  ロール中間テーブルに紐ついているグループを
     *  ロールIDをもとに取得
     *
     * @param array $role_ids
     * @return Collection
     */
    public function findPrivateGroupsByRoleIds(array $role_ids): Collection
    {
        $private_groups = $this->group_model_repository->from('chat_groups AS groups')
        ->leftJoin('role_group', 'groups.id', '=', 'role_group.group_id')
        ->whereIn('role_group.role_id', $role_ids)
        ->select(
            'groups.id',
            'groups.name',
        )
        ->distinct('groups.id')
        ->get();

        return $private_groups;
    }

    /**
     * ロールとグループの関連付けを取得する
     *
     * @return Collection
     */
    public function findRoleGroup(): Collection
    {
        $role_group = $this->role_group_model_repository
        ->select(
            'role_group.group_id',
            "role_group.role_id"
        )
        ->get();

        return $role_group;
    }
}
