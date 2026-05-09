import { Star, Clock, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate()

  const handleBook = () => {
    // Navigate to appointments page with doctor pre-selected in state
    navigate('/appointments', { state: { selectedDoctorId: doctor.id } })
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300 group flex flex-col h-full">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100">
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
            <div className="flex items-center bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded-full text-xs font-bold">
              <Star size={12} className="fill-current mr-0.5" />
              {doctor.rating}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-600 transition-colors">{doctor.name}</h3>
          <p className="text-teal-500 font-medium text-sm mb-1">{doctor.specialty}</p>
          <p className="text-slate-500 text-sm line-clamp-2">{doctor.about}</p>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-50 grid grid-cols-2 gap-3 mb-4 flex-1 content-end">
        <div className="flex items-center text-slate-500 text-sm">
          <Clock size={16} className="mr-1.5 text-teal-400" />
          <span>{doctor.experience} Exp.</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <MapPin size={16} className="mr-1.5 text-teal-400" />
          <span className="truncate">{doctor.location}</span>
        </div>
      </div>
      
      <div className="mt-auto">
        <button 
          onClick={handleBook}
          className="w-full py-2.5 rounded-xl bg-slate-50 text-teal-600 font-medium hover:bg-teal-500 hover:text-white transition-all duration-300 border border-transparent hover:border-teal-400 hover:shadow-md"
        >
          Book Appointment
        </button>
      </div>
    </div>
  )
}
