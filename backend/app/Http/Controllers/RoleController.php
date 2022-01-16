<?php

namespace App\Http\Controllers;

use App\Domain\Role\UseCases\FindAction;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function selectRoles(Request $request, FindAction $action)
    {
        $roles = $action->roleAll();
        return response()->json(['roles'=>$roles], Response::HTTP_OK);
    }

    /**
     * user idをもとに特定のユーザのロール一覧を取得する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function selectRolesById(Request $request, FindAction $action)
    {
        $user_id = $request->userId;

        $roles = $action->findRoleByUserId($user_id);
        return response()->json($roles, Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとに新しいロールを追加する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function insertRole(Request $request)
    {
        $name = $request->roleName;
        $color = $request->roleColor;

        Role::create([
            'name'=> $name,
            'color'=>$color,
        ]);

        return response()->json(['message'=> 'ロール「'. $name .'」を追加しました。'], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにロール名を更新する
     *
     * @param Request $request
     * @return void
     */
    public function updateRoleName(Request $request)
    {
        $id = $request->roleId;
        $name = $request->roleName;
        $color = $request->roleColor;

        Role::where('id', $id)->update([
          'name'=>$name,
          'color'=>$color
        ]);
    }
}
