import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ChatBox from './components/ChatBox'
import Home from './pages/Home'
import Login from './pages/Login'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'
import History from './pages/History'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans">
      <Navbar />
      <main className="flex-1 w-full pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <ChatBox />
    </div>
  )
}

export default App
