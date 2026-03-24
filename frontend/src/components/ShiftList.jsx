import { useState } from 'react'

function ShiftList({ shifts, staff, onAssign }) {
  const [selectedAssignments, setSelectedAssignments] = useState({})

  function handleSelectionChange(shiftId, staffId) {
    setSelectedAssignments({
      ...selectedAssignments,
      [shiftId]: staffId,
    })
  }

  async function handleAssignClick(shiftId) {
    const selectedStaffId = selectedAssignments[shiftId]

    if (!selectedStaffId) {
      return
    }

    await onAssign(shiftId, selectedStaffId)
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Shifts</h2>

      {shifts.length === 0 ? (
        <p className="text-slate-600">No shifts yet.</p>
      ) : (
        <div className="space-y-4">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <p className="font-medium text-slate-900">
                {shift.role} shift
              </p>
              <p className="text-slate-600">
                {shift.day} • {shift.start_time} to {shift.end_time}
              </p>
              <p className="mb-3 text-slate-600">
                Assigned to:{' '}
                {shift.staff ? `${shift.staff.name} (${shift.staff.role})` : 'Unassigned'}
              </p>

              <div className="flex flex-col gap-3 md:flex-row">
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                  value={selectedAssignments[shift.id] || ''}
                  onChange={(event) =>
                    handleSelectionChange(shift.id, event.target.value)
                  }
                >
                  <option value="">Select staff member</option>

                  {staff.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>

                <button
                  className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
                  type="button"
                  onClick={() => handleAssignClick(shift.id)}
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ShiftList