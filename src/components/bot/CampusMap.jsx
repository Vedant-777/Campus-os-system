import { MapPin, Navigation } from 'lucide-react'

const buildings = [
  { id: 1, name: 'Main Block', x: 30, y: 25, type: 'academic' },
  { id: 2, name: 'CS Department', x: 55, y: 20, type: 'academic' },
  { id: 3, name: 'Library', x: 45, y: 45, type: 'facility' },
  { id: 4, name: 'Canteen', x: 70, y: 55, type: 'facility' },
  { id: 5, name: 'Boys Hostel', x: 20, y: 70, type: 'hostel' },
  { id: 6, name: 'Girls Hostel', x: 80, y: 70, type: 'hostel' },
  { id: 7, name: 'Sports Complex', x: 50, y: 80, type: 'facility' },
  { id: 8, name: 'Admin Block', x: 15, y: 40, type: 'admin' },
  { id: 9, name: 'Auditorium', x: 65, y: 35, type: 'facility' },
  { id: 10, name: 'Lab Complex', x: 40, y: 15, type: 'academic' },
]

const typeColors = {
  academic: 'bg-accent',
  facility: 'bg-cyan',
  hostel: 'bg-success',
  admin: 'bg-warning',
}

const typeLabels = {
  academic: 'Academic',
  facility: 'Facility',
  hostel: 'Hostel',
  admin: 'Admin',
}

export default function CampusMap({ selectedBuilding, onSelectBuilding }) {
  return (
    <div className="surface-base rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center gap-4">
        <h4 className="text-[13px] font-semibold text-text-primary flex items-center gap-1.5">
          <Navigation size={13} className="text-accent" /> Campus Map
        </h4>
        <div className="flex gap-3 ml-auto">
          {Object.entries(typeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-sm ${typeColors[type]} opacity-70`} />
              <span className="text-[10px] text-text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[400px] bg-bg-primary p-4">
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366F1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(99,102,241,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(99,102,241,0.08)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>

        {buildings.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelectBuilding?.(b)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300
              ${selectedBuilding?.id === b.id ? 'z-20 scale-125' : 'z-10 hover:scale-110'}`}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <div className={`w-7 h-7 rounded-lg ${typeColors[b.type]} flex items-center justify-center shadow-lg transition-all duration-300
              ${selectedBuilding?.id === b.id ? 'ring-2 ring-white/20 shadow-accent/20' : 'opacity-70 hover:opacity-100'}`}>
              <MapPin size={12} className="text-white" />
            </div>
            <div className={`absolute left-1/2 -translate-x-1/2 top-9 bg-bg-elevated text-text-primary px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap border border-border transition-all duration-200
              ${selectedBuilding?.id === b.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
              {b.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
