@extends('layouts.app')

@section('style')

@endsection

@section('scripts')
    <script src="{{ asset('js/users/userEdit.js') }}"></script>
@endsection

@section('content')
    <div class="container">
        <form id="form_edit" method="post" action="{{ route('users.update', $user->id) }}">
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
                <select name="role" type="text" class="form-control" id="select_role">
                    <option @if ($user->role == 'admin')selected @endif value="admin">admin</option>
                    <option @if ($user->role == 'customer')selected @endif value="customer">customer</option>
                </select>
            </div>
        </form>

        {{-- Display errors --}}
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <br/>
            <div class="text-center">
                <button id="submit_edit" class="btn btn-success" type="button">Enregistrer</button>
                <button id="submit_delete" class="btn btn-danger" type="button">Supprimer le compte</button>
                <button onclick="window.location='{{ url("users") }}'" class="btn btn-primary" type="button">Retour</button>
            </div>
    </div>
@endsection
