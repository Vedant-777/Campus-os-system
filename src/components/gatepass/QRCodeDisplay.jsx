import { QRCodeSVG } from 'qrcode.react'
import { Download, Share2 } from 'lucide-react'

export default function QRCodeDisplay({ passData }) {
  if (!passData) return null
  const qrValue = JSON.stringify({ id: passData.id, name: passData.name, rollNo: passData.rollNo, date: passData.date, status: passData.status })

  return (
    <div className="surface-base rounded-xl p-6 text-center animate-scale-in">
      <h4 className="text-[15px] font-semibold text-text-primary mb-1">Your Gate Pass</h4>
      <p className="text-[12px] text-text-tertiary mb-5">Show this QR code at the gate</p>

      <div className="inline-block p-4 bg-white rounded-xl mb-4">
        <QRCodeSVG value={qrValue} size={160} bgColor="#FFFFFF" fgColor="#0B1020" level="H" />
      </div>

      <div className="space-y-1 mb-5">
        <p className="text-[14px] font-semibold text-text-primary">{passData.name}</p>
        <p className="text-[12px] text-text-tertiary">{passData.rollNo} · {passData.hostel}</p>
        <p className="text-[12px] text-accent font-medium">{passData.date} · {passData.outTime} – {passData.inTime}</p>
      </div>

      <div className="flex gap-2 justify-center">
        <button className="px-4 py-2 rounded-lg text-[12px] font-medium bg-bg-elevated text-text-secondary border border-border hover:border-border-hover transition-all flex items-center gap-1.5">
          <Download size={13} /> Download
        </button>
        <button className="px-4 py-2 rounded-lg text-[12px] font-medium bg-bg-elevated text-text-secondary border border-border hover:border-border-hover transition-all flex items-center gap-1.5">
          <Share2 size={13} /> Share
        </button>
      </div>
    </div>
  )
}
