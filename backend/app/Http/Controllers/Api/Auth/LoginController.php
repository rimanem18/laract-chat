<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use \Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function login(Request $request)
    {
        // バリデーション
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // バリデーションが通ったらログイン処理
        if (Auth::attempt($credentials)) {
            $user = User::whereEmail($request->email)->first();

            // トークンを一旦削除し、再度作成
            // トークンは personal_access_tokensテーブルに作成される
            $user->tokens()->delete();
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;

            // トークンを 200 レスポンスで返す
            return response()->json([
              'token' => $token
            ], Response::HTTP_OK);
        }

        // ログイン出来ない場合は 500 エラー
        return response()->json('User Not Found.', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $result = true;
        $status = 200;
        $message = 'ログアウトしました';
        return response()->json([
        'result'=> $result,
        'status'=> $status,
        'message'=> $message
      ]);
    }
}
