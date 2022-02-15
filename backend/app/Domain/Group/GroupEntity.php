<?php

namespace App\Domain\Group;

use App\Models\ChatGroup as Group;

class GroupEntity
{
    private int $id;
    private string $name;

    public static function convertModelIntoEntity(Group $model): self
    {
        return (new static)
      ->setId($model->id)
      ->setName($model->name)
      ;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }
}
