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
        $drinks = 0;
        $food = 0;
        $userId = auth('api')->user()['id'];
        $user = User::find($userId);
        $orderDetails =  $request['Value'];

        $NCommande = Order::pluck('numOrder')->last();
        if ($NCommande == null){
            $NCommande =1;
        }else{
            $NCommande = $NCommande +1;
        }
        if ($user->role == 'waiters'){
            if($request->onSite == true){
                $validator = Validator::make($request->all(),
                [
                    'numOrder' => 'nullable|int',
                    'onSite' => 'required|boolean',
                    'hour' => 'nullable|date_format:Y-m-d H:i',
                    'prixTotal' => 'nullable|numeric|between:0,499.99',
                    'comment' => 'nullable|string',
                    'userName' => 'required|string',
                    'numBooking' => 'required|int'
                ]);
                
            }
            else{
                $validator = Validator::make($request->all(),
                [
                    'numOrder' => 'nullable|int',
                    'onSite' => 'required|boolean',
                    'hour' => 'nullable|date_format:Y-m-d H:i',
                    'prixTotal' => 'nullable|numeric|between:0,499.99',
                    'comment' => 'nullable|string',
                    'userName' => 'required|string',
                ]);   
            }
        }else{
            if($request->onSite == true){
                $validator = Validator::make($request->all(),
                [
                    'numOrder' => 'nullable|int',
                    'onSite' => 'required|boolean',
                    'hour' => 'nullable|date_format:Y-m-d H:i',
                    'prixTotal' => 'nullable|numeric|between:0,499.99',
                    'comment' => 'nullable|string',
                    'numBooking' => 'required|int'
                ]);
                
            }
            else{
                $validator = Validator::make($request->all(),
                [
                    'numOrder' => 'nullable|int',
                    'onSite' => 'required|boolean',
                    'hour' => 'nullable|date_format:Y-m-d H:i',
                    'prixTotal' => 'nullable|numeric|between:0,499.99',
                    'comment' => 'nullable|string',
                ]);   
            }
        }
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->toJson(), 400
            );
        }
        if ($user->role == 'waiters'){
            $order = Order::create(array_merge(
                $validator->validated(),
                [
                    'numOrder' => $NCommande,
                    'ready' => false,
                ]
            ));
        }else{
            $order = Order::create(array_merge(
                $validator->validated(),
                [
                    'numOrder' => $NCommande,
                    'ready' => false,
                    'userId' => $userId
                ]
            ));
        }

        foreach( $orderDetails as $item){
            $role = menu_category::where('id',$item['category_id'])->first();
            if($role->role == 'barman'){
                $drinks += 1 * $item['quantity'];
            }else{
                $food += 1 * $item['quantity'];
            }
            $menu_item = menu_item ::where('id', $item['id'])->first();
            $stock =(int) $menu_item->stock;
            if ($item['quantity'] > $stock){
                OrderDetails::where('order_id','=',$order->id)->delete();
                Order::find($order->id)->delete();
                return Response()->json(['status' => 'failed',
                    'message' => 'Il reste uniquement '.$stock . ' ' . $item['name'] . ' dans le stock'
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
        $fidelityPoints =  round($request['prixTotal']/10,0);
        if ($user->role != 'waiters'){
            User::where('id', '=',$userId)
                ->update([
                    'fidelity' => $user->fidelity  + $fidelityPoints,
                    'numbersVisit' => $user->numbersVisit  + 1,
                    'numbersCookOrder' => $user->numbersCookOrder  + $food,
                    'numbersBarOrder' => $user->numbersBarOrder  + $drinks
                ]);
            }

        return response()->json(['status' => 'success'],200);
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
            ],400);
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
            ],400);
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

    public function ordersForStaff() {
        $userId = auth('api')->user()['id'];
        $user = User::find($userId);
        $orders = Order::where('validated', '=',1)
            ->where('ready', '=', 0)
            ->get();
        if(!$orders->isEmpty()){
            foreach($orders as $key => $order){
                $orderdetails = OrderDetails::where('order_id', '=',$order->id)
                ->where('role', '=',$user->role)
                ->where('ready', '=',0)
                ->get();
                if($orderdetails->isEmpty()){
                    unset($orders[$key]);
                }
            }
        return response()->json([
            'status' => 'success',
            'orders' => $orders,
            'oderdetails' => $orderdetails
        ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'No order is waiting for you '
        ]);
    }
    public function itemsReady(Request $request) {
        $userId = auth('api')->user()['id'];
        $user = User::find($userId);
        OrderDetails::where('order_id', '=',$request->order_id)
            ->where('role', '=', $user->role)
            ->update(['ready' =>1]);
        $orderItems = OrderDetails::where('order_id', '=',$request->order_id)->pluck('ready');
        if (in_array(0,$orderItems->toArray())){
            return response()->json([
                'status' => 'success',
                'message' => 'The elements are ready',
            ]);
        }else{
            Order::where('id', '=',$request->order_id)->update(['ready' =>1]);
            return response()->json([
                'status' => 'success',
                'message' => 'The order is ready',
            ]);
        }



    }


}
