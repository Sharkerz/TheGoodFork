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
            'email' => "required|email|unique:users,email,$id,id",
            'role' => 'required', Rule::in(['admin', 'customer'])
        ]);
        $updated = User::where('id', $id)
            ->update($fields);

        if ($updated) {
            return Redirect::route('users.edit', $id)->with('success', 'It works!');;
        }

        return Redirect::route('users.edit', $id);
    }

    public function destroy (Request $request, $id)
    {
        User::destroy($id);

        return Redirect::route('users.index');
    }
}
