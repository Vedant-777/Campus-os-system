import { Bell } from 'lucide-react'
import { useState } from 'react'

const mockNotifications = [
  { id: 1, title: 'Lab CS-301 available', desc: 'A slot just opened up for 2:00 PM', time: '2m ago', read: false },
  { id: 2, title: 'Booking confirmed', desc: 'Your ML Lab booking at 10 AM is confirmed', time: '1h ago', read: false },
  { id: 3, title: 'Maintenance alert', desc: 'Electronics Lab under maintenance tomorrow', time: '3h ago', read: true },
]

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const unread = mockNotifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 rounded-lg transition-all duration-200 ${
          open ? 'bg-bg-elevated text-text-primary' : 'text-text-tertiary hover:text-text-primary hover:bg-bg-elevated'
        }`}
        id="lab-notifications"
      >
        <Bell size={16} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 w-72 surface-elevated rounded-xl z-50 animate-slide-down overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h4 className="text-[13px] font-semibold text-text-primary">Lab Alerts</h4>
              <span className="text-[11px] font-medium text-accent cursor-pointer hover:underline">Clear all</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-border hover:bg-bg-hover transition-colors cursor-pointer ${
                    !n.read ? 'bg-accent-muted' : ''
                  }`}
                >
                  <p className="text-[13px] font-medium text-text-primary">{n.title}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">{n.desc}</p>
                  <p className="text-[10px] text-text-muted mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
