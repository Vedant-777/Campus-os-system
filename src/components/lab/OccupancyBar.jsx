export default function OccupancyBar({ current, max }) {
  const pct = max > 0 ? Math.round((current / max) * 100) : 0
  const color = pct < 50 ? 'bg-success' : pct < 80 ? 'bg-warning' : 'bg-danger'

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium text-text-muted tracking-[-0.01em]">Occupancy</span>
        <span className="text-[11px] font-semibold text-text-secondary tabular-nums">{pct}%</span>
      </div>
      <div className="h-[3px] bg-bg-elevated rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
          style={{ width: `${pct}%`, opacity: 0.8 }}
        />
      </div>
    </div>
  )
}
