import { useState, useEffect } from 'react'
import { Calendar, Clock, Activity, FileText, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function History() {
  const [appointments, setAppointments] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('digicare_user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      
      const allAppointments = JSON.parse(localStorage.getItem('digicare_appointments') || '[]')
      // Filter appointments for the current user and sort by date descending
      const userAppointments = allAppointments
        .filter(app => app.userId === parsedUser.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        
      setAppointments(userAppointments)
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="glass rounded-3xl p-10 text-center max-w-md w-full">
          <Activity size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Not Logged In</h2>
          <p className="text-slate-500 mb-6">Please log in to view your medical history and appointments.</p>
          <Link to="/login" className="btn-primary inline-block">Login Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Medical History</h1>
        <p className="text-slate-500 mt-2">View your past and upcoming appointments.</p>
      </div>

      {appointments.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center border-dashed border-2 border-slate-200">
          <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Appointments Yet</h3>
          <p className="text-slate-500 mb-6">You haven't booked any appointments with our doctors yet.</p>
          <Link to="/doctors" className="btn-outline inline-block">Browse Doctors</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => {
            const isPast = new Date(appointment.date) < new Date(new Date().setHours(0,0,0,0))
            
            return (
              <div 
                key={appointment.id} 
                className={`glass rounded-2xl p-6 transition-all ${isPast ? 'opacity-75' : 'hover:shadow-lg hover:border-teal-100 border-l-4 border-l-teal-500'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{appointment.doctorName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isPast ? 'bg-slate-100 text-slate-600' : 'bg-teal-100 text-teal-700'}`}>
                        {isPast ? 'Completed' : appointment.status}
                      </span>
                    </div>
                    <p className="text-teal-600 font-medium text-sm mb-4">{appointment.doctorSpecialty}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-slate-400" />
                        {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-slate-400" />
                        {appointment.time}
                      </div>
                      {appointment.reason && (
                        <div className="flex items-start sm:col-span-2 mt-2 pt-2 border-t border-slate-100">
                          <FileText size={16} className="mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
                          <span className="italic text-slate-500">"{appointment.reason}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!isPast && (
                    <div className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-xl border border-teal-100 md:min-w-[140px]">
                      <CheckCircle2 size={24} className="text-teal-500 mb-2" />
                      <span className="text-teal-700 font-medium text-sm text-center">Confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
