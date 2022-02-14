<?php

namespace App\Http\Controllers;

use App\Domain\RoleUser\UseCases\FindAction;
use App\Domain\RoleUser\UseCases\StoreAction;
use App\Models\RoleUser;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    public function selectRoleUser(Request $request, FindAction $action)
    {
        $role_user = $action->roleUserAll();
        return Response()->json(['role_user'=>$role_user], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにユーザーにロールを追加する
     *
     * @param Request $request
     * @param StoreAction $action
     * @return jsonResponse
     */
    public function insertRoleUser(Request $request, StoreAction $action)
    {
        $user_id = $request->userId;
        $role_id = $request->roleId;
        $action->createRoleUser($user_id, $role_id);

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
