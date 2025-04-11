<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\Api\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/voitures', [VoitureController::class, 'index']);
Route::get('/voitures/{voiture}', [VoitureController::class, 'show']);

// Routes protégées par authentification
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes pour les réservations
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
    Route::put('/reservations/{reservation}', [ReservationController::class, 'update']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);
    Route::get('/reservations/{reservation}/recu', [ReservationController::class, 'generateRecu']);

    // Routes admin
    Route::middleware('is_admin')->prefix('admin')->group(function () {
        Route::post('/voitures', [VoitureController::class, 'store']);
        Route::put('/voitures/{voiture}', [VoitureController::class, 'update']);
        Route::delete('/voitures/{voiture}', [VoitureController::class, 'destroy']);
    });
});
