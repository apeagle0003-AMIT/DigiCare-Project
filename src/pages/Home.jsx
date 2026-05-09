import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Heart, Shield, Stethoscope } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden py-20">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-teal-100 px-4 py-2 rounded-full text-teal-700 font-medium text-sm">
                <Activity size={16} className="text-teal-500" />
                <span>Modern Healthcare Solution</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Your Health, <br />
                Our <span className="gradient-text">Priority.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Book appointments, track your medical history, and get AI-powered support instantly. Experience healthcare reinvented.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/doctors" className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                  <span>Find a Doctor</span>
                  <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="btn-outline flex items-center justify-center text-lg px-8 py-4 bg-white/50 backdrop-blur-sm">
                  User Login
                </Link>
              </div>
              
              <div className="pt-8 flex items-center space-x-8 text-slate-500">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">50+</span>
                  <span className="text-sm">Expert Doctors</span>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">10k+</span>
                  <span className="text-sm">Happy Patients</span>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">24/7</span>
                  <span className="text-sm">AI Support</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block relative">
              <div className="glass rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-square bg-gradient-to-br from-teal-100 to-cyan-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <Heart className="w-48 h-48 text-teal-400 opacity-20 absolute" />
                  <div className="relative z-10 grid grid-cols-2 gap-4 w-full h-full p-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center items-center text-center hover:shadow-md transition-shadow">
                      <Stethoscope className="w-10 h-10 text-teal-500 mb-2" />
                      <span className="font-semibold text-slate-700">Specialists</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center items-center text-center mt-8 hover:shadow-md transition-shadow">
                      <Shield className="w-10 h-10 text-cyan-500 mb-2" />
                      <span className="font-semibold text-slate-700">Secure</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center items-center text-center -mt-8 hover:shadow-md transition-shadow">
                      <Activity className="w-10 h-10 text-blue-500 mb-2" />
                      <span className="font-semibold text-slate-700">Tracking</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center items-center text-center hover:shadow-md transition-shadow">
                      <Heart className="w-10 h-10 text-rose-500 mb-2" />
                      <span className="font-semibold text-slate-700">Care</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
