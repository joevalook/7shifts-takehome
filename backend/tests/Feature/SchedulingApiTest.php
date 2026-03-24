<?php

namespace Tests\Feature;

use App\Models\Shift;
use App\Models\Staff;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SchedulingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_a_staff_member(): void
    {
        $response = $this->postJson('/api/staff', [
            'name' => 'Joe Valookaran',
            'role' => 'chef',
            'phone' => '6479849541',
        ]);

        $response->assertCreated()
            ->assertJsonFragment([
                'name' => 'Joe Valookaran',
                'role' => 'chef',
                'phone' => '6479849541',
            ]);

        $this->assertDatabaseHas('staff', [
            'name' => 'Joe Valookaran',
            'role' => 'chef',
            'phone' => '6479849541',
        ]);
    }

    public function test_cannot_create_a_shift_when_end_time_is_before_start_time(): void
    {
        $response = $this->postJson('/api/shifts', [
            'day' => '2026-03-24',
            'start_time' => '17:00',
            'end_time' => '09:00',
            'role' => 'chef',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['end_time']);
    }

    public function test_can_assign_a_shift_to_a_staff_member_with_matching_role(): void
    {
        $staff = Staff::create([
            'name' => 'Joe Valookaran',
            'role' => 'chef',
            'phone' => '6479849541',
        ]);

        $shift = Shift::create([
            'day' => '2026-03-24',
            'start_time' => '09:00',
            'end_time' => '17:00',
            'role' => 'chef',
            'staff_id' => null,
        ]);

        $response = $this->postJson("/api/shifts/{$shift->id}/assign", [
            'staff_id' => $staff->id,
        ]);

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $staff->id,
                'name' => 'Joe Valookaran',
                'role' => 'chef',
            ]);

        $this->assertDatabaseHas('shifts', [
            'id' => $shift->id,
            'staff_id' => $staff->id,
        ]);
    }

    public function test_cannot_assign_a_shift_to_a_staff_member_with_different_role(): void
    {
        $staff = Staff::create([
            'name' => 'Joe Valookaran',
            'role' => 'chef',
            'phone' => '6479849541',
        ]);

        $shift = Shift::create([
            'day' => '2026-03-24',
            'start_time' => '09:00',
            'end_time' => '17:00',
            'role' => 'server',
            'staff_id' => null,
        ]);

        $response = $this->postJson("/api/shifts/{$shift->id}/assign", [
            'staff_id' => $staff->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['staff_id']);

        $this->assertDatabaseHas('shifts', [
            'id' => $shift->id,
            'staff_id' => null,
        ]);
    }
}