@extends('layouts.app')

@section('style')
    <link rel="StyleSheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" type="text/css"/>
    <link href="{{ asset('css/tables.css') }}" rel="stylesheet">
@endsection

@section('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="{{ URL::asset('js/tables.js') }}"></script>
@endsection


@section('content')
<h1>@lang('tables.Title')</h1>
    <button class="btn btn-success float-right" id="Create_Tables">@lang('tables.Add')</button><br/><br/>

    @if (session()->has('success'))
        <div class="alert-success text-center">
            @lang('usersList.success_alert')
        </div>
    @endif

    <input type="hidden" id="language_selected" name="language" value="{{ Session::get('locale') }}">
    <table id="TablesGestion" class="display">
        <thead>
        <tr>
            <th>@lang('tables.TableN°')</th>
            <th>@lang('tables.NbPersons')</th>
            <th>actions</th>
        </tr>
        </thead>
        <tbody>
        @foreach($tables as $table)
                <tr  class="tableRow" id="{{ $table->id }}">
                    <td class="TableN">{{ $table->TableN }}</td>
                    <td class="NbPersons">{{ $table->NbPersons }}</td>
                    <td class="form-inline ActionCase">
                        <button type="button" class="btn btn-primary EditButon" >
                                @lang('tables.Edit')
                        </button>

                        <button type="button" class="btn btn-danger butonDelete" >
                                @lang('tables.Delete')
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

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
                                        <div class="col-md-6 offset-md-4 buttondiv">
                                                <button type="button" class="btn btn-primary butonEditTable" >
                                                @lang('tables.Update')
                                                </button>
                                        </div>
                                        </div>
                                        
                                        </div>

                                </form>
                        </div>
                </div>
        </div>


@endsection
