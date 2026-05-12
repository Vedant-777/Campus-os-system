import { useState, useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble'
import QuickReplies from './QuickReplies'
import { Send, Mic, Paperclip } from 'lucide-react'

const initialMessages = [
  {
    id: 1,
    from: 'bot',
    text: "Hello — I'm your Smart Campus assistant. I can help you find buildings, check lab availability, manage gate passes, and more. How can I help?",
    time: '10:00 AM',
  },
]

const botReplies = {
  'Where is the library?': "The Central Library is in **Block A**, Ground Floor. Open 8 AM – 10 PM.\n\nWould you like directions on the campus map?",
  'Lab availability': "Here's the current status:\n\n• **CS Lab 301** — Available (12 seats)\n• **ML Lab 402** — Occupied until 3 PM\n• **Electronics Lab** — Under Maintenance\n\nShall I book an available lab?",
  'Hostel gate pass': "To apply for a gate pass:\n\n1. Navigate to **Gate Pass → Student Pass**\n2. Fill in your details and reason\n3. Submit for warden approval\n\nTypical approval time is ~2 hours.",
  'Campus events': "Upcoming events:\n\n• **Hackathon 2026** — May 15, Main Auditorium\n• **Tech Talk: AI in Healthcare** — May 16, Seminar Hall\n• **Sports Day** — May 18, Ground\n\nWant details on any event?",
}

export default function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = botReplies[text] || "I'm not sure about that. Try asking about **lab availability**, **building locations**, **gate passes**, or **campus events**."
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full surface-base rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
        {typing && (
          <div className="flex items-center gap-2 px-4 py-3 bg-bg-elevated border border-border rounded-xl rounded-bl-sm w-fit animate-fade-in">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[11px] text-text-muted ml-1">Thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <QuickReplies onSelect={sendMessage} />

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input) }} className="px-4 py-3 border-t border-border flex items-center gap-2">
        <button type="button" className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all">
          <Paperclip size={16} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about campus..."
          className="flex-1 py-2 px-3 rounded-lg bg-bg-hover border border-border text-[13px] text-text-primary
                     placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:ring-1 focus:ring-accent/20 transition-all"
          id="chat-input"
        />
        <button type="button" className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all">
          <Mic size={16} />
        </button>
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 rounded-lg bg-accent text-white hover:bg-accent-deep transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          id="chat-send-btn"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}
