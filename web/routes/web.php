<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TablesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    /* Controllers Ressouces*/
    Route::resource('tables',TablesController::class);
    Route::resource('users', UsersController::class)->names(['index' => 'users.index', 'update' => 'users.update', 'edit' => 'users.edit']);
});

Auth::routes();

// To Remove soon
Route::get('/test', function () {
    return view('test');
});
