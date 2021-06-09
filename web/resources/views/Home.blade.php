@extends('layouts.app')

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{ asset('js/home.js') }}"></script>
@endsection

@section('content')
    <h1>@lang('home.title_home')</h1>


    <div>
        <canvas id="myChart"></canvas>
    </div>

    <script>
        // === include 'setup' then 'config' above ===
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    </script>

@endsection
