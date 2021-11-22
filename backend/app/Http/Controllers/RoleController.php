<?php

namespace App\Http\Controllers;

use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    /**
     * user idをもとに特定のユーザのロール一覧を取得する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function selectRoles(Request $request)
    {
        $user_id = $request->userId;
        $user = User::find($user_id);
        $res = array();

        foreach ($user->roles as $role) {
            array_push(
                $res,
                [
                    'role_id'=>$role->id,
                    'role_name'=>$role->name
                ]
            );
        }

        return response()->json($res, Response::HTTP_OK);
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

        ChatGroup::create([
            'name'=> $name,
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

        Role::where('id', $id)->update(['name'=>$name]);
    }
}
