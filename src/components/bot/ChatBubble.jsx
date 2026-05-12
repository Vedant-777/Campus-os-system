import { Bot, User } from 'lucide-react'

export default function ChatBubble({ message }) {
  const isBot = message.from === 'bot'

  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>
      }
      return part.split('\n').map((line, j) => (
        <span key={`${i}-${j}`}>{j > 0 && <br />}{line}</span>
      ))
    })
  }

  return (
    <div className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'} animate-fade-in`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
        isBot ? 'bg-accent/10 border border-accent/20' : 'bg-cyan-muted border border-cyan/20'
      }`}>
        {isBot ? <Bot size={14} className="text-accent" /> : <User size={14} className="text-cyan" />}
      </div>

      <div className={`max-w-[75%] px-4 py-3 text-[13px] leading-relaxed ${
        isBot
          ? 'bg-bg-hover border border-border text-text-secondary rounded-xl rounded-tl-sm'
          : 'bg-accent text-white rounded-xl rounded-tr-sm'
      }`}>
        <div className="whitespace-pre-wrap">{renderText(message.text)}</div>
        <p className={`text-[10px] mt-1.5 ${isBot ? 'text-text-muted' : 'text-white/50'}`}>
          {message.time}
        </p>
      </div>
    </div>
  )
}
