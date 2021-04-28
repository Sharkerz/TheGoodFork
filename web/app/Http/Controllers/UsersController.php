<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function index()
    {
        $user_list = User::all();
        return view('Users.users', ['user_list' => $user_list]);
    }

    public function edit($id)
    {
        $user = User::find($id);
        if ($user != null) {
            return view('Users.user_edit', ['user' => $user]);
        }
        else {
            return Redirect::route('users.index');
        }
    }

    public function update (Request $request, $id)
    {
        $fields = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users', Rule::in(['admin', 'customer']),
            'role' => 'required'
        ]);
        User::where('id', $id)
            ->update($fields);

        return Redirect::route('users.edit', $id);
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
