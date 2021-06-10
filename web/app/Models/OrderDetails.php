<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    protected $fillable = 
        [
            'order_id','name','quantity','role','ready','image','price'
        ];

    public function Order()
    {
            return $this->belongsTo('App\Order');
    }
}
