<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
    API Authentication routes
*/
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh_token', [AuthController::class, 'refreshToken']);
});

/*
    API routes
*/
Route::group(['middleware' => 'auth:api'], function ($router) {
    Route::get('/user_profile', [AuthController::class, 'getProfile']);
    Route::post('/edit_profile', [AuthController::class, 'editProfile']);
    Route::get('/getCategories', [MenuApiController::class, 'getCategories']);
    Route::get('/getItems', [MenuApiController::class, 'getItems']);
    Route::post('/createOrder', [OrderController::class, 'createOrder']);
    Route::get('/orderToValidate', [OrderController::class, 'orderToValidate']);
    Route::get('/orderDetails/{id}', [OrderController::class, 'orderDetails']);
    Route::get('/ordersForStaff', [OrderController::class, 'ordersForStaff']);
    // Route::get('/ordersForCook', [OrderController::class, 'ordersForCook']);
    Route::post('/itemsReady', [OrderController::class, 'itemsReady']);
    Route::post('/validateOrders', [OrderController::class, 'validateOrders']);
    Route::post('/createBooking', [BookingController::class, 'createBooking']);
});
