<?php

namespace App\Http\Controllers;

use App\Models\ChatGroup;
use App\Models\RoleGroup;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class ChatGroupController extends Controller
{
    public function selectChatGroups(Request $request)
    {
        $chat_groups = ChatGroup::select(
            'chat_groups.id',
            "chat_groups.name"
        )
        ->get();

        return Response()->json(['chat_groups'=>$chat_groups], Response::HTTP_OK);
    }

    /**
     * 渡されたロール ID が紐ついているグループのみ取得
     *
     * @param Request $request->roleIds array
     * @return void
     */
    public function getGroupsByRoleIds(Request $request)
    {
        $role_ids = $request->roleIds;
        // $role_ids = [3];

        // ロール中間テーブルに紐ついていないものを取得
        $public_groups = ChatGroup::from('chat_groups AS groups')
        ->leftJoin('role_group', 'groups.id', '=', 'role_group.group_id')
        ->where('role_group.role_id', '=', null)
        ->select(
            'groups.id',
            'groups.name',
        )
        ->distinct('groups.id')
        ->get();

        // ロール中間テーブルに紐ついているものを
        // パラメータをもとに取得
        $private_groups = ChatGroup::from('chat_groups AS groups')
        ->leftJoin('role_group', 'groups.id', '=', 'role_group.group_id')
        ->whereIn('role_group.role_id', $role_ids)
        ->select(
            'groups.id',
            'groups.name',
        )
        ->distinct('groups.id')
        ->get();

        // ロールとグループの関連付けを取得する
        $role_group = RoleGroup::select(
            'role_group.group_id',
            "role_group.role_id"
        )
        ->get();

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
