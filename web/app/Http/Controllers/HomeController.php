<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\menu_item;
use App\Models\Order;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $items = menu_item::all();
        
        $stock = collect([]);
        foreach($items as $item){
            $stock->put($item->name, $item->stock);
        }
        $stats = Order::all()->groupBy('hour');

        return $stats;
        return view('Home',['stock' => $stock]);
    }
}
