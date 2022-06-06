<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::group([

  'middleware' => 'api',
  'prefix' => 'auth'

], function ($router) {

  Route::post('register', [AuthController::class, 'register']);
  Route::post('login', [AuthController::class, 'login']);
  Route::post('logout', [AuthController::class, 'logout']);
  Route::post('refresh', [AuthController::class, 'refresh']);
  Route::post('me', [AuthController::class, 'me']);
});

Route::group([

  'middleware' => 'api'

], function ($router) {
  Route::apiResource('products', ProductController::class);
  Route::apiResource('categories', CategoryController::class);
  Route::post("products/all", [ProductController::class, "getAllProducts"]);
  Route::post("categories/all", [CategoryController::class, "getAllCategories"]);
});
