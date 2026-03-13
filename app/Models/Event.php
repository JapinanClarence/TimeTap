<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'title',
        'description',
        'location',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'area', // This will store our Polygon
        'organization_id',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, "organization_id");
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
    public function attendees()
    {
        // Allows you to get all users who attended this event directly
        return $this->belongsToMany(User::class, 'attendances');
    }
}
