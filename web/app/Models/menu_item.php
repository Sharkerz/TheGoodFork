<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class menu_item extends Model
{
    protected $fillable = 
        [
            'name','price','image','category_id','stock'
        ];
}
