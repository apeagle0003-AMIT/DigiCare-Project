import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (name && email) {
      const user = { name, email, id: Date.now() }
      localStorage.setItem('digicare_user', JSON.stringify(user))
      // Trigger storage event manually for same-tab update if needed, but App re-render might handle it or we force reload
      window.dispatchEvent(new Event('storage'))
      navigate('/')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
        
        <div className="glass rounded-3xl p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 text-teal-500 mb-4">
              <User size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Sign in to manage your appointments</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2 text-lg"
            >
              <span>Sign In</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account? <span className="text-teal-600 font-medium cursor-pointer hover:underline">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  )
}
