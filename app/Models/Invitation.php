<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasUlids;

    protected $fillable = [
        'organization_id',
        'email',
        'token',
        'status',
    ];
}
