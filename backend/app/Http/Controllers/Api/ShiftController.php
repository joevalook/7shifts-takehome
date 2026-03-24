<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use App\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ShiftController extends Controller
{
    //GET: List all shifts
    public function index(): JsonResponse
    {
        // Eager loading staff relationship to avoid N+1 problem, and sorting by day and start_time
        $shifts = Shift::with('staff')
            ->orderBy('day')          
            ->orderBy('start_time')  
            ->get();

        return response()->json($shifts);
    }

    //POST: Create shift
    public function store(Request $request): JsonResponse
    {
        // Validations
        $validated = $request->validate([
            'day' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'role' => ['required', 'string', 'max:255'],
        ]);

        $shift = Shift::create($validated);

        return response()->json($shift, 201);
    }

    //POST: Assign shift to staff
    public function assign(Request $request, Shift $shift): JsonResponse
    {
        // Validate staff_id exists in staff table
        $validated = $request->validate([
            'staff_id' => ['required', 'integer', 'exists:staff,id'],
        ]);

        // Fetch staff member
        $staff = Staff::findOrFail($validated['staff_id']);

        // Check if staff role matches shift role
        if ($staff->role !== $shift->role) {
            throw ValidationException::withMessages([
                'staff_id' => ['Staff role must match shift role.'],
            ]);
        }

        // Assign shift
        $shift->staff_id = $staff->id;
        $shift->save();

        // Return updated shift with staff relationship
        return response()->json($shift->load('staff'));
    }
}