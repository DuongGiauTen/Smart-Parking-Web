import { useState, useEffect } from 'react'
import { REGISTERED_USERS, parkingData } from './parkingData'

const ENTRY_LOG = [
  ['09:42:15','51A-992.42','Sinh viên','Thành công','bg-green-100','text-green-700'],
  ['09:38:50','29C-112.55','Cán bộ','Thành công','bg-green-100','text-green-700'],
  ['09:35:22','77B-222.11','Khách','Thành công','bg-green-100','text-green-700'],
  ['09:31:08','51F-444.99','Sinh viên','Biển lỗi','bg-yellow-100','text-yellow-700'],
  ['09:28:01','60A-888.77','Cán bộ','Thành công','bg-green-100','text-green-700'],
]

export default function GateEntry() {
  const [demoState, setDemoState] = useState('normal') // normal, invalid, full, offline
  const [showIssueCard, setShowIssueCard] = useState(false)
  const [isBarrierOpen, setIsBarrierOpen] = useState(false)
  const [scanCard, setScanCard] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [entryMessage, setEntryMessage] = useState('Chờ quét thẻ vào...')

  const handleOpen = () => setIsBarrierOpen(true)
  const handleClose = () => setIsBarrierOpen(false)

  const currentUser = selectedUser || REGISTERED_USERS[0]
  const statusConfig = {
    normal:  { title: 'HỆ THỐNG ĐANG HOẠT ĐỘNG', color: 'bg-green-500', glow: 'shadow-green-500/50', icon: 'check_circle', bg: 'bg-gradient-to-r from-blue-900/95 to-blue-700/95', validateText: 'Cho phép vào', validateColor: 'text-green-600', plate: currentUser.vehicle || '51A - 992.42' },
    invalid: { title: 'CẢNH BÁO: THẺ KHÔNG HỢP LỆ', color: 'bg-red-500', glow: 'shadow-red-500/50', icon: 'gpp_bad', bg: 'bg-gradient-to-r from-red-900/95 to-red-700/95', validateText: 'TỪ CHỐI / THẺ SAI', validateColor: 'text-red-600', plate: '12C - 334.89' },
    full:    { title: 'THÔNG BÁO: BÃI XE ĐÃ ĐẦY', color: 'bg-orange-500', glow: 'shadow-orange-500/50', icon: 'warning', bg: 'bg-gradient-to-r from-orange-900/95 to-amber-700/95', validateText: 'Chờ xếp chỗ', validateColor: 'text-orange-600', plate: '51C - 002.31' },
    offline: { title: 'MẤT KẾT NỐI CAMERA & HẠ TẦNG', color: 'bg-slate-400', glow: 'shadow-slate-400/50', icon: 'wifi_off', bg: 'bg-gradient-to-r from-slate-800/95 to-slate-600/95', validateText: 'Lỗi đồng bộ', validateColor: 'text-slate-500', plate: '---' },
  }
  const config = statusConfig[demoState]

  // Phím tắt để mô phỏng sự kiện chụp ảnh báo cáo và thẻ vào
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.altKey && e.key === '1') { e.preventDefault(); setDemoState('invalid'); setSelectedUser(null); setScanCard(''); setEntryMessage('Chưa nhận dạng thẻ hợp lệ'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); setDemoState('full'); setSelectedUser(null); setScanCard(''); setEntryMessage('Bãi xe đầy, chờ vị trí trống'); }
      if (e.altKey && e.key === '3') { e.preventDefault(); setDemoState('offline'); setSelectedUser(null); setScanCard(''); setEntryMessage('Mất kết nối hệ thống'); }
      if (e.altKey && e.key === '4') {
        e.preventDefault()
        const user = REGISTERED_USERS[Math.floor(Math.random() * REGISTERED_USERS.length)]
        const session = parkingData.createEntrySession(user)
        setSelectedUser(user)
        setScanCard(user.card)
        setDemoState('normal')
        setEntryMessage(`Thẻ ${user.card} hợp lệ. Xe ${user.vehicle} vào lúc ${session.timeIn}`)
      }
      if (e.key === 'Escape') { e.preventDefault(); setDemoState('normal'); setSelectedUser(null); setScanCard(''); setEntryMessage('Chờ quét thẻ vào...'); }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-full font-inter relative">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 relative z-10">
        <div>
          <h2 className="text-3xl font-headline font-bold text-slate-800 tracking-tight mb-1">Kiểm soát Cổng vào A1</h2>
          <p className="text-slate-500 font-medium text-sm">Cơ sở Quận 10 • Bảng điều khiển phương tiện vào thời gian thực</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-200/60">
           <span className="relative flex h-3 w-3">
             {demoState !== 'offline' && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.color}`}></span>}
             <span className={`relative inline-flex rounded-full h-3 w-3 ${config.color}`}></span>
           </span>
           <span className="text-sm font-bold text-slate-700 font-headline tracking-wide uppercase">
             {demoState === 'offline' ? 'Máy chủ ngắt kết nối' : 'Đồng bộ API Trực tuyến'}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10 items-stretch">
        {/* Left Side: Camera Feeds */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Main Panorama Camera */}
          <div className={`flex-1 min-h-[400px] bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 group transition-all duration-500 ${demoState === 'invalid' ? 'shadow-[0_20px_60px_-15px_rgba(153,27,27,0.5)]' : 'shadow-xl'}`}>
             
             {/* Status Overlay Banner */}
             <div className={`absolute top-0 left-0 w-full px-6 py-4 ${config.bg} backdrop-blur-md flex justify-between items-center z-20 transition-colors duration-500 border-b border-white/10`}>
                <div className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-3xl opacity-90">{config.icon}</span>
                  <span className="font-headline font-bold tracking-widest text-lg drop-shadow-md">{config.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-black/30 px-3 py-1.5 rounded-lg text-white/90 text-sm font-bold font-mono tracking-widest backdrop-blur-sm border border-white/10">CAM 01</span>
                </div>
             </div>

             {demoState === 'offline' ? (
                <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-600 bg-slate-900/80 z-10">
                   <span className="material-symbols-outlined text-6xl mb-4 opacity-50">videocam_off</span>
                   <p className="font-headline font-bold text-xl uppercase tracking-widest opacity-50">No Signal</p>
                </div>
             ) : (
                <>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCp_A-NpfnkI5T-NvI09jesAIJm7BHMLBHM65gnE5cF38QLLa1piiRD6_hC_5HaryhiKfwIueba4unmp6s2pTw39E9jiHxwlcXjXhEIWxHG32ejymnCTYoPIaYkhZFhrLHB8Grc8qi4f3izLcTvpj8QKKTzz6Is3CGclQ7aEm38R0rJ1PdEN5MHIc6uq2IMVELwWIGKFmBlbWHTFDRnNBYCej0L4yWQh8bcbMb8ysU0OjIbdbwQXks7NoNGMEV7_JPR9dnJyV-KcI"
                       alt="Camera Live" className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${demoState === 'invalid' ? 'grayscale opacity-75' : 'opacity-85 mix-blend-screen'}`} />
                  
                  {/* ALPR Sim */}
                  <div className={`absolute bottom-[20%] right-[30%] w-32 h-16 border-2 rounded-lg z-10 ${demoState === 'invalid' ? 'border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-green-500 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)]'} transition-all`}></div>
                </>
             )}

             {/* Bottom Left Plate Card */}
             <div className="absolute bottom-6 left-6 z-20 flex gap-4">
               <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex gap-5 items-center">
                 <div className="bg-white/95 px-5 py-2.5 rounded-xl shadow-inner border border-slate-300">
                   <span className={`font-headline font-black text-3xl tracking-wider ${demoState === 'invalid' ? 'text-red-700' : 'text-slate-800'}`}>{config.plate}</span>
                 </div>
                 <div className="hidden sm:block">
                   <p className="text-xs text-white/70 font-bold uppercase tracking-wider mb-1">Bốc tách ALPR</p>
                   {demoState !== 'offline' ? (
                     <p className={`text-sm font-bold flex items-center gap-1 ${demoState === 'invalid' ? 'text-red-400' : 'text-green-400'}`}>
                       <span className="material-symbols-outlined text-sm">{demoState === 'invalid' ? 'warning' : 'verified'}</span> {demoState === 'invalid' ? 'Biển Không Khớp' : 'Khớp 99.8%'}
                     </p>
                   ) : (
                     <p className="text-sm font-bold text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">wifi_off</span> Mất tín hiệu</p>
                   )}
                 </div>
               </div>
             </div>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
             {[['Lượt xe vào hôm nay','342', 'directions_car'],['Xe chờ trong cổng', demoState === 'full' ? '12' : '3', 'hourglass_top'],['Cảnh báo/Lỗi', demoState === 'invalid' ? '1' : '0', 'notification_important']].map(([l,v,i]) => (
               <div key={l} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
                 <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{l}</p>
                   <p className="text-2xl font-headline font-bold text-slate-800">{v}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                   <span className="material-symbols-outlined">{i}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Side: Ops Panel */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          
          {/* RFID Scanner Spacer Layout adjustments */}
          <div className={`bg-white rounded-3xl p-6 border-2 transition-colors duration-300 shadow-md ${demoState === 'invalid' ? 'border-red-200 bg-red-50/30' : 'border-blue-100'}`}>
            <label className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
               <span className="material-symbols-outlined text-blue-600">nfc</span>
               Quét thẻ định danh RFID / NFC
            </label>
            <div className="relative">
               <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-2xl ${demoState === 'invalid' ? 'text-red-400' : 'text-blue-500'} animate-pulse`}>contactless</span>
               <input autoFocus type="text" placeholder="Chờ tín hiệu từ thiết bị quét ngoại vi..." 
                 value={scanCard}
                 onChange={(e) => setScanCard(e.target.value)}
                 className={`w-full pl-14 pr-4 py-4 rounded-xl text-lg font-bold font-mono outline-none transition-all ${demoState === 'invalid' ? 'bg-red-50 text-red-900 border-red-200 focus:border-red-400' : 'bg-slate-50 text-blue-900 border-slate-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]'} border`} />
            </div>
            <p className="mt-2 text-sm text-slate-500">{entryMessage}</p>
            {demoState === 'invalid' && <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span> Thẻ bị khóa hoặc chưa được đăng ký trong hệ thống.</p>}
          </div>

          {/* Vehicle Info Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <h4 className="font-headline font-bold text-slate-800 text-lg">Hồ sơ Cấp phép Truy cập</h4>
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${demoState === 'invalid' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{config.validateText}</span>
            </div>
            
            <div className="p-6 flex flex-col gap-4 justify-center flex-1">
               {/* User Basic Info Section */}
               <div className="flex items-center gap-4 mb-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${demoState === 'invalid' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-700'}`}>
                     <span className="material-symbols-outlined text-3xl">person</span>
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Chủ Phương Tiện</p>
                     <p className="font-headline font-bold text-xl text-slate-800 leading-tight">{demoState === 'invalid' ? 'Khách ngoài hệ thống' : currentUser.name}</p>
                  </div>
               </div>

               {/* Detailed Metadata Grid */}
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">badge</span> Mã số / Cán bộ</p>
                     <p className="font-bold text-slate-700 text-sm">{demoState === 'invalid' ? '---' : currentUser.id}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">school</span> Nhóm đối tượng</p>
                     <p className="font-bold text-slate-700 text-sm">{demoState === 'invalid' ? '---' : currentUser.group}</p>
                  </div>
               </div>
               
               <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">account_balance</span> Đơn vị / Khoa quản lý</p>
                  <p className="font-bold text-slate-700 text-sm">{demoState === 'invalid' ? '---' : currentUser.unit}</p>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-2xl border hover:shadow-sm transition-shadow ${demoState === 'invalid' ? 'bg-red-50 border-red-100 text-red-900' : 'bg-blue-50/50 border-blue-100 text-blue-900'}`}>
                     <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${demoState === 'invalid' ? 'text-red-400' : 'text-blue-500'}`}><span className="material-symbols-outlined text-[13px]">directions_car</span> Phương tiện</p>
                     <p className="font-bold text-sm leading-tight">{demoState === 'invalid' ? 'Không xác định' : currentUser.vehicleType}</p>
                  </div>
                  <div className={`p-3 rounded-2xl border hover:shadow-sm transition-shadow ${demoState === 'invalid' ? 'bg-slate-50 border-slate-100 text-slate-700' : 'bg-blue-50/50 border-blue-100 text-blue-900'}`}>
                     <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${demoState === 'invalid' ? 'text-slate-400' : 'text-blue-500'}`}><span className="material-symbols-outlined text-[13px]">history_toggle_off</span> Thời điểm vào</p>
                     <p className="font-bold text-sm">{demoState === 'invalid' ? '--:--:--' : currentUser.entryTime}</p>
                  </div>
               </div>
            </div>

            {/* Barrier Controls */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <button onClick={handleOpen} disabled={demoState==='offline' || demoState==='full' || isBarrierOpen} className={`py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-headline font-bold text-sm transition-all text-white shadow-lg ${demoState==='offline' || demoState==='full' || isBarrierOpen ? 'bg-slate-300 shadow-none cursor-not-allowed text-slate-500' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 active:scale-95'}`}>
                  <span className="material-symbols-outlined text-lg">door_open</span>
                  Mở Barrier
                </button>
                <button onClick={handleClose} disabled={demoState==='offline' || !isBarrierOpen} className={`py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-headline font-bold text-sm transition-all border-2 ${(demoState==='offline' || !isBarrierOpen) ? 'border-slate-200 text-slate-400 cursor-not-allowed' : 'border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95'}`}>
                  Đóng Barrier
                </button>
              </div>
              
              {isBarrierOpen && (
                <div className="mb-5 py-3 px-4 bg-green-100 border border-green-200 text-green-800 rounded-xl flex items-center justify-center gap-2 font-bold text-sm animate-pulse">
                   <span className="material-symbols-outlined">sensor_door</span>
                   LỐI ĐI ĐANG TẠM MỞ XUYÊN SUỐT
                </div>
              )}

              <div className="pt-5 border-t border-slate-200 border-dashed">
                <button onClick={() => setShowIssueCard(true)} className="w-full py-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-headline font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95">
                  <span className="material-symbols-outlined">receipt_long</span>
                  Xử lý vé tay / Cấp thẻ tạm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-actions & Log */}
      <div className="w-full relative z-10 flex flex-col gap-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-headline font-bold text-slate-800">Nhật ký truy cập hệ thống gần đây</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Xem toàn bộ báo cáo</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Thời gian</th>
                  <th className="p-4">Biển số nhận diện</th>
                  <th className="p-4">Đối tượng</th>
                  <th className="p-4">Hành động AI</th>
                </tr>
              </thead>
              <tbody>
                {ENTRY_LOG.map(([time,plate,type,result,bc,tc]) => (
                  <tr key={time+plate} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono text-slate-500 text-sm font-medium">{time}</td>
                    <td className="p-4 font-headline font-bold text-slate-800">{plate}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{type}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${bc} ${tc}`}>{result}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Temporary Card Modal */}
      {showIssueCard && (
         <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setShowIssueCard(false)}></div>
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-headline font-bold text-slate-800">Phát hành Thẻ tạm (Khách)</h3>
                   <button onClick={()=>setShowIssueCard(false)} className="text-slate-400 hover:text-slate-600">
                     <span className="material-symbols-outlined">close</span>
                   </button>
                 </div>
                 
                 <div className="space-y-5 mb-8">
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Biển số tự động bóc tách</label>
                     <input type="text" defaultValue={config.plate !== '---' ? config.plate : ''} placeholder="Đang chờ AI nhận dạng lại..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-headline font-bold text-slate-800 focus:border-blue-400 outline-none transition-colors" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phân loại Dòng xe</label>
                     <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-blue-400 cursor-pointer">
                       <option>Ô tô con (Sedan / SUV)</option>
                       <option>Xe máy / Mô tô</option>
                       <option>Xe tải nhẹ / Xe giao hàng</option>
                     </select>
                   </div>
                   
                   <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm">
                     <span className="material-symbols-outlined text-blue-500 mt-0.5" style={{fontSize: 20}}>info</span>
                     <p className="leading-relaxed">Hệ thống sẽ ghi nhận phiên với mã chip thẻ <strong className="bg-blue-100 px-1 rounded">VITOR-0892</strong> và lập tức ra lệnh cho Barrier Mở khẩn cấp.</p>
                   </div>
                 </div>

                 <button onClick={() => { setShowIssueCard(false); setIsBarrierOpen(true); }} className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-headline font-bold rounded-xl shadow-lg transition-all active:scale-95">
                    Phê duyệt Phiên & Mở Cổng
                 </button>
              </div>
            </div>
         </div>
      )}
    </div>
  )
}
