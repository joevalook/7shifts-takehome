<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function index(): JsonResponse
    {
        // Get all staff ordered newest first
        $staff = Staff::orderBy('id', 'desc')->get();

        // Return JSON response
        return response()->json($staff);
    }

    public function store(Request $request): JsonResponse
    {
        // Validations
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],   // Must exist and be string with max length 255
            'role' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
        ]);

        // Create a new staff record using validations
        $staff = Staff::create($validated);

        // Return created resource with HTTP 201 status
        return response()->json($staff, 201);
    }
}