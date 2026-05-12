import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FlaskConical,
  CalendarCheck,
  ClipboardList,
  Bot,
  Map,
  ShieldCheck,
  UserCheck,
  ScanLine,
  X,
  Sparkles,
} from 'lucide-react'

const navSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
    ],
  },
  {
    title: 'Lab Manager',
    items: [
      { label: 'All Labs', icon: FlaskConical, to: '/labs' },
      { label: 'Book a Lab', icon: CalendarCheck, to: '/labs/book' },
      { label: 'My Bookings', icon: ClipboardList, to: '/labs/my-bookings' },
    ],
  },
  {
    title: 'Campus Bot',
    items: [
      { label: 'Chat', icon: Bot, to: '/bot' },
      { label: 'Campus Map', icon: Map, to: '/bot/map' },
    ],
  },
  {
    title: 'Gate Pass',
    items: [
      { label: 'Student Pass', icon: ShieldCheck, to: '/gatepass' },
      { label: 'Warden Panel', icon: UserCheck, to: '/gatepass/warden' },
      { label: 'Scanner', icon: ScanLine, to: '/gatepass/scanner' },
    ],
  },
]

export default function Sidebar({ open, onClose }) {
  const location = useLocation()

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[252px] flex flex-col
          bg-bg-secondary border-r border-border
          transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-border shrink-0">
          <div className="w-7 h-7 rounded-[8px] bg-accent flex items-center justify-center">
            <Sparkles size={13} className="text-white" />
          </div>
          <div>
            <h1 className="text-text-primary font-semibold text-[13px] leading-tight tracking-[-0.02em]">
              Smart Campus
            </h1>
            <span className="text-text-muted text-[10px] font-medium tracking-[0.08em] uppercase">
              OS v2.0
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-bg-hover transition-all duration-200"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-[0.1em] px-3 mb-1.5">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.to
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={onClose}
                        className={`
                          flex items-center gap-2.5 px-3 py-[7px] rounded-[8px] text-[13px] font-medium
                          transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                          ${isActive
                            ? 'bg-bg-hover dark:bg-white/[0.03] text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                          }
                        `}
                      >
                        <item.icon
                          size={15}
                          className={`transition-colors duration-200 ${
                            isActive ? 'text-accent' : 'text-text-muted'
                          }`}
                          strokeWidth={isActive ? 1.8 : 1.5}
                        />
                        <span className="tracking-[-0.01em]">{item.label}</span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 mt-auto">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bg-hover border border-transparent hover:border-border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.02)] group">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center text-white font-semibold text-[11px] shadow-inner">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-[13px] font-medium truncate tracking-[-0.01em]">Arjun Kumar</p>
              <p className="text-text-muted text-[11px] truncate group-hover:text-text-tertiary transition-colors">CSE — 3rd Year</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
