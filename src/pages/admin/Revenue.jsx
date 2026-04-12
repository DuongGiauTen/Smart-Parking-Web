// ============================================================
// REVENUE & REPORTS - Revenue analytics and transactions
// ============================================================

const TRANSACTIONS = [
  ['#TXN-882190','51A-992.42','Honda Civic','BKPay','Cổng A - Cơ sở chính','67,500','Thành công','#dcfce7','#166534'],
  ['#TXN-882189','29C-112.55','Mazda CX-5','Thẻ NFC','Cổng B - Khu Kỹ thuật','56,250','Thành công','#dcfce7','#166534'],
  ['#TXN-882188','60B-004.22','Toyota Corolla','BKPay','Cổng D - Trung tâm TT','180,000','Đang xử lý','#fef3c7','#92400e'],
  ['#TXN-882187','51F-773.01','Tesla Model 3','BKPay','Cổng A - Cơ sở chính','82,500','Thất bại','#fee2e2','#991b1b'],
]

const CHART_DATA = [
  {label:'Th2',std:45,vip:15},{label:'Th3',std:55,vip:20},{label:'Th4',std:35,vip:10},
  {label:'Th5',std:65,vip:25},{label:'Th6',std:40,vip:15},{label:'Th7',std:20,vip:5},{label:'CN',std:15,vip:5}
]

export default function Revenue() {
  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#003d9b', margin: '0 0 6px 0' }}>Phân tích doanh thu</h2>
          <p style={{ color: '#525f73', fontSize: 13, margin: 0 }}>Hiệu suất tài chính và tốc độ giao dịch trên toàn mạng lưới.</p>
        </div>
        <div style={{ display: 'flex', background: '#e6e8eb', padding: 4, borderRadius: 10, gap: 2 }}>
          {['Tuần','Tháng','Năm'].map((t, i) => (
            <button key={t} style={{ padding: '8px 18px', fontSize: 13, fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: i===0?'#fff':'transparent', color: i===0?'#003d9b':'#525f73', boxShadow: i===0?'0 1px 4px rgba(0,0,0,0.1)':'none' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 24 }}>
        <div className="card card-hover" style={{ padding: 22 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#525f73', display: 'block', marginBottom: 10 }}>Tổng doanh thu (Tuần)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, margin: 0 }}>298,800,000</h3>
            <span style={{ color: '#16a34a', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>+12%
            </span>
          </div>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: '6px 0 10px 0' }}>VNĐ · Mục tiêu: 360,000,000 VNĐ</p>
          <div style={{ height: 6, background: '#f1f5f9', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: '83%', height: '100%', background: '#003d9b', borderRadius: 6 }} />
          </div>
        </div>
        <div className="card card-hover" style={{ padding: 22 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#525f73', display: 'block', marginBottom: 10 }}>Tốc độ trung bình ngày</span>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, margin: '0 0 4px 0' }}>42,685,714</h3>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>VNĐ/ngày · Đo lường trên 8 cổng</p>
        </div>
        <div className="card" style={{ padding: 22, background: '#003d9b', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(196,210,255,0.9)', display: 'block', marginBottom: 10 }}>Tổng giao dịch</span>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, margin: '0 0 4px 0' }}>4,822</h3>
            <p style={{ fontSize: 11, color: 'rgba(196,210,255,0.85)', margin: 0 }}>Tỷ lệ thành công 99.8%</p>
          </div>
          <div style={{ position: 'absolute', right: -12, bottom: -12, opacity: 0.1 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 80, color: '#fff' }}>payments</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 20, marginBottom: 24 }}>
        {/* Bar Chart */}
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
            <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, margin: 0 }}>Tốc độ doanh thu hàng ngày</h4>
            <div style={{ display: 'flex', gap: 16 }}>
              {[['#0052cc','Tiêu chuẩn'],['#d6e3fb','VIP']].map(([c,l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />{l}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180, gap: 8 }}>
            {CHART_DATA.map(({ label, std, vip }) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, cursor: 'pointer' }}>
                  <div title={`VIP: ${vip}%`} style={{ width: '100%', height: `${vip}%`, background: '#d6e3fb', borderRadius: '3px 3px 0 0', transition: 'opacity 0.2s' }} onMouseOver={e => e.target.style.opacity='0.7'} onMouseOut={e => e.target.style.opacity='1'} />
                  <div title={`Tiêu chuẩn: ${std}%`} style={{ width: '100%', height: `${std}%`, background: '#0052cc', borderRadius: '3px 3px 0 0', transition: 'opacity 0.2s' }} onMouseOver={e => e.target.style.opacity='0.7'} onMouseOut={e => e.target.style.opacity='1'} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="card" style={{ padding: 26, display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, margin: '0 0 18px 0' }}>Phương thức thanh toán</h4>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, position: 'relative' }}>
            <svg viewBox="0 0 200 200" style={{ width: 150, height: 150, transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="80" fill="transparent" stroke="#d6e3fb" strokeWidth="28" strokeDasharray="502.65"/>
              <circle cx="100" cy="100" r="80" fill="transparent" stroke="#003d9b" strokeWidth="28" strokeDasharray="502.65" strokeDashoffset="150"/>
              <circle cx="100" cy="100" r="80" fill="transparent" stroke="#0052cc" strokeWidth="28" strokeDasharray="502.65" strokeDashoffset="350"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: '#003d9b' }}>82%</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Kỹ thuật số</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
            {[['#d6e3fb','BKPay','42%'],['#003d9b','NFC / Thẻ','38%'],['#b2c5ff','Tiền mặt','20%']].map(([c,l,p]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{l}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, margin: 0 }}>Giao dịch gần đây</h4>
          <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>
            Xuất CSV <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr>
              {['Mã giao dịch','Người dùng / Xe','Phương thức','Vị trí','Số tiền','Trạng thái'].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {TRANSACTIONS.map(([txn,plate,car,method,loc,amt,stat,bc,tc]) => (
                <tr key={txn}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>{txn}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#475569' }}>{plate.slice(0,3)}</div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{plate}</p>
                        <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>{car}</p>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ padding: '3px 10px', background: '#eff6ff', color: '#003d9b', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>{method}</span></td>
                  <td style={{ fontSize: 12, color: '#475569' }}>{loc}</td>
                  <td style={{ fontSize: 12, fontWeight: 700, textAlign: 'right' }}>{amt} VNĐ</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: tc }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: tc }}>{stat}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Hiển thị 1-10 trên 2,450 kết quả</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {['chevron_left','chevron_right'].map(icon => (
              <button key={icon} style={{ padding: 6, border: 'none', background: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748b' }}>{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', padding: '20px 0 8px' }}>
        © 2024 Đại học Bách Khoa TP.HCM — Smart City Management System v2.4.0
      </footer>
    </div>
  )
}
