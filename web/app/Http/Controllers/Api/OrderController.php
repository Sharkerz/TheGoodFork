<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\menu_category;
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

        $NCommande = Order::pluck('numOrder')->last();
        if ($NCommande == null){
            $NCommande =1;
        }else{
            $NCommande = $NCommande +1;
        }
        $validator = Validator::make($request->all(),
        [
            'numOrder' => 'nullable|int',
            'onSite' => 'required|boolean',
            'hour' => 'nullable|date_format:Y-m-d H:i',
            'prixTotal' => 'nullable|numeric|between:0,499.99',
            'comment' => 'nullable|string'
        ]);
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->toJson(), 400
            );
        }
        
        $order = Order::create(array_merge(
            $validator->validated(),
            [
                'numOrder' => $NCommande,
                'ready' => false,
                'userId' => $userId
            ]
        ));
        foreach( $orderDetails as $item){
            $role = menu_category::where('id',$item['category_id'])->first();
            $menu_item = menu_item ::where('id', $item['id'])->first(); 
            $stock =(int) $menu_item->stock;
            if ($item['quantity'] > $stock){
                OrderDetails::where('order_id','=',$order->id)->delete();
                Order::find($order->id)->delete();
                return Response()->json([
                    'error' => 'Il reste uniquement '.$stock . ' ' . $item['name'] . ' dans le stock'
                ], 401);
            }else{
                OrderDetails::create([
                    'order_id' => $order->id,
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'ready' => 0,
                    'image' =>$item['image'],
                    'role' => $role->role
                ]);
                menu_item ::where('id', $item['id'])->update(['Stock'=> $stock - $item['quantity']]);
            }
        }

        return response()->json(['status' => 'sucess'],200);
    }

    public function orderToValidate() {
        $ordertovalidate = Order::where('validated', '=', 0)->get();
        if(count($ordertovalidate) >0){
            return response()->json([
                'status' => 'success',
                'ordertovalidate' => $ordertovalidate
            ]);
        }else{
            return response()->json([
                'status' => 'failed',
                'message' => 'No order to validate or error'
            ]);
        }
    }
    public function orderDetails($id) {
        $orderDetails = OrderDetails::where('order_id', '=', $id)->get();
        
        if(count($orderDetails) >0){
            return response()->json([
                'status' => 'success',
                'orderDetails' => $orderDetails
            ]);
        }else{
            return response()->json([
                'status' => 'failed',
                'message' => 'No Details for this order'
            ]);
        }
    }
    
    public function validateOrders(Request $request) {
        Order::where('id', '=', $request['id'])
            ->update(['validated' => 1]);
        return response()->json([
            'status' => 'success',
            'orderValidated' => 'Commande validée'
        ]);
    }
}
