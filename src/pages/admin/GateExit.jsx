import { useState, useEffect } from 'react'

const EXIT_LOG = [
  ['09:20:01','29C-112.55','1h 45p','26,250','BKPay','Thành công','bg-green-100','text-green-700'],
  ['09:15:33','77B-222.11','0h 55p','8,250','Tiền mặt','Thành công','bg-green-100','text-green-700'],
  ['09:08:22','55A-334.88','3h 12p','48,000','Thẻ NFC','Thành công','bg-green-100','text-green-700'],
  ['09:01:05','51D-999.00','0h 30p','4,500','BKPay','Từ chối','bg-red-100','text-red-700'],
]

export default function GateExit() {
  const [demoState, setDemoState] = useState('normal') // normal, open, offline
  const [showTempCard, setShowTempCard] = useState(false)
  const [isBarrierOpen, setIsBarrierOpen] = useState(false)

  const handleBarrier = () => setIsBarrierOpen(true)
  const handleClose = () => setIsBarrierOpen(false)

  const statusConfig = {
    normal:  { title: 'KIỂM TRA THANH TOÁN', color: 'bg-orange-500', icon: 'payments', bg: 'bg-gradient-to-r from-orange-900/95 to-amber-700/95', validateText: 'Chưa đóng phí', plate: '51C - 002.31' },
    open: { title: 'ĐÃ THANH TOÁN - HOÀN TẤT', color: 'bg-green-500', icon: 'check_circle', bg: 'bg-gradient-to-r from-teal-900/95 to-emerald-700/95', validateText: 'Thành công ✓', plate: '29C - 112.55' },
    offline: { title: 'MẤT KẾT NỐI CAMERA & HẠ TẦNG', color: 'bg-slate-400', icon: 'wifi_off', bg: 'bg-gradient-to-r from-slate-800/95 to-slate-600/95', validateText: 'Không xác định', plate: '---' },
  }
  const config = statusConfig[demoState]

  // Phím tắt để mô phỏng sự kiện chụp ảnh báo cáo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.altKey && e.key === '1') { e.preventDefault(); setDemoState('normal'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); setDemoState('open'); }
      if (e.altKey && e.key === '3') { e.preventDefault(); setDemoState('offline'); }
      if (e.key === 'Escape') { e.preventDefault(); setDemoState('normal'); }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-full font-inter relative">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 relative z-10">
        <div>
          <h2 className="text-3xl font-headline font-bold text-slate-800 tracking-tight mb-1">Kiểm soát Cổng ra A2</h2>
          <p className="text-slate-500 font-medium text-sm">Cơ sở Quận 10 • Xử lý giao dịch và điều phối xe ra</p>
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
        <div className="xl:col-span-7 flex flex-col gap-6 h-full">
          {/* Main Panorama Camera (Dual View) */}
          <div className={`flex-1 min-h-[400px] bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 group transition-all duration-500 ${demoState === 'normal' ? 'shadow-[0_20px_60px_-15px_rgba(245,158,11,0.3)]' : 'shadow-xl'}`}>
             
             {/* Status Overlay Banner */}
             <div className={`absolute top-0 left-0 w-full px-6 py-4 ${config.bg} backdrop-blur-md flex justify-between items-center z-20 transition-colors duration-500 border-b border-white/10`}>
                <div className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-3xl opacity-90">{config.icon}</span>
                  <span className="font-headline font-bold tracking-widest text-lg drop-shadow-md">{config.title}</span>
                </div>
             </div>

             {demoState === 'offline' ? (
                <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-600 bg-slate-900/80 z-10">
                   <span className="material-symbols-outlined text-6xl mb-4 opacity-50">videocam_off</span>
                   <p className="font-headline font-bold text-xl uppercase tracking-widest opacity-50">Mất Kết Nối Hệ Thống</p>
                </div>
             ) : (
                <div className="absolute inset-0 grid grid-cols-2 pt-[72px]">
                   {/* Capture Image */}
                   <div className="relative border-r border-slate-700">
                     <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCp_A-NpfnkI5T-NvI09jesAIJm7BHMLBHM65gnE5cF38QLLa1piiRD6_hC_5HaryhiKfwIueba4unmp6s2pTw39E9jiHxwlcXjXhEIWxHG32ejymnCTYoPIaYkhZFhrLHB8Grc8qi4f3izLcTvpj8QKKTzz6Is3CGclQ7aEm38R0rJ1PdEN5MHIc6uq2IMVELwWIGKFmBlbWHTFDRnNBYCej0L4yWQh8bcbMb8ysU0OjIbdbwQXks7NoNGMEV7_JPR9dnJyV-KcI" 
                          alt="In" className="w-full h-full object-cover opacity-60 grayscale-[30%]" />
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border-l-4 border-slate-400">
                       <span className="text-slate-300 text-[10px] font-bold block uppercase tracking-wide">Ảnh lúc vào</span>
                       <span className="text-white text-xs font-mono">{demoState==='open'?'07:35:00':'09:12:30'}</span>
                     </div>
                   </div>

                   {/* Live Image */}
                   <div className="relative">
                     <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCp_A-NpfnkI5T-NvI09jesAIJm7BHMLBHM65gnE5cF38QLLa1piiRD6_hC_5HaryhiKfwIueba4unmp6s2pTw39E9jiHxwlcXjXhEIWxHG32ejymnCTYoPIaYkhZFhrLHB8Grc8qi4f3izLcTvpj8QKKTzz6Is3CGclQ7aEm38R0rJ1PdEN5MHIc6uq2IMVELwWIGKFmBlbWHTFDRnNBYCej0L4yWQh8bcbMb8ysU0OjIbdbwQXks7NoNGMEV7_JPR9dnJyV-KcI" 
                          alt="Out" className="w-full h-full object-cover opacity-90" />
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border-l-4 border-blue-500 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                       <span className="text-white text-[10px] font-bold block uppercase tracking-wide">Live Exit</span>
                     </div>
                   </div>
                   
                   {/* Middle VS Badge */}
                   <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center text-white font-black text-sm z-10 shadow-xl">
                      VS
                   </div>
                </div>
             )}

             {/* Bottom Left Plate Card */}
             <div className="absolute bottom-6 left-6 z-20 flex gap-4 w-[calc(100%-48px)] justify-between items-end">
               <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex gap-5 items-center">
                 <div className="bg-white/95 px-5 py-2.5 rounded-xl shadow-inner border border-slate-300">
                   <span className={`font-headline font-black text-3xl tracking-wider text-slate-800`}>{config.plate}</span>
                 </div>
                 <div className="hidden sm:block">
                   <p className="text-xs text-white/70 font-bold uppercase tracking-wider mb-1">bóc tách lúc ra</p>
                   {demoState !== 'offline' ? (
                     <p className={`text-sm font-bold flex items-center gap-1 text-green-400`}>
                       <span className="material-symbols-outlined text-sm">verified</span> Khớp 99.8%
                     </p>
                   ) : (
                     <p className="text-sm font-bold text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">wifi_off</span> Mất tín hiệu</p>
                   )}
                 </div>
               </div>
               
               {/* Comparison result badge aligned bottom-right */}
               {demoState !== 'offline' && (
                 <div className={`px-4 py-3 rounded-xl font-bold text-sm tracking-wide border backdrop-blur-md shadow-xl ${demoState === 'open' ? 'bg-green-500/20 border-green-400 text-green-400' : 'bg-orange-500/20 border-orange-400 text-orange-400'}`}>
                    TRÙNG KHỚP ẢNH: 99.8%
                 </div>
               )}
             </div>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
             {[['Lượt xe ra hôm nay','412', 'directions_car'],['Xe chờ giải quyết', demoState === 'offline' ? '4' : '1', 'hourglass_top'],['Cảnh báo/Lỗi', '0', 'notification_important']].map(([l,v,i]) => (
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
        <div className="xl:col-span-5 flex flex-col gap-6 h-full">
          
          {/* RFID Scanner */}
          <div className={`bg-white rounded-3xl p-6 border-2 transition-colors duration-300 shadow-md ${demoState === 'normal' ? 'border-orange-100 bg-orange-50/20' : 'border-blue-100'}`}>
            <label className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
               <span className="material-symbols-outlined text-blue-600">nfc</span>
               Quét thẻ trả ra / Thanh toán
            </label>
            <div className="relative">
               <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-blue-500 animate-pulse`}>contactless</span>
               <input autoFocus type="text" placeholder="Chờ tín hiệu từ thiết bị quét ngoại vi..." 
                 defaultValue={demoState==='offline' ? '' : 'STD-211-043'} 
                 className={`w-full pl-14 pr-4 py-4 rounded-xl text-lg font-bold font-mono outline-none transition-all border ${demoState === 'normal' ? 'bg-orange-50/50 border-orange-200 focus:border-orange-400 text-orange-900' : 'bg-slate-50 text-blue-900 border-slate-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]'}`} />
            </div>
          </div>

          {/* Vehicle Info Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <h4 className="font-headline font-bold text-slate-800 text-lg">Hồ sơ Cấp phép Truy cập</h4>
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${demoState === 'open' ? 'bg-green-100 text-green-700' : demoState === 'offline' ? 'bg-slate-100 text-slate-600' : 'bg-orange-100 text-orange-700'}`}>{config.validateText}</span>
            </div>
            
            <div className="p-6 flex flex-col gap-4 justify-center flex-1">
               {/* User Basic Info Section */}
               <div className="flex items-center gap-4 mb-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${demoState === 'offline' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-100 text-indigo-700'}`}>
                     <span className="material-symbols-outlined text-3xl">person</span>
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Chủ Phương Tiện</p>
                     <p className="font-headline font-bold text-xl text-slate-800 leading-tight">{demoState === 'offline' ? 'Chưa nhận dạng' : 'Trần Minh Hoàng'}</p>
                  </div>
               </div>

               {/* Detailed Metadata Grid */}
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">badge</span> Mã số / Cán bộ</p>
                     <p className="font-bold text-slate-700 text-sm">{demoState === 'offline' ? '---' : '2110432'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">school</span> Nhóm đối tượng</p>
                     <p className="font-bold text-slate-700 text-sm">{demoState === 'offline' ? '---' : 'Sinh viên chính quy'}</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">schedule</span> Thời gian gửi</p>
                     <p className="font-bold text-slate-700 text-sm">{demoState === 'offline' ? '---' : demoState === 'open' ? '4h 10 phút' : '2h 15 phút'}</p>
                  </div>
                  <div className={`p-3 rounded-2xl border flex items-center justify-between hover:shadow-sm transition-shadow ${demoState === 'open' ? 'bg-green-50 border-green-200 text-green-900' : demoState === 'offline' ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-orange-50 border-orange-200 text-orange-900 shadow-inner'}`}>
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">
                           {demoState === 'offline' ? 'TỔNG PHÍ' : demoState === 'open' ? 'ĐÃ TT' : 'TỔNG PHÍ (VNĐ)'}
                        </p>
                        <p className={`font-bold text-lg leading-tight font-mono ${demoState === 'normal' ? 'text-2xl' : ''}`}>{demoState === 'offline' ? '0' : demoState === 'open' ? '0' : '30,000'}</p>
                     </div>
                     {demoState === 'open' && <span className="material-symbols-outlined text-green-500 text-3xl">task_alt</span>}
                     {demoState === 'normal' && <span className="material-symbols-outlined text-orange-500 text-2xl animate-pulse">payment</span>}
                  </div>
               </div>
            </div>

            {/* Barrier Controls */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <button onClick={handleBarrier} disabled={demoState==='offline' || isBarrierOpen} className={`py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-headline font-bold text-sm transition-all text-white shadow-lg ${demoState==='offline' || isBarrierOpen ? 'bg-slate-300 shadow-none cursor-not-allowed text-slate-500' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 active:scale-95'}`}>
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
                <button onClick={() => setShowTempCard(true)} className="w-full py-4 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl font-headline font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95">
                  <span className="material-symbols-outlined">receipt_long</span>
                  Thu hồi thẻ tạm / Khách ra
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
            <h3 className="font-headline font-bold text-slate-800">Nhật ký truy cập hệ thống ra</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Xuất báo cáo</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Thời gian</th>
                  <th className="p-4">Biển số</th>
                  <th className="p-4">Thời gian gửi</th>
                  <th className="p-4">Phí (VNĐ)</th>
                  <th className="p-4">Thanh toán</th>
                  <th className="p-4">Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {EXIT_LOG.map(([time,plate,dur,fee,method,result,bc,tc]) => (
                  <tr key={time+plate} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono text-slate-500 text-sm font-medium">{time}</td>
                    <td className="p-4 font-headline font-bold text-slate-800">{plate}</td>
                    <td className="p-4 text-sm text-slate-600 font-medium">{dur}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{fee}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{method}</span>
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
      {showTempCard && (
         <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setShowTempCard(false)}></div>
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-headline font-bold text-slate-800">Thu hồi Thẻ tạm (Khách)</h3>
                   <button onClick={()=>setShowTempCard(false)} className="text-slate-400 hover:text-slate-600">
                     <span className="material-symbols-outlined">close</span>
                   </button>
                 </div>
                 
                 <div className="space-y-5 mb-8">
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Biển số tự động bóc tách</label>
                     <input type="text" defaultValue={config.plate !== '---' ? config.plate : ''} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-headline font-bold text-slate-800 focus:border-blue-400 outline-none transition-colors" readOnly />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mã thẻ thu hồi</label>
                     <input autoFocus type="text" placeholder="Quẹt thẻ hoặc nhập mã RFID (VD: VITOR-001)" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-blue-500 ring-2 ring-blue-100" />
                   </div>
                   
                   <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex justify-between items-center">
                     <div>
                       <span className="text-xs font-bold text-orange-700 uppercase tracking-wide block mb-1">Tổng phí thanh toán</span>
                       <span className="font-headline font-bold text-2xl text-orange-900">25,000<span className="text-sm ml-1 opacity-70">VNĐ</span></span>
                     </div>
                     <span className="material-symbols-outlined text-4xl text-orange-300">payments</span>
                   </div>
                 </div>

                 <button onClick={() => { setShowTempCard(false); setIsBarrierOpen(true); }} className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-headline font-bold rounded-xl shadow-lg transition-all active:scale-95">
                    Xác nhận Thu phí & Mở cổng
                 </button>
              </div>
            </div>
         </div>
      )}
    </div>
  )
}
