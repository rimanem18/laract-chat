<?php

namespace App\Http\Controllers;

use App\Models\RoleGroup;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class RoleGroupController extends Controller
{
    public function selectRoleGroup(Request $request)
    {
        $role_group = RoleGroup::select(
            'role_group.group_id',
            "role_group.role_id"
        )
        ->get();

        return Response()->json(['role_group'=>$role_group], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにグループにロールを追加する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function insertRoleGroup(Request $request)
    {
        $group_id = $request->groupId;
        $role_id = $request->roleId;

        RoleGroup::create([
            'group_id'=> $group_id,
            'role_id'=>$role_id
        ]);

        return response()->json(['message'=> 'グループにロールを追加しました。'], Response::HTTP_OK);
    }

    /**
     * ロールの関連付けを削除
     *
     * @param Request $request
     * @return void
     */
    public function deleteRoleGroup(Request $request)
    {
        $group_id = $request->groupId;
        $role_id = $request->roleId;

        RoleGroup::where([
            ['group_id','=',$group_id],
            ['role_id','=',$role_id],
        ])
        ->delete();
    }
}
