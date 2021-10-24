<?php

use App\Models\Chat_message;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\ChatGroupController;
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
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LoginController::class, 'logout']);

Route::get('/chat_messages', [ChatMessageController::class, 'selectChatMessages']);
Route::middleware('auth:sanctum')->post('/chat_messages/post', [ChatMessageController::class, 'insertChatMessage']);

Route::get('/chat_groups', [ChatGroupController::class, 'selectChatGroups']);
