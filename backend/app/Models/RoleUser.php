<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','role_id'];

    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'role_user';

    /**
     * この役割に属するユーザー
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
