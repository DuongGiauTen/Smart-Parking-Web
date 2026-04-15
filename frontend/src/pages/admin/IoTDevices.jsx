// ============================================================
// IOT DEVICES - Device management table
// ============================================================
import { useState, useEffect } from 'react'

const DEVICES = [
  { id:'GW-HCMUT-012', name:'Gateway Trung tâm A1',    type:'Gateway', online:true,  time:'Vừa xong' },
  { id:'SN-LOT-B4-09', name:'Cảm biến đỗ xe B4-09',   type:'Sensor',  online:true,  time:'2 phút trước' },
  { id:'CAM-ENT-04',   name:'Camera LPR Cổng Bắc',     type:'Camera',  online:false, time:'45 phút trước' },
  { id:'SN-LOT-C2-22', name:'Cảm biến đỗ xe C2-22',   type:'Sensor',  online:true,  time:'5 phút trước' },
  { id:'GW-HCMUT-015', name:'Gateway Khu D',            type:'Gateway', online:true,  time:'Vừa xong' },
  { id:'CAM-EXIT-02',  name:'Camera LPR Cổng ra B',    type:'Camera',  online:true,  time:'1 phút trước' },
]

export default function IoTDevices() {
  const [modalState, setModalState] = useState(null) // null | 'add' | 'success' | 'error'
  const [devices, setDevices] = useState(DEVICES)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? devices : filter === 'online' ? devices.filter(d => d.online) : devices.filter(d => !d.online)

  // Phím tắt để mô phỏng tương tác
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.altKey && e.key === '1') { e.preventDefault(); setModalState('success'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); setModalState('error'); }
      if (e.key === 'Escape') { e.preventDefault(); setModalState(null); }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a8a', margin: '0 0 6px 0' }}>Quản lý thiết bị IoT</h2>
        <p style={{ color: '#525f73', fontSize: 13, margin: 0 }}>Theo dõi, điều khiển và bảo trì hệ thống thiết bị cảm biến thông minh</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 24 }}>
        {[
          { label:'Tổng thiết bị', val:'1,248', icon:'devices', bg:'#dae2ff', ic:'#003d9b', trend:'+12% so với tháng trước', tc:'#003d9b' },
          { label:'Đang hoạt động', val:'1,192', icon:'sensors', bg:'#dcfce7', ic:'#16a34a', trend:'95.5% Hiệu suất vận hành', tc:'#16a34a', pulse:true },
          { label:'Mất kết nối', val:'56', icon:'wifi_off', bg:'#ffdad6', ic:'#ba1a1a', trend:'Cần kiểm tra ngay', tc:'#ba1a1a' },
        ].map(s => (
          <div key={s.label} className="card card-hover" style={{ padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#525f73', fontSize: 13, fontWeight: 500, margin: '0 0 5px 0' }}>{s.label}</p>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, margin: 0 }}>{s.val}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 11, fontWeight: 700, color: s.tc }}>
                {s.pulse && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} className="pulse" />}
                {s.trend}
              </div>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: s.ic }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Device Table */}
      <div className="card" style={{ marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, margin: 0 }}>Danh sách thiết bị</h3>
            {/* Filter */}
            <div style={{ display: 'flex', gap: 6, padding: '3px 4px', background: '#e6e8eb', borderRadius: 8 }}>
              {[['all','Tất cả'],['online','Trực tuyến'],['offline','Ngoại tuyến']].map(([v,l]) => (
                <button key={v} onClick={() => setFilter(v)} style={{ padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, transition: 'all 0.2s', background: filter === v ? '#fff' : 'transparent', color: filter === v ? '#003d9b' : '#475569', boxShadow: filter === v ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span> Lọc
            </button>
            <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span> Xuất
            </button>
            <button className="btn btn-primary" onClick={() => setModalState('add')} style={{ padding: '7px 16px', fontSize: 12 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span> Thêm thiết bị
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr>
              {['Mã thiết bị','Tên thiết bị','Loại','Trạng thái','Hoạt động cuối','Hành động'].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: r.online ? '#003d9b' : '#ba1a1a' }}>{r.id}</td>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td><span style={{ padding: '3px 10px', background: '#f1f5f9', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>{r.type}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.online ? '#22c55e' : '#ba1a1a', boxShadow: r.online ? '0 0 0 3px rgba(34,197,94,0.2)' : 'none' }} />
                      <span style={{ fontWeight: 700, color: r.online ? '#16a34a' : '#ba1a1a' }}>{r.online ? 'Trực tuyến' : 'Ngoại tuyến'}</span>
                    </div>
                  </td>
                  <td style={{ color: '#64748b' }}>{r.time}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {[['visibility','#3b82f6','#eff6ff'],['edit','#64748b','#f1f5f9'],['delete','#ba1a1a','#ffdad6']].map(([icon,c,hc]) => (
                        <button key={icon} style={{ padding: 6, color: c, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}
                          onMouseOver={e => e.currentTarget.style.background = hc}
                          onMouseOut={e => e.currentTarget.style.background = 'none'}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '13px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }}>
          <span>Hiển thị {filtered.length} trong tổng số 1,248 thiết bị</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,'...',125].map((p,i) => (
              <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: p===1?'#003d9b':'transparent', color: p===1?'#fff':'#475569' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Map + Detail panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 3fr', gap: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, margin: '0 0 18px 0' }}>Phân phối địa lý</h3>
          <div style={{ height: 200, background: '#f8fafc', borderRadius: 12, position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ position: 'absolute', inset: 0, background: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR8GWGiP0a9lT7WORblHHI5diYbvF8V5aGyiBpmaM9XZC0h_BmDXh5dm1ZoY-IMSkW4KmrQaMRUX3IKpIkLJkgO_j4xitUmN7w7KdNuWhAymhvW94-Fb0mjwsi11AQEfjJSOUPv7bEmmK7Qj930rSPs_VsxgnUDdfQ7ZnLc5KSqn4jkJ9iSr8HQWGsJBf66rId-tHQ1gw3XopdiN7All-xXYvlONXSDyBHq72v1RDRinL0T8Rl-8I0DXigHzbKbtqjLdiQTnQpCtV4') center/cover", filter: 'grayscale(60%) opacity(50%)' }} />
            <div style={{ position: 'absolute', top: 36, left: '28%', width: 14, height: 14, background: '#003d9b', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} className="pulse" />
            <div style={{ position: 'absolute', top: 100, right: '33%', width: 14, height: 14, background: '#003d9b', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />
            <div style={{ position: 'absolute', bottom: 44, left: '33%', width: 14, height: 14, background: '#60a5fa', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
            {[['#003d9b','Khu vực A'],['#60a5fa','Khu vực B'],['#94a3b8','Khu vực C']].map(([c,l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />{l}
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, margin: 0 }}>Trạng thái chi tiết</h3>
            <span className="badge badge-blue">GW-HCMUT-012</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            {[['Ngày tạo','12/10/2023'],['Ngày lắp đặt','15/10/2023']].map(([l,v]) => (
              <div key={l} style={{ padding: 12, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', margin: '0 0 4px 0' }}>{l}</p>
                <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>Biểu đồ hoạt động (24h)</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a' }}>Ổn định</span>
            </div>
            <div style={{ height: 56, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-end', padding: 8, gap: 3 }}>
              {[40,60,50,80,75,95,85,60,45,65,90,100].map((h,i) => (
                <div key={i} style={{ flex: 1, background: `rgba(0,61,155,${h/100})`, borderRadius: '3px 3px 0 0', height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div style={{ padding: 12, background: '#eff6ff', borderRadius: 10, border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#1d4ed8', margin: '0 0 2px 0' }}>Lần cuối bảo trì</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#1e3a8a', margin: 0 }}>20 ngày trước</p>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#1d4ed8', fontSize: 10, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>Lịch sử</button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 25. MODAL: THÊM IOT MỚI */}
      {/* ============================================================== */}
      {modalState === 'add' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xl font-headline font-bold text-blue-900 flex items-center gap-3">
                  <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                     <span className="material-symbols-outlined block">add_circle</span>
                  </span>
                  Thêm thiết bị IoT mới
                </h2>
                <button onClick={() => setModalState(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={e => { e.preventDefault(); setModalState('success') }} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mã thiết bị</label>
                    <input type="text" placeholder="VD: SN-LOT-X1-01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Địa chỉ IP (LAN)</label>
                    <input type="text" placeholder="VD: 192.168.1.100" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tên định danh thiết bị</label>
                  <input type="text" placeholder="VD: Cảm biến đỗ xe X1-01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Chủng loại thiết bị (Type)</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all" required>
                    <option value="">-- Chọn chủng loại --</option>
                    <option>Sensor (Cảm biến đỗ xe)</option>
                    <option>Camera (Nhận diện LPR)</option>
                    <option>Gateway (Bộ điều khiển)</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setModalState(null)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Hủy bỏ</button>
                  <button type="submit" className="px-6 py-3 rounded-xl font-headline font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/30 flex items-center gap-2 transition-all">
                    <span className="material-symbols-outlined text-sm">link</span> Kết nối thiết bị
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 26. MODAL: THÊM IOT THÀNH CÔNG (ALT+1) */}
      {/* ============================================================== */}
      {modalState === 'success' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 pb-4 flex flex-col items-center">
                <div className="w-20 h-20 mb-5 relative">
                   <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                   <div className="relative w-full h-full bg-green-100 rounded-full flex items-center justify-center text-green-500 border-4 border-white shadow-md">
                     <span className="material-symbols-outlined text-4xl">check_circle</span>
                   </div>
                </div>
                <h2 className="text-2xl font-headline font-bold text-slate-800 tracking-tight text-center mb-2">
                  Kết nối Thành công
                </h2>
                <p className="text-slate-500 text-sm text-center leading-relaxed">
                  Thiết bị IoT <b>Cảm biến đỗ xe X1-01</b> đã được cấu hình và giao tiếp IP thành công lưu vào cơ sở dữ liệu.
                </p>
              </div>
              <div className="p-8 pt-6">
                <button onClick={() => setModalState(null)} className="w-full py-3.5 px-6 bg-slate-800 hover:bg-slate-900 text-white font-headline font-bold rounded-xl transition-all duration-300 shadow-lg shadow-slate-800/30 active:scale-95">
                  Xác nhận & Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 27. MODAL: LỖI KẾT NỐI IOT / SERVER (ALT+2) */}
      {/* ============================================================== */}
      {modalState === 'error' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-700 animate-in slide-in-from-bottom-8 duration-300">
              <div className="p-8 pb-6 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600"></div>
                <div className="w-16 h-16 mb-5 rounded-2xl bg-slate-900/80 flex items-center justify-center text-red-500 shadow-inner border border-red-900/30">
                  <span className="material-symbols-outlined text-4xl animate-pulse">router</span>
                </div>
                <h2 className="text-xl font-headline font-bold text-white tracking-wide text-center">
                  Lỗi Thao Tác Cấu Hình
                </h2>
                <div className="mt-4 w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
                  <p className="text-slate-300 font-mono text-xs leading-relaxed text-center">
                    [ERROR_TIMEOUT] Không thể Ping tới địa chỉ IP <b>192.168.1.100</b>. Thiết bị không phản hồi gói tin ICMP từ Máy chủ.
                  </p>
                </div>
              </div>
              <div className="px-8 pb-8 pt-2 flex flex-col gap-3">
                <button onClick={() => setModalState(null)} className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-headline font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] shadow-red-600/20 active:scale-95 flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-lg">wifi_find</span> Quét lại đường truyền
                </button>
                <button onClick={() => setModalState(null)} className="w-full py-3 text-slate-400 text-sm font-bold hover:text-white transition-colors">
                  Bỏ qua & Cấu hình thủ công
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
