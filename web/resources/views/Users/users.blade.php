@extends('layouts.app')

@section('style')
    <link rel="StyleSheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" type="text/css"/>
@endsection

@section('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <script src="{{ asset('js/users/usersList.js') }}"></script>
@endsection

@section('content')
    <h1>@lang('usersList.title_usersList')</h1>

    <input type="hidden" id="language_selected" value="{{ Session::get('locale') }}">
    <table id="userTable" class="display">
        <thead>
            <th>@lang('usersList.username')</th>
            <th>email</th>
            <th>@lang('usersList.role')</th>
            <th>@lang('usersList.creation_date')</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach ($user_list as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->role }}</td>
                    <td>{{ $user->created_at->format('j F Y') }}</td>
                    <td class="form-inline">
                        <button style="margin-right: 5px" onclick="window.location='{{ url("users/$user->id/edit") }}'" class="btn btn-primary">@lang('usersList.edit')</button>

                        <form id="form_delete" method="post" action="{{ route('users.destroy', $user->id) }}">
                            {{ @csrf_field() }}
                            {!! method_field('DELETE') !!}
                            <button type="submit" class="btn btn-danger">@lang('usersList.delete')</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection