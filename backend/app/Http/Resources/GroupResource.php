<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $public_groups = $this->resource->public_groups;
        $private_groups = $this->resource->private_groups;

        return [
          "public_groups"=>$this->resource->public_groups,
          "private_groups"=>$this->resource->private_groups,
          "role_group"=>$this->resource->role_group
        ];
    }
}
