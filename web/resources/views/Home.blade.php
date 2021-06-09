@extends('layouts.app')

@section('style')
    <link href="{{ asset('css/home.css') }}" rel="stylesheet">
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
@endsection

@section('content')
    <h1>@lang('home.title_home')</h1>
    <div class="HomeVue">

        <div class="Graph">
            <canvas id="myChart" height="600" width="0"></canvas>
        </div>
    </div>
    
    <script>
        var stock =@json($stock);

        const data = {
            datasets: [{
                label: 'Stock',
                backgroundColor: '#02ea9c',
                borderColor: 'rgb(255, 99, 132)',
                data: stock,
            }]
        };

        const config = {
            type: 'bar',
            data,
            options: {
                scales : {
                    xAxes :[{
                        ticks :{
                            fontSize : 100
                        }
                    }]
                },
                plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Stock des éléments du menu'
                }
                }
            },
        };
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    </script>

@endsection
