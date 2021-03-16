@extends('layouts.app')

<link href="{{ asset('css/tables.css') }}" rel="stylesheet">
@section('content')
<div class="tab-content">
        <div class="tab-pane fade show active" id="public" role="tabpanel" aria-labelledby="public">
                <div id="header_list">
                        <h1 class="header_title">@lang('tables.Title')</h1>
                        <button  id="Create_Tables" type="button" class="btn btn-success">@lang('tables.Add')</button>
                        <hr>  
                </div>
                
                @foreach($tables as $table)

                <div class="tables" id="{{ $table->id }}">
                        <div class="card-body">
                                <h6 class="titre_tables">@lang('tables.TableN°') {{ $table->TableN }} </h6>
                        </div>
                        <div>
                                <h4 class="NbPersonTables">{{ $table->NbPersons }}
                        </div>
                </div>

                @endforeach

        </div>
</div>
@endsection
<script type="text/javascript" src="{{ URL::asset('js/tables.js') }}"></script>