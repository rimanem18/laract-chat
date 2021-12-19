<?php

use App\Models\Chat_message;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\ChatGroupController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RoleUserController;
use App\Http\Controllers\RoleGroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/**
 * 認証されていないとアクセスできないルートにしたい場合、
 * Route::middeleware('auth::sanctum') で始める
 * Route::middeleware('auth::sanctum')->group を使うと
 * 複数のルートをグループ化して定義できる
 */
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
    return ['token'=>$token->plainTextToken];
});

// 登録やログイン、ログアウト
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LoginController::class, 'logout']);

// メッセージ取得、投稿
Route::get('/chat_messages', [ChatMessageController::class, 'selectChatMessages']);
Route::middleware('auth:sanctum')->post('/chat_messages/by_group_ids', [ChatMessageController::class, 'getMessagesByGroupIds']);
Route::middleware('auth:sanctum')->post('/chat_messages/post', [ChatMessageController::class, 'insertChatMessage']);

// グループ取得、追加、編集、削除
Route::get('/chat_groups', [ChatGroupController::class, 'selectChatGroups']);
Route::middleware('auth:sanctum')->post('/chat_groups/create', [ChatGroupController::class, 'insertChatGroup']);
Route::middleware('auth:sanctum')->post('/chat_groups/edit', [ChatGroupController::class, 'updateChatGroup']);
Route::middleware('auth:sanctum')->post('/chat_groups/delete', [ChatGroupController::class, 'deleteChatGroup']);

// ロールの取得
Route::get('/roles', [RoleController::class, 'selectRoles']);
Route::middleware('auth:sanctum')->post('/roles/by_id', [RoleController::class, 'selectRolesById']);

// ロールの関連を取得
Route::get('/role_user', [RoleUserController::class, 'selectRoleUser']);
Route::get('/role_group', [RoleGroupController::class, 'selectRoleGroup']);

Route::middleware('auth:sanctum')->post('/chat_groups/by_role_ids', [ChatGroupController::class, 'selectChatGroupsByRoleIds']);
