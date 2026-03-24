function StaffList({ staff }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Staff Members</h2>

      {staff.length === 0 ? (
        <p className="text-slate-600">No staff members yet.</p>
      ) : (
        <ul className="space-y-3">
          {staff.map((member) => (
            <li
              key={member.id}
              className="rounded-lg border border-slate-200 p-3"
            >
              <p className="font-medium text-slate-900">{member.name}</p>
              <p className="text-slate-600">Role: {member.role}</p>
              <p className="text-slate-600">Phone: {member.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default StaffList