import { useState, useEffect } from 'react'
import { mockDB } from '../../services/mockDB'
import { parkingService } from './parkingService'

export default function GateExit() {
  const [demoState, setDemoState] = useState('normal') // normal, open, offline
  const [showTempCard, setShowTempCard] = useState(false)
  const [isBarrierOpen, setIsBarrierOpen] = useState(false)
  const [exitInput, setExitInput] = useState('')
  const [scanResult, setScanResult] = useState(null) // active session OR guest ticket display data
  const [statusMessage, setStatusMessage] = useState('Chưa quét thẻ')
  const [isProcessing, setIsProcessing] = useState(false)
  const [exitLog, setExitLog] = useState([])

  // Guest payment states (card guest + ticket guest)
  const [isWaitingPayment, setIsWaitingPayment] = useState(false)
  const [pendingExitData, setPendingExitData] = useState(null)
  // pendingExitData = { type: 'card', session, fee, cardInfo }
  //                 | { type: 'ticket', ticket, fee }

  useEffect(() => {
    mockDB.init()
    setExitLog(mockDB.getAccessLog(10).filter(log => log.action === 'EXIT'))
  }, [])

  const handleBarrier = () => setIsBarrierOpen(true)
  const handleClose = () => {
    setIsBarrierOpen(false); setExitInput(''); setScanResult(null)
    setStatusMessage('Chưa quét thẻ'); setDemoState('normal')
  }

  // UC-02B / UC-03: Main exit processing
  const handleExitScan = () => {
    if (!exitInput.trim()) return
    setIsProcessing(true)
    setStatusMessage('Đang xử lý...')
    const input = exitInput.trim()

    // Branch: guest temporary ticket (TEMP-XXXXXX)
    if (input.startsWith('TEMP-')) {
      const result = parkingService.processGuestTicketExit(input)
      if (!result.success) {
        setStatusMessage(result.error)
        setIsProcessing(false)
        return
      }
      const { ticket, fee } = result
      setScanResult({ vehicle: ticket.plate, entryTime: ticket.createdAt, fee, card: ticket.id, userRole: 'guest', vehicleType: ticket.vehicleType })
      setPendingExitData({ type: 'ticket', ticket, fee })
      setIsWaitingPayment(true)
      setStatusMessage(`Thẻ tạm ${input} · Xe ${ticket.plate} · Phí: ${fee.toLocaleString('vi-VN')} VNĐ — Chờ thanh toán.`)
      setIsProcessing(false)
      return
    }

    // Branch: regular card
    const exitResult = parkingService.processExit(input)
    if (!exitResult.success) {
      setScanResult(null); setDemoState('normal')
      setStatusMessage(exitResult.error)
      mockDB.logAccess('EXIT', input, '---', 'NO_ACTIVE_SESSION')
      setIsProcessing(false)
      return
    }

    const { session, fee, cardInfo, isGuest } = exitResult

    if (!isGuest) {
      // Member: auto-debt → close session → open barrier immediately
      const memberResult = parkingService.completeMemberExit(session.id, session.card)
      setScanResult(memberResult.session)
      setDemoState('open'); setIsBarrierOpen(true)
      setStatusMessage(`Xe ${session.vehicle} đã ra. Phí ${fee.toLocaleString('vi-VN')} VNĐ đã ghi nợ.`)
      setExitLog(mockDB.getAccessLog(10).filter(l => l.action === 'EXIT'))
    } else {
      // Guest card: wait for payment — barrier stays LOCKED
      setScanResult({ ...session, fee })
      setPendingExitData({ type: 'card', session, fee, cardInfo })
      setIsWaitingPayment(true)
      setStatusMessage(`Khách vãng lai · Xe ${session.vehicle} · Phí: ${fee.toLocaleString('vi-VN')} VNĐ — Chờ thanh toán.`)
    }

    setIsProcessing(false)
  }

  // Callback [OK]: payment confirmed → close session/ticket → open barrier
  const handleConfirmPayment = () => {
    if (!pendingExitData) return

    if (pendingExitData.type === 'ticket') {
      const result = parkingService.completeGuestTicketExit(pendingExitData.ticket.id)
      if (result.success) {
        const t = result.ticket
        setScanResult({ vehicle: t.plate, entryTime: t.createdAt, exitTime: t.exitTime, fee: t.fee, card: t.id, userRole: 'guest', paymentMethod: 'cash' })
        setDemoState('open'); setIsBarrierOpen(true)
        setIsWaitingPayment(false); setPendingExitData(null)
        setStatusMessage(`Thẻ tạm thanh toán xong. Xe ${t.plate} đã ra cổng.`)
        setExitLog(mockDB.getAccessLog(10).filter(l => l.action === 'EXIT'))
        setExitInput('')
      }
    } else {
      const result = parkingService.completeGuestExit(pendingExitData.session.id)
      if (result.success) {
        setScanResult(result.session)
        setDemoState('open'); setIsBarrierOpen(true)
        setIsWaitingPayment(false); setPendingExitData(null)
        setStatusMessage(`Thanh toán thành công. Xe ${result.session.vehicle} đã ra cổng.`)
        setExitLog(mockDB.getAccessLog(10).filter(l => l.action === 'EXIT'))
        setExitInput('')
      }
    }
  }

  const statusConfig = {
    normal: { title: 'KIỂM TRA', color: 'bg-orange-500', icon: 'payments', bg: 'bg-gradient-to-r from-orange-900/95 to-amber-700/95', validateText: 'Chưa đóng phí', plate: scanResult?.vehicle || '51C - 002.31' },
    open:   { title: 'ĐÃ XÁC THỰC - HOÀN TẤT', color: 'bg-green-500', icon: 'check_circle', bg: 'bg-gradient-to-r from-teal-900/95 to-emerald-700/95', validateText: 'Thành công ✓', plate: scanResult?.vehicle || '29C - 112.55' },
    offline:{ title: 'MẤT KẾT NỐI CAMERA & HẠ TẦNG', color: 'bg-slate-400', icon: 'wifi_off', bg: 'bg-gradient-to-r from-slate-800/95 to-slate-600/95', validateText: 'Không xác định', plate: '---' },
  }
  const config = statusConfig[demoState]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.altKey && e.key === '1') { e.preventDefault(); setDemoState('normal') }
      if (e.altKey && e.key === '2') { e.preventDefault(); setDemoState('open') }
      if (e.altKey && e.key === '3') { e.preventDefault(); setDemoState('offline') }
      if (e.key === 'Escape') { e.preventDefault(); setDemoState('normal'); setIsWaitingPayment(false) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const exitCount = mockDB.getAccessLog().filter(l => l.action === 'EXIT' && l.result === 'SUCCESS').length
  const pendingFee = pendingExitData?.fee ?? scanResult?.fee ?? 0

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-full font-inter relative">
      {/* Header */}
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
        {/* Left: Camera */}
        <div className="xl:col-span-7 flex flex-col gap-6 h-full">
          <div className={`flex-1 min-h-[400px] bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 transition-all duration-500 ${demoState === 'normal' ? 'shadow-[0_20px_60px_-15px_rgba(245,158,11,0.3)]' : 'shadow-xl'}`}>
            <div className={`absolute top-0 left-0 w-full px-6 py-4 ${config.bg} backdrop-blur-md flex justify-between items-center z-20 transition-colors duration-500 border-b border-white/10`}>
              <div className="flex items-center gap-3 text-white">
                <span className="material-symbols-outlined text-3xl opacity-90">{config.icon}</span>
                <span className="font-headline font-bold tracking-widest text-lg drop-shadow-md">{config.title}</span>
              </div>
              {isWaitingPayment && (
                <span className="bg-amber-400 text-amber-900 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider animate-pulse">Chờ thanh toán</span>
              )}
            </div>

            {demoState === 'offline' ? (
              <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-600 bg-slate-900/80 z-10">
                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">videocam_off</span>
                <p className="font-headline font-bold text-xl uppercase tracking-widest opacity-50">Mất Kết Nối Hệ Thống</p>
              </div>
            ) : (
              <div className="absolute inset-0 grid grid-cols-2 pt-[72px]">
                <div className="relative border-r border-slate-700">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCp_A-NpfnkI5T-NvI09jesAIJm7BHMLBHM65gnE5cF38QLLa1piiRD6_hC_5HaryhiKfwIueba4unmp6s2pTw39E9jiHxwlcXjXhEIWxHG32ejymnCTYoPIaYkhZFhrLHB8Grc8qi4f3izLcTvpj8QKKTzz6Is3CGclQ7aEm38R0rJ1PdEN5MHIc6uq2IMVELwWIGKFmBlbWHTFDRnNBYCej0L4yWQh8bcbMb8ysU0OjIbdbwQXks7NoNGMEV7_JPR9dnJyV-KcI"
                    alt="In" className="w-full h-full object-cover opacity-60 grayscale-[30%]" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border-l-4 border-slate-400">
                    <span className="text-slate-300 text-[10px] font-bold block uppercase tracking-wide">Ảnh lúc vào</span>
                    <span className="text-white text-xs font-mono">{scanResult ? new Date(scanResult.entryTime).toLocaleTimeString('vi-VN') : '---'}</span>
                  </div>
                </div>
                <div className="relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCp_A-NpfnkI5T-NvI09jesAIJm7BHMLBHM65gnE5cF38QLLa1piiRD6_hC_5HaryhiKfwIueba4unmp6s2pTw39E9jiHxwlcXjXhEIWxHG32ejymnCTYoPIaYkhZFhrLHB8Grc8qi4f3izLcTvpj8QKKTzz6Is3CGclQ7aEm38R0rJ1PdEN5MHIc6uq2IMVELwWIGKFmBlbWHTFDRnNBYCej0L4yWQh8bcbMb8ysU0OjIbdbwQXks7NoNGMEV7_JPR9dnJyV-KcI"
                    alt="Out" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border-l-4 border-blue-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-white text-[10px] font-bold block uppercase tracking-wide">Live Exit</span>
                  </div>
                </div>
                <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center text-white font-black text-sm z-10 shadow-xl">VS</div>
              </div>
            )}

            <div className="absolute bottom-6 left-6 z-20 flex gap-4 w-[calc(100%-48px)] justify-between items-end">
              <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex gap-5 items-center">
                <div className="bg-white/95 px-5 py-2.5 rounded-xl shadow-inner border border-slate-300">
                  <span className="font-headline font-black text-3xl tracking-wider text-slate-800">{scanResult?.vehicle || config.plate}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-white/70 font-bold uppercase tracking-wider mb-1">bóc tách lúc ra</p>
                  {demoState !== 'offline' ? (
                    <p className="text-sm font-bold flex items-center gap-1 text-green-400">
                      <span className="material-symbols-outlined text-sm">verified</span> Khớp 99.8%
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">wifi_off</span> Mất tín hiệu</p>
                  )}
                </div>
              </div>
              {demoState !== 'offline' && (
                <div className={`px-4 py-3 rounded-xl font-bold text-sm tracking-wide border backdrop-blur-md shadow-xl ${demoState === 'open' ? 'bg-green-500/20 border-green-400 text-green-400' : isWaitingPayment ? 'bg-amber-500/20 border-amber-400 text-amber-400' : 'bg-orange-500/20 border-orange-400 text-orange-400'}`}>
                  {isWaitingPayment ? 'CHỜ THANH TOÁN' : 'TRÙNG KHỚP ẢNH: 99.8%'}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              ['Lượt xe ra hôm nay', exitCount.toString(), 'directions_car'],
              ['Xe chờ giải quyết', isWaitingPayment ? '1' : '0', 'hourglass_top'],
              ['Cảnh báo/Lỗi', mockDB.getAccessLog().filter(l => l.result !== 'SUCCESS').length.toString(), 'notification_important'],
            ].map(([l, v, i]) => (
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

        {/* Right: Ops Panel */}
        <div className="xl:col-span-5 flex flex-col gap-6 h-full">

          {/* Scanner */}
          <div className={`bg-white rounded-3xl p-6 border-2 transition-colors duration-300 shadow-md ${isWaitingPayment ? 'border-amber-300 bg-amber-50/30' : demoState === 'normal' ? 'border-orange-100 bg-orange-50/20' : 'border-blue-100'}`}>
            <label className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
              <span className="material-symbols-outlined text-blue-600">nfc</span>
              Quét thẻ ra / Mã thẻ tạm (TEMP-…)
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-blue-500 animate-pulse">contactless</span>
              <input autoFocus type="text"
                placeholder="Mã thẻ (USER_XX) hoặc mã tạm (TEMP-…)"
                value={exitInput}
                onChange={(e) => setExitInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && exitInput.trim()) handleExitScan() }}
                className={`w-full pl-14 pr-4 py-4 rounded-xl text-lg font-bold font-mono outline-none transition-all border ${isWaitingPayment ? 'bg-amber-50 border-amber-300 text-amber-900' : demoState === 'normal' ? 'bg-orange-50/50 border-orange-200 focus:border-orange-400 text-orange-900' : 'bg-slate-50 text-blue-900 border-slate-200 focus:border-blue-400 focus:bg-white'}`}
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleExitScan} disabled={isProcessing || !exitInput.trim() || isWaitingPayment}
                className={`flex-1 py-3 px-5 rounded-xl font-bold text-white transition ${isProcessing || !exitInput.trim() || isWaitingPayment ? 'bg-slate-300 text-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isProcessing ? 'Đang xử lý...' : 'Xác nhận ra'}
              </button>
              <button onClick={() => { setExitInput(''); setScanResult(null); setStatusMessage('Chưa quét thẻ'); setDemoState('normal'); setIsWaitingPayment(false); setPendingExitData(null) }}
                className="py-3 px-5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition">
                Đặt lại
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-500">Trạng thái: <span className="font-semibold text-slate-800">{statusMessage}</span></p>
          </div>

          {/* Vehicle Info Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h4 className="font-headline font-bold text-slate-800 text-lg">Hồ sơ Cấp phép Truy cập</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${demoState === 'open' ? 'bg-green-100 text-green-700' : isWaitingPayment ? 'bg-amber-100 text-amber-700' : demoState === 'offline' ? 'bg-slate-100 text-slate-600' : 'bg-orange-100 text-orange-700'}`}>
                {isWaitingPayment ? 'Chờ thanh toán' : config.validateText}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4 justify-center flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${demoState === 'offline' ? 'bg-slate-100 text-slate-400' : isWaitingPayment ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                  <span className="material-symbols-outlined text-3xl">person</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Chủ Phương Tiện</p>
                  <p className="font-headline font-bold text-xl text-slate-800 leading-tight">
                    {demoState === 'offline' ? 'Chưa nhận dạng'
                      : scanResult
                        ? (mockDB.validateCard(scanResult.card)?.name || (scanResult.card?.startsWith('TEMP-') ? 'Khách tạm thời' : 'Khách vãng lai'))
                        : 'Chưa xác định'}
                  </p>
                  {scanResult && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {mockDB.validateCard(scanResult.card)?.group || 'Khách'}
                      {scanResult.userRole === 'guest' && (
                        <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">
                          {scanResult.card?.startsWith('TEMP-') ? 'THẺ TẠM' : 'KHÁCH VÃNG LAI'}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">badge</span> Xe / Biển số
                  </p>
                  <p className="font-bold text-slate-700 text-sm">{scanResult?.vehicle || '---'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">schedule</span> Thời gian vào
                  </p>
                  <p className="font-bold text-slate-700 text-sm">{scanResult ? new Date(scanResult.entryTime).toLocaleTimeString('vi-VN') : '---'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">schedule</span> Thời gian ra
                  </p>
                  <p className="font-bold text-slate-700 text-sm">
                    {demoState === 'open' && scanResult?.exitTime ? new Date(scanResult.exitTime).toLocaleTimeString('vi-VN') : '---'}
                  </p>
                </div>
                <div className={`p-3 rounded-2xl border flex items-center justify-between ${demoState === 'open' ? 'bg-green-50 border-green-200 text-green-900' : isWaitingPayment ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-inner' : demoState === 'offline' ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-orange-50 border-orange-200 text-orange-900 shadow-inner'}`}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">
                      {demoState === 'open' && !isWaitingPayment ? (scanResult?.paymentMethod === 'debt' ? 'GHI NỢ' : 'ĐÃ TT') : 'TỔNG PHÍ (VNĐ)'}
                    </p>
                    <p className="font-bold text-lg leading-tight font-mono">{pendingFee.toLocaleString('vi-VN')}</p>
                  </div>
                  {demoState === 'open' && !isWaitingPayment && <span className="material-symbols-outlined text-green-500 text-3xl">task_alt</span>}
                  {isWaitingPayment && <span className="material-symbols-outlined text-amber-500 text-2xl animate-pulse">payment</span>}
                </div>
              </div>

              {demoState === 'open' && scanResult?.paymentMethod === 'debt' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500 text-lg">account_balance_wallet</span>
                  <span>Phí <strong>{(scanResult?.fee || 0).toLocaleString('vi-VN')} VNĐ</strong> đã ghi vào công nợ thành viên.</span>
                </div>
              )}
            </div>

            {/* Barrier Controls */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <button onClick={handleBarrier} disabled={demoState === 'offline' || isBarrierOpen || isWaitingPayment}
                  className={`py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-headline font-bold text-sm transition-all text-white shadow-lg ${demoState === 'offline' || isBarrierOpen || isWaitingPayment ? 'bg-slate-300 shadow-none cursor-not-allowed text-slate-500' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 active:scale-95'}`}>
                  <span className="material-symbols-outlined text-lg">door_open</span> Mở Barrier
                </button>
                <button onClick={handleClose} disabled={demoState === 'offline' || !isBarrierOpen}
                  className={`py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-headline font-bold text-sm transition-all border-2 ${(demoState === 'offline' || !isBarrierOpen) ? 'border-slate-200 text-slate-400 cursor-not-allowed' : 'border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95'}`}>
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
                <button onClick={() => setShowTempCard(true)}
                  className="w-full py-4 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl font-headline font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95">
                  <span className="material-symbols-outlined">receipt_long</span>
                  Thu hồi thẻ tạm / Khách ra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Log */}
      <div className="w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-headline font-bold text-slate-800">Nhật ký truy cập hệ thống ra</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Xuất báo cáo</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Thời gian</th><th className="p-4">Biển số</th>
                  <th className="p-4">Thời gian gửi</th><th className="p-4">Phí (VNĐ)</th>
                  <th className="p-4">Phương thức</th><th className="p-4">Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {exitLog.map((log) => {
                  const session = mockDB.getSessionById(log.sessionId)
                  const hours = session ? Math.max(1, Math.ceil((new Date(session.exitTime) - new Date(session.entryTime)) / (1000 * 60 * 60))) : 0
                  const resultColor = log.result === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  const paymentLabel = session?.paymentMethod === 'debt'
                    ? { label: 'Ghi nợ', cls: 'bg-blue-100 text-blue-700' }
                    : { label: 'Tiền mặt', cls: 'bg-emerald-100 text-emerald-700' }
                  return (
                    <tr key={log.timestamp + log.card} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono text-slate-500 text-sm">{new Date(log.timestamp).toLocaleTimeString('vi-VN')}</td>
                      <td className="p-4 font-headline font-bold text-slate-800">{log.plate}</td>
                      <td className="p-4 text-sm text-slate-600">{hours}h</td>
                      <td className="p-4 text-sm font-bold text-slate-800">{session?.fee?.toLocaleString('vi-VN') || '---'}</td>
                      <td className="p-4"><span className={`px-3 py-1 rounded-lg text-xs font-bold ${session ? paymentLabel.cls : 'bg-slate-100 text-slate-600'}`}>{session ? paymentLabel.label : '---'}</span></td>
                      <td className="p-4"><span className={`px-3 py-1 rounded-lg text-xs font-bold ${resultColor}`}>{log.result}</span></td>
                    </tr>
                  )
                })}
                {exitLog.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-400 text-sm">Chưa có lượt ra nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Guest Payment Modal — Barrier LOCKED until confirmed */}
      {isWaitingPayment && pendingExitData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-400">
            <div className="bg-amber-50 px-8 pt-8 pb-6 text-center border-b border-amber-200">
              <span className="material-symbols-outlined text-6xl text-amber-500 mb-3 block">payments</span>
              <h3 className="text-2xl font-headline font-bold text-slate-800 mb-1">Chờ Thanh Toán</h3>
              <p className="text-slate-500 text-sm">
                {pendingExitData.type === 'ticket' ? `Thẻ tạm ${pendingExitData.ticket.id}` : 'Xe Khách vãng lai'} — Barrier bị khóa cho đến khi thanh toán
              </p>
            </div>
            <div className="px-8 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Biển số</p>
                  <p className="font-bold text-slate-800">{scanResult?.vehicle || '---'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Thời điểm vào</p>
                  <p className="font-bold text-slate-800">{scanResult ? new Date(scanResult.entryTime).toLocaleTimeString('vi-VN') : '---'}</p>
                </div>
              </div>
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-center">
                <p className="text-sm text-amber-700 font-bold uppercase tracking-wider mb-2">Tổng phí cần thanh toán</p>
                <p className="text-5xl font-black text-amber-900 font-mono">
                  {pendingExitData.fee.toLocaleString('vi-VN')}
                  <span className="text-2xl ml-2 opacity-70">VNĐ</span>
                </p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <span className="material-symbols-outlined text-red-500 text-lg shrink-0">lock</span>
                <span>Barrier đang bị khóa. Xác nhận sau khi nhận đủ tiền mặt hoặc quét BKPay.</span>
              </div>
            </div>
            <div className="px-8 pb-8 space-y-3">
              <button onClick={handleConfirmPayment}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-headline font-bold rounded-xl text-lg shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Xác nhận đã thanh toán & Mở cổng
              </button>
              <button onClick={() => { setIsWaitingPayment(false); setPendingExitData(null); setScanResult(null); setStatusMessage('Đã hủy giao dịch') }}
                className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Temp Card Retrieval Modal */}
      {showTempCard && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowTempCard(false)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-headline font-bold text-slate-800">Tra cứu / Thu hồi Thẻ tạm</h3>
                <button onClick={() => setShowTempCard(false)} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-800 text-sm flex items-start gap-2">
                  <span className="material-symbols-outlined text-blue-500 mt-0.5 text-lg">info</span>
                  <p>Nhập mã thẻ tạm (TEMP-XXXXXX) vào ô quét bên ngoài để xử lý ra cổng và tính phí tự động.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mã thẻ tạm</label>
                  <input type="text" placeholder="TEMP-XXXXXX"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-800 outline-none focus:border-blue-500 ring-2 ring-blue-100"
                    onChange={(e) => { if (e.target.value) setExitInput(e.target.value) }} />
                </div>
              </div>
              <button onClick={() => { setShowTempCard(false) }}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-headline font-bold rounded-xl shadow-lg transition-all active:scale-95">
                Đóng và xử lý tại cổng ra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
