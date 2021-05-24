<?php

use App\Http\Controllers\AuthController;
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
});
