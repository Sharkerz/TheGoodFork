<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /****************
     *** Register ***
     ***************/
    public function register(Request $request) {
        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->toJson(), 400
            );
        }

        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'role' => 'customer'
            ]
        ));

        return response()->json([
            'message' => 'User creation success',
            'user' => $user
        ], 201);

    }

    /*****************
     ***** Login *****
     ***************
     */
    public function login(Request $request) {
        $validator = Validator::make($request->all(),
        [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if(! $token = auth('api')->attempt($validator->validated())) {
            return Response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
        return $this->createNewToken($token);
    }

    protected function createNewToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }

    public function refreshToken() {
        return $this->createNewToken(auth('api')->refresh());
    }

    public function getProfile() {
        return response()->json(auth('api')->user());
    }

    public function editProfile(Request $request) {
        $userId = auth('api')->user()['id'];
        $user = User::find($userId);

        $validator = Validator::make($request->all(),
            [
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users,email,' . $userId,
                'password' => 'string|confirmed|min:6',
            ]);
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->toJson(), 400
            );
        }

        $update = $user->update([
            'name' => $request['name'],
            'email' => $request['email']
        ]);
        if ($request['password']) {
            $update = $user->update([
                'password' => bcrypt($request['password']),
            ]);
        }

        if ($update) {
            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);
        }
        else {
            return response()->json([
                'status' => 'error'
            ]);
        }


    }

    public function logout() {
        auth('api')->logout();

        return response()->json(['message' => 'signed out']);
    }
}
