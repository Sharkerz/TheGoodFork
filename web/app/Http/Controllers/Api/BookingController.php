<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Tables;
use Validator;

class BookingController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function createBooking(Request $request) {
        $userId = auth('api')->user()['id'];
        $user = User::find($userId);
        $users = User::all()->pluck('id');
        if ($user->role == 'waiters'){
            
            $validator = Validator::make($request->all(),[
                'date' => 'required|date_format:Y-m-d',
                'service' => 'required|string',
                'userName' => 'required|string',
                'hour' => 'required|date_format:H:i',
                'nbPersons' => 'required|integer'
            ]);
        }
        else{
            $validator = Validator::make($request->all(),
            ['date' => 'required|date_format:Y-m-d',
            'service' => 'required|string',
            'hour' => 'required|date_format:H:i',
            'nbPersons' => 'required|integer',
            ]);
        }
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->jsonSerialize(), 400
            );
        }
        $bookings = Booking::where('date', '=', $request['date'])
            ->where('service', '=',$request['service'])
            ->where('hour', '=', $request['hour'])
            ->pluck('tableId');
        $table = Tables::orderBy('NbPersons','ASC')
            ->whereNotIn('id',$bookings)
            ->where('NbPersons','>=',$request['nbPersons'])
            ->first();
        if($table == null){
            return response()->json([
                        'status' => 'failed',
                        'message' => 'Aucune table est disponbile pour votre créneau'
                    ]);
        }
        if($user->role == 'waiters'){
            $booking = array_merge(
                $validator->validated(),
                [
                    'tableId' => $table->id,
                ]);
        }else{
            $booking = array_merge(
                $validator->validated(),
                [
                    'tableId' => $table->id,
                    'userId' => $userId
                ]);
        }
        
        Booking::create($booking);
        return response()->json(['status' => 'sucess'],200);
        
    }
}
