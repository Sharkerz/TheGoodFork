<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = 
        [
            'numOrder','numBooking','prixTotal','userId','onSite','hour','ready','comment','validated'
        ];
}
