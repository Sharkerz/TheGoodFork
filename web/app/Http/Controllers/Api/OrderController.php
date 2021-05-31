<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\User;
use Validator;
use App\Models\menu_item;

class OrderController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    public function createOrder(Request $request) {
        $userId = auth('api')->user()['id'];
        $user = User::find($userId);
        $orderDetails =  $request['Value'];

        $NCommande = Order::pluck('N°Commande')->last();
        if ($NCommande == null){
            $NCommande =1;
        }else{
            $NCommande = $NCommande +1;
        }
        $validator = Validator::make($request->all(),
        [
            'N°Reservation' => 'nullable|int',
            'onSite' => 'required|boolean',
            'hour' => 'nullable|date_format:Y-m-d H:i',
            'Prix_Totale' => 'nullable|numeric|between:0,499.99'
        ]);
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->toJson(), 400
            );
        }
        
        $order = Order::create(array_merge(
            $validator->validated(),
            [
                'N°Commande' => $NCommande,
                'ready' => false,
                'userId' => $userId
            ]
        ));
        foreach( $orderDetails as $item){
           
            $menu_item = menu_item ::where('id', $item['id'])->first(); 
            $stock =(int) $menu_item->stock;
            if ($item['quantité'] > $stock){
                return Response()->json([
                    'error' => 'Il reste uniquement '.$stock . ' ' . $item['name'] . ' dans le stock'
                ], 401);
            }else{
                OrderDetails::create([
                    'order_id' => $order->id,
                    'name' => $item['name'],
                    'quantité' => $item['quantité'],
                    'ready' => 0,
                    'role' => 'barman'
                ]);
                menu_item ::where('id', $item['id'])->update(['Stock'=> $stock - $item['quantité']]);
            }
        }

        return response()->json(['status' => 'sucess'],200);
    }
}
