import DoctorCard from '../components/DoctorCard'
import { Search, Filter } from 'lucide-react'

export const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    about: 'Expert in diagnosing and treating heart conditions with 15 years of experience in advanced cardiology.',
    experience: '15 Yrs',
    location: 'City Hospital, NY',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    about: 'Specializes in treating disorders of the nervous system, including the brain and spinal cord.',
    experience: '12 Yrs',
    location: 'NeuroCare Center',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '3',
    name: 'Dr. Emily Brooks',
    specialty: 'Pediatrician',
    about: 'Dedicated pediatrician providing comprehensive care for infants, children, and adolescents.',
    experience: '8 Yrs',
    location: 'Kids Health Clinic',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1594824436998-d58d9bb09121?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Dermatologist',
    about: 'Board-certified dermatologist focusing on skin, hair, and nail conditions.',
    experience: '10 Yrs',
    location: 'SkinCare Associates',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '5',
    name: 'Dr. Olivia Martinez',
    specialty: 'General Practitioner',
    about: 'Primary care physician focused on preventative care and general health maintenance.',
    experience: '5 Yrs',
    location: 'Community Health',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    specialty: 'Orthopedic Surgeon',
    about: 'Expert in joint replacement and sports medicine procedures.',
    experience: '20 Yrs',
    location: 'Ortho Spine Inst.',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1537368910025-7028a4751f8a?auto=format&fit=crop&q=80&w=300&h=300'
  }
]

export default function Doctors() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Our Medical Specialists</h1>
          <p className="text-slate-500 mt-2">Find and book appointments with top-rated doctors.</p>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search doctors..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-white"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_DOCTORS.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  )
}
