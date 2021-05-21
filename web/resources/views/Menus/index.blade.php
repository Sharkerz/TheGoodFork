@extends('layouts.app')

<link href="{{ asset('css/menus.css') }}" rel="stylesheet">
@section('content')
<div class="content_panel">
        <div class="header_menu">
                <h1 class="Menu_Title">@lang('menus.menuHeader')</h1>
                <button id="AddMenuCategory" type="button" class="btn btn-success">@lang('menus.AddCategory')</button>
        </div>
        <div class="menu_categories" >
                @foreach($menu_categories as $menu_category)
                <div class="menu_category" id="{{ $menu_category->id }}">
                        <div class="category_header">
                                <h1 class="menu_category_name">{{ $menu_category->name }}</h1>
                                <!-- <i class="material-icons ">edit</i> -->
                                <input  hidden value="{{ $menu_category->name }}" name="{{ $menu_category->name }}">
                                <i class="material-icons remove_menu_category">remove_circle_outline</i>
                        </div>
                        <div class="category_items">
                                <i class="material-icons add_category_items">add</i>
                        </div>
                </div>

                @endforeach
        </div>
</div>
<div class="modal"  id="addModalMenuCategory"tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('menus.ModalTitleAdd')</h5>
                                <button type="button" class="close" id="closeAddModalMenuCategory" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form method="POST">
                                        @csrf
                                        <div class="form-group row ADDMenus">
                                        
                                        <label for="AddMenuCategoryName" class="col-md-4 col-form-label text-md-right">@lang('menus.categoryname')</label>

                                        <div class="col-md-6">
                                                <input id="AddMenuCategoryName" type="texte" class="form-control @error('AddMenuCategoryName') is-invalid @enderror"  name="AddMenuCategoryName" required >

                                                @error('AddMenuCategoryName')
                                                <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                        </div>
                                        <div class="col-md-6 offset-md-4">
                                                <button type="button" class="btn btn-primary butonAddMenuCategory">
                                                @lang('tables.Submit')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
        <div class="modal"  id="addModalCategoryItem"tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('menus.AddItemCategory')</h5>
                                <button type="button" class="close" id="closeAddModalCategoryItem" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form method="POST">
                                        @csrf
                                        <div class="form-group row ">
                                        
                                        <label for="AddCategoryItemName" class="col-md-4 col-form-label text-md-right">@lang('menus.itemname')</label>

                                        <div class="col-md-6">
                                                <input id="AddCategoryItemName" type="texte" class="form-control @error('AddCategoryItemName') is-invalid @enderror"  name="AddCategoryItemName" required >

                                                @error('AddCategoryItemName')
                                                <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                        </div>
                                        <div class="col-md-6 offset-md-4">
                                                <button type="button" class="btn btn-primary butonAddMenuCategory">
                                                @lang('tables.Submit')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
<script type="text/javascript" src="{{ URL::asset('js/menus.js') }}"></script>
@endsection
