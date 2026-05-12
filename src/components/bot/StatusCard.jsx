export default function StatusCard({ icon: Icon, label, value, trend, trendUp, color = 'accent' }) {
  const iconColorMap = {
    accent: 'text-accent',
    cyan: 'text-cyan',
    success: 'text-success',
    warning: 'text-warning',
  }

  return (
    <div className="card-interactive rounded-xl p-5 group">
      <div className="flex items-start justify-between">
        <div className="icon-container group-hover:border-border-hover transition-all duration-200">
          <Icon size={16} className={iconColorMap[color] || 'text-accent'} strokeWidth={1.5} />
        </div>
        {trend && (
          <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${
            trendUp ? 'text-success bg-success/8' : 'text-danger bg-danger/8'
          }`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className="text-[28px] font-semibold text-text-primary mt-4 tracking-[-0.04em] leading-none">{value}</p>
      <p className="text-[12px] text-text-muted mt-1.5 tracking-[-0.005em]">{label}</p>
    </div>
  )
}
