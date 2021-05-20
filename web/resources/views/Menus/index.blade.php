@extends('layouts.app')

<link href="{{ asset('css/menus.css') }}" rel="stylesheet">
@section('content')
<div class="menu">
        <div class="header_menu">
                <h1>@lang('menus.menuHeader')</h1>
        </div>
        <div class="menu_categories">
                @foreach($menu_categories as $menu_category)

                <div class="menu_category" id="{{ $menu_category->id }}">
                        <div class="menu_header">
                                <h1 class="menu_category_name">{{ $menu_category->name }}</h1>
                                <input  hidden value="{{ $menu_category->name }}" name="{{ $menu_category->name }}">
                        </div>
                </div>

                @endforeach
        </div>
</div>
@endsection
