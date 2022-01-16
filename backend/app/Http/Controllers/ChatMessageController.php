<?php

namespace App\Http\Controllers;

use App\Domain\Message\UseCases\FindAction;
use App\Domain\Message\UseCases\StoreAction;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ChatMessageController extends Controller
{

    /**
     * 渡されたグループ ID が紐ついているメッセージのみ取得
     *
     * @param Request $request->groupIds
     * @return JsonResponse
     */
    public function getMessagesByGroupIds(Request $request, FindAction $action): JsonResponse
    {
        $group_ids = $request->groupIds;

        $messages = $action->findMessageByGroupIds($group_ids);
        $roles = $action->roleAll();
        $role_user = $action->roleUserAll();

        return Response()->json([
          'chat_messages'=>$messages,
          'roles'=>$roles,
          'role_user'=>$role_user
        ], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにメッセージを挿入する
     *
     * @param Request $request
     */
    public function insertChatMessage(Request $request, StoreAction $action)
    {
        $user_id = $request->userId;
        $group_id = $request->groupId;
        $content = $request->content;
        $action->createMessage($user_id, $group_id, $content);
    }
}
