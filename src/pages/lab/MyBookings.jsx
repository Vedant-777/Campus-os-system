import { ClipboardList, Calendar, Clock, MapPin, Trash2, RotateCcw } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'

const bookings = [
  { id: 'BK-001', lab: 'CS Lab 301', building: 'Block A, Floor 3', date: '2026-05-13', time: '09:00 – 10:00', purpose: 'Machine Learning Lab Assignment', status: 'approved', bookedAt: '2026-05-12 08:30' },
  { id: 'BK-002', lab: 'Networking Lab', building: 'Block A, Floor 2', date: '2026-05-13', time: '14:00 – 15:00', purpose: 'Computer Networks Practical', status: 'pending', bookedAt: '2026-05-12 10:15' },
  { id: 'BK-003', lab: 'Physics Lab', building: 'Block C, Floor 2', date: '2026-05-14', time: '11:00 – 12:00', purpose: 'Optics Experiment', status: 'approved', bookedAt: '2026-05-11 16:00' },
  { id: 'BK-004', lab: 'Robotics Lab', building: 'Block B, Floor 2', date: '2026-05-10', time: '15:00 – 16:00', purpose: 'Autonomous Bot Testing', status: 'expired', bookedAt: '2026-05-09 09:00' },
  { id: 'BK-005', lab: 'Design Studio', building: 'Block D, Floor 3', date: '2026-05-08', time: '10:00 – 11:00', purpose: 'UI/UX Project Review', status: 'expired', bookedAt: '2026-05-07 14:30' },
]

export default function MyBookings() {
  return (
    <div className="max-w-5xl mx-auto space-y-7 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <ClipboardList size={22} className="text-accent" strokeWidth={1.5} /> My Bookings
        </h1>
        <p className="text-[13px] text-text-muted mt-1">View and manage your lab reservations</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="surface-base rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-accent">{bookings.filter(b => b.status === 'approved').length}</p>
          <p className="text-[11px] text-text-muted font-medium">Active</p>
        </div>
        <div className="surface-base rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-warning">{bookings.filter(b => b.status === 'pending').length}</p>
          <p className="text-[11px] text-text-muted font-medium">Pending</p>
        </div>
        <div className="surface-base rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-text-muted">{bookings.filter(b => b.status === 'expired').length}</p>
          <p className="text-[11px] text-text-muted font-medium">Past</p>
        </div>
      </div>

      <div className="space-y-3">
        {bookings.map((b, i) => (
          <div key={b.id} className="card-interactive rounded-xl p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[15px] font-semibold text-text-primary">{b.lab}</h3>
                <p className="text-[12px] text-text-tertiary flex items-center gap-1 mt-0.5"><MapPin size={11} /> {b.building}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              <div className="flex items-center gap-2 text-[12px] text-text-secondary"><Calendar size={12} className="text-cyan" />{b.date}</div>
              <div className="flex items-center gap-2 text-[12px] text-text-secondary"><Clock size={12} className="text-cyan" />{b.time}</div>
              <div className="text-[12px] text-text-muted hidden md:block">Booked: {b.bookedAt}</div>
            </div>

            <p className="text-[12px] text-text-tertiary mb-3"><span className="font-medium text-text-secondary">Purpose:</span> {b.purpose}</p>

            {b.status !== 'expired' && (
              <div className="flex gap-2">
                {b.status === 'pending' && (
                  <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-danger/10 text-danger border border-danger/15 hover:bg-danger/20 transition-all flex items-center gap-1.5"><Trash2 size={12} /> Cancel</button>
                )}
                {b.status === 'approved' && (
                  <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-bg-elevated text-text-secondary border border-border hover:border-border-hover transition-all flex items-center gap-1.5"><RotateCcw size={12} /> Reschedule</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
