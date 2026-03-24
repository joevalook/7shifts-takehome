<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shift extends Model
{
    protected $fillable = [
        'day',
        'start_time',
        'end_time',
        'role',
        'staff_id',
    ];

    // Each shift belongs to a single staff member (optional)
     
    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}