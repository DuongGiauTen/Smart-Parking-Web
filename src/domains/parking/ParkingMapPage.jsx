// ============================================================
// PARKING MAP - Zone selector + 100-slot grid
// ============================================================
import { useState } from 'react'

const ZONES = ['A','B','C','D']
const TYPES = ['available','occupied','ev','vip']
const TYPE_COUNTS = { available: 0, occupied: 0, ev: 0, vip: 0 }

function genSlots(zone) {
  const slots = []
  for (let i = 1; i <= 100; i++) {
    const t = TYPES[Math.floor(Math.random() * TYPES.length)]
    slots.push({ id: `${zone}-${String(i).padStart(2,'0')}`, type: t })
  }
  return slots
}

const slotStyle = {
  available: { bg: '#f0fdf4', border: '#bbf7d0', label: 'TRỐNG', labelC: '#16a34a', labelB: '#166534', icon: null },
  occupied:  { bg: '#f1f5f9', border: '#cbd5e1', label: null, labelC: '', labelB: '#64748b', icon: 'directions_car', iconC: '#94a3b8' },
  ev:        { bg: '#eff6ff', border: '#bfdbfe', label: null, labelC: '', labelB: '#1d4ed8', icon: 'electric_bolt', iconC: '#3b82f6' },
  vip:       { bg: '#fffbeb', border: '#fde68a', label: null, labelC: '', labelB: '#92400e', icon: 'stars', iconC: '#f59e0b' },
}

function ParkingSlot({ slot, isSelected, onClick }) {
  const s = slotStyle[slot.type]
  const cursor = slot.type === 'occupied' ? 'not-allowed' : 'pointer'
  return (
    <div onClick={() => slot.type !== 'occupied' && onClick(slot)}
      style={{ aspectRatio: '1', background: s.bg, border: `1.5px solid ${isSelected ? '#003d9b' : s.border}`, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, cursor, transition: 'transform 0.15s, border-color 0.15s', transform: isSelected ? 'scale(1.08)' : 'scale(1)' }}
      onMouseOver={e => { if (slot.type !== 'occupied') e.currentTarget.style.transform = 'scale(1.08)' }}
      onMouseOut={e => { if (!isSelected) e.currentTarget.style.transform = 'scale(1)' }}>
      {s.label && <span style={{ fontSize: 8, fontWeight: 800, color: s.labelC, fontFamily: "'Space Grotesk',sans-serif" }}>{s.label}</span>}
      {s.icon && <span className="material-symbols-outlined" style={{ fontSize: 15, color: s.iconC, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>}
      <span style={{ fontSize: 8, fontWeight: 700, color: s.labelB }}>{slot.id}</span>
    </div>
  )
}

export default function ParkingMap() {
  const [activeZone, setActiveZone] = useState('A')
  const [slotsMap] = useState(() => {
    const m = {}
    ZONES.forEach(z => m[z] = genSlots(z))
    return m
  })
  const [selected, setSelected] = useState(null)

  const slots = slotsMap[activeZone]
  const available = slots.filter(s => s.type === 'available').length

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e293b', margin: '0 0 6px 0' }}>Bản đồ bãi xe chi tiết</h2>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Quản lý và giám sát trạng thái bãi đỗ xe theo thời gian thực.</p>
        </div>
        <div style={{ background: '#f0fdf4', padding: '8px 16px', borderRadius: 10, border: '1px solid #bbf7d0' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>{available} Chỗ trống / Khu {activeZone}</span>
        </div>
      </div>

      {/* Zone Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', padding: 4, background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 14, gap: 2 }}>
          {ZONES.map(z => (
            <button key={z} onClick={() => { setActiveZone(z); setSelected(null) }}
              style={{ padding: '8px 24px', fontSize: 12, fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", transition: 'all 0.2s', background: z === activeZone ? '#003d9b' : 'transparent', color: z === activeZone ? '#fff' : '#64748b', boxShadow: z === activeZone ? '0 2px 8px rgba(0,61,155,0.25)' : 'none' }}>
              KHU {z}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: '#1d4ed8', fontSize: 18 }}>check_circle</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1d4ed8' }}>Đã chọn: {selected.id}</span>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span className="material-symbols-outlined" style={{ color: '#1d4ed8', fontSize: 16 }}>close</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{ position: 'relative', background: '#f8fafc', borderRadius: 24, padding: 28, border: '1.5px solid #e2e8f0', minHeight: 560 }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none', backgroundImage: 'radial-gradient(#cbd5e1 1px,transparent 1px)', backgroundSize: '26px 26px', borderRadius: 24 }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0 }}>Sơ đồ bãi xe Khu {activeZone}</h3>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Cập nhật: Vừa xong</span>
            </div>
            
            {/* Legend Inline Top */}
            <div style={{ display: 'flex', gap: 16, background: 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
              {[['#22c55e','Trống'],['#94a3b8','Đã đỗ'],['#f59e0b','VIP'],['#3b82f6','Sạc EV']].map(([c,l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="parking-grid" style={{ maxWidth: 960, margin: '0 auto' }}>
            {slots.map(slot => (
              <ParkingSlot key={slot.id} slot={slot} isSelected={selected?.id === slot.id} onClick={setSelected} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20 }}>
          {['add','remove','my_location'].map(icon => (
            <button key={icon} style={{ width: 42, height: 42, background: '#fff', borderRadius: '50%', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#003d9b', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: 20, marginTop: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 18px 0' }}>Thống kê phân khu</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 13, color: '#475569' }}>Mức độ lấp đầy</span><span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: '#003d9b' }}>82%</span></div>
            <div style={{ height: 6, background: '#e2e8f0', borderRadius: 6, overflow: 'hidden' }}><div style={{ height: '100%', width: '82%', background: '#003d9b', borderRadius: 6 }} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 13, color: '#475569' }}>Tỷ lệ xoay vòng</span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>3.8 <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 400 }}>xe/giờ</span></span>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 4px 0' }}>Dữ liệu môi trường</h3>
              <p style={{ fontSize: 18, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, margin: 0 }}>Cảm biến Khu {activeZone}1</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-blue">MESH-ID: {activeZone}1-992</span>
              <span className="badge badge-green" style={{ textTransform: 'uppercase' }}>Đang hoạt động</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 10 }}>
            {[['thermostat','Nhiệt độ','29°C','#eff6ff','#3b82f6'],['wb_sunny','Độ sáng','420 lx','#fff7ed','#f97316'],['co2','Không khí','Tốt','#f8fafc','#64748b']].map(([icon,label,val,bg,ic]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ color: ic }}>{icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', margin: '0 0 2px 0' }}>{label}</p>
                  <p style={{ fontSize: 16, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, margin: 0 }}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
