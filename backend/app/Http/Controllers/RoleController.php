<?php

namespace App\Http\Controllers;

use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
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
