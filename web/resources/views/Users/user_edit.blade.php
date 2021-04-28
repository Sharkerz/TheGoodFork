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
                <label for="field_username">@lang('userEdit.username')</label>
                <input name="name" type="text" class="form-control" id="field_username" value="{{ $user->name }}">
            </div>
            <div class="mb-3 form-group">
                <label for="field_email">Email</label>
                <input name="email" type="text" class="form-control" id="field_email" value="{{ $user->email }}">
            </div>
            <div class="mb-3 form-group">
                <label for="select_role">Role</label>
                <select name="role" type="text" class="form-control" id="select_role">
                    <option @if ($user->role == 'admin')selected @endif value="admin">@lang('userEdit.administrator')</option>
                    <option @if ($user->role == 'customer')selected @endif value="customer">@lang('userEdit.customer')</option>
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

        @if (session()->has('success'))
            <div class="alert-success text-center">
                @lang('userEdit.success_alert')
            </div>
        @endif

        <form id="form_delete" method="post" action="{{ route('users.destroy', $user->id) }}">
            {{ @csrf_field() }}
            {!! method_field('DELETE') !!}
        </form>

        <br/>
            <div class="text-center">
                <button id="submit_edit" class="btn btn-success" type="button">@lang('userEdit.btn_save')</button>
                <button id="submit_delete" class="btn btn-danger" type="button">@lang('userEdit.btn_delete')</button>
                <button onclick="window.location='{{ url("users") }}'" class="btn btn-primary" type="button">@lang('userEdit.btn_back')</button>
            </div>
    </div>
@endsection
