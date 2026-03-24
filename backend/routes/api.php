<?php

use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\StaffController;
use Illuminate\Support\Facades\Route;

// Staff routes
Route::get('/staff', [StaffController::class, 'index']);   // list all staff
Route::post('/staff', [StaffController::class, 'store']);  // create staff

// Shift routes
Route::get('/shifts', [ShiftController::class, 'index']);   // list all shifts
Route::post('/shifts', [ShiftController::class, 'store']);  // create shift

// Assign a shift to a staff member
Route::post('/shifts/{shift}/assign', [ShiftController::class, 'assign']);