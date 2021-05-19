<?php

namespace App\Http\Controllers;

use App\Mail\UserGenerated;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Config;
use Mail;

class UsersController extends Controller
{
    public function index()
    {
        $user_list = User::all();
        return view('Users.users', ['user_list' => $user_list]);
    }

    public function edit($id)
    {
        $roles = Config::get('users.roles');
        $user = User::find($id);
        if ($user != null) {
            return view('Users.user_edit', ['user' => $user, 'roles' => $roles]);
        }
        else {
            return Redirect::route('users.index');
        }
    }

    public function update (Request $request, $id)
    {
        $roles = Config::get('users.roles');
        $fields = $request->validate([
            'name' => 'required',
            'email' => "required|email|unique:users,email,$id,id",
            'role' => 'required', Rule::in($roles)
        ]);
        $updated = User::where('id', $id)
            ->update($fields);

        if ($updated) {
            return Redirect::route('users.edit', $id)->with('success', 'worked');
        }

        return Redirect::route('users.edit', $id);
    }

    public function create (Request $request)
    {
        $roles = Config::get('users.roles');
        return view('Users.add', ['roles' => $roles]);
    }

    public function store (Request $request)
    {
        $roles = Config::get('users.roles');
        $fields = $request->validate([
            'name' => 'required',
            'email' => "required|email|unique:users,email",
            'role' => 'required', Rule::in($roles)
        ]);

        // Password generation
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        $password =  substr(str_shuffle($permitted_chars), 0, 12);

        // Send Email with the password generated
        $data = array('password' => $password);
        Mail::to($request->input('email'))->send(new UserGenerated($data));

        $user = User::create(array_merge(
            [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($password),
                'role' => $request->input('role')
            ]
        ));

        if ($user) {
            return Redirect::route('users.index')->with('success', 'worked');
        }

        return Redirect::route('users.index');
    }

    public function destroy (Request $request, $id)
    {
        User::destroy($id);

        return Redirect::route('users.index');
    }
}
