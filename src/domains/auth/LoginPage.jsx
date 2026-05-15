// ============================================================
// LOGIN PAGE - Professional Split Layout
// ============================================================
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import bkLogo from '../../assets/bk.png'

export default function LoginPage() {
  const { login, auth } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showInfraError, setShowInfraError] = useState(false)
  const [showSessionExpired, setShowSessionExpired] = useState(false)
  const [showAccountLocked, setShowAccountLocked] = useState(false)

  // Keyboard shortcuts for demoing exceptions without cluttering UI
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow taking screenshots without buttons in the way
      if (e.altKey && e.key === '1') { e.preventDefault(); setShowInfraError(true); setShowSessionExpired(false); setShowAccountLocked(false); }
      if (e.altKey && e.key === '2') { e.preventDefault(); setShowSessionExpired(true); setShowInfraError(false); setShowAccountLocked(false); }
      if (e.altKey && e.key === '3') { e.preventDefault(); setShowAccountLocked(true); setShowInfraError(false); setShowSessionExpired(false); }
      if (e.key === 'Escape') {
        setShowInfraError(false)
        setShowSessionExpired(false)
        setShowAccountLocked(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-redirect if logged in
  if (auth) {
    if (auth.role === 'admin') navigate('/dashboard', { replace: true })
    else if (auth.role === 'staff') navigate('/staff', { replace: true })
    else navigate('/user', { replace: true })
    return null
  }

  const fillDemo = (r) => {
    setRole(r)
    if (r === 'admin') { setEmail('admin@hcmut.edu.vn'); setPassword('admin123') }
    else if (r === 'staff') { setEmail('staff@hcmut.edu.vn'); setPassword('staff123') }
    else { setEmail('user@hcmut.edu.vn'); setPassword('user123') }
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))

    try {
      const result = await login(email, password)
      if (result.success) {
        if (result.role === 'admin') navigate('/dashboard', { replace: true })
        else if (result.role === 'staff') navigate('/staff', { replace: true })
        else navigate('/user', { replace: true })
        return
      }
      setError(result.error || 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.')
    } catch (err) {
      setError(err?.message || 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflowY: 'auto', overflowX: 'hidden', display: 'flex', alignItems: 'flex-start', fontFamily: "'Inter',sans-serif", background: '#f8fafc' }}>
      {/* Left Hero */}
      <section style={{
        display: 'none', width: '50%', position: 'sticky', top: 0, height: '100vh', flexDirection: 'column',
        justifyContent: 'space-between', padding: '64px', overflow: 'hidden', background: '#0052cc'
      }} id="login-left">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCp_A-NpfnkI5T-NvI09jesAIJm7BHMLBHM65gnE5cF38QLLa1piiRD6_hC_5HaryhiKfwIueba4unmp6s2pTw39E9jiHxwlcXjXhEIWxHG32ejymnCTYoPIaYkhZFhrLHB8Grc8qi4f3izLcTvpj8QKKTzz6Is3CGclQ7aEm38R0rJ1PdEN5MHIc6uq2IMVELwWIGKFmBlbWHTFDRnNBYCej0L4yWQh8bcbMb8ysU0OjIbdbwQXks7NoNGMEV7_JPR9dnJyV-KcI"
               alt="Smart Parking" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,36,120,0.92) 0%, rgba(0,61,155,0.3) 60%, transparent)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ background: 'white', padding: 10, borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src={bkLogo} alt="BK Logo" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 900, color: '#fff' }}>HCMUT</div>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(196,210,255,0.85)', fontWeight: 700, textTransform: 'uppercase' }}>BKParking System</div>
            </div>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1.15, maxWidth: 480 }}>
            Hệ Thống Quản Lý Đỗ Xe Thông Minh <span style={{ color: '#c4d2ff' }}>HCMUT</span>
          </h1>
          <p style={{ marginTop: 24, color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.7, maxWidth: 420 }}>
            Nền tảng vận hành bãi đỗ xe kỹ thuật số thế hệ mới — IoT, AI và thanh toán số hóa.
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: 48, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 32 }}>
          {[['4,500+','Chỗ đỗ xe'],['100%','Tự động hóa'],['Real-time','Dữ liệu']].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: '#fff' }}>{v}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Right Form */}
      <section id="login-right" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <img src={bkLogo} alt="BK Logo" style={{ width: 64, height: 64, objectFit: 'contain' }} />
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 900, color: '#003d9b', letterSpacing: '-0.02em', marginBottom: 4 }}>HCMUT PORTAL</h2>
            <p style={{ color: '#64748b', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hệ thống quản lý điểm đỗ thông minh</p>
          </div>

          {/* Role Tabs */}
          <div style={{ display: 'flex', padding: 5, background: '#f1f5f9', borderRadius: 14, marginBottom: 24, gap: 4 }}>
            {[['user', 'person', 'Người dùng'], ['staff', 'engineering', 'Nhân viên'], ['admin', 'admin_panel_settings', 'Quản trị viên']].map(([r, icon, label]) => (
              <button key={r} onClick={() => fillDemo(r)} type="button" style={{
                flex: 1, padding: '10px 12px', fontSize: 13, fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer',
                transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: role === r ? '#fff' : 'transparent',
                color: role === r ? '#003d9b' : '#64748b',
                boxShadow: role === r ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                fontFamily: "'Inter',sans-serif"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Demo Notification */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '10px 14px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: '#2563eb', fontSize: 18 }}>school</span>
            <div style={{ fontSize: 12, color: '#1d4ed8', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600 }}>Tài khoản DEMO:</span><br/>
              {role === 'admin' ? 'admin@hcmut.edu.vn / admin123' : role === 'staff' ? 'staff@hcmut.edu.vn / staff123' : 'user@hcmut.edu.vn / user123'}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Tài khoản Đại học (Email)</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 20 }}>mail</span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="username@hcmut.edu.vn"
                  style={{ width: '100%', padding: '12px 14px 12px 42px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', transition: 'all 0.2s', fontWeight: 500, color: '#0f172a' }}
                  onFocus={e => { e.target.style.borderColor = '#003d9b'; e.target.style.boxShadow = '0 0 0 3px rgba(0,61,155,0.1)'; e.target.style.background = '#fff' }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Mật khẩu BKNetID</label>
                <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#003d9b', textDecoration: 'none' }}>Quên mật khẩu?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 20 }}>lock</span>
                <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 42px 12px 42px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', transition: 'all 0.2s', fontWeight: 500, color: '#0f172a', letterSpacing: showPass ? 'normal' : '0.2em' }}
                  onFocus={e => { e.target.style.borderColor = '#003d9b'; e.target.style.boxShadow = '0 0 0 3px rgba(0,61,155,0.1)'; e.target.style.background = '#fff' }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc' }}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#94a3b8' }}>{showPass ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: 18 }}>error</span>
                <span style={{ fontSize: 13, color: '#b91c1c', fontWeight: 500 }}>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ marginTop: 8, width: '100%', padding: 14, background: loading ? '#94a3b8' : '#003d9b', color: '#fff', border: 'none', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 20px rgba(0,61,155,0.25)', transition: 'all 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  ĐANG XÁC THỰC...
                </>
              ) : (
                <>
                  ĐĂNG NHẬP
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Home button */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed #e2e8f0' }}>
            <button type="button" onClick={() => navigate('/')}
              style={{ width: '100%', padding: 12, background: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onMouseOver={e => { e.currentTarget.style.color = '#003d9b'; e.currentTarget.style.borderColor = '#003d9b'; e.currentTarget.style.background = '#f8fafc'; }}
              onMouseOut={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>home</span>
              Quay lại trang chủ hệ thống
            </button>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontWeight: 500 }}>© 2024 Trường Đại học Bách Khoa TP.HCM</p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(min-width:1024px){
          #login-left { display: flex !important; }
          #login-right { width: 50% !important; }
        }
      `}</style>

      {/* EXCEPTION MODAL: INFRA ERROR */}
      {showInfraError && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity duration-300" onClick={() => setShowInfraError(false)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200 border border-slate-200/50">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-red-600 text-5xl font-bold" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>warning</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-slate-800 mb-4">Lỗi kết nối hạ tầng</h3>
              <p className="font-body text-slate-600 leading-relaxed mb-8">
                Hệ thống xác thực HCMUT đang bảo trì hoặc mất kết nối. Vui lòng thử lại sau.
              </p>
              <button onClick={() => setShowInfraError(false)} className="w-full bg-red-600 hover:bg-red-700 text-white font-headline font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 transition-all duration-200">
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXCEPTION MODAL: SESSION EXPIRED */}
      {showSessionExpired && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity duration-300" onClick={() => setShowSessionExpired(false)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200/50">
              <div className="p-8 pb-4 flex flex-col items-center">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                </div>
                <h2 className="text-2xl font-headline font-bold text-blue-800 tracking-tight text-center">
                  Phiên đăng nhập đã hết hạn
                </h2>
                <p className="mt-4 text-center text-slate-600 font-body leading-relaxed max-w-[280px]">
                  Vui lòng đăng nhập lại qua <span className="font-bold text-blue-700">HCMUT_SSO</span> để tiếp tục.
                </p>
              </div>
              <div className="p-8 pt-4 flex flex-col gap-3">
                <button onClick={() => setShowSessionExpired(false)} className="group w-full py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white font-headline font-bold rounded-lg flex items-center justify-center gap-3 transition-all duration-300">
                  Đăng nhập ngay
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">login</span>
                </button>
                <button onClick={() => setShowSessionExpired(false)} className="w-full py-3 text-slate-500 text-sm font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">help_outline</span>
                  Trợ giúp kỹ thuật
                </button>
              </div>
              <div className="bg-slate-50 px-8 py-3 flex justify-between items-center border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] font-label font-bold uppercase tracking-widest text-slate-500">Status: 401 Unauthorized</span>
                </div>
                <div className="text-[10px] font-label font-medium text-slate-400">BKParking system</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXCEPTION MODAL: ACCOUNT LOCKED (ALT+3) */}
      {showAccountLocked && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity duration-300" onClick={() => setShowAccountLocked(false)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200/50">
              <div className="p-8 pb-4 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>lock_person</span>
                </div>
                <h2 className="text-2xl font-headline font-bold text-slate-800 tracking-tight text-center">
                  Tài khoản bị khóa tạm thời
                </h2>
                <p className="mt-3 text-center text-slate-600 font-body leading-relaxed max-w-[280px] text-sm">
                  Bạn đã nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau 30 phút hoặc liên hệ quản trị viên.
                </p>
              </div>
              <div className="p-8 pt-4 flex flex-col gap-3">
                <button onClick={() => setShowAccountLocked(false)} className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-headline font-bold rounded-xl transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.4)]">
                  Trở lại màn hình chính
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
