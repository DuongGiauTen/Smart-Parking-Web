// ============================================================
// USER HISTORY - Desktop Layout
// ============================================================

const HISTORY = [
  { id: '#PK-10294', date: 'Hôm nay', plate:'51A-992.42', zone:'Khu A - A-14', entry:'09:42', exit:'12:17', duration:'2h 35p', fee:'38,750', method:'BKPay', status:'Đang gửi', sc:'#22c55e', bg:'#dcfce7' },
  { id: '#PK-10293', date: '08/04/2026', plate:'51A-992.42', zone:'Khu B - B-22', entry:'14:00', exit:'16:30', duration:'2h 30p', fee:'37,500', method:'BKPay', status:'Hoàn thành', sc:'#3b82f6', bg:'#dbeafe' },
  { id: '#PK-10292', date: '07/04/2026', plate:'51A-992.42', zone:'Khu A - A-08', entry:'08:15', exit:'09:35', duration:'1h 20p', fee:'20,000', method:'BKPay', status:'Hoàn thành', sc:'#3b82f6', bg:'#dbeafe' },
  { id: '#PK-10291', date: '06/04/2026', plate:'51A-992.42', zone:'Khu C - C-05', entry:'13:10', exit:'15:40', duration:'2h 30p', fee:'37,500', method:'Tiền mặt', status:'Hoàn thành', sc:'#3b82f6', bg:'#dbeafe' },
  { id: '#PK-10290', date: '05/04/2026', plate:'51A-992.42', zone:'Khu D - D-19', entry:'07:30', exit:'11:20', duration:'3h 50p', fee:'57,500', method:'BKPay', status:'Hoàn thành', sc:'#3b82f6', bg:'#dbeafe' },
]

export default function UserHistory() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>Lịch sử thanh toán & gửi xe</h2>
        <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>Quản lý chi tiết các giao dịch và biên lai của bạn qua các chu kỳ gửi xe.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
        {[
          { label:'Tổng số phiên', val:'48', unit:'phiên', icon:'receipt_long', color:'#0ea5e9' },
          { label:'Tổng chi phí', val:'176,500', unit:'VNĐ', icon:'payments', color:'#f59e0b' },
          { label:'Thời gian gửi TB', val:'2.3', unit:'giờ/phiên', icon:'schedule', color:'#8b5cf6' }
        ].map(item => (
          <div key={item.label} className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
             <div style={{ width: 56, height: 56, borderRadius: 16, background: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
               <span className="material-symbols-outlined" style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
             </div>
             <div>
               <p style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</p>
               <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                 {item.val} <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>{item.unit}</span>
               </p>
             </div>
          </div>
        ))}
      </div>

      {/* History table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: '#003d9b', fontSize: 20 }}>list_alt</span>
              Chi tiết giao dịch
            </h3>
            <div style={{ display: 'flex', gap: 12 }}>
               <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Xuất báo cáo</button>
            </div>
        </div>
        <div className="table-wrap">
          <table style={{ width: '100%', minWidth: 800 }}>
            <thead>
              <tr>
                <th style={{ padding: '16px 24px' }}>Mã GD</th>
                <th style={{ padding: '16px 24px' }}>Thời gian vào/ra</th>
                <th style={{ padding: '16px 24px' }}>Biển số</th>
                <th style={{ padding: '16px 24px' }}>Khu vực</th>
                <th style={{ padding: '16px 24px' }}>Tổng phí</th>
                <th style={{ padding: '16px 24px' }}>PTTT</th>
                <th style={{ padding: '16px 24px' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((h, i) => (
                <tr key={i}>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: '#003d9b' }}>{h.id}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{h.date}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{h.entry} - {h.exit} ({h.duration})</div>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: '#1e293b' }}>{h.plate}</td>
                  <td style={{ padding: '16px 24px', color: '#475569' }}>{h.zone}</td>
                  <td style={{ padding: '16px 24px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: '#f59e0b', fontSize: 16 }}>{h.fee}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#475569' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{h.method === 'BKPay' ? 'account_balance_wallet' : 'payments'}</span>
                      {h.method}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, background: h.bg, color: h.sc, padding: '4px 10px', borderRadius: 999 }}>{h.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
