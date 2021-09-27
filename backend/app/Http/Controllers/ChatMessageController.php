<?php

namespace App\Http\Controllers;

use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\DB;

class ChatMessageController extends Controller
{
    public function selectChatMessages(Request $request)
    {
        $sql = <<< EOM
      SELECT t1.id, t1.user_id, t1.content, t1.create_at, t2.name
      FROM
      chat_messages AS t1,
      users AS t2;
EOM;
        $chat_messages =
      DB::select($sql);

        return Response()->json(['chat_messages'=>$chat_messages]);
    }
}
