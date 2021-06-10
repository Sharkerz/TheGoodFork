<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stats extends Model
{
    protected $fillable = 
        [
            'date','midi/soir','service','foods','drinks','price'
        ];

}