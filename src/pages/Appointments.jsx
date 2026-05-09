import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Calendar, Clock, User as UserIcon, FileText, CheckCircle2 } from 'lucide-react'
import { MOCK_DOCTORS } from './Doctors'

export default function Appointments() {
  const location = useLocation()
  const navigate = useNavigate()
  const preSelectedDoctorId = location.state?.selectedDoctorId || ''

  const [formData, setFormData] = useState({
    doctorId: preSelectedDoctorId,
    date: '',
    time: '',
    reason: ''
  })
  
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('digicare_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!user) {
      alert("Please login first to book an appointment.")
      navigate('/login')
      return
    }

    const doctor = MOCK_DOCTORS.find(d => d.id === formData.doctorId)
    
    const newAppointment = {
      id: Date.now().toString(),
      userId: user.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: 'Upcoming',
      bookedAt: new Date().toISOString()
    }

    const existingAppointments = JSON.parse(localStorage.getItem('digicare_appointments') || '[]')
    localStorage.setItem('digicare_appointments', JSON.stringify([...existingAppointments, newAppointment]))
    
    setSuccess(true)
    setTimeout(() => {
      navigate('/history')
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="glass rounded-3xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-teal-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Appointment Booked!</h2>
          <p className="text-slate-500">Your appointment has been confirmed. Redirecting to your history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Book an Appointment</h1>
        <p className="text-slate-500 mt-2">Schedule your visit with our healthcare professionals.</p>
      </div>

      <div className="glass rounded-3xl p-8 md:p-10 shadow-lg border border-slate-100">
        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4 mb-8 flex items-center justify-between">
            <span>You need to be logged in to book an appointment.</span>
            <button onClick={() => navigate('/login')} className="btn-primary py-1.5 px-4 text-sm">
              Login Now
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <UserIcon size={16} className="mr-2 text-teal-500" />
                Select Doctor
              </label>
              <select
                required
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              >
                <option value="" disabled>Choose a specialist</option>
                {MOCK_DOCTORS.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Calendar size={16} className="mr-2 text-teal-500" />
                Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Clock size={16} className="mr-2 text-teal-500" />
                Time Slot
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              >
                <option value="" disabled>Select a time slot</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <FileText size={16} className="mr-2 text-teal-500" />
                Reason for Visit (Optional)
              </label>
              <textarea
                rows="3"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Briefly describe your symptoms or reason for visit..."
                className="w-full p-3 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={!user}
              className="btn-primary w-full md:w-auto px-10 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
