import { useState, useEffect } from 'react'
import { mockDB } from '../../services/mockDB'

const ROLE_LABEL = { user: 'Thành viên', staff: 'Cán bộ', guest: 'Khách' }
const ROLE_COLOR = { user: 'bg-blue-100 text-blue-700', staff: 'bg-purple-100 text-purple-700', guest: 'bg-amber-100 text-amber-700' }

function duration(entryTime) {
  const ms = Date.now() - new Date(entryTime).getTime()
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return h > 0 ? `${h}g ${m}p` : `${m} phút`
}

export default function ParkingStatusPage() {
  const [sessions, setSessions] = useState([])
  const [tickets, setTickets] = useState([])
  const [zones, setZones] = useState([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [filter, setFilter] = useState('all') // all, user, staff, guest, ticket

  const refresh = () => {
    const activeSessions = mockDB.getAllSessions().filter(s => s.status === 'active')
    const activeTickets = mockDB.getAllGuestTickets().filter(t => t.status === 'active')
    setSessions(activeSessions)
    setTickets(activeTickets)
    setZones(mockDB.getZones())
    setLastUpdated(new Date())
  }

  useEffect(() => {
    mockDB.init()
    refresh()
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
  }, [])

  const totalParked = sessions.length + tickets.length
  const memberCount = sessions.filter(s => s.userRole !== 'guest').length
  const guestCardCount = sessions.filter(s => s.userRole === 'guest').length
  const ticketCount = tickets.length

  const filteredSessions = sessions.filter(s => {
    if (filter === 'all' || filter === 'ticket') return filter === 'all'
    return s.userRole === filter
  })
  const showTickets = filter === 'all' || filter === 'ticket'

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-full font-inter">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold text-slate-800 tracking-tight mb-1">Danh sách xe đang đỗ</h2>
          <p className="text-slate-500 font-medium text-sm">
            Cập nhật lúc {lastUpdated.toLocaleTimeString('vi-VN')} · Tự động làm mới mỗi 5 giây
          </p>
        </div>
        <button onClick={refresh}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 text-sm">
          <span className="material-symbols-outlined text-lg">refresh</span>
          Làm mới ngay
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng xe trong bãi', value: totalParked, icon: 'local_parking', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
          { label: 'Thành viên / Cán bộ', value: memberCount, icon: 'badge', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
          { label: 'Khách có thẻ đăng ký', value: guestCardCount, icon: 'person', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Thẻ tạm đang hoạt động', value: ticketCount, icon: 'receipt_long', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        ].map(({ label, value, icon, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined text-2xl ${color}`}>{icon}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
              <p className={`text-3xl font-headline font-black ${color}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Zone Capacity Bars */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
        <h3 className="font-headline font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">map</span>
          Sức chứa theo Khu vực
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map(z => {
            const pct = Math.round((z.occupied / z.capacity) * 100)
            const barColor = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-green-500'
            const textColor = pct >= 90 ? 'text-red-700' : pct >= 70 ? 'text-amber-700' : 'text-green-700'
            return (
              <div key={z.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-sm">{z.name}</span>
                  <span className={`font-bold text-sm ${textColor}`}>{z.capacity - z.occupied} chỗ trống</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{z.occupied}/{z.capacity} chỗ đã dùng</span>
                  <span className={`font-bold ${textColor}`}>{pct}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'Tất cả', count: totalParked },
          { key: 'user', label: 'Sinh viên / GV', count: sessions.filter(s => s.userRole === 'user').length },
          { key: 'staff', label: 'Cán bộ', count: sessions.filter(s => s.userRole === 'staff').length },
          { key: 'guest', label: 'Khách vãng lai', count: guestCardCount },
          { key: 'ticket', label: 'Thẻ tạm', count: ticketCount },
        ].map(({ key, label, count }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${filter === key ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {label}
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${filter === key ? 'bg-white/20' : 'bg-slate-100'}`}>{count}</span>
          </button>
        ))}
      </div>

      {/* Active Sessions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-headline font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">directions_car</span>
            Xe đang đỗ — Phiên thành viên / khách có thẻ
            <span className="ml-2 px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black">{filteredSessions.length}</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="p-4">Thẻ</th><th className="p-4">Chủ xe</th>
                <th className="p-4">Biển số</th><th className="p-4">Loại xe</th>
                <th className="p-4">Khu vực</th><th className="p-4">Vào lúc</th>
                <th className="p-4">Thời gian đỗ</th><th className="p-4">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map(s => {
                const cardInfo = mockDB.validateCard(s.card)
                return (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono text-slate-700 font-bold text-sm">{s.card}</td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800 text-sm">{cardInfo?.name || '---'}</p>
                      <p className="text-xs text-slate-400">{cardInfo?.unit || ''}</p>
                    </td>
                    <td className="p-4 font-headline font-bold text-slate-800">{s.vehicle}</td>
                    <td className="p-4 text-sm text-slate-600">{s.vehicleType}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{s.zone}</span>
                      {s.isOffline && <span className="ml-1 px-2 py-1 bg-slate-200 text-slate-500 rounded-lg text-xs font-bold">OFFLINE</span>}
                    </td>
                    <td className="p-4 font-mono text-slate-500 text-sm">{new Date(s.entryTime).toLocaleTimeString('vi-VN')}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">{duration(s.entryTime)}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${ROLE_COLOR[s.userRole] || 'bg-slate-100 text-slate-600'}`}>
                        {ROLE_LABEL[s.userRole] || s.userRole}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {filteredSessions.length === 0 && (
                <tr><td colSpan={8} className="p-8 text-center text-slate-400 text-sm">Không có xe nào phù hợp với bộ lọc</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Guest Tickets Table */}
      {showTickets && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-amber-50/50 flex justify-between items-center">
            <h3 className="font-headline font-bold text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">receipt_long</span>
              Thẻ tạm đang hoạt động
              <span className="ml-2 px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-black">{tickets.length}</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Mã thẻ tạm</th><th className="p-4">Biển số</th>
                  <th className="p-4">Loại xe</th><th className="p-4">Khu vực</th>
                  <th className="p-4">Vào lúc</th><th className="p-4">Thời gian đỗ</th>
                  <th className="p-4">Phí dự kiến</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(t => {
                  const hours = Math.max(1, Math.ceil((Date.now() - new Date(t.createdAt).getTime()) / 3600000))
                  const estFee = mockDB.getPricing().guest.hourly * hours
                  return (
                    <tr key={t.id} className="border-b border-slate-50 hover:bg-amber-50/40 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-lg text-sm tracking-wider">{t.id}</span>
                      </td>
                      <td className="p-4 font-headline font-bold text-slate-800">{t.plate}</td>
                      <td className="p-4 text-sm text-slate-600">{t.vehicleType}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{t.zone}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-500 text-sm">{new Date(t.createdAt).toLocaleTimeString('vi-VN')}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">{duration(t.createdAt)}</span>
                      </td>
                      <td className="p-4 font-bold text-amber-800">{estFee.toLocaleString('vi-VN')} VNĐ</td>
                    </tr>
                  )
                })}
                {tickets.length === 0 && (
                  <tr><td colSpan={7} className="p-8 text-center text-slate-400 text-sm">Không có thẻ tạm nào đang hoạt động</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
