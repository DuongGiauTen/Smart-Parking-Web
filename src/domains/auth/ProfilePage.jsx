import { useAuth } from './AuthContext'

export default function Profile() {
  const { auth } = useAuth()
  const isAdmin = auth?.role === 'admin'

  return (
    <div style={{ padding: 28, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', fontFamily: "'Space Grotesk',sans-serif" }}>
          Hồ sơ cá nhân
        </h2>
        <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>Quản lý thông tin định danh và dữ liệu xác thực.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, alignItems: 'stretch' }}>
        {/* Cột trái: Avatar & Quick Info */}
        <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '4px solid #eff6ff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', marginBottom: 20 }}>
            <img src={isAdmin ? "https://ui-avatars.com/api/?name=Admin+BK&background=0284c7&color=fff&size=256" : "https://ui-avatars.com/api/?name=Minh+Nguyen&background=1e3a8a&color=fff&size=256"} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px 0', color: '#0f172a' }}>{isAdmin ? 'Nguyễn Quản Trị' : 'Trần Minh Hoàng'}</h3>
          <span style={{ background: isAdmin ? '#fef2f2' : '#eff6ff', color: isAdmin ? '#ef4444' : '#2563eb', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
            {isAdmin ? 'Quản trị viên Hệ thống' : 'Sinh viên chính quy'}
          </span>
          
          <div style={{ width: '100%', height: 1, background: '#f1f5f9', margin: '24px 0' }} />
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: 20 }}>badge</span>
               <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{isAdmin ? 'MCB: NV-99012' : 'MSSV: 2110432'}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: 20 }}>domain</span>
               <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{isAdmin ? 'Đội An ninh KTX' : 'Khoa KH & KT Máy tính'}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: 20 }}>mail</span>
               <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{isAdmin ? 'admin.an@hcmut.edu.vn' : 'hoang.tran21@hcmut.edu.vn'}</span>
             </div>
          </div>
        </div>

        {/* Cột phải: Detailed Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
           {/* Thong tin chung */}
           <div className="card" style={{ padding: 28 }}>
             <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 24px 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
               <span className="material-symbols-outlined" style={{ color: '#3b82f6' }}>account_circle</span>
               Sơ yếu lý lịch
             </h4>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
               <div>
                  <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Căn cước công dân</label>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 6 }}>07920301XXXX</div>
               </div>
               <div>
                  <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Ngày sinh</label>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 6 }}>15/08/2003</div>
               </div>
               <div>
                  <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Số điện thoại liên lạc</label>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 6 }}>0903.123.456</div>
               </div>
               <div>
                  <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Ngày tham gia hệ thống</label>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 6 }}>01/09/2021</div>
               </div>
             </div>
             <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 24, paddingTop: 20, textAlign: 'right' }}>
                <button className="btn btn-ghost" style={{ fontSize: 13, padding: '10px 20px', border: '1px solid #e2e8f0' }}>Yêu cầu cập nhật</button>
             </div>
           </div>

           {/* Phương tiện & Thẻ */}
           {!isAdmin && (
           <div className="card" style={{ padding: 28 }}>
             <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 20px 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
               <span className="material-symbols-outlined" style={{ color: '#10b981' }}>directions_car</span>
               Quản lý Phương tiện & Thẻ nhận diện
             </h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ padding: 18, border: '1px solid #e2e8f0', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                     <div style={{ width: 44, height: 44, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: 24 }}>two_wheeler</span>
                     </div>
                     <div>
                       <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Honda AirBlade 150</div>
                       <div style={{ fontSize: 13, color: '#64748b', marginTop: 2, fontWeight: 500 }}>Biển số: <span style={{ color: '#1e293b', fontWeight: 700 }}>51A-992.42</span></div>
                     </div>
                   </div>
                   <span style={{ border: '1px solid #bbf7d0', background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Biển số xe hợp lệ</span>
                </div>

                <div style={{ padding: 18, border: '1px solid #e2e8f0', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                     <div style={{ width: 44, height: 44, background: '#eff6ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: 24 }}>nfc</span>
                     </div>
                     <div>
                       <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Thẻ sinh viên / Tích hợp NFC</div>
                       <div style={{ fontSize: 13, color: '#64748b', marginTop: 2, fontWeight: 500 }}>Mã định danh: <span style={{ color: '#1e293b', fontWeight: 700 }}>STD-211-043</span></div>
                     </div>
                   </div>
                   <span style={{ border: '1px solid #bbf7d0', background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Đang hoạt động</span>
                </div>
             </div>
           </div>
           )}
        </div>
      </div>
    </div>
  )
}
