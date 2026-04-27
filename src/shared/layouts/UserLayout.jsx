// ============================================================
// USER LAYOUT - Desktop Sidebar + TopNav
// ============================================================
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../domains/auth/AuthContext'
import { useState } from 'react'
import bkLogo from '../../assets/bk.png'

const USER_NAV = [
  { path: '/user',         icon: 'dashboard',               label: 'Tổng quan', exact: true },
  { path: '/user/map',     icon: 'map',                     label: 'Bản đồ bãi xe' },
  { path: '/user/pay',     icon: 'payments',                label: 'Thanh toán BKPay' },
  { path: '/user/history', icon: 'history',                 label: 'Lịch sử thanh toán' },
  { path: '/user/profile', icon: 'account_circle',          label: 'Hồ sơ cá nhân' },
]

function SidebarContent({ onLogout, onNavClick, collapsed }) {
  return (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-4 py-6 border-b border-white/10 shrink-0 transition-all ${collapsed ? 'justify-center px-0' : 'px-6'}`}>
        <div className={`bg-white p-2 rounded-xl shadow-sm flex items-center justify-center shrink-0 ${collapsed ? 'p-1.5' : ''}`}>
          <img src={bkLogo} alt="BK Logo" className="w-8 h-8 object-contain" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <div className="font-headline font-black text-[22px] text-white leading-none tracking-wide mb-1">HCMUT</div>
            <div className="text-[10px] tracking-[0.14em] text-blue-200 font-bold uppercase truncate">BKParking System</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 no-scrollbar space-y-1 ${collapsed ? 'px-2' : 'px-4'}`}>
        {!collapsed && (
          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-4 whitespace-nowrap">
            Dịch vụ
          </div>
        )}
        {USER_NAV.map(item => (
          <NavLink key={item.path} to={item.path}
             end={item.exact}
            className={({ isActive }) => `flex items-center rounded-xl text-sm font-bold transition-all duration-200 ${collapsed ? 'justify-center py-4 mb-2' : 'gap-3 px-3 py-3'} ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            title={collapsed ? item.label : undefined}
            onClick={onNavClick}
          >
            <span className="material-symbols-outlined text-[22px] shrink-0">{item.icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className={`border-t border-white/10 shrink-0 ${collapsed ? 'p-3 flex justify-center' : 'p-5'}`}>
        <button onClick={onLogout} title={collapsed ? "Đăng xuất" : undefined} className={`flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-95 group ${collapsed ? 'w-12 h-12 p-0' : 'w-full py-3'}`}>
          <span className="material-symbols-outlined text-[20px]">logout</span>
          {!collapsed && <span className="whitespace-nowrap">Đăng xuất hệ thống</span>}
        </button>
      </div>
    </>
  )
}

export default function UserLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  const sidebarWidth = collapsed ? 80 : 260

  const sidebarStyle = {
    width: sidebarWidth, minWidth: sidebarWidth, maxWidth: sidebarWidth,
    height: '100%',
    backgroundColor: '#1e293b', /* slate-800 */
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    overflow: 'hidden',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: '#f8fafc' }}>
      <aside style={sidebarStyle} id="desktop-sidebar">
        <SidebarContent onLogout={handleLogout} onNavClick={() => {}} collapsed={collapsed} />
      </aside>

      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }} />
          <aside style={{ ...sidebarStyle, width: 260, position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 99, animation: 'fadeInPage 0.2s ease' }}>
            <SidebarContent onLogout={handleLogout} onNavClick={() => setMobileOpen(false)} collapsed={false} />
          </aside>
        </>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <header style={{
          height: 70, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          padding: '0 32px',
          background: '#003d9b',
          borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 20,
        }}>
          {/* Left Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button id="hamburger-btn" onClick={() => setMobileOpen(s => !s)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, borderRadius: 8, display: 'none', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: '#fff' }}>menu</span>
            </button>
            <button id="collapse-btn" onClick={() => setCollapsed(c => !c)}
              className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors text-white mr-2 border border-transparent hover:border-white/20">
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{collapsed ? 'menu_open' : 'menu'}</span>
            </button>
            <h1 className="desktop-header-title" style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 800, color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
               {USER_NAV.find(n => (n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path)))?.label || 'Tổng quan'}
            </h1>
          </div>

          {/* Center Search */}
          <div style={{ flex: 1, maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '0 16px', height: 44, border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 22, marginRight: 12 }}>search</span>
              <input placeholder="Tìm kiếm bãi xe hoặc sự kiện..." type="text"
                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 14, outline: 'none', fontFamily: "'Inter',sans-serif", color: '#fff', fontWeight: 500 }} />
            </div>
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            <button style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative', display: 'flex' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 26, fontVariationSettings: "'FILL' 1" }}>chat</span>
              <span style={{ position: 'absolute', top: -2, right: -4, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #003d9b' }} />
            </button>

            <button style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative', display: 'flex' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 28, fontVariationSettings: "'FILL' 1" }}>notifications</span>
              <span style={{ position: 'absolute', top: 2, right: 3, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #003d9b' }} />
            </button>
            
            <button style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 28, fontVariationSettings: "'FILL' 1" }}>help</span>
            </button>
            
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>Minh Nguyễn</div>
                <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 500 }}>MSSV: 2110432</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Minh+Nguyen&background=1e3a8a&color=fff&size=128" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '32px' }} className="no-scrollbar">
          <div className="page-enter" key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #desktop-sidebar { display: none !important; }
          #hamburger-btn   { display: flex !important; }
          .desktop-header-title { display: none !important; }
        }
      `}</style>
    </div>
  )
}
