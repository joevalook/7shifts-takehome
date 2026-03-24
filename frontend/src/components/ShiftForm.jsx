import { useState } from 'react'

function ShiftForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    day: '',
    start_time: '',
    end_time: '',
    role: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const wasSuccessful = await onSubmit(formData)

    if (!wasSuccessful) {
      return
    }

    setFormData({
      day: '',
      start_time: '',
      end_time: '',
      role: '',
    })
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Add Shift</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          type="date"
          name="day"
          value={formData.day}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          type="submit"
        >
          Create Shift
        </button>
      </form>
    </section>
  )
}

export default ShiftForm