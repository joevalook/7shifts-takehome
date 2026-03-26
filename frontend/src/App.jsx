import { useEffect, useState } from 'react'
import MessageBanner from './components/MessageBanner'
import StaffForm from './components/StaffForm'
import StaffList from './components/StaffList'
import ShiftForm from './components/ShiftForm'
import ShiftList from './components/ShiftList'

const API_BASE_URL = 'http://localhost:8000/api' //Can move this to an .env file for better practice, but hardcoding for simplicity in this example

function App() {
  const [staff, setStaff] = useState([])
  const [shifts, setShifts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  //Normally I would incorporate fetch functions in its own file for better separation of concerns, but including here for simplicity in this example
  async function fetchStaff() {
    const response = await fetch(`${API_BASE_URL}/staff`, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()
    setStaff(data)
  }

  async function fetchShifts() {
    const response = await fetch(`${API_BASE_URL}/shifts`, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()
    setShifts(data)
  }

  useEffect(() => {
    fetchStaff()
    fetchShifts()
  }, [])

  async function createStaffMember(staffForm) {
    setErrorMessage('')
    setSuccessMessage('')

    const response = await fetch(`${API_BASE_URL}/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(staffForm),
    })

    const data = await response.json()

    if (!response.ok) {
      const firstError =
        data?.errors &&
        Object.values(data.errors)[0] &&
        Object.values(data.errors)[0][0]

      setErrorMessage(firstError || data.message || 'Failed to create staff member.')
      return false
    }

    setSuccessMessage('Staff member created successfully.')
    await fetchStaff()
    return true
  }

  async function createShift(shiftForm) {
    setErrorMessage('')
    setSuccessMessage('')

    const response = await fetch(`${API_BASE_URL}/shifts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(shiftForm),
    })

    const data = await response.json()

    if (!response.ok) {
      const firstError =
        data?.errors &&
        Object.values(data.errors)[0] &&
        Object.values(data.errors)[0][0]

      setErrorMessage(firstError || data.message || 'Failed to create shift.')
      return false
    }

    setSuccessMessage('Shift created successfully.')
    await fetchShifts()
    return true
  }

  async function assignShift(shiftId, staffId) {
    setErrorMessage('')
    setSuccessMessage('')

    const response = await fetch(`${API_BASE_URL}/shifts/${shiftId}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        staff_id: Number(staffId),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const firstError =
        data?.errors &&
        Object.values(data.errors)[0] &&
        Object.values(data.errors)[0][0]

      setErrorMessage(firstError || data.message || 'Failed to assign shift.')
      return false
    }

    setSuccessMessage('Shift assigned successfully.')
    await fetchShifts()
    return true
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Restaurant Staff Scheduling
        </h1>

        <MessageBanner
          errorMessage={errorMessage}
          successMessage={successMessage}
        />

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <StaffForm onSubmit={createStaffMember} />
          <ShiftForm onSubmit={createShift} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <StaffList staff={staff} />
          <ShiftList
            shifts={shifts}
            staff={staff}
            onAssign={assignShift}
          />
        </div>
      </div>
    </div>
  )
}

export default App
