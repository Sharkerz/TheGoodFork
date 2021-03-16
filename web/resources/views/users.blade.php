@extends('layouts.app')

@section('style')
    <link rel="StyleSheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" type="text/css"/>
@endsection

@section('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <script src="{{ asset('js/usersList.js') }}"></script>
@endsection

@section('content')
    <h1>@lang('usersList.title_usersList')</h1>

    <table id="userTable" class="display">
        <thead>
            <th>@lang('usersList.username')</th>
            <th>email</th>
            <th>@lang('usersList.role')</th>
            <th>@lang('usersList.creation_date')</th>
        </thead>
        <tbody>
            @foreach ($user_list as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>
                        <form>
                            @csrf
                            <input class="id_user" type="hidden" value="{{ $user->id }}">
                            <select class="select_role" name="role">
                                <option>admin</option>
                                <option>role1</option>
                                <option>role2</option>
                                <option>role3</option>
                            </select>
                        </form>
                    </td>
                    <td>{{ $user->created_at->format('j F Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
