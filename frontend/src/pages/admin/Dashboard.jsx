// ============================================================
// DASHBOARD - Admin overview with KPI cards and alerts
// ============================================================
import { useNavigate } from 'react-router-dom'

const KPI = [
  { label: 'Sức chứa hiện tại', value: '1,284', sub: '/1,500', icon: 'directions_car', trend: '+2.4%', trendUp: true, extra: 'Hiệu suất: 85.6%', bars: [85,70,90,60,75,82] },
  { label: 'Lượt xe trung bình/giờ', value: '342', sub: 'v/h', icon: 'speed', trend: '+12%', trendUp: true, extra: 'Cao điểm: 11:30 AM', line: true },
  { label: 'Doanh thu ngày', value: '42.8', sub: 'M VNĐ', icon: 'payments', trend: 'Đúng KH', trendUp: null, extra: 'Thanh toán App: 92%', dots: [4,6,9,5,7,10,8] },
]

const ALERTS = [
  { bg: '#fff1f2', border: '#fecdd3', icon: 'sensors_off', ic: '#ef4444', title: 'Mất tín hiệu Cảm biến tầng 2 (A2-14)', badge: 'Nghiêm trọng', bc: '#fce7f3', bct: '#be185d', desc: 'Cảm biến không phản hồi sau 3 lần ping liên tiếp.', time: 'Vừa xong', btn: 'Khắc phục' },
  { bg: '#fffbeb', border: '#fde68a', icon: 'videocam_off', ic: '#d97706', title: 'Vỏ bảo vệ Camera lối vào Cổng chính bị mở', badge: 'Cần kiểm tra', bc: '#fef3c7', bct: '#92400e', desc: 'Phát hiện tác động vật lý lên vỏ ngoài camera lối vào số 01.', time: '12 phút', btn: 'Xử lý' },
  { bg: '#eff6ff', border: '#bfdbfe', icon: 'credit_card_off', ic: '#3b82f6', title: 'Lỗi đồng bộ thanh toán BKPay', badge: 'Cảnh báo', bc: '#dbeafe', bct: '#1d4ed8', desc: '3 giao dịch tại làn ra Khu C đang chờ xác nhận từ gateway thanh toán.', time: '45 phút', btn: 'Thử lại' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#003d9b', margin: 0, marginBottom: 6 }}>Tổng quan hệ thống</h2>
          <p style={{ color: '#525f73', margin: 0, fontSize: 13 }}>Chào buổi sáng — dữ liệu cập nhật lúc 08:45 AM</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }} className="pulse" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Hệ thống: Trực tuyến</span>
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
            {/* Mini chart */}
            {k.bars && (
              <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', gap: 4, height: 36 }}>
                {k.bars.map((h, j) => (
                  <div key={j} style={{ flex: 1, background: '#e0eaff', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${h}%`, background: '#003d9b', borderRadius: 3 }} />
                  </div>
                ))}
              </div>
            )}
            {k.line && (
              <div style={{ marginTop: 18, height: 36 }}>
                <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 100 30">
                  <path d="M0,25 Q15,5 30,20 T60,10 T90,25" fill="none" stroke="#003d9b" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            {k.dots && (
              <div style={{ marginTop: 18, height: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 2px' }}>
                {k.dots.map((h, j) => (
                  <div key={j} style={{ width: 6, height: `${h * 4}px`, background: h >= 9 ? '#003d9b' : 'rgba(0,61,155,0.25)', borderRadius: 3 }} />
                ))}
              </div>
            )}
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontWeight: 700, color: '#525f73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>{k.extra}</span>
              {k.trend && (
                <span style={{ color: k.trendUp === true ? '#16a34a' : k.trendUp === false ? '#ba1a1a' : '#003d9b', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {k.trendUp !== null && <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{k.trendUp ? 'trending_up' : 'trending_down'}</span>}
                  {k.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Map + Radar */}
      <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 20 }}>
        {/* Map */}
        <div style={{ borderRadius: 20, overflow: 'hidden', minHeight: 360, position: 'relative', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12)', cursor: 'pointer' }}
          onClick={() => navigate('/parking-map')}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6NKvnSaKlJoyThvSk7Rm1VIFHxduBo0-hAFu0nexC1VMsmq4YxXaMPW4zvQj4aP0fWTmT4Ftjzn16i1bW-FM9AF_zlh_mGsCqFt9tbXbRQTP0koO-P3PWKI5DUvZwszITKksB9rcScqZS-QX5koEQ-ND13RtmE-3fmwK7xK4TuTYYe0-BJ2fJ5ZRO0P2NFSdGcyo0D83wSooi0MA6-7cNv3YHWHVayIWXOyDQq9wYWxZbCRSIeK5aQVxzafI85ZXGzlO_vX5vBt02"
            alt="Bản đồ bãi xe" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            onMouseOver={e => e.target.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,36,96,0.88) 0%, rgba(0,36,96,0.3) 50%, transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 28, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ maxWidth: 400 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>Bản đồ trực tuyến</h3>
              <p style={{ color: 'rgba(147,197,253,0.9)', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px 0' }}>Theo dõi vị trí chính xác từng phương tiện và trạng thái cảm biến theo thời gian thực.</p>
              <button onClick={e => { e.stopPropagation(); navigate('/parking-map') }} style={{ background: '#fff', color: '#003d9b', padding: '10px 20px', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>explore</span> Xem sơ đồ chi tiết
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['Khu A','92%'],['Khu B','45%']].map(([k,v]) => (
                <div key={k} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.15)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'rgba(147,197,253,0.9)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e3a8a', margin: 0 }}>Sức khỏe hệ thống</h3>
            <span className="material-symbols-outlined" style={{ color: '#003d9b' }}>analytics</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: 180 }}>
              <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              <polygon points="100,30 170,85 140,155 60,150 40,80" fill="rgba(0,61,155,0.15)" stroke="#003d9b" strokeWidth="2"/>
              <text x="100" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="#525f73">MẠNG</text>
              <text x="182" y="75" textAnchor="start" fontSize="7" fontWeight="700" fill="#525f73">CAMERA</text>
              <text x="4" y="75" textAnchor="start" fontSize="7" fontWeight="700" fill="#525f73">Uptime</text>
            </svg>
          </div>
          {[['Kết nối Mạng','Tuyệt vời (98%)','#16a34a'],['Độ trễ Camera','Tốt (45ms)','#1d4ed8'],['Giao dịch','Ổn định (99.2%)','#1d4ed8']].map(([l,v,c]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ fontSize: 12, color: '#525f73' }}>{l}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a8a', margin: '0 0 4px 0' }}>Cảnh báo vận hành</h3>
            <p style={{ color: '#525f73', fontSize: 13, margin: 0 }}>Thời gian thực từ IoT Hub</p>
          </div>
          <button onClick={() => navigate('/iot-devices')} style={{ background: 'none', border: 'none', color: '#003d9b', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Xem tất cả →</button>
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
                <button style={{ background: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: '1px solid #e2e8f0', cursor: 'pointer' }}>{a.btn}</button>
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
