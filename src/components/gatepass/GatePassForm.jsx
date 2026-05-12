import { useState } from 'react'
import { Send, Calendar, Clock, MapPin, FileText } from 'lucide-react'

export default function GatePassForm({ onSubmit }) {
  const [form, setForm] = useState({ destination: '', reason: '', date: '', outTime: '', inTime: '', contact: '' })
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const reasons = ['Medical Emergency', 'Family Visit', 'Academic Event', 'Personal Errand', 'Internship/Interview', 'Other']

  const inputClass = "w-full rounded-lg border border-border bg-bg-hover px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:ring-1 focus:ring-accent/20 transition-all duration-200"

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(form) }} className="surface-base rounded-xl p-6 animate-fade-in">
      <h3 className="text-[17px] font-semibold text-text-primary mb-1">Apply for Gate Pass</h3>
      <p className="text-[13px] text-text-tertiary mb-6">Fill in details for warden approval</p>

      <div className="space-y-4">
        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1.5 flex items-center gap-1.5 block">
            <MapPin size={13} className="text-accent" /> Destination
          </label>
          <input name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. City Hospital, Home" className={inputClass} required id="gp-destination" />
        </div>

        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1.5 flex items-center gap-1.5 block">
            <FileText size={13} className="text-accent" /> Reason
          </label>
          <select name="reason" value={form.reason} onChange={handleChange} className={inputClass} required id="gp-reason">
            <option value="">Select reason</option>
            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1.5 flex items-center gap-1.5 block">
            <Calendar size={13} className="text-cyan" /> Date
          </label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} required id="gp-date" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1.5 flex items-center gap-1.5 block">
              <Clock size={13} className="text-cyan" /> Out Time
            </label>
            <input type="time" name="outTime" value={form.outTime} onChange={handleChange} className={inputClass} required id="gp-out-time" />
          </div>
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1.5 flex items-center gap-1.5 block">
              <Clock size={13} className="text-cyan" /> Return
            </label>
            <input type="time" name="inTime" value={form.inTime} onChange={handleChange} className={inputClass} required id="gp-in-time" />
          </div>
        </div>

        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1.5 block">Emergency Contact</label>
          <input name="contact" value={form.contact} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} required id="gp-contact" />
        </div>

        <button type="submit" className="w-full py-2.5 rounded-lg text-[13px] font-semibold bg-accent hover:bg-accent-deep text-white active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2" id="gp-submit-btn">
          <Send size={14} /> Submit for Approval
        </button>
      </div>
    </form>
  )
}
