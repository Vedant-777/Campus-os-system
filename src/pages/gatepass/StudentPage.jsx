import { useState } from 'react'
import GatePassForm from '../../components/gatepass/GatePassForm'
import QRCodeDisplay from '../../components/gatepass/QRCodeDisplay'
import PassHistoryTable from '../../components/gatepass/PassHistoryTable'
import { ShieldCheck, FileText, QrCode, CheckCircle2 } from 'lucide-react'

const activePass = { id: 'GP-2026-004', name: 'Arjun Kumar', rollNo: 'CSE-21-045', hostel: 'Block A - Room 302', date: '2026-05-13', outTime: '10:00', inTime: '18:00', status: 'approved' }

export default function StudentPage() {
  const [tab, setTab] = useState('apply')
  const [submitted, setSubmitted] = useState(false)

  const tabs = [
    { id: 'apply', label: 'Apply', icon: FileText },
    { id: 'active', label: 'Active Pass', icon: QrCode },
    { id: 'history', label: 'History', icon: ShieldCheck },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-7 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <ShieldCheck size={22} className="text-success" strokeWidth={1.5} /> Gate Pass
        </h1>
        <p className="text-[13px] text-text-muted mt-1">Apply for hostel gate passes and track approvals</p>
      </div>

      <div className="flex gap-0.5 surface-base rounded-lg p-0.5 w-fit">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200
              ${tab === t.id ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'apply' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <GatePassForm onSubmit={() => setSubmitted(true)} />
          {submitted && (
            <div className="surface-base rounded-xl p-8 text-center animate-scale-in border-success/20">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
                <CheckCircle2 size={28} className="text-success" />
              </div>
              <h4 className="text-[17px] font-semibold text-text-primary mb-1">Pass Submitted</h4>
              <p className="text-[13px] text-text-tertiary">Sent to warden for approval. You'll be notified once processed.</p>
            </div>
          )}
        </div>
      )}

      {tab === 'active' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <QRCodeDisplay passData={activePass} />
          <div className="surface-base rounded-xl p-6 space-y-4">
            <h3 className="text-[15px] font-semibold text-text-primary">Pass Details</h3>
            <div className="space-y-0">
              {[
                { label: 'Pass ID', value: activePass.id },
                { label: 'Name', value: activePass.name },
                { label: 'Roll No', value: activePass.rollNo },
                { label: 'Hostel', value: activePass.hostel },
                { label: 'Date', value: activePass.date },
                { label: 'Time', value: `${activePass.outTime} – ${activePass.inTime}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <span className="text-[12px] text-text-muted">{label}</span>
                  <span className="text-[13px] font-medium text-text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && <PassHistoryTable />}
    </div>
  )
}
