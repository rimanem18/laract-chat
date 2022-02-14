<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\RoleUser;
use \Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * IDからユーザー情報を取得
     *
     * @param Request $request->userId
     * @return JsonResponse
     */
    public function getUserById(Request $request): JsonResponse
    {
        $user_id = $request->userId;

        $user =
       User::where('users.id', $user_id)
      ->select(
          'id',
          'name',
          'email',
      )
      ->get();

        $role_user =
      RoleUser::join('users', 'role_user.user_id', '=', 'users.id')
      ->where('users.id', $user_id)
      ->select(
          'user_id',
          "role_id"
      )
      ->get();

        return Response()->json([
        'user'=>$user[0],
        'role_user'=> $role_user
      ], Response::HTTP_OK);
    }
}
