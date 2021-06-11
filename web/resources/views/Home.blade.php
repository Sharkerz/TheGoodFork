@extends('layouts.app')

@section('style')
    <link href="{{ asset('css/home.css') }}" rel="stylesheet">
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
@endsection

@section('content')
    <h1>@lang('home.title_home')</h1>
</div> 
<div class="HomeVue">
<div id="container"></div>
<div id="container2"></div>
</div>
    <script>
        var stockLabels =@json($stockLabels);
        var stockValues =@json($stockNumber);
        var statDates =@json($statDates);
        var statDrinks =@json($statDrinks);
        var statFoods =@json($statFoods);
        var statOrders =@json($statOrders);
        

    Highcharts.chart('container', {
        credits: {
    enabled: false
  },
    chart: {
        type: 'column',
        scrollablePlotArea: {
            minWidth: 650,
            scrollPositionX: 0
        }
    },
    title: {
        text: 'Stock'
    },
    xAxis: {
        categories: stockLabels
    },
    yAxis: {
            title: {
                text: 'Nombres en stock'
            },
        },

    series: [{
        name: 'Stock',
        data: stockValues

    }]
});
Highcharts.chart('container2', {
    credits: {
    enabled: false
  },
    chart: {
        type: 'column',
        scrollablePlotArea: {
            minWidth: 650,
            scrollPositionX: 0
        }
    },
    title: {
        text: 'Ventes'
    },
    xAxis: {
        categories: statDates
    },
    yAxis: {
            title: {
                text: 'Nombres de ventes'
            },
        },

    series: [
        {
        name: 'Foods',
        data: statFoods
        },
        {
        name: 'Drinks',
        data: statDrinks
        },
        {
        name: 'Number of Orders',
        data: statOrders
        }
    ]
});
    </script>

@endsection
