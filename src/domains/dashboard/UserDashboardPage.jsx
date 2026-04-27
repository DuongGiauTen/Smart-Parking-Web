// ============================================================
// USER HOME - Desktop Dashboard Overview
// ============================================================
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function UserHome() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1400, margin: '0 auto' }}>
      
      {/* Greeting Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: 'linear-gradient(135deg, #0f172a, #1e293b, #003d9b)', borderRadius: 20, padding: 32, color: '#fff', boxShadow: '0 10px 30px -10px rgba(0,61,155,0.4)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 160 }}>directions_car</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, margin: '0 0 8px 0' }}>
            {greeting}, {auth?.name || 'Trần Minh Hoàng'} 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: 0 }}>Chào mừng trở lại! Hôm nay bạn muốn quản lý gửi xe tại khu vực nào?</p>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/user/map')} style={{ padding: '12px 24px', background: '#fff', color: '#1e293b', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            onMouseOver={e => e.currentTarget.style.transform='translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform='translateY(0)'}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>map</span>
            Tìm chỗ đỗ xe
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
        
        {/* Current Session */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: '#22c55e' }}>radio_button_checked</span>
            Phiên gửi xe hiện tại
          </h3>
          <div style={{ background: '#f8fafc', borderRadius: 16, padding: 20, border: '1px solid #e2e8f0', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eff6ff', color: '#003d9b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, margin: '0 0 2px 0', color: '#1e293b' }}>51A - 992.42</h4>
                  <p style={{ color: '#64748b', fontSize: 13, margin: 0, fontWeight: 500 }}>Ô tô · Khu A-14</p>
                </div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', background: '#dcfce7', padding: '6px 12px', borderRadius: 8 }}>Đang đỗ</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', borderBottom: '1px dashed #cbd5e1', padding: '16px 0', margin: 'auto 0' }}>
              <div>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0' }}>Vào lúc</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', margin: 0 }}>Hôm nay, 09:42</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0' }}>Thời gian đã gửi</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0ea5e9', margin: 0 }}>2h 35 phút</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
              <div>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px 0' }}>Cước phí tạm tính</p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>13,250 <span style={{ fontSize: 14, color: '#64748b' }}>VNĐ</span></p>
              </div>
              <button onClick={() => navigate('/user/pay')} style={{ padding: '10px 20px', background: '#003d9b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}
                 onMouseOver={e => e.currentTarget.style.background = '#002b6b'}
                 onMouseOut={e => e.currentTarget.style.background = '#003d9b'}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>

        {/* Zones Availability */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>local_parking</span>
              Tình trạng bãi đỗ
            </h3>
            <button onClick={() => navigate('/user/map')} style={{ background: 'none', border: 'none', color: '#003d9b', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Xem chi tiết</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {[
              { zone: 'Khu A', desc: 'Tòa A1, A2, A3', available: 23, total: 100, color: '#ef4444' },
              { zone: 'Khu B', desc: 'Tòa A4, B1', available: 58, total: 100, color: '#22c55e' },
              { zone: 'Khu C', desc: 'Sân vận động', available: 12, total: 100, color: '#ef4444' },
              { zone: 'Khu D', desc: 'Thư viện', available: 41, total: 100, color: '#f59e0b' },
            ].map(item => (
              <div key={item.zone} onClick={() => navigate('/user/map')} style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = '#fff' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: item.color, fontFamily: "'Space Grotesk',sans-serif" }}>{item.zone.split(' ')[1]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px 0', color: '#1e293b' }}>{item.zone}</p>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 6px 0' }}>{item.desc}</p>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${(item.available/item.total)*100}%`, height: '100%', background: item.color, borderRadius: 6, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, width: 60 }}>
                  <p style={{ fontSize: 20, fontWeight: 700, color: item.color, margin: 0, fontFamily: "'Space Grotesk',sans-serif" }}>{item.available}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontWeight: 500 }}>trống ({item.total})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
