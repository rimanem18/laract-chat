<?php

use App\Models\Chat_message;
use App\Http\Controllers\Api\Auth\LoginController;
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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
    return ['token'=>$token->plainTextToken];
});

Route::get('/chat_messages', function (Request $request) {
    $chat_messages = Chat_message::all();
    return response()->json(['chat_messages'=>$chat_messages]);
});
Route::post('/login', function (Request $request) {
    $login = new LoginController();
    return $login->login($request);
});
Route::get('/logout', function (Request $request) {
    $login = new LoginController();
    return $login->logout($request);
});
