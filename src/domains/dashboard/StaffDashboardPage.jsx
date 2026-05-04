// ============================================================
// STAFF DASHBOARD - Vận hành bãi xe
// ============================================================
import { useNavigate } from 'react-router-dom'

const KPI = [
  { label: 'Xe đang đỗ', value: '342', sub: 'chiếc', icon: 'directions_car', trend: '+5.2%', trendUp: true, extra: 'Tăng từ sáng' },
  { label: 'Cổng Vào hôm nay', value: '1,024', sub: 'lượt', icon: 'login', trend: '+8.1%', trendUp: true, extra: 'Cao hơn hôm qua' },
  { label: 'Cổng Ra hôm nay', value: '892', sub: 'lượt', icon: 'logout', trend: '+3.4%', trendUp: true, extra: 'Bình thường' },
]

const ALERTS = [
  { bg: '#fff1f2', border: '#fecdd3', icon: 'sensors_off', ic: '#ef4444', title: 'Cảm biến tầng 2 (A2-14) mất tín hiệu', badge: 'Nghiêm trọng', bc: '#fce7f3', bct: '#be185d', desc: 'Cảm biến không phản hồi. Cần kiểm tra ngay.', time: 'Vừa xong', btn: 'Kiểm tra' },
  { bg: '#fffbeb', border: '#fde68a', icon: 'videocam', ic: '#d97706', title: 'Camera Cổng chính bị che khuất', badge: 'Cảnh báo', bc: '#fef3c7', bct: '#92400e', desc: 'Có thể do bụi hoặc vật cản. Vui lòng kiểm tra.', time: '25 phút', btn: 'Xử lý' },
  { bg: '#eff6ff', border: '#bfdbfe', icon: 'payment', ic: '#3b82f6', title: 'Giao dịch chưa xác nhận', badge: 'Thông báo', bc: '#dbeafe', bct: '#1d4ed8', desc: '2 giao dịch tại Cổng Ra đang chờ xác nhận.', time: '5 phút', btn: 'Xác nhận' },
]

export default function StaffDashboardPage() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#003d9b', margin: 0, marginBottom: 6 }}>Bảng điều khiển vận hành</h2>
          <p style={{ color: '#525f73', margin: 0, fontSize: 13 }}>Tình trạng bãi xe và thiết bị — cập nhật lúc 09:30 AM</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }} className="pulse" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Trực tuyến</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {KPI.map((k, i) => (
          <div key={i} className="card card-hover" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: '#525f73', fontSize: 13, fontWeight: 500, margin: '0 0 6px 0' }}>{k.label}</p>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, color: '#003d9b', margin: 0 }}>
                  {k.value}<span style={{ fontSize: 15, color: '#525f73', fontWeight: 400 }}> {k.sub}</span>
                </h3>
              </div>
              <div style={{ padding: 8, background: '#eff6ff', borderRadius: 10 }}>
                <span className="material-symbols-outlined" style={{ color: '#003d9b' }}>{k.icon}</span>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontWeight: 700, color: '#525f73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>{k.extra}</span>
              {k.trend && (
                <span style={{ color: k.trendUp === true ? '#16a34a' : '#ba1a1a', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{k.trendUp ? 'trending_up' : 'trending_down'}</span>
                  {k.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Map + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 20 }}>
        {/* Map */}
        <div style={{ borderRadius: 20, overflow: 'hidden', minHeight: 360, position: 'relative', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12)', cursor: 'pointer' }}
          onClick={() => navigate('/staff/parking-map')}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6NKvnSaKlJoyThvSk7Rm1VIFHxduBo0-hAFu0nexC1VMsmq4YxXaMPW4zvQj4aP0fWTmT4Ftjzn16i1bW-FM9AF_zlh_mGsCqFt9tbXbRQTP0koO-P3PWKI5DUvZwszITKksB9rcScqZS-QX5koEQ-ND13RtmE-3fmwK7xK4TuTYYe0-BJ2fJ5ZRO0P2NFSdGcyo0D83wSooi0MA6-7cNv3YHWHVayIWXOyDQq9wYWxZbCRSIeK5aQVxzafI85ZXGzlO_vX5vBt02"
            alt="Bản đồ bãi xe" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,36,96,0.88) 0%, rgba(0,36,96,0.3) 50%, transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 28, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ maxWidth: 400 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>Bản đồ theo dõi</h3>
              <p style={{ color: 'rgba(147,197,253,0.9)', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px 0' }}>Xem tình trạng chỗ đỗ, cảm biến và hoạt động cổng theo thời gian thực.</p>
              <button onClick={e => { e.stopPropagation(); navigate('/staff/parking-map') }} style={{ background: '#fff', color: '#003d9b', padding: '10px 20px', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>explore</span> Xem chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e3a8a', margin: '0 0 16px 0' }}>Thao tác nhanh</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => navigate('/staff/gate-entry')} style={{ padding: 14, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseOut={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.transform = 'translateX(0)' }}>
              <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>login</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Cổng Vào</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Quản lý cổng vào</div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#003d9b' }}>arrow_forward</span>
            </button>

            <button onClick={() => navigate('/staff/gate-exit')} style={{ padding: 14, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseOut={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.transform = 'translateX(0)' }}>
              <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>logout</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Cổng Ra</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Quản lý cổng ra</div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#003d9b' }}>arrow_forward</span>
            </button>

            <button onClick={() => navigate('/staff/parking-map')} style={{ padding: 14, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseOut={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.transform = 'translateX(0)' }}>
              <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>map</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Bản đồ</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Xem sơ đồ bãi</div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#003d9b' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a8a', margin: '0 0 4px 0' }}>Cảnh báo hệ thống</h3>
            <p style={{ color: '#525f73', fontSize: 13, margin: 0 }}>Các vấn đề cần xử lý ngay</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ALERTS.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: 16, borderRadius: 14, background: a.bg, border: `1px solid ${a.border}` }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: a.ic }}>{a.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <h4 style={{ fontWeight: 700, fontSize: 14, margin: 0, color: '#1e293b' }}>{a.title}</h4>
                  <span style={{ fontSize: 11, fontWeight: 700, background: a.bc, color: a.bct, padding: '2px 10px', borderRadius: 6 }}>{a.badge}</span>
                </div>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{a.desc}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', margin: '0 0 8px 0' }}>{a.time}</p>
                <button style={{ background: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#003d9b' }}
                  onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0' }}>
                  {a.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', padding: '8px 0 16px' }}>
        © 2024 Đại học Bách Khoa TP.HCM — Smart City Management System v2.4.0
      </footer>
    </div>
  )
}