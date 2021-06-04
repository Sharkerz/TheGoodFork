@extends('layouts.app')

@section('style')
    <link href="{{ asset('css/menus.css') }}" rel="stylesheet">
@endsection

@section('scripts')
    <script type="text/javascript" src="{{ URL::asset('js/menusitem.js') }}"></script>
@endsection

@section('content')
<h1 class="showTitle">{{$category->name}}</h1>
<input id="Category_id" hidden value="{{$category->id}}"/> 
    <!-- <button class="btn btn-success float-right" id="AddItemCategory">@lang('menus.AddItemCategory'){{$category->name}}</button><br/><br/> -->

    @if (session()->has('success'))
        <div class="alert-success text-center">
            @lang('usersList.success_alert')
        </div>
    @endif
    <input type="hidden" id="language_selected" name="language" value="{{ Session::get('locale') }}">
        <div class="row MenuItemsGallery">
                @foreach($menu_items as $item)
                <div class="column" id="{{ $item->id }}">
                        <div class="card">
                                <img  alt="ItemImage" src="/Images/MenuItem/{{ $item->image }}">
                                <div class="cardinfo">
                                        <h3 class="CardTitle"><b>{{$item->name}}</b></h3> 
                                        <p id="{{number_format($item->price, 2)}}">@lang('menus.price') {{number_format($item->price, 2)}} €</p> 
                                        <p id="stock{{ $item->stock }}" value="{{ $item->stock }}">@lang('menus.stock') {{ $item->stock }} </p> 
                                        <p class="ItemDescription" >@lang('menus.itemDescription'){{ $item->description }}</p>
                                </div class="cardinfo">
                                <div class="cardAction">   
                                        <button type="button" class="btn btn-primary Button EditButton">
                                                @lang('menus.Edit')
                                        </button>
                                        <button type="button" class="btn btn-danger  Button DeleteButton" >
                                                @lang('menus.Delete')
                                        </button>
                                </div>
                        </div>
                </div>       
               @endforeach
               <div class="AddElement" id="AddDiv">
                        <div class="card CardAdd">
                                <div class="IconsAdd">
                                        <i id="AddItemCategory" class="material-icons large AddItemCategory">add</i>
                                </div>
                        </div>
                </div>       
        </div>
        </div>
        <div class="modal"  id="addModalCategoryItem" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('menus.AddItemCategory')</h5>
                                <button type="button" class="close" id="closeAddModalCategoryItem" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form  id="FormAdditemcategory"  enctype="multipart/form-data">
                                {{ csrf_field() }}
                                        <div class="form-group row ">
                                        <input id="AddCategoryItemCategory_Id"  hidden type="number" step="any"   name="category_id" required >
                                        <label for="AddCategoryItemName" class="col-md-4 col-form-label text-md-right">@lang('menus.itemname')</label>

                                        <div class="col-md-6">
                                                <input id="AddCategoryItemName" type="texte" class="form-control @error('AddCategoryItemName') is-invalid @enderror"  name="name" required >
                                        </div>

                                        <label for="AddCategoryItemPrice" class="col-md-4 col-form-label text-md-right">@lang('menus.itemprice')</label>
                                        <div class="col-md-6">
                                                <input id="AddCategoryItemPrice"  type="number" step="any" class="form-control @error('AddCategoryItemPrice') is-invalid @enderror"  name="price" required >
                                        </div>
                              
                                        <label for="AddCategoryItemStock" class="col-md-4 col-form-label text-md-right">@lang('menus.itemstock')</label>
                                        <div class="col-md-6">
                                                <input id="AddCategoryItemStock"  type="number" step="any" class="form-control @error('AddCategoryItemStock') is-invalid @enderror"  name="stock" required >
                                        </div>
                                        <label for="AddCategoryItemDescription" class="col-md-4 col-form-label text-md-right">@lang('menus.itemDescription')</label>
                                        <div class="col-md-6">
                                                <textarea id="AddCategoryItemDescription"  type="texte" step="any" class="form-control @error('AddCategoryItemDescription') is-invalid @enderror"  name="description" required ></textarea>
                                        </div>
                                        <label for="ItemImage" class="col-md-4 col-form-label text-md-right">@lang('menus.itemimage')</label>
                                        <div class="col-md-6">
                                                <input id="ItemImage"  type="file" step="any" class=" @error('ItemImage') is-invalid @enderror"  name="image" required >
                                        </div>
                                        
                                        <div class="col-md-6 offset-md-4">
                                                <button type="submit" class="btn btn-primary butonAddCategoryItem">
                                                @lang('menus.Submit')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
        <div class="modal"  id="EditModalCategoryItem" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('menus.EditItemCategory')</h5>
                                <button type="button" class="close" id="closeEditModalCategoryItem" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form id="FormEdititemcategory"  enctype="multipart/form-data">
                                {{ csrf_field() }}
                                        <div class="form-group row ">
                                        <input id="EditCategoryItemId"  hidden type="number" step="any"   name="id" required >
                                        <label for="EditCategoryItemName" class="col-md-4 col-form-label text-md-right">@lang('menus.itemname')</label>

                                        <div class="col-md-6">
                                                <input id="EditCategoryItemName" type="texte" class="form-control @error('EditCategoryItemName') is-invalid @enderror"  name="name" required >
                                        </div>

                                        <label for="EditCategoryItemPrice" class="col-md-4 col-form-label text-md-right">@lang('menus.itemprice')</label>
                                        <div class="col-md-6">
                                                <input id="EditCategoryItemPrice"  type="number" step="any" class="form-control @error('EditCategoryItemPrice') is-invalid @enderror"  name="price" required >
                                        </div>
                              
                                        <label for="EditCategoryItemStock" class="col-md-4 col-form-label text-md-right">@lang('menus.itemstock')</label>
                                        <div class="col-md-6">
                                                <input id="EditCategoryItemStock"  type="number" step="any" class="form-control @error('EditCategoryItemStock') is-invalid @enderror"  name="stock" required >
                                        </div>

                                        <label for="EditCategoryItemDescription" class="col-md-4 col-form-label text-md-right">@lang('menus.itemDescription')</label>
                                        <div class="col-md-6">
                                                <textarea id="EditCategoryItemDescription"  type="texte" step="any" class="form-control @error('EditCategoryItemDescription') is-invalid @enderror"  name="description" required ></textarea>
                                        </div>

                                        <label for="EditItemImage" class="col-md-4 col-form-label text-md-right">@lang('menus.itemimage')</label>
                                        <div class="col-md-6">
                                                <input id="EditItemImage"  type="file" step="any" class=" @error('EditItemImage') is-invalid @enderror"  name="image" >
                                        </div>
                                        
                                        <div class="col-md-6 offset-md-4">
                                                <button type="submit" class="btn btn-primary butonEditCategoryItem">
                                                @lang('menus.Update')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
@endsection
