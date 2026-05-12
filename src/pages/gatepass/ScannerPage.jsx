import { useState } from 'react'
import { ScanLine, Camera, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react'

const mockScanResults = [
  { name: 'Arjun Kumar', rollNo: 'CSE-21-045', hostel: 'Block A - Room 302', passId: 'GP-2026-004', date: '2026-05-13', outTime: '10:00', inTime: '18:00', status: 'approved', valid: true },
  { name: 'Rahul Sharma', rollNo: 'CSE-21-050', hostel: 'Block A - Room 105', passId: 'GP-2026-007', date: '2026-05-11', outTime: '09:00', inTime: '14:00', status: 'expired', valid: false },
]

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [scanHistory, setScanHistory] = useState([])

  const simulateScan = () => {
    setScanning(true); setResult(null)
    setTimeout(() => {
      const res = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      setResult(res)
      setScanHistory(prev => [{ ...res, scannedAt: new Date().toLocaleTimeString() }, ...prev])
      setScanning(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-7 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2 tracking-[-0.03em]">
          <ScanLine size={22} className="text-cyan" strokeWidth={1.5} /> Gate Scanner
        </h1>
        <p className="text-[13px] text-text-muted mt-1">Scan QR codes to verify gate passes</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="surface-base rounded-xl overflow-hidden">
          <div className="aspect-square bg-bg-primary relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />
            <div className={`w-44 h-44 border rounded-xl relative z-10 transition-all duration-500 ${scanning ? 'border-cyan animate-pulse' : 'border-border'}`}>
              <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-accent rounded-tl-lg" />
              <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-accent rounded-tr-lg" />
              <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-accent rounded-bl-lg" />
              <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-accent rounded-br-lg" />
              {scanning && <div className="absolute inset-0 overflow-hidden rounded-xl"><div className="w-full h-0.5 bg-cyan absolute animate-bounce" style={{ animationDuration: '1.5s' }} /></div>}
            </div>
            <p className="absolute bottom-5 left-0 right-0 text-center z-10 text-[12px] text-text-muted">{scanning ? 'Scanning...' : 'Position QR code in frame'}</p>
          </div>
          <div className="p-4">
            <button onClick={simulateScan} disabled={scanning} className="w-full py-2.5 rounded-lg text-[13px] font-semibold bg-accent hover:bg-accent-deep text-white active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2" id="scan-btn">
              <Camera size={16} /> {scanning ? 'Scanning...' : 'Scan QR Code'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {result && (
            <div className={`rounded-xl border p-5 animate-scale-in ${result.valid ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'}`}>
              <div className="flex items-center gap-3 mb-4">
                {result.valid ? <CheckCircle2 size={28} className="text-success" /> : <XCircle size={28} className="text-danger" />}
                <div>
                  <h3 className={`text-[17px] font-semibold ${result.valid ? 'text-success' : 'text-danger'}`}>{result.valid ? 'Valid Pass' : 'Invalid Pass'}</h3>
                  <p className={`text-[12px] ${result.valid ? 'text-success/70' : 'text-danger/70'}`}>{result.valid ? 'Authorized to leave' : 'Pass expired or unauthorized'}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[['Name', result.name], ['Roll No', result.rollNo], ['Pass ID', result.passId], ['Date', result.date], ['Time', `${result.outTime} – ${result.inTime}`]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-[13px]">
                    <span className="text-text-secondary">{l}</span>
                    <span className="font-medium text-text-primary">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && (
            <div className="surface-base rounded-xl p-8 text-center">
              <ScanLine size={32} className="mx-auto text-text-muted mb-3" strokeWidth={1} />
              <p className="text-[13px] text-text-tertiary font-medium">Scan a QR code to verify</p>
            </div>
          )}

          {scanHistory.length > 0 && (
            <div className="surface-base rounded-xl p-5">
              <h4 className="text-[13px] font-semibold text-text-primary mb-3 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-accent" /> Recent Scans
              </h4>
              <div className="space-y-1">
                {scanHistory.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-bg-hover transition-colors">
                    {s.valid ? <CheckCircle2 size={14} className="text-success shrink-0" /> : <AlertTriangle size={14} className="text-danger shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-text-primary truncate">{s.name}</p>
                      <p className="text-[10px] text-text-muted">{s.passId} · {s.scannedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
