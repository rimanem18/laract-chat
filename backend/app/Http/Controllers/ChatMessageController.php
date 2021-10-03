<?php

namespace App\Http\Controllers;

use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChatMessageController extends Controller
{
    public function selectChatMessages(Request $request)
    {
//         $sql = <<< EOM
//         SELECT t1.id, t1.user_id, t1.content, t1.create_at, t2.name
//         FROM chat_messages AS t1
//         JOIN users AS t2
//         ON t1.user_id = t2.id;
        // EOM;
//         $chat_messages =
//       DB::select($sql);

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
        ->get();

        return Response()->json(['chat_messages'=>$chat_messages]);
    }

    public function insertChatMessage(Request $request)
    {
        $user_id = $request->userId;
        $group_id = 1;
        $content = $request->content;

        ChatMessage::create([
          'user_id'=> $user_id,
          'group_id'=> $group_id,
          'content'=>$content
        ]);

        return response()->json(['promise'=> ''], Response::HTTP_OK);
    }
}
