@extends('layouts.app')

@section('style')
    <link rel="StyleSheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" type="text/css"/>
    <link href="{{ asset('css/menus.css') }}" rel="stylesheet">
@endsection

@section('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="{{ URL::asset('js/menus.js') }}"></script>
@endsection

@section('content')
<h1>@lang('menus.menuHeader')</h1>
    <button class="btn btn-success float-right" id="AddMenuCategory">@lang('menus.AddCategory')</button><br/><br/>

    @if (session()->has('success'))
        <div class="alert-success text-center">
            @lang('usersList.success_alert')
        </div>
    @endif

    <input type="hidden" id="language_selected" name="language" value="{{ Session::get('locale') }}">
    <table id="GestionduMenu" class="display">
        <thead>
        <tr>
            <th>@lang('menus.categoryname')</th>
            <th>@lang('menus.image')</th>
            <th>@lang('menus.type')</th>
            <th>actions</th>
        </tr>
        </thead>
        <tbody>
        @foreach($menu_categories as $category)
                <tr class="RowMenuCategory" id="{{ $category->id }}">
                    <td class="CategoryName">{{ $category->name }}</td>
                    <td><img  alt="ItemImage" src="/Images/MenuCategory/{{ $category->image }}"></td>
                    <td>{{ $category->role }}</td>
                    <td class="ActionCase">
                        <a href="{{ route('menus.show', $category->id) }}" type="button" class="btn btn-success Button SelectCategory" >
                                @lang('menus.Elements')
                        </a>

                        <button type="button" class="btn btn-primary Button EditButon" >
                                @lang('menus.Edit')
                        </button>

                        <button type="button" class="btn btn-danger  Button butonDelete" >
                                @lang('menus.Delete')
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
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
                                <form id="FormAddCategoryMenu" method="POST">
                                        @csrf
                                        <div class="form-group row ADDMenus">
                                        
                                        <label for="AddMenuCategoryName" class="col-md-4 col-form-label text-md-right">@lang('menus.categoryname')</label>

                                        <div class="col-md-6">
                                                <input id="AddMenuCategoryName" type="texte" class="form-control @error('AddMenuCategoryName') is-invalid @enderror"  name="name" required >
                                        </div>
                                        <label for="AddCategoryImage" class="col-md-4 col-form-label text-md-right">@lang('menus.itemimage')</label>
                                        <div class="col-md-6">
                                                <input id="AddCategoryImage"  type="file" step="any" class=" @error('AddCategoryImage') is-invalid @enderror"  name="image" required >
                                        </div>
                                        <label for="AddMenuCategoryRole" class="col-md-4 col-form-label text-md-right">@lang('menus.role')</label>
                                        <div class="col-md-6">
                                        <select name="role" type="text" class="form-control" id="AddMenuCategoryRole" required>
                                                <option value="barman">@lang('userEdit.barman')</option>
                                                <option value="cook">@lang('userEdit.cook')</option>
                                        </select>
                                        </div>
                                        <div class="col-md-6 offset-md-4">
                                                <button type="submit" class="btn btn-primary butonAddMenuCategory">
                                                @lang('tables.Submit')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
        <div class="modal"  id="EditModalCategory" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('menus.EditCategory')</h5>
                                <button type="button" class="close" id="closeEditModalCategory" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form id="FormEditCategory"  enctype="multipart/form-data">
                                {{ csrf_field() }}
                                        <div class="form-group row ">
                                        <input id="EditCategoryid"  hidden type="number" step="any"   name="id" required >
                                        <label for="EditCategoryItem" class="col-md-4 col-form-label text-md-right">@lang('menus.itemname')</label>

                                        <div class="col-md-6">
                                                <input id="EditCategoryName" type="texte" class="form-control @error('EditCategoryItem') is-invalid @enderror"  name="name" required >
                                        </div>

                                        <label for="EditCategoryImage" class="col-md-4 col-form-label text-md-right">@lang('menus.itemimage')</label>
                                        <div class="col-md-6">
                                                <input id="EditCategoryImage"  type="file" step="any" class=" @error('EditCategoryImage') is-invalid @enderror"  name="image" >
                                        </div>
                                        <label for="EditMenuCategoryRole" class="col-md-4 col-form-label text-md-right">@lang('menus.role')</label>
                                        <div class="col-md-6">
                                        <select name="role" type="text" class="form-control" id="EditMenuCategoryRole" required>
                                                <option value="barman">@lang('userEdit.barman')</option>
                                                <option value="cook">@lang('userEdit.cook')</option>
                                        </select>
                                        </div>
                                        <div class="col-md-6 offset-md-4">
                                                <button type="submit" class="btn btn-primary butonEditCategory">
                                                @lang('menus.Submit')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
@endsection
