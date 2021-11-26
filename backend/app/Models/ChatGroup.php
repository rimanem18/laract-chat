<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatGroup extends Model
{
    use HasFactory;
    protected $fillable = ['id','name'];

    /**
     * このグループに属する役割
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
