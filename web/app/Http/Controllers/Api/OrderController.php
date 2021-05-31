<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\User;
use Validator;
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
            return $item->name;
            OrderDetails::create([
                'order_id' => $order->id,
                'name' => $item->name,
            ]);
        }

        return response()->json(['userId' => $validator->validated()]);
        // $menu_categories = menu_category::all();
        // if($menu_categories){
        //     return response()->json([
        //         'status' => 'success',
        //         'categories' => $menu_categories
        //     ]);
        // }
        
    }
}
