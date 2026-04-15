// ============================================================
// USER PARKING - Desktop Map
// ============================================================
import { useState } from 'react'

const ZONES = [
  { id:'A', name:'Khu A - Tòa A1', available: 23, total: 100, busy: true },
  { id:'B', name:'Khu B - Tòa A4', available: 58, total: 100, busy: false },
  { id:'C', name:'Khu C - Sân vận động', available: 12, total: 100, busy: true },
  { id:'D', name:'Khu D - Thư viện', available: 41, total: 100, busy: false },
]

const SLOT_TYPES = ['available','occupied','ev']

function genSlots(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: SLOT_TYPES[Math.floor(Math.random() * SLOT_TYPES.length)]
  }))
}

export default function UserParking() {
  const [selectedZone, setSelectedZone] = useState(ZONES[0])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [slots] = useState(() => {
    const m = {}
    ZONES.forEach(z => m[z.id] = genSlots(z.total))
    return m
  })
  const [showConfirm, setShowConfirm] = useState(false)

  const handleBook = () => {
    setShowConfirm(false)
    alert(`✅ Đã đặt chỗ ${selectedZone?.id}-${String(selectedSlot).padStart(2,'0')} thành công!`)
    setSelectedSlot(null)
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Bản đồ bãi đỗ xe</h2>
        <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>Xem tình trạng các khu vực và chọn vị trí đỗ xe mong muốn.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: 24, alignItems: 'flex-start' }}>
        
        {/* Left Side: Zones list */}
        <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>list</span>
              Danh sách khu vực
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ZONES.map(z => {
                const pct = Math.round((z.available / z.total) * 100)
                const statusColor = pct > 40 ? '#22c55e' : pct > 20 ? '#f59e0b' : '#ef4444'
                const isSelected = selectedZone?.id === z.id
                return (
                <div key={z.id} style={{ 
                    padding: 16, cursor: 'pointer', borderRadius: 12, 
                    border: `1.5px solid ${isSelected ? '#003d9b' : '#e2e8f0'}`,
                    background: isSelected ? '#eff6ff' : '#fff',
                    transition: 'all 0.2s' 
                    }}
                    onClick={() => { setSelectedZone(z); setSelectedSlot(null); }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: isSelected ? '#003d9b' : `${statusColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 24, color: isSelected ? '#fff' : statusColor, fontVariationSettings: "'FILL' 1" }}>local_parking</span>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: isSelected ? '#003d9b' : '#1e293b' }}>{z.name}</p>
                        </div>
                        <p style={{ fontSize: 13, color: '#64748b', margin: 0, fontWeight: 500 }}>{z.available} trống / {z.total} chỗ</p>
                    </div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>

        {/* Right Side: Map & Selection */}
        <div className="card" style={{ padding: 24 }}>
          {selectedZone ? (
             <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#0f172a' }}>Sơ đồ {selectedZone.name}</h3>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {[['#22c55e','Trống'],['#cbd5e1','Đã đỗ'],['#3b82f6','Sạc EV']].map(([c,l]) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />{l}
                        </div>
                        ))}
                    </div>
                </div>

                {/* Slot Grid Desktop */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))', gap: 8, background: '#f8fafc', borderRadius: 16, padding: 20, border: '1px solid #e2e8f0', marginBottom: 24 }}>
                    {slots[selectedZone.id].map(slot => {
                    const colors = {
                        available: { bg: '#fff', border: '#bbf7d0', text: '#22c55e', shadow: '0 2px 4px rgba(34,197,94,0.1)' },
                        occupied:  { bg: '#f1f5f9', border: '#cbd5e1', text: '#94a3b8', shadow: 'none' },
                        ev:        { bg: '#eff6ff', border: '#bfdbfe', text: '#3b82f6', shadow: '0 2px 4px rgba(59,130,246,0.1)' },
                    }
                    const c = colors[slot.type]
                    const isSelected = selectedSlot === slot.id && slot.type !== 'occupied'
                    return (
                        <div key={slot.id}
                        onClick={() => slot.type !== 'occupied' && setSelectedSlot(slot.id)}
                        style={{ 
                            aspectRatio: '1', 
                            background: isSelected ? '#003d9b' : c.bg, 
                            border: `2px solid ${isSelected ? '#003d9b' : c.border}`, 
                            borderRadius: 10, 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            cursor: slot.type === 'occupied' ? 'not-allowed' : 'pointer', 
                            transition: 'all 0.15s',
                            boxShadow: isSelected ? '0 4px 12px rgba(0,61,155,0.3)' : c.shadow
                        }}
                        onMouseOver={e => { if (slot.type !== 'occupied' && !isSelected) e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseOut={e => { if (slot.type !== 'occupied' && !isSelected) e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                        {slot.type === 'ev' && !isSelected && <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#3b82f6', fontVariationSettings: "'FILL' 1" }}>electric_bolt</span>}
                        {slot.type === 'occupied' && <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#cbd5e1', fontVariationSettings: "'FILL' 1" }}>directions_car</span>}
                        {slot.type === 'available' && !isSelected && <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e' }}>{slot.id}</span>}
                        {isSelected && <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff' }}>check</span>}
                        </div>
                    )
                    })}
                </div>

                {selectedSlot && (
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#1d4ed8', margin: '0 0 4px 0' }}>Vị trí được chọn</p>
                        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: '#003d9b', margin: 0 }}>{selectedZone.id}-{String(selectedSlot).padStart(2,'0')}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowConfirm(true)} style={{ padding: '14px 28px', fontSize: 15 }}>
                        Xác nhận đặt chỗ
                    </button>
                    </div>
                )}
             </>
          ) : (
            <div style={{ height: '100%', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', flexDirection: 'column' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#e2e8f0', marginBottom: 16 }}>map</span>
                <p style={{ fontSize: 16, fontWeight: 600 }}>Vui lòng chọn một khu vực để xem sơ đồ</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div style={{ padding: 32 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 32, fontVariationSettings: "'FILL' 1" }}>local_parking</span>
              </div>
              <h3 style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, margin: '0 0 12px 0' }}>Xác nhận đặt chỗ</h3>
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: 15, margin: '0 0 24px 0', lineHeight: 1.5 }}>
                Bạn xác nhận đặt trước chỗ đỗ xe số <br/>
                <strong style={{ color: '#003d9b', fontSize: 18 }}>{selectedZone?.id}-{String(selectedSlot).padStart(2,'0')}</strong> tại <strong>{selectedZone?.name}</strong>?
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-ghost" onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: 14 }}>Hủy bỏ</button>
                <button className="btn btn-primary" onClick={handleBook} style={{ flex: 1, padding: 14 }}>Đồng ý đặt chỗ</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
