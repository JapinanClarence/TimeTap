<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserOrganization extends Pivot
{
    //
     use HasUlids;

    protected $table = 'user_organizations';
    public $incrementing = false;
}
