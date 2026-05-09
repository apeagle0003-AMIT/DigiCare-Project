import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Stethoscope, User, LogOut, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('digicare_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    }
    checkUser()
    window.addEventListener('storage', checkUser) // For cross-tab sync if needed
    // Polling or route change listener for same-tab login detection
    return () => window.removeEventListener('storage', checkUser)
  }, [location.pathname]) // Re-check on route change to update navbar after login

  const handleLogout = () => {
    localStorage.removeItem('digicare_user')
    setUser(null)
    navigate('/')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'History', path: '/history' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass fixed top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-xl text-white">
              <Stethoscope size={24} />
            </div>
            <span className="text-2xl font-bold gradient-text">DigiCare</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-teal-600 border-b-2 border-teal-500 pb-1'
                    : 'text-slate-600 hover:text-teal-500'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-200">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-slate-700 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                    <User size={18} className="text-teal-600" />
                    <span className="font-medium text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn-primary flex items-center space-x-2">
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-teal-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass absolute top-16 left-0 w-full border-t border-slate-100/20 shadow-lg pb-4">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-200">
              {user ? (
                <div className="flex flex-col space-y-3 px-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <User size={20} className="text-teal-600" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-500 font-medium py-2"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full flex justify-center items-center space-x-2"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
