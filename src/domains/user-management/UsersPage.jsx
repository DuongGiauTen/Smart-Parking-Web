// ============================================================
// USERS - User management
// ============================================================
import { useState } from 'react'

const USERS_DATA = [
  { name:'Trần Minh Dương', email:'hoang.tm@hcmut.edu.vn', id:'ID: 2110432', role:'Sinh viên', rc:'#dbeafe', rt:'#1d4ed8', status:'Đang hoạt động', sc:'#22c55e', date:'12 Th9, 2023', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuB63yZ_TsPvh7ymB4nSroIUob651A3YDVDf9bkshxqcI3-exFXKnQG2SUYNAAfWie1cFUDdxe0zNAnI_Qira0PTojJg2F54MVR8-qXR0pktIVTsc-br_EAMprJSfqWvASqtey6uUNaHe7JoJbj05C-cDSIeooG7BwFFZAVwUvbs96c8ezCRkIz4GjDfQKYSkuvSPIT2JKFEdXHX1QYwxsYesQW1yidBQpjawBmSViIHY6gCxH1o5eZJuHwShhF5ENwSQVroxBO50iWg' },
  { name:'Lê Thị Mai', email:'mai.le@hcmut.edu.vn', id:'ID: 1004521', role:'Giảng viên', rc:'#ede9fe', rt:'#7c3aed', status:'Đang hoạt động', sc:'#22c55e', date:'05 Th10, 2023', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDDFtn4U9Z1vwyCqMD855Q3cJXTxbn4WqJnpeKC7mKxIdypI8ySwcAh_XIVeueEL7Hszn33R6HOYSs0lOWiGgSMneIHpgttoP2xmFhd07pWuOFagf-f8BBn1aB1pMuTo3kPqao7CROj6DzyO6JzRu3UYFVmJPW_iaKsHCJW2-0KVk6YeeuSURfx7SnDL2ET1ynDZGo9-h9JdAESNUw2E4sM92oRuM2k1xRS5cUG3jRol8JUrDwPGvpvUfwMHCl1YbQD9uyHl4nJ2e7D' },
  { name:'Phạm Văn Cường', email:'cuong.p@nexus.sec', id:'ID: SEC-082', role:'An ninh', rc:'#ffedd5', rt:'#9a3412', status:'Đang nghỉ', sc:'#f59e0b', date:'20 Th1, 2024', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCxYbQqDUL7wK18o_J82VT-gx1wubTlRHieD5KJ4qX5xHXgUFDrQzZmKGa9SAIZrJzPLTXSbQr12MXoOY181uBNXeI9r5AX4p5SrBxQaEKq8ZP8zU2ZfHPHOzcrVpbHhdR1M1VIWQ_cZraMLLLI9dmdN22oJVL8siF1K8WZLOF8f0wF2zMqYSnLXeAg4ouxlrnpkUpK8l_QveWUyJ7JOYG5GFKputhmKlwN6LEq3zXYkydxA5xmyoYtrCnfjZev-lD8RsMq45Rz6Sdo' },
  { name:'Đoàn Kim Ngân', email:'ngan.doan@nexus.ops', id:'ID: ADM-005', role:'Quản trị', rc:'#dbeafe', rt:'#1e40af', status:'Ngoại tuyến', sc:'#94a3b8', date:'15 Th11, 2023', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBneJMVwo_gXZUB4ahH0GPO8BUmKMDUk9o2jepolQJn8C41iGY5wmWd33tO7RBEmIUFkQt0Wmo84-jBmaYbvOwngPW_iOs1S5TQOhROUFLjHXN_yCz_MaNz0KW00SFWiMUb_lVOcApbn_nuk68APc8YRNPnN9WG-VfIWL9vvWFEjwubY1kuhtk6ufUhcS715ukJaJb3t-72i9nt_v56ZCbjI3CVm_GHZtyTxkkLlL_Y5Thy8jt24VX1EHpKiN-IpBxELRh-T2kxunoB' },
]

export default function Users() {
  const [filter, setFilter] = useState('Tất cả')
  const roles = ['Tất cả','Sinh viên','Nhân viên','Quản trị','Bảo vệ']

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#003d9b', margin: '0 0 6px 0' }}>Danh mục người dùng</h2>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Quản lý truy cập khuôn viên tập trung và phân quyền vai trò.</p>
        </div>
        <button className="btn btn-primary">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>Đăng ký người dùng
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 24 }}>
        <div className="card card-hover" style={{ padding: 22, borderLeft: '4px solid #003d9b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px 0' }}>Tổng người dùng</p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, margin: 0 }}>12,482</p>
            </div>
            <div style={{ width: 46, height: 46, background: 'rgba(0,61,155,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#003d9b' }}>groups</span>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontSize: 12, fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>+4.2% so với tháng trước
          </div>
        </div>

        <div className="card card-hover" style={{ padding: 22, borderLeft: '4px solid #a33500' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px 0' }}>Đăng ký mới</p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, margin: 0 }}>342</p>
            </div>
            <div style={{ width: 46, height: 46, background: 'rgba(163,53,0,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#a33500' }}>how_to_reg</span>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: '#a33500' }}>Chờ xác minh: 18</div>
        </div>

        <div className="card" style={{ padding: 22, background: 'linear-gradient(135deg,#003d9b,#0052cc)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ color: 'rgba(196,210,255,0.9)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px 0' }}>Đang hoạt động</p>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, color: '#fff', margin: 0 }}>1,824</p>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
              <span className="material-symbols-outlined pulse" style={{ fontSize: 16 }}>sensors</span>Kết nối cảm biến trực tiếp
            </div>
          </div>
          <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.1 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 80, color: '#fff' }}>hub</span>
          </div>
        </div>
      </div>

      {/* Filters + Table */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {roles.map(r => (
            <button key={r} onClick={() => setFilter(r)} style={{ padding: '7px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: filter===r?'#003d9b':'#e6e8eb', color: filter===r?'#fff':'#475569' }}>{r}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>Thêm bộ lọc
          </button>
          <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>Xuất CSV
          </button>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead><tr>
              {['Hồ sơ người dùng','Mã định danh','Vai trò','Trạng thái','Ngày đăng ký','Thao tác'].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {USERS_DATA.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={u.img} alt={u.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{u.name}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontFamily: 'monospace', fontSize: 11, background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: 6 }}>{u.id}</span></td>
                  <td><span style={{ padding: '3px 12px', background: u.rc, color: u.rt, borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{u.role}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.sc }} />
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{u.status}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: '#94a3b8' }}>{u.date}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button style={{ padding: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: 8, transition: 'all 0.2s' }}
                      onMouseOver={e => { e.currentTarget.style.color='#003d9b'; e.currentTarget.style.background='#eff6ff' }}
                      onMouseOut={e => { e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.background='none' }}>
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '13px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Hiển thị 1 đến 10 của 12,482 người dùng</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,'...',1248].map((p,i) => (
              <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: p===1?'#003d9b':'transparent', color: p===1?'#fff':'#475569' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
