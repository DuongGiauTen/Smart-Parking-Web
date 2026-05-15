// ============================================================
// BKPAY - Payment page showing pending debt sessions from mockDB
// ============================================================
import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { mockDB } from '../../services/mockDB'

const ZONE_LABEL = { zone_a1: 'Khu A1', zone_a2: 'Khu A2', zone_b1: 'Khu B1' }

function formatDateTime(iso) {
  if (!iso) return '---'
  return new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
}

function durationLabel(entryIso, exitIso) {
  if (!entryIso || !exitIso) return '---'
  const ms = new Date(exitIso) - new Date(entryIso)
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return h > 0 ? `${h}g ${m}p` : `${m} phút`
}

export default function BKPay() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [pendingPayments, setPendingPayments] = useState([])
  const [transactions, setTransactions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [paidToast, setPaidToast] = useState(null)

  const loadData = () => {
    if (!auth?.email) return
    mockDB.init()
    const debts = mockDB.getDebtSessions(auth.email)
    const completed = mockDB.getCompletedSessions(auth.email)
    setPendingPayments(debts)
    setTransactions(completed)
  }

  useEffect(() => {
    loadData()
  }, [auth?.email])

  // After returning from BKPay gateway, mark session as paid
  useEffect(() => {
    const paidId = location.state?.paidSessionId
    if (paidId && auth?.email) {
      mockDB.init()
      mockDB.markSessionPaid(paidId, auth.email)
      loadData()
      setPaidToast('Thanh toán thành công! Email xác nhận đã được gửi.')
      const t = setTimeout(() => setPaidToast(null), 5000)
      // Clear location state so refresh doesn't re-trigger
      window.history.replaceState({}, '')
      return () => clearTimeout(t)
    }
  }, [location.state?.paidSessionId])

  const handlePayClick = (session) => setSelectedSession(session)

  const handleProceedToGateway = () => {
    const contactEmail = mockDB.getContactEmail(auth.email)
    navigate(`/bkpay-gateway?id=${encodeURIComponent(selectedSession.id)}&amount=${encodeURIComponent(selectedSession.fee)}`, {
      state: {
        sessionData: {
          sessionId: selectedSession.id,
          amount: selectedSession.fee,
          plate: selectedSession.vehicle,
          zone: ZONE_LABEL[selectedSession.zone] || selectedSession.zone,
          entryTime: formatDateTime(selectedSession.entryTime),
          exitTime: formatDateTime(selectedSession.exitTime),
          duration: durationLabel(selectedSession.entryTime, selectedSession.exitTime),
          userName: auth?.name,
          userEmail: contactEmail,
        }
      }
    })
  }

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>

      {/* Success Toast */}
      {paidToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 font-bold text-sm">
          <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
          {paidToast}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 30, background: 'linear-gradient(135deg,#003d9b 0%,#1a6bff 100%)', borderRadius: 20, padding: '24px 30px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(0,61,155,0.3)' }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, margin: '0 0 8px 0' }}>Thanh toán phí gửi xe</h2>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 14, maxWidth: 500 }}>
            Quản lý và thanh toán cước phí cho từng chu kỳ gửi xe. Các giao dịch được xử lý an toàn qua cổng BKPay.
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 20px', borderRadius: 14, backdropFilter: 'blur(10px)', textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', marginBottom: 4 }}>Người dùng</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{auth?.name || '---'}</p>
        </div>
      </div>

      {/* Pending Payments */}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>receipt_long</span>
        Danh sách cần thanh toán ({pendingPayments.length})
      </h3>

      {pendingPayments.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center mb-10">
          <span className="material-symbols-outlined text-slate-300" style={{fontSize: 48, fontVariationSettings:"'FILL' 1"}}>receipt_long</span>
          <p className="text-slate-500 font-medium mt-3">Không có khoản nào cần thanh toán</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20, marginBottom: 40 }}>
          {pendingPayments.map((session) => {
            const cardInfo = mockDB.validateCard(session.card)
            const isMotorcycle = session.vehicleType?.includes('máy') || session.vehicleType?.includes('Xe máy')
            return (
              <div key={session.id} className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: '#eff6ff', color: '#003d9b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>{isMotorcycle ? 'two_wheeler' : 'directions_car'}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{session.vehicle}</div>
                      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{session.vehicleType} · {ZONE_LABEL[session.zone] || session.zone}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#003d9b', background: '#eff6ff', padding: '6px 10px', borderRadius: 8 }}>{session.id.slice(0, 14)}</span>
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Vào lúc</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{formatDateTime(session.entryTime)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Ra lúc</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{formatDateTime(session.exitTime)}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px dashed #cbd5e1' }}>
                    <div style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>
                      Thời gian gửi: <span style={{ fontWeight: 700, color: '#1e293b' }}>{durationLabel(session.entryTime, session.exitTime)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#b45309', fontWeight: 600, background: '#fef3c7', padding: '4px 8px', borderRadius: 6 }}>Ghi nợ</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2, fontWeight: 500 }}>Thành tiền</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: '#003d9b', display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      {session.fee.toLocaleString('vi-VN')} <span style={{ fontSize: 16, fontWeight: 600, color: '#64748b' }}>VNĐ</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayClick(session)}
                    style={{ background: '#003d9b', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,61,155,0.2)' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#002b6b'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#003d9b'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Thanh toán
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>payments</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Transaction History */}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 22 }}>history</span>
        Lịch sử thanh toán
      </h3>
      <div className="card" style={{ overflow: 'hidden' }}>
        {transactions.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>Chưa có lịch sử giao dịch</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {transactions.map((t, i) => {
              const isPaid = t.paymentMethod === 'paid'
              const isDebt = t.paymentMethod === 'debt'
              const isCash = t.paymentMethod === 'cash'
              const isMotorcycle = t.vehicleType?.includes('máy') || t.vehicleType?.includes('Xe máy')
              const statusLabel = isPaid ? 'Đã thanh toán' : isDebt ? 'Ghi nợ' : 'Tiền mặt'
              const statusColor = isPaid ? '#16a34a' : isDebt ? '#b45309' : '#0891b2'
              const statusBg = isPaid ? '#f0fdf4' : isDebt ? '#fef3c7' : '#ecfeff'
              const iconColor = isPaid ? '#16a34a' : '#94a3b8'
              const iconBg = isPaid ? '#f0fdf4' : '#f8fafc'

              return (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderBottom: i < transactions.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: iconColor, fontSize: 22, fontVariationSettings: "'FILL' 1" }}>{isMotorcycle ? 'two_wheeler' : 'directions_car'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#1e293b' }}>{ZONE_LABEL[t.zone] || t.zone} — {t.vehicle}</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>{t.fee.toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{t.vehicleType} · <span style={{ color: '#94a3b8' }}>{formatDateTime(t.exitTime)}</span></p>
                      <span style={{ fontSize: 12, fontWeight: 600, color: statusColor, background: statusBg, padding: '2px 8px', borderRadius: 6 }}>{statusLabel}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedSession && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedSession(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-200">
            <div style={{ background: '#f8fafc', padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Chi tiết phiên gửi xe</h3>
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{selectedSession.id}</span>
              </div>
              <button onClick={() => setSelectedSession(null)} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', padding: 6, borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: 20 }}>close</span>
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 16, background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', color: '#003d9b', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,61,155,0.1)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}>
                    {selectedSession.vehicleType?.includes('máy') ? 'two_wheeler' : 'directions_car'}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#003d9b', letterSpacing: '0.05em', marginBottom: 2 }}>{selectedSession.vehicle}</div>
                  <div style={{ fontSize: 14, color: '#3b82f6', fontWeight: 600 }}>{selectedSession.vehicleType} · {ZONE_LABEL[selectedSession.zone] || selectedSession.zone}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, background: '#f8fafc' }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Thời gian vào</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{formatDateTime(selectedSession.entryTime)}</div>
                </div>
                <div style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, background: '#f8fafc' }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Thời gian ra</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{formatDateTime(selectedSession.exitTime)}</div>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>Thời gian gửi thực tế</span>
                  <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{durationLabel(selectedSession.entryTime, selectedSession.exitTime)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginTop: 4, borderTop: '1px dashed #e2e8f0' }}>
                  <span style={{ color: '#0f172a', fontSize: 15, fontWeight: 800 }}>TỔNG TIỀN PHẢI TRẢ</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, color: '#003d9b' }}>{selectedSession.fee.toLocaleString('vi-VN')} <span style={{ fontSize: 16 }}>đ</span></span>
                </div>
              </div>
            </div>

            <div style={{ padding: '20px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12 }}>
              <button onClick={() => setSelectedSession(null)}
                style={{ flex: 1, padding: 14, background: '#fff', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                Quay lại
              </button>
              <button onClick={handleProceedToGateway}
                style={{ flex: 2, padding: 14, background: '#003d9b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,61,155,0.2)' }}
                onMouseOver={e => { e.currentTarget.style.background = '#002b6b'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.background = '#003d9b'; e.currentTarget.style.transform = 'translateY(0)' }}>
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
