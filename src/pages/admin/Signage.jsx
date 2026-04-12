import { useState } from 'react'

const LED_BOARDS = [
  { id: 'LD-01', name: 'Bảng LED Tổng (Cổng A1)', status: 'online', type: 'main', mode: 'auto', customText: '' },
  { id: 'LD-02', name: 'Bảng LED Hướng dẫn (Khu A)', status: 'online', type: 'zone', mode: 'auto', customText: '' },
  { id: 'LD-03', name: 'Bảng LED Hầm B1', status: 'online', type: 'zone', mode: 'auto', customText: '' },
  { id: 'LD-04', name: 'Bảng LED Hầm B2', status: 'online', type: 'zone', mode: 'manual', customText: 'BẢO TRÌ B2 - XIN GỬI XE B1' },
  { id: 'LD-05', name: 'Bảng LED Phụ (Lối ra)', status: 'offline', type: 'small', mode: 'auto', customText: '' },
]

// LED Screen Renderer
const LedScreen = ({ board }) => {
  let content = null;
  
  if (board.status === 'offline') {
    content = <div style={{ color: '#334155', fontSize: 32, fontFamily: 'monospace', textAlign: 'center', fontWeight: 'bold' }}>[ MAT KET NOI ]</div>
  }
  else if (board.mode === 'manual') {
    content = (
      <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
         <div style={{ display: 'inline-block', color: '#facc15', fontSize: 40, fontFamily: "'Courier New', Courier, monospace", fontWeight: 900, textShadow: '0 0 10px rgba(250,204,21,0.6)', animation: 'scroll-left 10s linear infinite' }}>
           {board.customText || 'QUY KHACH VUI LONG NHAP NOI DUNG'}
         </div>
      </div>
    )
  } 
  else if (board.type === 'main') {
    content = (
      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%', width: '100%', justifyContent: 'center' }}>
         <div style={{ textAlign: 'center', color: '#38bdf8', fontSize: 24, fontWeight: 900, fontFamily: "'Courier New', monospace", letterSpacing: 3, textShadow: '0 0 12px rgba(56,189,248,0.7)', borderBottom: '2px solid #1e293b', paddingBottom: 10, marginBottom: 4 }}>
            HCMUT PARKING
         </div>
         
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ color: '#fff', fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>KHU A</span>
           <span style={{ color: '#ef4444', fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", textShadow: '0 0 12px rgba(239,68,68,0.8)' }}>HET CHO</span>
         </div>
         
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ color: '#fff', fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>HAM B1</span>
           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
             <span style={{ color: '#22c55e', fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", textShadow: '0 0 12px rgba(34,197,94,0.8)' }}>180 TRONG</span>
             <span className="material-symbols-outlined" style={{ color: '#22c55e', fontSize: 32, textShadow: '0 0 12px rgba(34,197,94,0.8)' }}>arrow_forward</span>
           </div>
         </div>

         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ color: '#fff', fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>HAM B2</span>
           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
             <span style={{ color: '#22c55e', fontSize: 26, fontWeight: 900, fontFamily: "'Courier New', monospace", textShadow: '0 0 12px rgba(34,197,94,0.8)' }}>045 TRONG</span>
             <span className="material-symbols-outlined" style={{ color: '#22c55e', fontSize: 32, textShadow: '0 0 12px rgba(34,197,94,0.8)' }}>turn_right</span>
           </div>
         </div>
      </div>
    )
  } else {
    content = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
         <div style={{ color: '#22c55e', fontSize: 90, fontWeight: 900, fontFamily: "'Courier New', monospace", letterSpacing: 4, textShadow: '0 0 20px rgba(34,197,94,0.8)', lineHeight: 1 }}>180</div>
         <div style={{ color: '#38bdf8', fontSize: 24, fontWeight: 900, fontFamily: "'Courier New', monospace", letterSpacing: 2, textShadow: '0 0 10px rgba(56,189,248,0.7)', marginTop: 8 }}>VI TRI TRONG</div>
         <div style={{ color: '#22c55e', fontSize: 56, marginTop: 4, textShadow: '0 0 15px rgba(34,197,94,0.8)' }} className="material-symbols-outlined">arrow_upward</div>
      </div>
    )
  }

  return (
    <div style={{ 
      background: '#020617', 
      borderRadius: 16, 
      padding: 20,
      border: '6px solid #0f172a',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.8)',
      height: 340,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Lưới LED Overlay (Dot matrix / Scanline effect) */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent) 0% 0% / 4px 4px', zIndex: 10, pointerEvents: 'none', opacity: 0.6 }} />
      
      {/* Đèn báo nguồn & tem khung */}
      <div style={{ position: 'absolute', bottom: 12, right: 16, display: 'flex', alignItems: 'center', gap: 6, zIndex: 20 }}>
        <span style={{ color: '#475569', fontSize: 9, fontWeight: 800, fontFamily: 'sans-serif', letterSpacing: 1 }}>BK-LED P5</span>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: board.status === 'online' ? '#22c55e' : '#ef4444', boxShadow: `0 0 8px ${board.status === 'online' ? '#22c55e' : '#ef4444'}` }} />
      </div>

      <div style={{ position: 'relative', zIndex: 5, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </div>
  )
}

export default function Signage() {
  const [boards, setBoards] = useState(LED_BOARDS)
  const [selectedId, setSelectedId] = useState(boards[0].id)
  
  const selectedBoard = boards.find(b => b.id === selectedId)

  const handleUpdateMode = (mode) => {
    setBoards(boards.map(b => b.id === selectedId ? { ...b, mode } : b))
  }

  const handleUpdateText = (text) => {
    setBoards(boards.map(b => b.id === selectedId ? { ...b, customText: text } : b))
  }

  return (
    <div style={{ padding: 28, maxWidth: 1200, margin: '0 auto' }}>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', fontFamily: "'Space Grotesk',sans-serif" }}>
          Biển báo Điện tử (LED Signage)
        </h2>
        <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>Điều khiển hệ thống bảng thông báo điều hướng phương tiện ngoài trời.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2.5fr', gap: 24, alignItems: 'stretch' }}>
        
        {/* Left Column: List of Boards */}
        <div className="card" style={{ padding: '16px 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
           <div style={{ padding: '0 20px 16px 20px', borderBottom: '1px solid #f1f5f9', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>Thiết bị LED Pannel</span>
              <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 12 }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span></button>
           </div>
           
           <div style={{ overflowY: 'auto', flex: 1 }}>
              {boards.map(b => (
                <div key={b.id} onClick={() => setSelectedId(b.id)} style={{ padding: '14px 20px', borderLeft: selectedId === b.id ? '4px solid #0ea5e9' : '4px solid transparent', background: selectedId === b.id ? '#f0f9ff' : 'transparent', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ width: 40, height: 40, borderRadius: 8, background: b.status === 'online' ? '#dcfce7' : '#f1f5f9', color: b.status === 'online' ? '#16a34a' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <span className="material-symbols-outlined">{b.type === 'main' ? 'developer_board' : 'tv'}</span>
                   </div>
                   <div style={{ flex: 1 }}>
                     <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{b.name}</div>
                     <div style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: b.status === 'online' ? '#22c55e' : '#ef4444' }}></span>
                        {b.status === 'online' ? 'Trực tuyến' : 'Mất kết nối'}
                     </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Column: Detail & Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
           {/* Thẻ mô phỏng Panel */}
           <div className="card" style={{ padding: 24, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                 <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>preview</span>
                    Trình duyệt Thời gian thực (Live Preview)
                 </h3>
                 <span style={{ fontSize: 12, background: '#1e293b', color: '#fff', padding: '4px 10px', borderRadius: 999, fontWeight: 600 }}>ID: {selectedBoard.id}</span>
              </div>
              
              <LedScreen board={selectedBoard} />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                 <div style={{ background: '#e2e8f0', width: 120, height: 20, borderRadius: '0 0 10px 10px' }}></div>
              </div>
           </div>

           {/* Central Control Unit */}
           <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 20px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                 <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>settings_remote</span>
                 Bảng điều khiển (Controller)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                 <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Chế độ phát</label>
                    <div style={{ display: 'flex', gap: 10, background: '#f1f5f9', padding: 4, borderRadius: 10 }}>
                       <button onClick={() => handleUpdateMode('auto')} disabled={selectedBoard.status === 'offline'} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', background: selectedBoard.mode === 'auto' ? '#fff' : 'transparent', color: selectedBoard.mode === 'auto' ? '#0f172a' : '#64748b', fontWeight: 700, boxShadow: selectedBoard.mode === 'auto' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'all 0.2s', opacity: selectedBoard.status === 'offline' ? 0.5 : 1 }}>
                          Auto (IoT Data)
                       </button>
                       <button onClick={() => handleUpdateMode('manual')} disabled={selectedBoard.status === 'offline'} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', background: selectedBoard.mode === 'manual' ? '#fff' : 'transparent', color: selectedBoard.mode === 'manual' ? '#0f172a' : '#64748b', fontWeight: 700, boxShadow: selectedBoard.mode === 'manual' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'all 0.2s', opacity: selectedBoard.status === 'offline' ? 0.5 : 1 }}>
                          Manual Override
                       </button>
                    </div>
                 </div>

                 <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Tình trạng mạng</label>
                    <div style={{ padding: '10px 16px', background: selectedBoard.status === 'online' ? '#dcfce7' : '#fee2e2', border: `1px solid ${selectedBoard.status === 'online' ? '#bbf7d0' : '#fecaca'}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                       <span className="material-symbols-outlined" style={{ color: selectedBoard.status === 'online' ? '#16a34a' : '#ef4444' }}>{selectedBoard.status === 'online' ? 'wifi' : 'wifi_off'}</span>
                       <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: selectedBoard.status === 'online' ? '#166534' : '#991b1b' }}>{selectedBoard.status === 'online' ? 'Ping: 12ms (Ổn định)' : 'Mất liên lạc vệ tinh'}</div>
                          <div style={{ fontSize: 12, color: selectedBoard.status === 'online' ? '#15803d' : '#b91c1c' }}>Cập nhật 2s trước</div>
                       </div>
                    </div>
                 </div>
              </div>

              {selectedBoard.mode === 'manual' && (
                <div style={{ marginTop: 24, animation: 'fadeInPage 0.3s ease' }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Nội dung Override (Chữ chạy ngang)</label>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <input type="text" value={selectedBoard.customText} onChange={(e) => handleUpdateText(e.target.value)} disabled={selectedBoard.status === 'offline'} placeholder="Ví dụ: BÃI XE TẠM NGHỈ CHỐNG NGẬP..." style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', outline: 'none', fontSize: 14, fontWeight: 600, fontFamily: "'Courier New', monospace" }} />
                      <button disabled={selectedBoard.status === 'offline'} className="btn btn-primary" style={{ padding: '0 24px' }}>Phát sóng LED</button>
                    </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
