import { useLocation } from 'react-router-dom'
import { Menu, Bell, Search, Sun, Moon, User, Settings, LogOut, CheckCircle2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const pageTitles = {
  '/': 'Dashboard',
  '/labs': 'Lab Manager',
  '/labs/book': 'Book a Lab',
  '/labs/my-bookings': 'My Bookings',
  '/bot': 'Campus Bot',
  '/bot/map': 'Campus Map',
  '/gatepass': 'Student Gate Pass',
  '/gatepass/warden': 'Warden Panel',
  '/gatepass/scanner': 'Pass Scanner',
}

const mockNotifications = [
  { id: 1, title: 'Gate Pass Approved', desc: 'Your pass for City Hospital has been approved.', time: '10m ago', read: false },
  { id: 2, title: 'Lab Booking Confirmed', desc: 'CS Lab 301 — 10:00 AM tomorrow.', time: '1h ago', read: false },
  { id: 3, title: 'System Update', desc: 'Smart Campus OS updated to v2.0.', time: '2h ago', read: true },
]

export default function Navbar({ onMenuClick }) {
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const title = pageTitles[location.pathname] || 'Smart Campus OS'
  const navRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNotifications(false)
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      ref={navRef}
      className="h-[52px] bg-bg-primary/60 backdrop-blur-xl border-b border-border flex items-center px-4 md:px-6 gap-4 shrink-0 z-30"
    >
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-bg-elevated text-text-tertiary hover:text-text-primary transition-all duration-200"
        id="mobile-menu-btn"
      >
        <Menu size={16} />
      </button>

      <h2 className="text-[14px] font-semibold text-text-primary hidden sm:block tracking-[-0.02em]">
        {title}
      </h2>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted z-10" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-1.5 rounded-md bg-black/5 dark:bg-black/20 border border-border/50
                     text-[13px] text-text-primary placeholder:text-text-muted
                     shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
                     focus:outline-none focus:bg-bg-secondary focus:border-accent/40 focus:ring-1 focus:ring-accent/20 focus:shadow-none
                     transition-all duration-200"
          id="global-search"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-text-muted bg-bg-secondary/80 px-1.5 py-0.5 rounded border border-border/50 font-mono hidden md:inline shadow-sm">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-all duration-200"
          id="theme-toggle"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              showNotifications
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-tertiary hover:text-text-primary hover:bg-bg-elevated'
            }`}
            id="notifications-btn"
          >
            <Bell size={16} />
            {mockNotifications.some(n => !n.read) && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 surface-elevated rounded-xl z-50 animate-slide-down overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h4 className="text-[13px] font-semibold text-text-primary">Notifications</h4>
                <span className="text-[11px] font-medium text-accent cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-border flex gap-3 items-start hover:bg-bg-hover transition-colors cursor-pointer ${
                      !n.read ? 'bg-accent-muted' : ''
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.read
                        ? <CheckCircle2 size={14} className="text-success" />
                        : <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5" />
                      }
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-text-primary">{n.title}</p>
                      <p className="text-[12px] text-text-secondary mt-0.5">{n.desc}</p>
                      <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center text-white font-semibold text-[11px] ml-1 cursor-pointer hover:opacity-90 transition-opacity"
          >
            AK
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-52 surface-elevated rounded-xl z-50 animate-slide-down overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-[13px] font-semibold text-text-primary">Arjun Kumar</p>
                <p className="text-[11px] text-text-tertiary">arjun.k@university.edu</p>
              </div>
              <div className="p-1.5">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all duration-200">
                  <User size={14} /> My Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all duration-200">
                  <Settings size={14} /> Settings
                </button>
              </div>
              <div className="p-1.5 border-t border-border">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-danger hover:bg-danger/10 rounded-lg transition-all duration-200">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
