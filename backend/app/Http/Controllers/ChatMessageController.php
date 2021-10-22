<?php

namespace App\Http\Controllers;

use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChatMessageController extends Controller
{

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
            'messages.content',
            'messages.created_at',
            'users.name'
        )
        ->where("group_id", $request->groupId)
        ->get();

        return Response()->json(['chat_messages'=>$chat_messages], Response::HTTP_OK);
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
