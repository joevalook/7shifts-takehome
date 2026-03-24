<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Model
{
    protected $table = 'staff'; // Here we are explicitly defining the table name, since Laravel would otherwise look for 'staffs'

    protected $fillable = [
        'name',
        'role',
        'phone',
    ];

    // Creating relationship to shifts: one staff member can have many shifts
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
}