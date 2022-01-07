<?php

namespace App\Http\Controllers;

use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\ChatMessage;
use App\Models\Role;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Http\JsonResponse;

class ChatMessageController extends Controller
{

    /**
     * 渡されたグループ ID が紐ついているメッセージのみ取得
     *
     * @param Request $request->groupIds
     * @return JsonResponse
     */
    public function getMessagesByGroupIds(Request $request): JsonResponse
    {
        $group_ids = $request->groupIds;

        $chat_messages =
        ChatMessage::from('chat_messages AS messages')
        ->join('users', 'messages.user_id', '=', 'users.id')
        ->whereIn('messages.group_id', $group_ids)
        ->select(
            'messages.id',
            'messages.user_id',
            'messages.group_id',
            'messages.content',
            'messages.created_at',
            'users.id AS user_id',
            'users.name'
        )
        ->orderBy('id')
        ->get();

        $roles = Role::all();

        $role_user = RoleUser::select(
            'role_user.user_id',
            "role_user.role_id"
        )
      ->get();

        return Response()->json([
          'chat_messages'=>$chat_messages,
          'roles'=>$roles,
          'role_user'=>$role_user
        ], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにメッセージ一覧を返す
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function selectChatMessages(Request $request)
    {
        $chat_messages =
        ChatMessage::from('chat_messages AS messages')
        ->join('users', 'messages.user_id', '=', 'users.id')
        ->select(
            'messages.id',
            'messages.user_id',
            'messages.group_id',
            'messages.content',
            'messages.created_at',
            'users.id AS user_id',
            'users.name'
        )
        ->get();

        $roles = array();
        foreach ($chat_messages as $message) {
            $user = User::find($message->user_id);
            $roles = array();

            foreach ($user->roles as $role) {
                array_push($roles, [
                'id'=>$role->id,
                'name'=>$role->name,
                'color'=>$role->color
              ]);
                $message->roles =  $roles;
            }
        }

        return Response()->json($chat_messages, Response::HTTP_OK);
    }



    /**
     * リクエストパラメーターをもとにメッセージを挿入する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function insertChatMessage(Request $request)
    {
        $user_id = $request->userId;
        $group_id = $request->groupId;
        $content = $request->content;

        ChatMessage::create([
          'user_id'=> $user_id,
          'group_id'=> $group_id,
          'content'=>$content
        ]);

        return response()->json(['promise'=> ''], Response::HTTP_OK);
    }
}
