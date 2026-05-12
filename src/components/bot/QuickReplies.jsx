const quickOptions = [
  'Where is the library?',
  'Lab availability',
  'Hostel gate pass',
  'Campus events',
]

export default function QuickReplies({ onSelect }) {
  return (
    <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto">
      {quickOptions.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium
                     bg-bg-elevated text-text-secondary border border-border
                     hover:border-accent/30 hover:text-accent hover:bg-accent-muted
                     transition-all duration-200 active:scale-95"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
