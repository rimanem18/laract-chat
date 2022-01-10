<?php

namespace App\Http\Controllers;

use App\Domain\Group\UseCases\FindAction;
use App\Models\ChatGroup;
use Illuminate\Http\JsonResponse;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class ChatGroupController extends Controller
{
    /**
     * 渡されたロール ID が紐ついているグループのみ取得
     *
     * @param Request $request->roleIds array
     * @return JsonResponse
     */
    public function getGroupsByRoleIds(Request $request, FindAction $action): JsonResponse
    {
        $role_ids = $request->roleIds;

        $public_groups = $action->findPublicGroups();
        $private_groups = $action->findPrivateGroupsByRoleIds($role_ids);
        $role_group = $action->findRoleGroup();

        return Response()->json([
          'public_groups'=>$public_groups,
          'private_groups'=>$private_groups,
          'role_group'=>$role_group,
        ], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにグループを追加する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function insertChatGroup(Request $request)
    {
        $name = $request->groupName;

        ChatGroup::create([
            'name'=> $name
        ]);

        return response()->json(['message'=> 'グループを追加しました。'], Response::HTTP_OK);
    }

    /**
     * グループ名を書き換える
     *
     * @param Request $request
     * @return void
     */
    public function updateChatGroup(Request $request)
    {
        $id = $request->groupId;
        $name = $request->groupName;

        ChatGroup::where('id', $id)->update(['name'=>$name]);
    }

    /**
     * グループを削除
     *
     * @param Request $request
     * @return void
     */
    public function deleteChatGroup(Request $request)
    {
        $id = $request->groupId;

        ChatGroup::where('id', $id)->delete();
    }
}
