<?php

namespace App\Http\Controllers;

use App\Domain\Group\UseCases\FindAction;
use App\Domain\Group\UseCases\StoreAction;
use App\Domain\Group\UseCases\UpdateAction;
use App\Domain\Group\UseCases\DeleteAction;
use App\Http\Resources\GroupResource;
use Illuminate\Http\JsonResponse;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use stdClass;

class ChatGroupController extends Controller
{
    /**
     * 渡されたロール ID が紐ついているグループのみ取得
     *
     * @param Request $request->roleIds array
     * @param FindAction $action
     * @return JsonResponse
     */
    public function getGroupsByRoleIds(Request $request, FindAction $action): GroupResource
    {
        $role_ids = $request->roleIds;

        $resource = new stdClass();
        $resource->public_groups = $action->findPublicGroups();
        $resource->private_groups = $action->findPrivateGroupsByRoleIds($role_ids);
        $resource->role_group = $action->findRoleGroup();

        return new GroupResource($resource);
    }

    /**
     * リクエストパラメーターをもとにグループを追加する
     *
     * @param Request $request
     * @param StoreAction $action
     * @return jsonResponse
     */
    public function insertChatGroup(Request $request, StoreAction $action): JsonResponse
    {
        $name = $request->groupName;
        $action->createGroupByName($name);
        return response()->json([
          'message'=> 'グループ「'.$name.'」を追加しました。'
        ], Response::HTTP_OK);
    }

    /**
     * グループ情報を書き換える
     *
     * @param Request $request
     * @param UpdateAction $action
     * @return void
     */
    public function updateChatGroup(Request $request, UpdateAction $action): void
    {
        $id = $request->groupId;
        $name = $request->groupName;
        $action->updateGroupById($id, $name);
    }

    /**
     * グループを削除
     *
     * @param Request $request
     * @param DeleteAction $action
     * @return void
     */
    public function deleteChatGroup(Request $request, DeleteAction $action)
    {
        $id = $request->groupId;
        $action->deleteGroupById($id);
    }
}
