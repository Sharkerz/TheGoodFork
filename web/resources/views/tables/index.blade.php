@extends('layouts.app')

<link href="{{ asset('css/tables.css') }}" rel="stylesheet">
@section('content')
<div class="tab-content">
        
                <div class="tab-pane fade show active" id="public" role="tabpanel" aria-labelledby="public">
                        <div id="header_list">
                                <h1 class="header_title">@lang('tables.Title')</h1>
                                <button id="Create_Tables" type="button" class="btn btn-success">@lang('tables.Add')</button>
                                <hr>  
                        </div>
                        <div class="tableList">
                        @foreach($tables as $table)

                                <div class="tables" id="{{ $table->id }}">
                                        <div class="card-body">
                                                <h6 class="titre_tables">@lang('tables.TableN°') {{ $table->TableN }} </h6>
                                                <input  class="TableN" hidden value="{{ $table->TableN }}" name=ValueTableN>
                                                <input  class="ValueNBPersons"  hidden value="{{ $table->NbPersons }}" name=ValueNBPersons>
                                        </div>
                                        <div>
                                                <h4 class="NbPersonTables">{{ $table->NbPersons }}
                                        </div>
                                </div>

                        @endforeach
                        </div>
                </div>
        
        <div class="modal"  id="addModal"tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('tables.ModalTitleAdd')</h5>
                                <button type="button" class="close" id="closeAddModal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form method="POST">
                                        @csrf

                                        <div class="form-group row ">
                                        <label for="tableNumberAdd" class="col-md-4 col-form-label text-md-right">@lang('tables.FormTableN°')</label>

                                        <div class="col-md-6">
                                                <input id="tableNumberAdd" type="number" class="form-control @error('tableNumber') is-invalid @enderror" name="tableNumberAdd" value="{{ old('tableNumberAdd') }}"  required autocomplete="tableNumberAdd" autofocus>

                                                @error('tableNumber')
                                                <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                        </div>
                                        </div>

                                        <div class="form-group row">
                                        
                                        <label for="NbPersonAdd" class="col-md-4 col-form-label text-md-right">@lang('tables.FormNbPersons')</label>

                                        <div class="col-md-6">
                                                <input id="NbPersonAdd" type="number" class="form-control @error('NbPerson') is-invalid @enderror" min=0 max=10 name="NbPerson" required >

                                                @error('NbPerson')
                                                <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                        </div>
                                        <div class="col-md-6 offset-md-4">
                                                <button type="button" class="btn btn-primary butonAddTable">
                                                @lang('tables.Submit')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>

        <div class="modal" id="editModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title">@lang('tables.ModalTitleEdit')</h5>
                                <button type="button" class="close" id="closeEditModal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                                <form method="POST">       
                                <meta name="csrf-token" content="{{ csrf_token() }}" />
                                {!! method_field('PUT') !!}
                                        <input hidden id="idEdit" value=""/>
                                        <div class="form-group row ">
                                        <label for="tableNumberEdit" class="col-md-4 col-form-label text-md-right">@lang('tables.FormTableN°')</label>

                                        <div class="col-md-6">
                                                <input id="tableNumberEdit" type="number" class="form-control @error('tableNumber') is-invalid @enderror" min=0 max=10 name="tableNumberEdit" value="" readonly   autofocus>

                                                @error('tableNumber')
                                                <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                        </div>
                                        </div>
                                        <div class="form-group row">
                                        
                                        <label for="NbPersonEdit" class="col-md-4 col-form-label text-md-right">@lang('tables.FormNbPersons')</label>

                                        <div class="col-md-6">
                                                <input id="NbPersonEdit" type="number" class="form-control @error('NbPersonEdit') is-invalid @enderror" name="NbPersonEdit" required  value="" autofocus>

                                                @error('NbPerson')
                                                <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                </span>
                                                @enderror
                                        </div>
                                        <div class="buttondiv">
                                                <button type="button" class="btn btn-primary butonEditTable" >
                                                @lang('tables.Update')
                                                </button>
                                                <button type="button" class="btn btn-primary butonDelete" >
                                                @lang('tables.Delete')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>
</div>
<script type="text/javascript" src="{{ URL::asset('js/tables.js') }}"></script>
@endsection
