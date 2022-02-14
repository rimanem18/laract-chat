<?php

namespace App\Http\Controllers;

use App\Domain\RoleUser\UseCases\DeleteAction;
use App\Domain\RoleUser\UseCases\FindAction;
use App\Domain\RoleUser\UseCases\StoreAction;
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
     * @param DeleteAction $action
     * @return void
     */
    public function deleteRoleUser(Request $request, DeleteAction $action)
    {
        $user_id = $request->userId;
        $role_id = $request->roleId;
        $action->deleteRoleUserById($user_id, $role_id);
    }
}
