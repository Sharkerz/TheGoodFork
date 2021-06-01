<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = 
        [
            'tableId','userId','userName','date','hour','Service','nbPersons'
        ];

    public function Tables()
    {
            return $this->hasOne('App\Tables');
    }
}
