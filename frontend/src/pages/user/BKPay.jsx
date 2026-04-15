// ============================================================
// BKPAY - Payment page showing pending sessions
// ============================================================
import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'

const PENDING_PAYMENTS = [
  { id: '#PK-10294', type: 'Ô tô', icon: 'directions_car', plate: '51A-992.42', zone: 'Khu A', timeIn: 'Hôm nay, 07:07', timeOut: 'Hôm nay, 09:42', duration: '2h 35 phút', amount: 38750 },
  { id: '#PK-10295', type: 'Xe máy', icon: 'two_wheeler', plate: '59B1-123.45', zone: 'Khu C', timeIn: 'Hôm qua, 08:15', timeOut: 'Hôm nay, 10:15', duration: '26h 00 phút', amount: 15000, note: 'Phụ thu qua đêm' },
]

const TRANSACTIONS = [
  { icon:'directions_car', ibc:'#f0fdf4', ic:'#16a34a', title:'Đã thanh toán - Khu A', desc:'51A-992.42 · 2h 35 phút', time:'Hôm nay, 09:42', amount:'38,750 VNĐ', status: 'Thành công', ac:'#16a34a' },
  { icon:'directions_car', ibc:'#f0fdf4', ic:'#16a34a', title:'Đã thanh toán - Khu B', desc:'51A-992.42 · 1h 20 phút', time:'07/04, 13:10', amount:'20,000 VNĐ', status: 'Thành công', ac:'#16a34a' },
  { icon:'two_wheeler', ibc:'#fef2f2', ic:'#ef4444', title:'Thanh toán thất bại - Khu C', desc:'59B1-123.45 · 4h 00 phút', time:'06/04, 09:00', amount:'5,000 VNĐ', status: 'Lỗi', ac:'#ef4444' },
]

export default function BKPay() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [selectedSession, setSelectedSession] = useState(null)

  const handlePayClick = (session) => {
    setSelectedSession(session)
  }

  const handleProceedToGateway = () => {
    navigate(`/bkpay-gateway?id=${encodeURIComponent(selectedSession.id)}&amount=${encodeURIComponent(selectedSession.amount.toLocaleString())}`);
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Header Info */}
      <div style={{ marginBottom: 30, background: 'linear-gradient(135deg,#003d9b 0%,#1a6bff 100%)', borderRadius: 20, padding: '24px 30px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(0,61,155,0.3)' }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, margin: '0 0 8px 0' }}>Thanh toán phí gửi xe</h2>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 14, maxWidth: 500 }}>
            Quản lý và thanh toán cước phí cho từng chu kỳ gửi xe. Các giao dịch sẽ được chuyển hướng và xử lý an toàn qua cổng thanh toán BKPay.
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 20px', borderRadius: 14, backdropFilter: 'blur(10px)', textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', marginBottom: 4 }}>Người dùng</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{auth?.name || 'Trần Minh Hoàng'}</p>
        </div>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>receipt_long</span>
        Danh sách cần thanh toán ({PENDING_PAYMENTS.length})
      </h3>
      
      {/* Pending Payments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20, marginBottom: 40 }}>
        {PENDING_PAYMENTS.map((session) => (
          <div key={session.id} className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: '#eff6ff', color: '#003d9b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>{session.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{session.plate}</div>
                  <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{session.type} · {session.zone}</div>
                </div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#003d9b', background: '#eff6ff', padding: '6px 10px', borderRadius: 8 }}>{session.id}</span>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', border: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Vào lúc</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{session.timeIn}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Ra lúc</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{session.timeOut}</div>
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px dashed #cbd5e1' }}>
                <div style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>Thời gian gửi: <span style={{ fontWeight: 700, color: '#1e293b' }}>{session.duration}</span></div>
                {session.note && <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, background: '#fef2f2', padding: '4px 8px', borderRadius: 6 }}>{session.note}</div>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2, fontWeight: 500 }}>Thành tiền</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: '#003d9b', display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {session.amount.toLocaleString()} <span style={{ fontSize: 16, fontWeight: 600, color: '#64748b' }}>VNĐ</span>
                </div>
              </div>
              <button 
                onClick={() => handlePayClick(session)}
                style={{ 
                  background: '#003d9b', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: 10, 
                  fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,61,155,0.2)'
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#002b6b'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#003d9b'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Thanh toán
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>payments</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions History */}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>history</span>
        Lịch sử thanh toán
      </h3>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TRANSACTIONS.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.15s' }}
              onMouseOver={e => e.currentTarget.style.background='#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background='#fff'}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: t.ibc, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: t.ic, fontSize: 22, fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#1e293b' }}>{t.title}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>{t.amount}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{t.desc} · <span style={{ color: '#94a3b8' }}>{t.time}</span></p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.ac, background: t.ibc, padding: '2px 8px', borderRadius: 6 }}>{t.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Details Modal before Payment */}
      {selectedSession && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setSelectedSession(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div style={{ background: '#f8fafc', padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Chi tiết phiên gửi xe</h3>
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>ID: {selectedSession.id}</span>
              </div>
              <button onClick={() => setSelectedSession(null)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', padding: 6, borderRadius: '50%', display: 'flex', alignItems: 'center', transition: 'background 0.2s' }}>
                <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: 20 }}>close</span>
              </button>
            </div>
            
            {/* Body */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 16, background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', color: '#003d9b', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,61,155,0.1)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>{selectedSession.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#003d9b', letterSpacing: '0.05em', marginBottom: 2 }}>{selectedSession.plate}</div>
                  <div style={{ fontSize: 14, color: '#3b82f6', fontWeight: 600 }}>{selectedSession.type} <span style={{color: '#94a3b8', margin: '0 4px'}}>•</span> {selectedSession.zone}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, background: '#f8fafc' }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Thời gian vào</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{selectedSession.timeIn}</div>
                </div>
                <div style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, background: '#f8fafc' }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Thời gian ra</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{selectedSession.timeOut}</div>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>Thời gian gửi thực tế</span>
                  <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{selectedSession.duration}</span>
                </div>
                {selectedSession.note && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>Phụ phí phát sinh</span>
                    <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 14, background: '#fef2f2', padding: '2px 8px', borderRadius: 6 }}>{selectedSession.note}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginTop: 4, borderTop: '1px dashed #e2e8f0' }}>
                  <span style={{ color: '#0f172a', fontSize: 15, fontWeight: 800 }}>TỔNG TIỀN PHẢI TRẢ</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, color: '#003d9b' }}>{selectedSession.amount.toLocaleString()} <span style={{fontSize: 16}}>đ</span></span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '20px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12 }}>
              <button onClick={() => setSelectedSession(null)} style={{ flex: 1, padding: 14, background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e=>e.currentTarget.style.background='#f1f5f9'} onMouseOut={e=>e.currentTarget.style.background='#fff'}>
                Quay lại
              </button>
              <button 
                onClick={handleProceedToGateway}
                style={{ flex: 2, padding: 14, background: '#003d9b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,61,155,0.2)' }}
                onMouseOver={e=>{e.currentTarget.style.background='#002b6b'; e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseOut={e=>{e.currentTarget.style.background='#003d9b'; e.currentTarget.style.transform='translateY(0)'}}
              >
                Chuyển tiếp đến BKPay
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  )
}
