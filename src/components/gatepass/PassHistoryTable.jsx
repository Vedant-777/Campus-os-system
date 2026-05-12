import PassStatusBadge from './PassStatusBadge'
import { ArrowUpRight } from 'lucide-react'

const history = [
  { id: 'GP-2026-001', date: '2026-05-10', destination: 'City Hospital', reason: 'Medical', outTime: '09:00', inTime: '14:00', actualIn: '13:45', status: 'expired' },
  { id: 'GP-2026-002', date: '2026-05-08', destination: 'Home', reason: 'Family Visit', outTime: '06:00', inTime: '22:00', actualIn: '21:30', status: 'expired' },
  { id: 'GP-2026-003', date: '2026-05-06', destination: 'TCS Office', reason: 'Interview', outTime: '08:00', inTime: '17:00', actualIn: '16:30', status: 'expired' },
  { id: 'GP-2026-004', date: '2026-05-13', destination: 'Library Fair', reason: 'Academic', outTime: '10:00', inTime: '18:00', actualIn: '—', status: 'approved' },
  { id: 'GP-2026-005', date: '2026-05-14', destination: 'Bangalore', reason: 'Personal', outTime: '05:00', inTime: '23:00', actualIn: '—', status: 'pending' },
  { id: 'GP-2026-006', date: '2026-05-02', destination: 'Pharmacy', reason: 'Medical', outTime: '11:00', inTime: '13:00', actualIn: '12:45', status: 'expired' },
]

export default function PassHistoryTable() {
  return (
    <div className="surface-base rounded-xl overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-text-primary">Pass History</h4>
        <span className="text-[11px] text-text-muted">{history.length} total passes</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-left">Pass ID</th>
              <th className="px-5 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-left">Date</th>
              <th className="px-5 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-left">Destination</th>
              <th className="px-5 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-left">Time</th>
              <th className="px-5 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-left">Return</th>
              <th className="px-5 py-3 text-[11px] font-medium text-text-muted uppercase tracking-wider text-left">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {history.map((pass) => (
              <tr key={pass.id} className="border-b border-border hover:bg-bg-hover transition-colors">
                <td className="px-5 py-3 font-mono text-[12px] font-medium text-accent">{pass.id}</td>
                <td className="px-5 py-3 text-text-secondary">{pass.date}</td>
                <td className="px-5 py-3 text-text-primary">{pass.destination}</td>
                <td className="px-5 py-3 text-text-tertiary">{pass.outTime} – {pass.inTime}</td>
                <td className="px-5 py-3 text-text-tertiary">{pass.actualIn}</td>
                <td className="px-5 py-3"><PassStatusBadge status={pass.status} /></td>
                <td className="px-5 py-3">
                  <button className="p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-all">
                    <ArrowUpRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
