@extends('layouts.app')

@section('style')

@endsection

@section('scripts')
    <script src="{{ asset('js/users/userEdit.js') }}"></script>
@endsection

@section('content')
    <div class="container">
        <form id="form_edit" method="post" action="{{ route('users.store') }}">
            {{ @csrf_field() }}
            <input type="hidden">
            <div class="mb-3 form-group">
                <label for="field_username">@lang('userEdit.username')</label>
                <input name="name" type="text" class="form-control" id="field_username">
            </div>
            <div class="mb-3 form-group">
                <label for="field_email">Email</label>
                <input name="email" type="text" class="form-control" id="field_email">
            </div>
            <div class="mb-3 form-group">
                <label for="select_role">Role</label>
                <select name="role" type="text" class="form-control" id="select_role">
                    @foreach($roles as $role)
                        <option @if ($role == 'customer')selected @endif value={{$role}}>@lang('userEdit.' . $role)</option>
                    @endforeach
                </select>
            </div>

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

        @if (session()->has('success'))
            <div class="alert-success text-center">
                @lang('userEdit.success_alert')
            </div>
        @endif

        <br/>
            <div class="text-center">
                <button id="submit_edit" class="btn btn-success" type="submit">@lang('userCreate.btn_save')</button>
                <button onclick="window.location='{{ url("users") }}'" class="btn btn-primary" type="button">@lang('userEdit.btn_back')</button>
            </div>
        </form>
    </div>
@endsection
