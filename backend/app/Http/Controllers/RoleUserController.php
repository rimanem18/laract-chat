<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    public function selectRoleUser(Request $request)
    {
        $role_user = RoleUser::select(
            'role_user.user_id',
            "role_user.role_id"
        )
        ->get();

        return Response()->json(['role_user'=>$role_user], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにユーザーにロールを追加する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function insertRoleUser(Request $request)
    {
        $user_id = $request->userId;
        $role_id = $request->roleId;

        RoleUser::create([
            'user_id'=> $user_id,
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
    public function deleteRoleUser(Request $request)
    {
        $user_id = $request->userId;
        $role_id = $request->roleId;

        RoleUser::where([
            ['user_id','=',$user_id],
            ['role_id','=',$role_id],
        ])
        ->delete();
    }
}
