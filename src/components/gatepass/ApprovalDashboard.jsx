import { useState } from 'react'
import { Check, X, Eye, Clock, User } from 'lucide-react'
import PassStatusBadge from './PassStatusBadge'

const pendingPasses = [
  { id: 'GP-2026-001', name: 'Rahul Sharma', rollNo: 'CSE-21-045', hostel: 'Block A - Room 302', destination: 'City Hospital', reason: 'Medical Emergency', date: '2026-05-13', outTime: '09:00', inTime: '14:00', contact: '+91 98765 43210', status: 'pending', appliedAt: '2h ago' },
  { id: 'GP-2026-002', name: 'Priya Patel', rollNo: 'ECE-21-032', hostel: 'Block B - Room 108', destination: 'Home - Ahmedabad', reason: 'Family Visit', date: '2026-05-14', outTime: '06:00', inTime: '22:00', contact: '+91 87654 32109', status: 'pending', appliedAt: '4h ago' },
  { id: 'GP-2026-003', name: 'Amit Kumar', rollNo: 'ME-22-018', hostel: 'Block A - Room 215', destination: 'TCS Office, Pune', reason: 'Internship/Interview', date: '2026-05-13', outTime: '07:30', inTime: '18:00', contact: '+91 76543 21098', status: 'pending', appliedAt: '5h ago' },
  { id: 'GP-2026-004', name: 'Sneha Gupta', rollNo: 'CSE-22-061', hostel: 'Block B - Room 405', destination: 'Bangalore', reason: 'Academic Event', date: '2026-05-15', outTime: '05:00', inTime: '23:00', contact: '+91 65432 10987', status: 'pending', appliedAt: '6h ago' },
]

export default function ApprovalDashboard() {
  const [passes, setPasses] = useState(pendingPasses)

  const handleAction = (id, action) => {
    setPasses(prev => prev.map(p => p.id === id ? { ...p, status: action } : p))
  }

  const counts = { pending: passes.filter(p => p.status === 'pending').length, approved: passes.filter(p => p.status === 'approved').length, rejected: passes.filter(p => p.status === 'rejected').length }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="surface-base rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-warning">{counts.pending}</p>
          <p className="text-[11px] text-text-tertiary font-medium">Pending</p>
        </div>
        <div className="surface-base rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-success">{counts.approved}</p>
          <p className="text-[11px] text-text-tertiary font-medium">Approved</p>
        </div>
        <div className="surface-base rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-danger">{counts.rejected}</p>
          <p className="text-[11px] text-text-tertiary font-medium">Rejected</p>
        </div>
      </div>

      <div className="space-y-3">
        {passes.map((pass) => (
          <div key={pass.id} className="card-interactive rounded-xl p-5 animate-fade-in">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center text-white font-semibold text-[11px] shadow-lg shadow-accent/10">
                  {pass.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-text-primary">{pass.name}</p>
                  <p className="text-[11px] text-text-tertiary">{pass.rollNo} · {pass.hostel}</p>
                </div>
              </div>
              <PassStatusBadge status={pass.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-[12px]">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Clock size={12} className="text-cyan" /> {pass.date} · {pass.outTime} – {pass.inTime}
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <User size={12} className="text-accent" /> {pass.reason}
              </div>
            </div>

            <p className="text-[12px] text-text-tertiary mb-3">
              <span className="font-medium text-text-secondary">Destination:</span> {pass.destination}
            </p>

            {pass.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => handleAction(pass.id, 'approved')} className="flex-1 py-2 rounded-lg text-[12px] font-medium bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-all flex items-center justify-center gap-1.5" id={`approve-${pass.id}`}>
                  <Check size={13} /> Approve
                </button>
                <button onClick={() => handleAction(pass.id, 'rejected')} className="flex-1 py-2 rounded-lg text-[12px] font-medium bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 transition-all flex items-center justify-center gap-1.5" id={`reject-${pass.id}`}>
                  <X size={13} /> Reject
                </button>
                <button className="py-2 px-3 rounded-lg text-[12px] font-medium bg-bg-elevated text-text-secondary border border-border hover:border-border-hover transition-all">
                  <Eye size={13} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
