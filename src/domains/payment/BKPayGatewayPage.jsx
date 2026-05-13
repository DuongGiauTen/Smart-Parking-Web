import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import bkLogo from '../../assets/bk.png'

const BACKEND_URL = 'http://localhost:5000'

export default function BKPayGateway() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const amount = searchParams.get('amount') || '0'
  const txId = searchParams.get('id') || ''
  const sessionData = location.state?.sessionData || {}
  
  // States: 'initialize', 'confirm', 'processing', 'success', 'error', 'cancelled', 'infra_error'
  const [step, setStep] = useState('initialize')

  useEffect(() => {
    // Fake loading initial connection phase
    const t = setTimeout(() => setStep('confirm'), 800)
    
    // Keyboard shortcuts for mockup presentation
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === '1') { e.preventDefault(); setStep('error'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); setStep('cancelled'); }
      if (e.altKey && e.key === '3') { e.preventDefault(); setStep('infra_error'); }
      if (e.key === 'Escape') { setStep('confirm'); } // Reset back to confirm
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleExecute = (targetState) => {
    setStep('processing')
    setTimeout(async () => {
      if (targetState === 'success') {
        // Send email confirmation (fire-and-forget, don't block on failure)
        try {
          await fetch(`${BACKEND_URL}/api/email/send-payment-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: sessionData.sessionId || txId,
              amount: sessionData.amount || amount,
              plate: sessionData.plate,
              zone: sessionData.zone,
              entryTime: sessionData.entryTime,
              exitTime: sessionData.exitTime,
              duration: sessionData.duration,
              userName: sessionData.userName || auth?.name,
              userEmail: sessionData.userEmail || auth?.email,
            }),
          })
        } catch (e) {
          console.warn('Email API unavailable:', e.message)
        }
      }
      setStep(targetState)
    }, 1500)
  }

  const studentInfo = {
    name: sessionData.userName || auth?.name || 'Trần Minh Dương',
    id: '2310609',
    faculty: 'Khoa Khoa học và Kỹ thuật Máy tính',
    email: sessionData.userEmail || auth?.email || 'user@hcmut.edu.vn'
  }

  const renderContent = () => {
    switch (step) {
      case 'initialize':
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-[#003d9b] rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-slate-800">Đang khởi tạo BKPay...</h3>
            <p className="text-slate-500 mt-2 text-sm">Thiết lập kênh kết nối an toàn (SSL/TLS)</p>
          </div>
        )

      case 'confirm':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                <span className="material-symbols-outlined text-3xl text-[#003d9b]">account_balance_wallet</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight font-headline">Xác nhận thanh toán</h2>
              <p className="text-slate-500 mt-1 text-sm">Vui lòng kiểm tra lại thông tin sinh viên và hóa đơn.</p>
            </div>

            {/* Thông tin Sinh Viên */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-5 mb-5 relative overflow-hidden group hover:border-[#003d9b]/30 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#003d9b]"></div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">badge</span>
                Thông tin định danh
              </h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-500 mb-0.5">Sinh viên</p>
                  <p className="text-[15px] font-bold text-slate-800">{studentInfo.name}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-500 mb-0.5">Mã số (MSSV)</p>
                  <p className="text-[15px] font-bold text-[#003d9b] font-mono tracking-tight">{studentInfo.id}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-500 mb-0.5">Khoa / Đơn vị</p>
                  <p className="text-[14px] font-semibold text-slate-700">{studentInfo.faculty}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-500 mb-0.5">Email tài khoản</p>
                  <p className="text-[14px] font-medium text-slate-600">{studentInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Chi tiết Hóa Đơn */}
            <div className="bg-white border-2 border-blue-50 rounded-2xl p-5 shadow-sm mb-6 relative overflow-hidden hover:border-blue-100 transition-colors">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -z-10 opacity-70"></div>
               <h4 className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                Chi tiết báo cáo tài chính
              </h4>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-slate-600 font-medium">Đơn vị thụ hưởng</p>
                <p className="text-sm font-bold text-slate-800">BKParking System</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-slate-600 font-medium">Mã vận đơn (TX)</p>
                <p className="text-[13px] font-bold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">{txId}</p>
              </div>
              <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-end mt-2">
                <p className="text-[15px] font-bold text-slate-800">Tổng thanh toán</p>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#003d9b] tracking-tighter" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                    {amount} <span className="text-[18px] font-bold ml-0.5">đ</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleExecute('success')}
                className="group w-full bg-gradient-to-r from-[#003d9b] to-blue-700 hover:from-blue-800 hover:to-blue-800 text-white font-bold py-[18px] rounded-[14px] shadow-[0_8px_20px_-6px_rgba(0,61,155,0.4)] transition-all flex justify-center items-center gap-2 transform active:scale-[0.98]">
                <span>Xác nhận & Thanh toán ngay</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button 
                onClick={() => setStep('cancelled')}
                className="w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 font-bold py-3.5 rounded-[12px] transition-all">
                Hủy thanh toán
              </button>
            </div>

          </div>
        )

      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 border-[3px] border-blue-50 rounded-full"></div>
              <div className="absolute inset-0 border-[3px] border-[#003d9b] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="material-symbols-outlined text-[#003d9b] text-2xl animate-pulse">lock</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Đang xử lý giao dịch...</h3>
            <p className="text-slate-500 font-medium text-center text-sm px-4">Đang giao tiếp với hệ thống ngân hàng. Vui lòng không tải lại trang.</p>
          </div>
        )
      
      case 'success':
        return (
          <div className="text-center py-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
              <span className="material-symbols-outlined text-4xl text-green-600" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2 font-headline">Thanh toán thành công!</h2>
            <p className="text-slate-500 mb-8 text-[15px]">Giao dịch <strong className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">{txId}</strong> đã hoàn tất.</p>
            
            <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-200/60 shadow-sm relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
               <div className="flex justify-between mb-3 items-center">
                 <span className="text-slate-500 text-[13px] font-medium">Số tiền đã trừ</span>
                 <span className="font-bold text-green-700 text-lg">{amount} đ</span>
               </div>
               <div className="flex justify-between mb-3 items-center">
                 <span className="text-slate-500 text-[13px] font-medium">Thời gian GD</span>
                 <span className="font-semibold text-slate-800 text-[13px]">{new Date().toLocaleString('vi-VN')}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-500 text-[13px] font-medium">Phương thức</span>
                 <span className="font-semibold text-slate-800 text-[13px] flex items-center gap-1.5">
                   <span className="material-symbols-outlined text-[16px] text-blue-600">account_balance_wallet</span>
                   Ví BKPay HCMUT
                 </span>
               </div>
            </div>

            <button onClick={() => navigate('/user/pay', { state: { paidSessionId: sessionData.sessionId || txId } })} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Quay về ứng dụng
            </button>
          </div>
        )

      case 'error':
        return (
          <div className="text-center py-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20 hidden"></div>
              <span className="material-symbols-outlined text-4xl text-red-500" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2 font-headline">Giao dịch bị từ chối</h2>
            <p className="text-slate-500 mb-6 text-[14px] leading-relaxed">Ví BKPay của bạn không đủ số dư để thực hiện, hoặc quá trình xác thực sinh trắc học bị lỗi theo quy định ngân hàng.</p>
            
             <div className="bg-red-50/50 text-red-800 rounded-xl p-4 mb-8 text-left border border-red-100 font-mono text-[11px] leading-relaxed">
                 <p className="mb-1"><strong className="text-red-900 opacity-80">ERROR_CODE:</strong> INSUFFICIENT_FUNDS_400</p>
                 <p><strong className="text-red-900 opacity-80">TX_REF:</strong> {txId}_ERR400</p>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={() => setStep('confirm')} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] transition-all flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                Thử thanh toán lại
              </button>
              <button onClick={() => navigate('/user/pay')} className="w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold py-3.5 rounded-xl transition-all">
                Trở về ứng dụng
              </button>
            </div>
          </div>
        )

      case 'cancelled':
        return (
          <div className="text-center py-10 animate-in slide-in-from-left-4 duration-400">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-slate-500" style={{fontVariationSettings: "'FILL' 1"}}>cancel_schedule_send</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 font-headline">Hủy giao dịch</h2>
            <p className="text-slate-500 mb-8 text-[14px]">Quá trình thanh toán đã bị hủy bởi người dùng hoặc hệ thống đã hết thời gian chờ xác thực.</p>
            
            <button onClick={() => navigate('/user/pay')} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Về trang chủ dịch vụ
            </button>
          </div>
        )

      case 'infra_error':
        return (
          <div className="text-center py-8 animate-in slide-in-from-top-4 duration-500">
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <span className="material-symbols-outlined text-4xl text-yellow-600">cloud_off</span>
              <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                 <span className="material-symbols-outlined text-white text-[12px] font-bold">close</span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3 font-headline">Lỗi siêu kết nối BKPay</h2>
            <p className="text-slate-500 mb-8 text-[15px] leading-relaxed">Cổng thanh toán BKPay Central đang bảo trì, hoặc mạng của bạn bị chập chờn. Không thể nạp trang chứng thực.</p>

            <div className="flex flex-col gap-3">
              <button onClick={() => setStep('initialize')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(234,179,8,0.4)] transition-all flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">sync</span>
                Thử kết nối lại
              </button>
              <button onClick={() => navigate('/user/pay')} className="w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold py-3.5 rounded-xl transition-all">
                Thoát kênh thanh toán
              </button>
            </div>
          </div>
        )
        
      default: return null
    }
  }

  const getHeaderStyle = () => {
    switch(step) {
      case 'success': return 'bg-gradient-to-r from-green-600 to-green-500'
      case 'error': return 'bg-gradient-to-r from-red-600 to-red-500'
      case 'infra_error': return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
      default: return 'bg-gradient-to-r from-[#003d9b] to-[#0052cc]'
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'Inter', sans-serif", background: '#f1f5f9', position: 'relative' }}>
      {/* Nền background decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0" style={{backgroundImage: 'radial-gradient(#003d9b 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
      <div className="fixed top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-blue-100/50 to-transparent z-0"></div>
      
      <div className="w-full max-w-[440px] bg-white rounded-[24px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,36,120,0.15)] relative z-10 border border-slate-200/80 flex-shrink-0 my-auto sm:my-[10vh]">
        
        {/* Dynamic Header */}
        <div className={`px-7 py-5 flex items-center justify-between transition-all duration-700 ${getHeaderStyle()}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-white/95 rounded-xl flex items-center justify-center shadow-lg shadow-black/5">
               <img src={bkLogo} alt="BK Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h1 className="text-white font-bold text-[17px] tracking-tight font-headline">Cổng thanh toán BKPay</h1>
              <div className="flex items-center gap-1.5 opacity-90 mt-0.5">
                 <span className="material-symbols-outlined text-[11px] text-green-300" style={{fontVariationSettings: "'FILL' 1"}}>shield_lock</span>
                 <span className="text-white text-[10px] uppercase tracking-widest font-semibold opacity-90">Bảo mật giao dịch HTTPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cột mốc Process Bar mỏng (Ngoại trừ màn hình báo lỗi/xong) */}
        {['initialize', 'confirm', 'processing'].includes(step) && (
          <div className="h-1 w-full bg-slate-100">
            <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{
              width: step === 'initialize' ? '30%' : step === 'confirm' ? '60%' : '90%'
            }}></div>
          </div>
        )}

        {/* Content View */}
        <div className="px-7 py-6">
           {renderContent()}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-7 py-4 flex justify-between items-center border-t border-slate-100/80">
           <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-slate-400" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
              <span className="text-[11px] font-semibold text-slate-500">Bảo vệ bởi HCMUT Security</span>
           </div>
           <span className="text-[11px] font-mono text-slate-400 font-bold bg-slate-200/50 px-2 py-0.5 rounded">v3.2.0</span>
        </div>

      </div>
      
      {/* Logos Các đối tác thanh toán (Trust Indicators) */}
      <div className="mt-8 flex items-center justify-center gap-6 opacity-40 z-10">
         <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Powered By</span>
         <span className="font-headline font-black text-slate-600 text-lg tracking-tighter">BKPay<span className="text-blue-600">.</span></span>
         <div className="w-1 h-4 bg-slate-300"></div>
         <span className="material-symbols-outlined text-slate-600 text-2xl">account_balance</span>
      </div>
    </div>
  )
}
