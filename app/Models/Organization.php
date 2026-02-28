<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Organization extends Model
{
    use HasUlids;
    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'org_profile'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class);
    }
    /**
     * The Events belonging to this organization.
     */
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
