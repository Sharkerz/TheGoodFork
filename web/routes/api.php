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
    Route::post('/setNotificationToken', [AuthController::class, 'setNotificationToken']);
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
    Route::get('/getOrder/{id}', [OrderController::class, 'getOrder']);
    Route::get('/orderDetails/{id}', [OrderController::class, 'orderDetails']);
    Route::get('/getOrderWaiting', [OrderController::class, 'getOrderWaiting']);
    Route::get('/ordersForStaff', [OrderController::class, 'ordersForStaff']);
    Route::post('/itemsReady', [OrderController::class, 'itemsReady']);
    Route::get('/orderReady', [OrderController::class, 'orderReady']);
    Route::get('/orderDelivered', [OrderController::class, 'orderDelivered']);
    Route::post('/validateOrders', [OrderController::class, 'validateOrders']);
    Route::post('/deliverOrders', [OrderController::class, 'deliverOrders']);
    Route::post('/createBooking', [BookingController::class, 'createBooking']);
    Route::get('/getBookings/{userName}', [BookingController::class, 'getBookings']);
});
