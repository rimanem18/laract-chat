<?php

namespace App\Http\Controllers;

use App\Models\ChatGroup;
use \Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class ChatGroupController extends Controller
{
    public function selectChatGroups(Request $request)
    {
        $chat_groups = ChatGroup::select(
            'chat_groups.id',
            "chat_groups.name"
        )
        ->get();

        return Response()->json(['chat_groups'=>$chat_groups], Response::HTTP_OK);
    }

    /**
     * リクエストパラメーターをもとにグループを追加する
     *
     * @param Request $request
     * @return jsonResponse
     */
    public function insertChatGroup(Request $request)
    {
        $name = $request->groupName;

        ChatGroup::create([
            'name'=> $name
        ]);

        return response()->json(['message'=> 'グループを追加しました。'], Response::HTTP_OK);
    }
}
