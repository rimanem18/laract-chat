<?php

namespace App\Http\Controllers;

use App\Domain\User\UseCases\FindAction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use \Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * IDからユーザー情報を取得
     *
     * @param Request $request->userId
     * @param FindAction $action
     * @return JsonResponse
     */
    public function getUserById(Request $request, FindAction $action): JsonResponse
    {
        $user_id = $request->userId;
        $user = $action->findUserById($user_id);
        $role_user = $action->findRoleUserById($user_id);

        return Response()->json([
        'user'=>$user[0],
        'role_user'=> $role_user
      ], Response::HTTP_OK);
    }
}
