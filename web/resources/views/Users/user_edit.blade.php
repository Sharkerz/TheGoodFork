@extends('layouts.app')

@section('style')

@endsection

@section('scripts')

@endsection

@section('content')
    <div class="container">
        <form method="post" action="{{ route('users.update', $user->id) }}">
            {{ @csrf_field() }}
            {!! method_field('PUT') !!}
            <input type="hidden" value="{{ $user->id }}">
            <div class="mb-3 form-group">
                <label for="field_username">Username</label>
                <input name="name" type="text" class="form-control" id="field_username" value="{{ $user->name }}">
            </div>
            <div class="mb-3 form-group">
                <label for="field_email">Email</label>
                <input name="email" type="text" class="form-control" id="field_email" value="{{ $user->email }}">
            </div>
            <div class="mb-3 form-group">
                <label for="select_role">Role</label>
                <select name="role" type="text" class="form-control" id="select_role" value="{{ $user->role }}">
                    <option value="admin">admin</option>
                    <option value="customer">customer</option>
                </select>
            </div>

            <div class="text-center">
                <button class="btn btn-success" type="submit">Enregistrer</button>
                <button class="btn btn-danger" type="button">Supprimer le compte</button>
                <button onclick="window.location='{{ url("users") }}'" class="btn btn-primary" type="button">Retour</button>
            </div>
        </form>
    </div>
@endsection
