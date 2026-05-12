import StatusBadge from '../common/StatusBadge'
import OccupancyBar from './OccupancyBar'
import { Monitor, Users, Clock, Wifi } from 'lucide-react'

export default function LabCard({ lab, onBook }) {
  return (
    <div className="group card-interactive rounded-xl overflow-hidden">
      {/* Status indicator */}
      <div className={`h-[2px] ${
        lab.status === 'available' ? 'bg-success/60' :
        lab.status === 'occupied' ? 'bg-danger/50' : 'bg-warning/50'
      }`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.02em] group-hover:text-accent transition-colors duration-300">
              {lab.name}
            </h3>
            <p className="text-[11px] text-text-muted mt-0.5">{lab.building} · Floor {lab.floor}</p>
          </div>
          <StatusBadge status={lab.status} />
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {[
            { icon: Monitor, label: `${lab.systems} Systems`, color: 'text-accent' },
            { icon: Users, label: `${lab.occupancy}/${lab.capacity}`, color: 'text-accent' },
            { icon: Clock, label: lab.nextSlot, color: 'text-cyan' },
            { icon: Wifi, label: lab.hasInternet ? 'Connected' : 'No WiFi', color: lab.hasInternet ? 'text-success' : 'text-text-muted' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px] text-text-secondary">
              <stat.icon size={12} className={stat.color} strokeWidth={1.5} />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <OccupancyBar current={lab.occupancy} max={lab.capacity} />

        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
          {lab.software.slice(0, 3).map((sw) => (
            <span key={sw} className="px-2 py-0.5 text-[10px] font-medium bg-bg-elevated text-text-tertiary rounded-md border border-border">
              {sw}
            </span>
          ))}
          {lab.software.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-medium text-text-muted rounded-md">
              +{lab.software.length - 3}
            </span>
          )}
        </div>

        <button
          onClick={() => onBook?.(lab)}
          disabled={lab.status !== 'available'}
          className="w-full py-2 rounded-lg text-[12px] font-semibold transition-all duration-300
                     disabled:opacity-20 disabled:cursor-not-allowed
                     bg-accent hover:bg-accent-deep text-white active:scale-[0.98]"
          id={`book-lab-${lab.id}`}
        >
          {lab.status === 'available' ? 'Book Now' : lab.status === 'occupied' ? 'Occupied' : 'Under Maintenance'}
        </button>
      </div>
    </div>
  )
}
