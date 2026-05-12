import ChatWindow from '../../components/bot/ChatWindow'
import StatusCard from '../../components/bot/StatusCard'
import { Bot, MessageSquare, Clock, Zap } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <Bot size={22} className="text-cyan" strokeWidth={1.5} /> Campus Bot
        </h1>
        <p className="text-[13px] text-text-muted mt-1">AI-powered campus assistant</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 h-[calc(100vh-200px)] min-h-[500px]">
          <ChatWindow />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatusCard icon={MessageSquare} label="Queries Today" value="156" color="accent" />
            <StatusCard icon={Clock} label="Avg Response" value="1.2s" color="cyan" />
          </div>

          <div className="surface-base rounded-xl p-5">
            <h4 className="text-[13px] font-semibold text-text-primary mb-3 flex items-center gap-1.5">
              <Zap size={13} className="text-cyan" /> Popular Topics
            </h4>
            <div className="space-y-3">
              {[
                { topic: 'Lab Availability', count: 45, pct: 90 },
                { topic: 'Building Locations', count: 32, pct: 64 },
                { topic: 'Gate Pass Info', count: 28, pct: 56 },
                { topic: 'Events & Schedule', count: 22, pct: 44 },
                { topic: 'Hostel Queries', count: 15, pct: 30 },
              ].map((t) => (
                <div key={t.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-medium text-text-secondary">{t.topic}</span>
                    <span className="text-[10px] text-text-muted">{t.count}</span>
                  </div>
                  <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${t.pct}%`, opacity: 0.7 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-base rounded-xl p-5">
            <h4 className="text-[13px] font-semibold text-text-primary mb-2">About Campus Bot</h4>
            <p className="text-[12px] text-text-tertiary leading-relaxed">
              AI-powered assistant for campus navigation, lab status, events, and gate pass information.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Navigation', 'Labs', 'Events', 'Gate Pass', 'Hostel'].map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-bg-elevated text-text-tertiary rounded border border-border">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
