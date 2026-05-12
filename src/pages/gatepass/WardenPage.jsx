import ApprovalDashboard from '../../components/gatepass/ApprovalDashboard'
import { UserCheck, Shield, Users, Clock } from 'lucide-react'
import StatusCard from '../../components/bot/StatusCard'

export default function WardenPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-7 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <UserCheck size={22} className="text-accent" strokeWidth={1.5} /> Warden Panel
        </h1>
        <p className="text-[13px] text-text-muted mt-1">Review and approve gate pass requests</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard icon={Clock} label="Avg Approval" value="1.5h" color="cyan" />
        <StatusCard icon={Users} label="Students (Block A)" value="156" color="accent" />
        <StatusCard icon={Shield} label="Approved Today" value="12" color="success" />
        <StatusCard icon={UserCheck} label="On Leave" value="8" color="warning" />
      </div>

      <ApprovalDashboard />
    </div>
  )
}
