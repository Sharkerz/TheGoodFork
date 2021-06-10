<?php

namespace App\Http\Controllers;

use App\Models\Stats;
use Illuminate\Http\Request;
use App\Models\menu_item;
use Carbon\Carbon;

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
        $today = Carbon::today();
        $stockname = collect([]);
        $stockNumber = collect([]);
        foreach($items as $item){
            $stockname->push($item->name);
            $stockNumber->push($item->stock);
            
        }

        $stats = Stats::all()->where('date','<', Carbon::parse($today)->format('Y-m-d'))->groupBy(['date']);
        $statDates = collect([]);
        $statFoods = collect([]);
        $statOrders = collect([]);
        $statDrinks = collect([]);
        $statPrice = collect([]);
        $foods = 0;
        $drinks = 0;
        $nbOrders = 0;
        foreach($stats as $stat){
             $date = date('d-M-Y', strtotime($stat[0]->date));
            $count =0;
            $foods = 0;
            $drinks = 0;
            $nbOrders = 0;
            $statDates->push($date);
            foreach($stat as $element){
                $foods += $element->foods; 
                $drinks += $element->drinks;
                $nbOrders += 1;
            }
            $statFoods->push($foods);
            $statDrinks->push($drinks);
            $statOrders->push($drinks);
            $count +=1;
            
        }
        //  return $statFoods;
        return view('Home',['stockLabels' => $stockname,'stockNumber'=> $stockNumber,'statDates' => $statDates,'statDrinks'=> $statDrinks,'statFoods'=> $statFoods,$statDrinks,'statOrders'=> $statOrders]);
    }
}
