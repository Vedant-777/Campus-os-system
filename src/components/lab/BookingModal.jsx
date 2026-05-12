import { X, Clock, Monitor, MapPin, CalendarCheck } from 'lucide-react'
import { useState } from 'react'

const timeSlots = [
  '08:00 – 09:00', '09:00 – 10:00', '10:00 – 11:00', '11:00 – 12:00',
  '12:00 – 13:00', '14:00 – 15:00', '15:00 – 16:00', '16:00 – 17:00',
]

export default function BookingModal({ lab, onClose, onConfirm }) {
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [purpose, setPurpose] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  if (!lab) return null

  const handleConfirm = () => {
    setConfirmed(true)
    setTimeout(() => {
      onConfirm?.({ lab, slot: selectedSlot, purpose })
      onClose()
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative surface-elevated rounded-2xl w-full max-w-lg animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-accent-deep to-accent p-5 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-semibold text-white">{lab.name}</h3>
              <p className="text-white/60 text-[12px] flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} /> {lab.building} · Floor {lab.floor}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white">
              <X size={16} />
            </button>
          </div>
          <div className="flex gap-4 mt-3 text-[12px] text-white/70">
            <span className="flex items-center gap-1.5"><Monitor size={13} /> {lab.systems} Systems</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> 1hr slots</span>
          </div>
        </div>

        {confirmed ? (
          <div className="p-10 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
              <CalendarCheck size={28} className="text-success" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-1">Booking Confirmed</h4>
            <p className="text-text-secondary text-[13px]">{lab.name} — {selectedSlot}</p>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            <div>
              <label className="text-[13px] font-medium text-text-primary mb-2 block">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => {
                  const taken = slot === '10:00 – 11:00' || slot === '14:00 – 15:00'
                  return (
                    <button
                      key={slot}
                      disabled={taken}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-[12px] font-medium border transition-all duration-200
                        ${taken
                          ? 'bg-bg-primary text-text-muted border-border cursor-not-allowed line-through'
                          : selectedSlot === slot
                            ? 'bg-accent text-white border-accent glow-accent'
                            : 'bg-bg-hover text-text-secondary border-border hover:border-border-hover'
                        }`}
                    >
                      {slot}
                      {taken && <span className="block text-[10px] mt-0.5 no-underline">Booked</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-text-primary mb-2 block">Purpose</label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Machine Learning Lab Assignment, Project Demo..."
                rows={3}
                className="w-full rounded-lg border border-border bg-bg-hover px-4 py-3 text-[13px] text-text-primary
                           placeholder:text-text-muted focus:outline-none focus:border-border-hover focus:ring-1 focus:ring-accent/20
                           resize-none transition-all duration-200"
                id="booking-purpose"
              />
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedSlot || !purpose.trim()}
              className="w-full py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200
                         bg-accent hover:bg-accent-deep text-white active:scale-[0.98]
                         disabled:opacity-30 disabled:cursor-not-allowed"
              id="confirm-booking-btn"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
