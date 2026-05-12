import { Link } from 'react-router-dom'
import {
  FlaskConical, Bot, ShieldCheck, Users, Monitor, TrendingUp,
  ArrowRight, CalendarCheck, Clock, Activity, Zap, BarChart3, Sparkles, ChevronRight
} from 'lucide-react'
import StatusCard from '../components/bot/StatusCard'

const quickLinks = [
  {
    title: 'Lab Manager',
    desc: 'Monitor & book campus labs in real-time',
    icon: FlaskConical,
    to: '/labs',
    stats: '12 Labs · 3 Available',
    iconColor: 'text-accent',
  },
  {
    title: 'Campus Bot',
    desc: 'AI assistant for campus navigation & info',
    icon: Bot,
    to: '/bot',
    stats: '24/7 Available',
    iconColor: 'text-cyan',
  },
  {
    title: 'Gate Pass',
    desc: 'Digital hostel gate pass management',
    icon: ShieldCheck,
    to: '/gatepass',
    stats: '4 Pending Approvals',
    iconColor: 'text-success',
  },
]

const recentActivity = [
  { text: 'Lab CS-301 booked by Arjun Kumar', time: '5 min ago', icon: CalendarCheck, color: 'text-accent' },
  { text: 'Gate pass approved — Sneha Gupta', time: '23 min ago', icon: ShieldCheck, color: 'text-success' },
  { text: 'ML Lab 402 maintenance started', time: '1 hr ago', icon: Activity, color: 'text-warning' },
  { text: 'New bot query: "Where is library?"', time: '2 hr ago', icon: Bot, color: 'text-cyan' },
  { text: 'Electronics Lab is now available', time: '3 hr ago', icon: Zap, color: 'text-accent' },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">

      {/* ── Cinematic Hero ── */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #1A1211 0%, #3A2726 45%, #674846 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 32px rgba(0,0,0,0.25)',
        }}
      >
        {/* Ambient lighting — restrained */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 50%)' }} />
        <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(189, 133, 129, 0.08) 0%, transparent 55%)', animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(235, 185, 178, 0.04) 0%, transparent 50%)', animationDuration: '8s', animationDelay: '3s' }} />

        {/* Glass reflection — very subtle */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 35%)' }} />

        {/* Architectural grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to top, rgba(11,16,32,0.3) 0%, transparent 100%)' }} />

        {/* Content */}
        <div className="relative z-10 px-8 py-10 md:px-12 md:py-[52px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[11px] font-medium text-white/50 mb-5 backdrop-blur-sm">
            <Sparkles size={11} className="text-blue-300/70" />
            Campus Intelligence Platform
          </div>

          <h1 className="text-[32px] md:text-[40px] font-semibold text-white tracking-[-0.03em] leading-[1.1]">
            Welcome back, Arjun
          </h1>
          <p className="text-white/60 text-[14px] md:text-[15px] mt-3 max-w-lg leading-relaxed tracking-[-0.01em]">
            Your unified dashboard for lab management, campus navigation, and gate pass operations.
          </p>

          <div className="flex items-center gap-3 mt-8">
            <Link
              to="/labs"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.14] text-white text-[13px] font-medium backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.97]"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              <FlaskConical size={14} className="text-white/70" />
              Browse Labs
              <ChevronRight size={13} className="text-white/30 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-300" />
            </Link>
            <Link
              to="/bot"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white/50 hover:text-white/80 text-[13px] font-medium transition-all duration-300 hover:bg-white/[0.03]"
            >
              <Bot size={14} />
              Ask Campus Bot
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard icon={Monitor} label="Total Labs" value="12" trend="2 new" trendUp color="accent" />
        <StatusCard icon={Users} label="Active Students" value="2,847" trend="12%" trendUp color="cyan" />
        <StatusCard icon={ShieldCheck} label="Passes Today" value="34" trend="8%" trendUp color="success" />
        <StatusCard icon={BarChart3} label="Bot Queries" value="156" trend="23%" trendUp color="accent" />
      </div>

      {/* ── Quick Access ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[17px] font-semibold text-text-primary tracking-[-0.02em]">Quick Access</h2>
          <span className="text-[11px] text-text-muted">3 modules</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="group card-interactive rounded-xl p-6 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="icon-container icon-container-lg mb-5 group-hover:border-border-hover transition-all duration-300">
                <link.icon size={19} className={link.iconColor} strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary mb-1 tracking-[-0.02em] group-hover:text-accent transition-colors duration-300">
                {link.title}
              </h3>
              <p className="text-[13px] text-text-tertiary mb-5 leading-relaxed">{link.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-[11px] font-medium text-text-muted">{link.stats}</span>
                <ArrowRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Activity + Schedule ── */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Activity Feed */}
        <div className="lg:col-span-3 surface-base rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-text-primary flex items-center gap-2 tracking-[-0.01em]">
              <Activity size={14} className="text-accent" strokeWidth={1.5} />
              Recent Activity
            </h3>
            <button className="text-[11px] text-text-muted hover:text-accent transition-colors font-medium">View all</button>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-bg-hover/50 transition-colors duration-200"
              >
                <div className="icon-container shrink-0">
                  <item.icon size={14} className={item.color} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-text-secondary truncate">{item.text}</p>
                </div>
                <span className="text-[11px] text-text-muted shrink-0 tabular-nums">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="lg:col-span-2 surface-base rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-text-primary flex items-center gap-2 tracking-[-0.01em]">
              <Clock size={14} className="text-cyan" strokeWidth={1.5} />
              Today's Schedule
            </h3>
            <span className="text-[11px] text-text-muted tabular-nums">4 events</span>
          </div>
          <div className="p-4 space-y-2">
            {[
              { time: '09:00', event: 'ML Lab Session', venue: 'CS Lab 301', accent: 'border-accent bg-accent/[0.03]' },
              { time: '11:30', event: 'Project Review', venue: 'Seminar Hall', accent: 'border-cyan bg-cyan/[0.03]' },
              { time: '14:00', event: 'Electronics Lab', venue: 'ECE Block', accent: 'border-success bg-success/[0.03]' },
              { time: '16:30', event: 'Club Meeting', venue: 'Room 204', accent: 'border-warning bg-warning/[0.03]' },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border-l-2 ${item.accent} hover:bg-bg-hover/40 transition-all duration-200 cursor-pointer`}
              >
                <p className="text-[11px] font-semibold text-text-tertiary tabular-nums tracking-wide">{item.time}</p>
                <p className="text-[13px] font-semibold text-text-primary mt-0.5 tracking-[-0.01em]">{item.event}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{item.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
