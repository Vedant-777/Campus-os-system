import { useState } from 'react'
import CampusMap from '../../components/bot/CampusMap'
import { Map, Navigation, MapPin, Clock, Phone, Building2 } from 'lucide-react'

export default function MapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <Map size={22} className="text-accent" strokeWidth={1.5} /> Campus Map
        </h1>
        <p className="text-[13px] text-text-muted mt-1">Interactive map of campus buildings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <CampusMap selectedBuilding={selectedBuilding} onSelectBuilding={setSelectedBuilding} />
        </div>

        <div className="space-y-4">
          {selectedBuilding ? (
            <div className="surface-base rounded-xl p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center">
                  <Building2 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-text-primary">{selectedBuilding.name}</h3>
                  <p className="text-[11px] text-text-tertiary capitalize">{selectedBuilding.type}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-[13px] text-text-secondary"><MapPin size={13} className="text-accent" /> ({selectedBuilding.x}%, {selectedBuilding.y}%)</div>
                <div className="flex items-center gap-2 text-[13px] text-text-secondary"><Clock size={13} className="text-cyan" /> 8:00 AM – 6:00 PM</div>
                <div className="flex items-center gap-2 text-[13px] text-text-secondary"><Phone size={13} className="text-success" /> Ext: {1000 + selectedBuilding.id}</div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-[12px] font-medium text-text-secondary mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['WiFi', 'Parking', 'Elevator', 'Canteen'].map(f => (
                    <span key={f} className="px-2 py-0.5 text-[10px] font-medium bg-success/10 text-success rounded border border-success/15">{f}</span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 py-2 rounded-lg text-[13px] font-medium bg-accent hover:bg-accent-deep text-white active:scale-[0.98] transition-all flex items-center justify-center gap-1.5">
                <Navigation size={13} /> Get Directions
              </button>
            </div>
          ) : (
            <div className="surface-base rounded-xl p-8 text-center">
              <MapPin size={32} className="mx-auto text-text-muted mb-3" strokeWidth={1} />
              <p className="text-[13px] font-medium text-text-tertiary">Select a building to view details</p>
            </div>
          )}

          <div className="surface-base rounded-xl p-5">
            <h4 className="text-[13px] font-semibold text-text-primary mb-3">Quick Navigation</h4>
            <div className="space-y-1">
              {[{ name: 'Main Gate', distance: '50m' }, { name: 'Parking Lot A', distance: '120m' }, { name: 'Medical Center', distance: '200m' }, { name: 'Sports Ground', distance: '350m' }].map((place) => (
                <button key={place.name} className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-bg-hover transition-colors text-left">
                  <div className="flex items-center gap-2"><Navigation size={12} className="text-accent" /><span className="text-[13px] text-text-secondary">{place.name}</span></div>
                  <span className="text-[11px] text-text-muted">{place.distance}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
