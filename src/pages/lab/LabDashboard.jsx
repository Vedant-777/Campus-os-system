import { useState } from 'react'
import LabGrid from '../../components/lab/LabGrid'
import BookingModal from '../../components/lab/BookingModal'
import NotificationBell from '../../components/lab/NotificationBell'
import { Search, FlaskConical } from 'lucide-react'

const labsData = [
  { id: 1, name: 'CS Lab 301', building: 'Block A', floor: 3, systems: 40, capacity: 40, occupancy: 12, status: 'available', nextSlot: '10:00 AM', hasInternet: true, software: ['VS Code', 'Python 3.11', 'Docker', 'Git', 'Node.js'] },
  { id: 2, name: 'ML Lab 402', building: 'Block A', floor: 4, systems: 30, capacity: 30, occupancy: 28, status: 'occupied', nextSlot: '3:00 PM', hasInternet: true, software: ['Jupyter', 'TensorFlow', 'PyTorch', 'Anaconda'] },
  { id: 3, name: 'Electronics Lab', building: 'Block B', floor: 1, systems: 25, capacity: 25, occupancy: 0, status: 'maintenance', nextSlot: 'Tomorrow', hasInternet: false, software: ['MATLAB', 'Proteus', 'Arduino IDE'] },
  { id: 4, name: 'Physics Lab', building: 'Block C', floor: 2, systems: 20, capacity: 20, occupancy: 5, status: 'available', nextSlot: '11:00 AM', hasInternet: true, software: ['LabVIEW', 'Origin Pro', 'COMSOL'] },
  { id: 5, name: 'Chemistry Lab', building: 'Block C', floor: 1, systems: 15, capacity: 20, occupancy: 18, status: 'occupied', nextSlot: '2:00 PM', hasInternet: true, software: ['ChemDraw', 'Gaussian', 'Avogadro'] },
  { id: 6, name: 'Networking Lab', building: 'Block A', floor: 2, systems: 35, capacity: 35, occupancy: 10, status: 'available', nextSlot: '12:00 PM', hasInternet: true, software: ['Cisco Packet Tracer', 'Wireshark', 'GNS3', 'PuTTY'] },
  { id: 7, name: 'Design Studio', building: 'Block D', floor: 3, systems: 20, capacity: 20, occupancy: 15, status: 'occupied', nextSlot: '4:00 PM', hasInternet: true, software: ['Figma', 'Adobe CC', 'Blender', 'SketchUp'] },
  { id: 8, name: 'Robotics Lab', building: 'Block B', floor: 2, systems: 12, capacity: 15, occupancy: 3, status: 'available', nextSlot: '1:00 PM', hasInternet: true, software: ['ROS', 'Arduino IDE', 'SolidWorks', 'MATLAB'] },
  { id: 9, name: 'Data Science Lab', building: 'Block A', floor: 5, systems: 30, capacity: 30, occupancy: 22, status: 'occupied', nextSlot: '5:00 PM', hasInternet: true, software: ['R Studio', 'Tableau', 'Power BI', 'Python'] },
]

const filters = ['All', 'Available', 'Occupied', 'Maintenance']

export default function LabDashboard() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [bookingLab, setBookingLab] = useState(null)

  const filtered = labsData.filter((lab) => {
    const matchesSearch = lab.name.toLowerCase().includes(search.toLowerCase()) || lab.building.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'All' || lab.status === activeFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const counts = { all: labsData.length, available: labsData.filter(l => l.status === 'available').length, occupied: labsData.filter(l => l.status === 'occupied').length, maintenance: labsData.filter(l => l.status === 'maintenance').length }

  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2.5 tracking-[-0.03em]">
            <FlaskConical size={20} className="text-accent" strokeWidth={1.5} />
            Lab Manager
          </h1>
          <p className="text-[13px] text-text-muted mt-1">Real-time lab availability & booking</p>
        </div>
        <NotificationBell />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: counts.all, color: 'text-text-primary' },
          { label: 'Available', value: counts.available, color: 'text-success' },
          { label: 'Occupied', value: counts.occupied, color: 'text-danger' },
          { label: 'Maintenance', value: counts.maintenance, color: 'text-warning' },
        ].map((s) => (
          <div key={s.label} className="surface-base rounded-xl p-3 text-center">
            <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-text-muted font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search labs..."
            className="w-full pl-9 pr-4 py-[7px] rounded-lg bg-bg-hover border border-border text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:ring-1 focus:ring-accent/20 transition-all"
            id="lab-search"
          />
        </div>
        <div className="flex gap-0.5 surface-base rounded-lg p-0.5">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200
                ${activeFilter === f ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <LabGrid labs={filtered} onBook={(lab) => setBookingLab(lab)} />

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FlaskConical size={40} className="mx-auto text-text-muted mb-3" strokeWidth={1} />
          <p className="text-text-tertiary font-medium text-[13px]">No labs match your search</p>
        </div>
      )}

      {bookingLab && <BookingModal lab={bookingLab} onClose={() => setBookingLab(null)} onConfirm={(data) => console.log('Booked:', data)} />}
    </div>
  )
}
