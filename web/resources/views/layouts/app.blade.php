<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/layout.js') }}"></script>
    @yield('scripts')

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/layout.css') }}" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    @yield('style')

<!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

</head>
<body>

<div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">@lang('sidebar.admin_panel') </div>
        <div class="list-group list-group-flush">
            <a href="{{url('home')}}" class="list-group-item list-group-item-action bg-light sidebar_link @if(Request::is('home*')) selected @endif">@lang('sidebar.home')</a>
            <a href="{{url('users')}}" class="list-group-item list-group-item-action bg-light sidebar_link @if(Request::is('users*')) selected @endif">@lang('sidebar.usersList')</a>
        </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <i id="menu-toggle" class="material-icons">menu</i>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <!-- Set language -->
                    <li class="nav-item dropdown language_select">
                        @if (App::getLocale() == 'fr')
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="flag-icon flag-icon-fr"> </span>
                                Français
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdown09">
                                <a class="dropdown-item" href="{{ route('language_route', 'en') }}">
                                    <span class="flag-icon flag-icon-gb"> </span>
                                    Anglais
                                </a>
                            </div>
                        @else
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="flag-icon flag-icon-gb"></span>
                                English
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdown09">
                                <a class="dropdown-item" href="{{ route('language_route', 'fr') }}">
                                    <span class="flag-icon flag-icon-fr"> </span>
                                    French
                                </a>
                            </div>
                        @endif
                    </li>
                    <li class="nav-item">
                        <form action="{{route('logout')}}" method="post">
                            @csrf
                            <input type="submit" class="nav-link" value="@lang('auth.Logout')">
                        </form>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="content_panel" class="container-fluid">
            @yield('content')
        </div>
    </div>

</div>
<!-- Menu Toggle Script -->

</body>
</html>
