<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Symfony\Component\HttpFoundation\Response;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // バリデーション
        /** @var Illuminate\Validation\Validator $validator */
        $validator = Validator::make($request->all(), [
          'name' => 'required',
          'email' => 'required|email',
          'password' => 'required'
      ]);

        // バリデーションが通らなかったら 422 レスポンス
        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // すでに登録されていないか探す
        $count = User::select('email')->where('email', $request->email)->count();
        if ($count != 0) {
            return response()->json([
              "message"=>"すでに登録されているメールアドレスです。",
              "data"=> $count
            ], Response::HTTP_CONFLICT);
        }

        // ユーザ作成
        User::create([
          'name' =>  $request->name,
          'email' => $request->email,
          'password' => Hash::make($request->password),
      ]);

        return response()->json([
          "message"=> "ユーザ登録に成功しました。"
        ], Response::HTTP_OK);
    }
}
