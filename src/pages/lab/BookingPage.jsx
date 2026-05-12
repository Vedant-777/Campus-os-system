import { useState } from 'react'
import BookingModal from '../../components/lab/BookingModal'
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

const labs = [
  { id: 1, name: 'CS Lab 301', building: 'Block A', floor: 3, systems: 40, capacity: 40, status: 'available' },
  { id: 4, name: 'Physics Lab', building: 'Block C', floor: 2, systems: 20, capacity: 20, status: 'available' },
  { id: 6, name: 'Networking Lab', building: 'Block A', floor: 2, systems: 35, capacity: 35, status: 'available' },
  { id: 8, name: 'Robotics Lab', building: 'Block B', floor: 2, systems: 12, capacity: 15, status: 'available' },
]

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00']
const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16']

const getSlotStatus = (labId, day, time) => {
  const hash = (labId * 31 + day * 17 + time.charCodeAt(0)) % 5
  return hash < 3 ? 'available' : hash === 3 ? 'booked' : 'selected'
}

export default function BookingPage() {
  const [selectedLab, setSelectedLab] = useState(null)
  const [bookingLab, setBookingLab] = useState(null)

  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <Calendar size={22} className="text-cyan" strokeWidth={1.5} /> Book a Lab
        </h1>
        <p className="text-[13px] text-text-muted mt-1">Select a lab and time slot to reserve</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {labs.map((lab) => (
          <button key={lab.id} onClick={() => setSelectedLab(lab)}
            className={`p-4 rounded-xl text-left transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${selectedLab?.id === lab.id
                ? 'bg-accent-muted text-text-primary border border-accent/20 glow-accent'
                : 'card-interactive hover:border-border-hover'}`}
            style={selectedLab?.id === lab.id ? { boxShadow: '0 0 16px rgba(99,102,241,0.06), inset 0 1px 0 rgba(255,255,255,0.03)' } : {}}>
            <p className="text-[13px] font-semibold text-text-primary">{lab.name}</p>
            <p className={`text-[11px] mt-0.5 ${selectedLab?.id === lab.id ? 'text-text-secondary' : 'text-text-muted'}`}>{lab.building} · {lab.systems} systems</p>
          </button>
        ))}
      </div>

      {selectedLab && (
        <div className="surface-base rounded-xl overflow-hidden animate-slide-up">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-text-primary">{selectedLab.name} — Week Schedule</h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg hover:bg-bg-hover transition-colors"><ChevronLeft size={14} className="text-text-muted" /></button>
              <span className="text-[13px] font-medium text-text-secondary">May 12 – 16, 2026</span>
              <button className="p-1.5 rounded-lg hover:bg-bg-hover transition-colors"><ChevronRight size={14} className="text-text-muted" /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-[11px] font-medium text-text-muted text-left"><Clock size={12} className="inline mr-1 -mt-0.5" /> Time</th>
                  {days.map(d => <th key={d} className="px-4 py-3 text-[11px] font-medium text-text-secondary text-center">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time} className="border-b border-border hover:bg-bg-hover/50 transition-colors">
                    <td className="px-4 py-3 text-[12px] font-mono text-text-muted">{time}</td>
                    {days.map((day, di) => {
                      const status = getSlotStatus(selectedLab.id, di, time)
                      return (
                        <td key={day} className="px-2 py-2 text-center">
                          <button disabled={status === 'booked'} onClick={() => setBookingLab(selectedLab)}
                            className={`w-full py-2 rounded-md text-[11px] font-medium transition-all duration-200
                              ${status === 'available' ? 'bg-success/10 text-success border border-success/15 hover:bg-success/20'
                                : status === 'booked' ? 'bg-bg-primary text-text-muted border border-border cursor-not-allowed'
                                : 'bg-accent text-white border border-accent'}`}>
                            {status === 'available' ? 'Open' : status === 'booked' ? 'Booked' : 'Selected'}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-border flex gap-4">
            {[{ c: 'bg-success/10 border-success/15', l: 'Available' }, { c: 'bg-bg-primary border-border', l: 'Booked' }, { c: 'bg-accent border-accent', l: 'Selected' }].map(({ c, l }) => (
              <div key={l} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                <span className={`w-3 h-3 rounded border ${c}`} /> {l}
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedLab && (
        <div className="text-center py-20 surface-base rounded-xl">
          <Calendar size={40} className="mx-auto text-text-muted mb-3" strokeWidth={1} />
          <p className="text-text-tertiary text-[13px] font-medium">Select a lab to view available slots</p>
        </div>
      )}

      {bookingLab && <BookingModal lab={bookingLab} onClose={() => setBookingLab(null)} onConfirm={(data) => console.log('Booked:', data)} />}
    </div>
  )
}
