<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuCategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\UsersController;
use App\Mail\UserGenerated;
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

Route::group(['middleware' => ['auth:web', 'admin']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    /* Controllers Ressouces*/
    Route::resource('tables',TablesController::class);
    Route::resource('menus',MenuCategoryController::class);
    Route::resource('menusItem',MenuItemController::class);
    Route::resource('users', UsersController::class)->names(['index' => 'users.index', 'update' => 'users.update', 'edit' => 'users.edit']);
});

Auth::routes(['register' => false]);

// Set language route
Route::get('language/{lang}', function ($lang) { Session::put('locale', $lang); return back(); })->name('language_route');

