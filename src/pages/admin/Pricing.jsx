import { useState, useEffect } from 'react'

const DEFAULT_POLICIES = [
  { name:'Sinh viên HCMUT', price:'5,000', unit:'VNĐ/giờ', target:'Sinh viên', active:true, bg:'bg-gradient-to-r from-blue-900 to-blue-700', icon:'school' },
  { name:'Cán bộ - Giảng viên', price:'8,000', unit:'VNĐ/giờ', target:'Nhân viên', active:true, bg:'bg-gradient-to-r from-sky-800 to-sky-600', icon:'badge' },
  { name:'Khách vãng lai', price:'15,000', unit:'VNĐ/giờ', target:'Khách', active:true, bg:'bg-gradient-to-r from-indigo-800 to-indigo-600', icon:'person' },
  { name:'VIP - Ban điều hành', price:'0', unit:'Miễn phí', target:'Quản lý', active:false, bg:'bg-gradient-to-r from-orange-900 to-orange-700', icon:'star' },
]

const DEFAULT_HISTORY = [
  ['Sinh viên HCMUT','Tăng giá 5,000→6,000 VNĐ/h','Admin HCMUT','05/04/2024','Đã áp dụng','bg-green-100','text-green-700'],
  ['Khách vãng lai','Thêm giá ban đêm 22:00-6:00','Admin HCMUT','01/04/2024','Đã áp dụng','bg-green-100','text-green-700'],
  ['VIP - Ban điều hành','Tạm dừng chính sách','Admin HCMUT','28/03/2024','Đã tạm dừng','bg-amber-100','text-amber-800'],
]

export default function Pricing() {
  const [policies, setPolicies] = useState(DEFAULT_POLICIES)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const [modalState, setModalState] = useState(null) // 'create', 'edit', 'delete', 'duplicate_error', 'config_error'
  const [selectedPolicy, setSelectedPolicy] = useState(null)

  // Load từ localStorage
  useEffect(() => {
    const savedPolicies = localStorage.getItem('bkparking_policies')
    const savedHistory = localStorage.getItem('bkparking_history')
    if (savedPolicies) setPolicies(JSON.parse(savedPolicies))
    if (savedHistory) setHistory(JSON.parse(savedHistory))
  }, [])

  // Save to localStorage
  const saveToStorage = (newPolicies, newHistory) => {
    localStorage.setItem('bkparking_policies', JSON.stringify(newPolicies))
    localStorage.setItem('bkparking_history', JSON.stringify(newHistory))
  }

  // Phím tắt để mô phỏng lỗi cấu hình
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent handling if typing
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.altKey && e.key === '1') { e.preventDefault(); setModalState('duplicate_error'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); setModalState('config_error'); }
      if (e.key === 'Escape') { e.preventDefault(); setModalState(null); }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="p-6 md:p-8 font-inter bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Cấu hình Chính sách Giá</h2>
          <p className="text-slate-500 font-medium text-sm">Quản lý biểu giá và phân nhóm đối tượng gửi xe trên toàn hệ thống</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors text-sm" onClick={() => setModalState('create')}>
          <span className="material-symbols-outlined text-xl">add</span> Bổ sung Chính sách mới
        </button>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {policies.map((p, idx) => (
          <div key={p.name} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 group flex flex-col">
            <div className={`${p.bg} p-6 text-white relative overflow-hidden flex-1`}>
              <div className="absolute -right-6 -top-6 opacity-10">
                 <span className="material-symbols-outlined text-9xl">{p.icon}</span>
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                   <span className="material-symbols-outlined text-2xl drop-shadow-md">{p.icon}</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${p.active ? 'bg-green-500/20 border-green-400 text-green-100' : 'bg-white/10 border-white/20 text-white/80'}`}>
                   {p.active ? 'Đang áp dụng' : 'Tạm dừng'}
                </span>
              </div>
              <h3 className="font-headline font-bold text-xl mb-1 relative z-10 drop-shadow-sm">{p.name}</h3>
              <p className="text-white/80 text-xs font-bold uppercase tracking-wider relative z-10">Nhóm: {p.target}</p>
            </div>
            
            <div className="p-6 bg-white relative">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-headline font-black text-3xl text-slate-800 tracking-tight">{p.price}</span>
                <span className="text-sm font-bold text-slate-400">{p.unit}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { setSelectedPolicy(p); setModalState('edit') }} className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span> Chỉnh sửa
                </button>
                <button onClick={() => { setSelectedPolicy(p); setModalState('delete') }} className="py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-sm">delete</span> Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-headline font-bold text-slate-800">Lịch sử Cập nhật Chính sách</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Chính sách</th>
                <th className="px-6 py-4">Nội dung Thay đổi</th>
                <th className="px-6 py-4">Quản trị viên</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {history.map(([pol,change,who,when,status,bc,tc], idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-headline font-bold text-slate-800">{pol}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium text-sm">{change}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm flex items-center gap-2">
                     <span className="material-symbols-outlined text-lg">account_circle</span> {who}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm font-mono">{when}</td>
                  <td className="px-6 py-4">
                     <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${bc} ${tc}`}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 29. MODAL: CẤU HÌNH CHÍNH SÁCH GIÁ MỚI */}
      {/* ============================================================== */}
      {modalState === 'create' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xl font-headline font-bold text-blue-900 flex items-center gap-3">
                  <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                     <span className="material-symbols-outlined block">add_card</span>
                  </span>
                  Cấu hình Chính sách giá mới
                </h2>
                <button onClick={() => setModalState(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={e => { 
                e.preventDefault()
                const formData = new FormData(e.target)
                const name = formData.get('name')
                const price = formData.get('price')
                const unit = formData.get('unit')
                const target = formData.get('target')
                if (policies.some(p => p.name === name)) {
                  setModalState('duplicate_error')
                  return
                }
                const newPolicy = {
                  name,
                  price: price.toLocaleString(),
                  unit,
                  target,
                  active: true,
                  bg: 'bg-gradient-to-r from-green-900 to-green-700',
                  icon: 'add'
                }
                const newPolicies = [...policies, newPolicy]
                setPolicies(newPolicies)
                const newHistory = [[name, `Thêm chính sách mới với giá ${price} ${unit}`, 'Admin HCMUT', new Date().toLocaleDateString('vi-VN'), 'Đã áp dụng', 'bg-green-100', 'text-green-700'], ...history]
                setHistory(newHistory)
                saveToStorage(newPolicies, newHistory)
                setModalState(null)
              }} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tên cấu hình / Chính sách</label>
                  <input name="name" type="text" placeholder="VD: Gói Đỗ Xe Đêm 2024" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all" required />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Đơn giá (VNĐ)</label>
                    <input name="price" type="number" placeholder="5000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Chu kỳ tính</label>
                    <select name="unit" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all">
                      <option>Mỗi giờ (VNĐ/h)</option>
                      <option>Mỗi lượt (VNĐ/lượt)</option>
                      <option>Mỗi tháng (VNĐ/tháng)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phạm vi Nhóm đối tượng</label>
                  <select name="target" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all">
                    <option value="">-- Chọn nhóm áp dụng --</option>
                    <option>Sinh viên / Học viên</option>
                    <option>Cán bộ / Giảng viên</option>
                    <option>Khách vãng lai / Đối tác</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setModalState(null)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Hủy bỏ</button>
                  <button type="submit" className="px-6 py-3 rounded-xl font-headline font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/30 flex items-center gap-2 transition-all">
                    <span className="material-symbols-outlined text-sm">save</span> Lưu Cấu Hình
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 30. MODAL: CHỈNH SỬA CHÍNH SÁCH GIÁ */}
      {/* ============================================================== */}
      {modalState === 'edit' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xl font-headline font-bold text-blue-900 flex items-center gap-3">
                  <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                     <span className="material-symbols-outlined block">edit_document</span>
                  </span>
                  Chỉnh sửa Chính sách
                </h2>
                <button onClick={() => setModalState(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={e => { 
                e.preventDefault()
                const formData = new FormData(e.target)
                const name = formData.get('name')
                const price = formData.get('price')
                const active = formData.get('active') === 'active'
                if (policies.some(p => p.name === name && p !== selectedPolicy)) {
                  setModalState('duplicate_error')
                  return
                }
                const updatedPolicy = { ...selectedPolicy, name, price: price.toLocaleString(), active }
                const newPolicies = policies.map(p => p === selectedPolicy ? updatedPolicy : p)
                setPolicies(newPolicies)
                const changeDesc = `Cập nhật giá từ ${selectedPolicy.price} → ${price} VNĐ`
                const newHistory = [[name, changeDesc, 'Admin HCMUT', new Date().toLocaleDateString('vi-VN'), 'Đã áp dụng', 'bg-green-100', 'text-green-700'], ...history]
                setHistory(newHistory)
                saveToStorage(newPolicies, newHistory)
                setModalState(null)
              }} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tên cấu hình / Chính sách</label>
                  <input name="name" type="text" defaultValue={selectedPolicy?.name} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Đơn giá (VNĐ)</label>
                    <input name="price" type="number" defaultValue={selectedPolicy?.price.replace(/,/g, '')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Trạng thái áp dụng</label>
                    <select name="active" className="w-full px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-xl font-bold text-indigo-900 outline-none focus:border-indigo-400 transition-all">
                      <option value="active">Đang kích hoạt</option>
                      <option value="pause">Tạm dừng áp dụng</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button type="button" onClick={() => setModalState(null)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Hủy</button>
                  <button type="submit" className="px-6 py-3 rounded-xl font-headline font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/30 flex items-center gap-2 transition-all">
                    <span className="material-symbols-outlined text-sm">update</span> Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 31. MODAL: XÁC NHẬN XÓA CHÍNH SÁCH GIÁ */}
      {/* ============================================================== */}
      {modalState === 'delete' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
                 <span className="material-symbols-outlined text-3xl">delete_forever</span>
              </div>
              <h2 className="text-xl font-headline font-bold text-slate-800 mb-3">Xác nhận Xóa Chính sách?</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Bạn đang thực hiện xóa cấu hình giá <b>"{selectedPolicy?.name}"</b> khỏi hệ thống IoT. Thao tác này là không thể hoàn tác.
              </p>
              <div className="flex flex-col gap-3">
                 <button onClick={() => {
                   const newPolicies = policies.filter(p => p !== selectedPolicy)
                   setPolicies(newPolicies)
                   const newHistory = [[selectedPolicy.name, 'Xóa chính sách', 'Admin HCMUT', new Date().toLocaleDateString('vi-VN'), 'Đã xóa', 'bg-red-100', 'text-red-700'], ...history]
                   setHistory(newHistory)
                   saveToStorage(newPolicies, newHistory)
                   setModalState(null)
                 }} className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-headline font-bold shadow-lg shadow-red-600/30 transition-all active:scale-95">
                    Đồng ý Xóa Vĩnh Viễn
                 </button>
                 <button onClick={() => setModalState(null)} className="w-full py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition-colors">
                    Hủy thao tác
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 32. MODAL: LỖI DO TRÙNG LẶP / ĐỊNH DẠNG TÊN CẤU HÌNH (ALT+1) */}
      {/* ============================================================== */}
      {modalState === 'duplicate_error' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-200/50">
              <div className="p-8 pb-4 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                  <span className="material-symbols-outlined text-4xl">rule_folder</span>
                </div>
                <h2 className="text-2xl font-headline font-bold text-orange-800 tracking-tight text-center">
                  Cấu hình không hợp lệ
                </h2>
                <div className="mt-4 bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                  <p className="text-orange-900 font-medium leading-relaxed text-sm">
                    Tên chính sách <b>"Sinh viên HCMUT"</b> đã tồn tại trên một cấu hình khác trong hệ thống.
                  </p>
                </div>
                <p className="mt-3 text-center text-slate-500 text-xs">Phát hiện trùng lặp khóa chính định danh (Duplicate Key Error). Vui lòng sử dụng tên định danh khác.</p>
              </div>
              <div className="p-8 pt-4">
                <button onClick={() => setModalState(null)} className="w-full py-3.5 px-6 bg-slate-800 hover:bg-slate-900 text-white font-headline font-bold rounded-xl transition-all duration-300 shadow-lg shadow-slate-800/30 active:scale-95">
                  Xác nhận & Kiểm tra lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 33. MODAL: LỖI CẤU HÌNH CHUNG / SYSTEM ERROR (ALT+2) */}
      {/* ============================================================== */}
      {modalState === 'config_error' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl transition-opacity" onClick={() => setModalState(null)}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-700 animate-in slide-in-from-bottom-8 duration-300">
              <div className="p-8 pb-6 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600"></div>
                <div className="w-16 h-16 mb-5 rounded-2xl bg-slate-900/80 flex items-center justify-center text-red-500 shadow-inner border border-red-900/30">
                  <span className="material-symbols-outlined text-4xl animate-pulse">dns</span>
                </div>
                <h2 className="text-xl font-headline font-bold text-white tracking-wide text-center">
                  Lỗi Triển Khai Hạ Tầng
                </h2>
                <div className="mt-4 w-full bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
                  <p className="text-slate-300 font-mono text-xs leading-relaxed text-center">
                    [ERROR_503] Không thể đồng bộ bản ghi cấu hình giá xuống máy chủ Controller <b>Gate A2</b> & <b>Gate B1</b>.
                  </p>
                </div>
              </div>
              <div className="px-8 pb-8 pt-2 flex flex-col gap-3">
                <button onClick={() => setModalState(null)} className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-headline font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] shadow-red-600/20 active:scale-95 flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-lg">restart_alt</span> Thử lại kết nối
                </button>
                <button onClick={() => setModalState(null)} className="w-full py-3 text-slate-400 text-sm font-bold hover:text-white transition-colors">
                  Gửi báo cáo lỗi kỹ thuật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
