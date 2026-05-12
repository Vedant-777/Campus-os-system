const variants = {
  available: { bg: 'bg-success/8', text: 'text-success', dot: 'bg-success', border: 'border-success/15', label: 'Available' },
  occupied: { bg: 'bg-danger/8', text: 'text-danger', dot: 'bg-danger', border: 'border-danger/15', label: 'Occupied' },
  maintenance: { bg: 'bg-warning/8', text: 'text-warning', dot: 'bg-warning', border: 'border-warning/15', label: 'Maintenance' },
  pending: { bg: 'bg-warning/8', text: 'text-warning', dot: 'bg-warning', border: 'border-warning/15', label: 'Pending' },
  approved: { bg: 'bg-success/8', text: 'text-success', dot: 'bg-success', border: 'border-success/15', label: 'Approved' },
  rejected: { bg: 'bg-danger/8', text: 'text-danger', dot: 'bg-danger', border: 'border-danger/15', label: 'Rejected' },
  expired: { bg: 'bg-text-muted/6', text: 'text-text-muted', dot: 'bg-text-muted', border: 'border-text-muted/10', label: 'Expired' },
  active: { bg: 'bg-accent/8', text: 'text-accent', dot: 'bg-accent', border: 'border-accent/15', label: 'Active' },
}

export default function StatusBadge({ status, label, size = 'sm' }) {
  const variant = variants[status] || variants.available
  const displayLabel = label || variant.label

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-md font-medium border
        ${variant.bg} ${variant.text} ${variant.border}
        ${size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-[3px] text-[11px]'}
      `}
    >
      <span className={`w-1 h-1 rounded-full ${variant.dot}`} />
      {displayLabel}
    </span>
  )
}
