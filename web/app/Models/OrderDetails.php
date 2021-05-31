<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    protected $fillable = 
        [
            'order_id','name','quantité','role','ready'
        ];

    public function Order()
    {
            return $this->belongsTo('App\Order');
    }
}
