<?php

namespace App\Http\Controllers;

use App\Domain\Message\UseCases\FindAction;
use App\Domain\Message\UseCases\StoreAction;
use App\Http\Resources\MessageResource;
use Illuminate\Http\Request;
use stdClass;

class ChatMessageController extends Controller
{

    /**
     * 渡されたグループ ID が紐ついているメッセージのみ取得
     *
     * @param Request $request->groupIds
     * @param FindAction $action
     * @return MessageResource
     */
    public function getMessagesByGroupIds(Request $request, FindAction $action): MessageResource
    {
        $group_ids = $request->groupIds;

        $resource = new stdClass();
        $resource->messages = $action->findMessageByGroupIds($group_ids);
        $resource->roles = $action->roleAll();
        $resource->role_user = $action->roleUserAll();

        return new MessageResource($resource);
    }

    /**
     * リクエストパラメーターをもとにメッセージを挿入する
     *
     * @param Request $request
     * @param StoreAction $action
     * @return void
     */
    public function insertChatMessage(Request $request, StoreAction $action):void
    {
        $user_id = $request->userId;
        $group_id = $request->groupId;
        $content = $request->content;
        $action->createMessage($user_id, $group_id, $content);
    }
}
