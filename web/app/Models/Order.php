<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = 
        [
            'N°Commande','N°Reservation','Prix_Totale','userId','onSite','hour','ready','comment','validated'
        ];
}
