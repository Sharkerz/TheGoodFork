<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        $user_list = User::all();
        return view('users', ['user_list' => $user_list]);
    }

    public function updateUserRole(Request $request)
    {
        $role = $request->role;
        $user_id = $request->user_id;
        $user = User::find($user_id);
        $test = "let's update the role " . $role . " for the user " . $user->name ;
        return ['test' => $test];
    }
}
