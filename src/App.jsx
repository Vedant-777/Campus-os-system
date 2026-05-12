import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/common/Sidebar'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import LabDashboard from './pages/lab/LabDashboard'
import BookingPage from './pages/lab/BookingPage'
import MyBookings from './pages/lab/MyBookings'
import ChatPage from './pages/bot/ChatPage'
import MapPage from './pages/bot/MapPage'
import StudentPage from './pages/gatepass/StudentPage'
import WardenPage from './pages/gatepass/WardenPage'
import ScannerPage from './pages/gatepass/ScannerPage'
import { useState } from 'react'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto atmosphere relative">
          <div className="relative z-10 p-5 md:p-7 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/labs" element={<LabDashboard />} />
              <Route path="/labs/book" element={<BookingPage />} />
              <Route path="/labs/my-bookings" element={<MyBookings />} />
              <Route path="/bot" element={<ChatPage />} />
              <Route path="/bot/map" element={<MapPage />} />
              <Route path="/gatepass" element={<StudentPage />} />
              <Route path="/gatepass/warden" element={<WardenPage />} />
              <Route path="/gatepass/scanner" element={<ScannerPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}
