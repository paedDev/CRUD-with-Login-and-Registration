<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentRequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('welcome');
});

Route::post("/login", [AuthController::class, 'login']);
Route::post("/signup", [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
  Route::post("/logout", [AuthController::class, 'logout']);
  Route::get("/user", function (Request $request) {
    return $request->user();
  });
  Route::resource('document-requests', DocumentRequestController::class);
});
