<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleGroup extends Model
{
    use HasFactory;
    protected $fillable = ['group_id','role_id'];

    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'role_group';

    /**
     * この役割に属するグループ
     */
    public function groups()
    {
        return $this->belongsToMany(ChatGroup::class);
    }
}
