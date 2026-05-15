import React from 'react';
import { Link } from 'react-router-dom'
import bkLogo from '../../assets/bk.png';

export default function Landing() {
  return (
    <div className="bg-background font-body text-on-background antialiased overflow-x-hidden w-full h-screen overflow-y-auto">
      <style>{`
        .kinetic-grid {
            background-image: radial-gradient(circle, #003d9b1a 1px, transparent 1px);
            background-size: 40px 40px;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .hero-gradient {
            background: radial-gradient(circle at 70% 30%, rgba(12, 86, 208, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 10% 80%, rgba(12, 86, 208, 0.05) 0%, transparent 40%);
        }
        .overlap-image {
            transform: translateZ(0);
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .overlap-image:hover {
            transform: translateY(-20px) scale(1.02);
        }
        .text-glow {
            text-shadow: 0 0 30px rgba(0, 61, 155, 0.2);
        }
      `}</style>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-[100] bg-white/60 backdrop-blur-xl border-b border-white/20">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src={bkLogo} alt="BK Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold tracking-tight text-primary font-headline">HCMUT SPMS</span>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <a className="text-on-surface hover:text-primary font-headline font-semibold text-sm transition-colors" href="#">Phân hệ</a>
            <a className="text-on-surface hover:text-primary font-headline font-semibold text-sm transition-colors" href="#">Bản đồ trực tiếp</a>
            <a className="text-on-surface hover:text-primary font-headline font-semibold text-sm transition-colors" href="#">Nghiên cứu</a>
            <a className="text-on-surface hover:text-primary font-headline font-semibold text-sm transition-colors" href="#">Biểu phí</a>
          </div>
          <div className="flex items-center gap-4">
            <Link className="bg-primary text-on-primary px-7 py-2.5 rounded-full font-headline font-bold text-sm hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all duration-200" to="/login">Đăng nhập Portal</Link>
          </div>
        </div>
      </nav>

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
          <div className="absolute inset-0 kinetic-grid opacity-40"></div>
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-32 relative z-10">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-card border border-primary/20 text-primary text-xs font-bold font-headline tracking-widest uppercase">
                <span className="relative flex h-2.5 w-2.5 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                Đổi mới Đô thị thông minh • Khuôn viên Bách Khoa
              </div>
              <h1 className="text-6xl lg:text-8xl font-headline font-bold text-primary leading-[0.95] tracking-tight text-glow">
                Hệ Thống<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-blue-400">Bãi Đỗ Xe</span><br />
                Thông Minh
              </h1>
              <p className="text-xl text-secondary max-w-xl leading-relaxed font-medium">
                Hệ sinh thái kết nối vạn vật (IoT) độ chính xác cao của Trường Đại học Bách Khoa ĐHQG-HCM, đem lại chuyển động khuôn viên không rào cản với giải pháp phân tích thời gian thực và tự động thanh toán điện tử bằng ví quy chuẩn chung.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link className="px-10 py-5 bg-primary text-on-primary rounded-2xl font-headline font-bold text-lg shadow-2xl shadow-primary/40 hover:translate-y-[-4px] active:scale-95 transition-all inline-flex items-center justify-center" to="/login">
                  Bắt đầu ngay
                  <span className="material-symbols-outlined ml-2 font-bold">arrow_forward_ios</span>
                </Link>
                <button className="px-10 py-5 glass-card text-primary rounded-2xl font-headline font-bold text-lg hover:bg-white/60 transition-all border border-primary/10">
                  Xem bản đồ thực tế
                </button>
              </div>
              <div className="flex items-center gap-6 pt-8 border-t border-primary/5">
                <div className="flex -space-x-4">
                  <img alt="User" className="w-12 h-12 rounded-full border-4 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsrq4Q7KJR1_PIUdVI762u3RN9TfHw_DSWuhp4iQqxqRt4ooXZ-GeDdCNe10rrb1cZVI5ErATznw4XlDEc0QRJy6xe-sl3uDgwQ_gcLxlx03uj9NThRdUYRdXlGwk2Fd1PD5e3abXr5tJ1EiiEdmq8G0MNTunDyv1_LabQfwRwr7D2yYybp3ExbtpvtstOXg-rbEIYC0foXRzdc5JT5s9mSeYgyrypLdMCr9qzOCmh_oppWQz71nX_93y0t5_egB3S6rLHONZq6KOO" />
                  <img alt="User" className="w-12 h-12 rounded-full border-4 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCajeDfKvREqqqrDxTgK5uHDeEIpKldg3AKWvvo7yI-lOZVFVaQ4jE1-QhiK4ylnhPx6Yw1g6Lk_QnqjmGTgHhI6kjJs1_pitD7yjlS7t9QEtLKjUFBbA7uQxznhsjwwUoPoEVM8kPHDPSgbTUq905eig-eCoK27xQuNc-OtM5WGUZBSmcgrTrgMF3Gp_MFGZZaapVbB88USL8GD6wGQJ1w-6x9eFDd4Jekd_jBQ4zvHuNTMrrX8TZ5YZDYqEDmuiC_iBlPWW0NWckY" />
                  <img alt="User" className="w-12 h-12 rounded-full border-4 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjHnvgEK1FIg4YBIwcEtAEILaJDW-BEni3xWy_wWintlDqC9pgBHiYuPsksA4DoROzTegFlMw1vR3e0UEm9IoAibcZqvam8cHQ8qu6BdBVM0lbeM67CNi3kTeHWtakXWkMfFNbRi2nDB2Z6MhVbxAFW1pOuH5Is-Nhxe6sRdB6PRpWrEbXnbS1xmuaeQN13t0Dm0VxLmthSQTgo_t0mlnHeNBY3B8HqI9ut7bti42JKBnMTJDgVF7QHAVlZcFsERPuUA5SnSN2h4po" />
                </div>
                <p className="text-sm font-semibold text-secondary">
                  <span className="text-primary font-bold">10,000+</span> sinh viên &amp; giảng viên tin dùng
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              {/* Main Visual Overlap */}
              <div className="relative z-20 overlap-image">
                <img alt="Modern Smart City 3D Illustration" className="w-full h-auto rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsGzc1TKD9rFVmK6grxdLMXa6n-n7V0jJeaHiEwSw5OZ50q_aahkUVwuzyTYX8R4qbiRTrP3mxyMYiOUxRzn1dKFPIhANZ2wDEMUgy-VrsUL4p7HNzlxHwTlaNZWu03J3HsEDVBKTAahi0BXgutEKXskF4UysAD460Z9CjV_OC9ZUNcoDVrp0o9ii-PwC6bSyjE6IOK3u0AZeCr545d95r87Y3GOpTiyFfCBsRYZkAmo1heYp2WQFXIlIRthrKLL0O6-TRxs2c0IyF" />
                {/* Floating Glass Card 1 */}
                <div className="absolute -top-12 -right-8 z-30 glass-card p-5 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                      <span className="material-symbols-outlined">sensors</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-secondary">Trạng thái Cảm biến</p>
                      <p className="text-sm font-bold text-on-surface">Hoạt động &amp; Ổn định</p>
                    </div>
                  </div>
                </div>
                {/* Floating Glass Card 2 */}
                <div className="absolute -bottom-10 -left-12 z-30 glass-card p-6 rounded-3xl shadow-2xl border border-white/50 w-64">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-secondary">Sức chứa bãi xe</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">THỰC TẾ</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[72%]"></div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-3xl font-headline font-bold text-primary">1,248</p>
                        <p className="text-xs font-medium text-secondary">Chỗ trống khả dụng</p>
                      </div>
                      <span className="material-symbols-outlined text-primary text-3xl opacity-50">local_parking</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background Decorative Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-32 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="group p-10 rounded-[2.5rem] bg-surface-container-low border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <p className="text-7xl font-headline font-bold text-primary mb-6 group-hover:scale-110 transition-transform origin-left">4.5k+</p>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Tổng vị trí đỗ</h3>
                <p className="text-secondary leading-relaxed">Phân bố trên khắp các khu vực nhà xe ở cơ sở 1 và cơ sở 2, với cấu trúc điều hướng hoàn toàn tự động.</p>
              </div>
              <div className="p-10 rounded-[2.5rem] bg-primary text-on-primary shadow-2xl shadow-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="material-symbols-outlined text-9xl">auto_mode</span>
                </div>
                <p className="text-7xl font-headline font-bold mb-6">100%</p>
                <h3 className="text-xl font-headline font-bold mb-2">Tự động hoá</h3>
                <p className="opacity-80 leading-relaxed">Ra vào liền mạch, điều khiển Barie tự động bằng AI và tích hợp thanh toán tài chính điện tử BKPay.</p>
              </div>
              <div className="group p-10 rounded-[2.5rem] bg-surface-container-low border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <p className="text-7xl font-headline font-bold text-primary mb-6 group-hover:scale-110 transition-transform origin-left">0.5s</p>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Độ trễ đồng bộ</h3>
                <p className="text-secondary leading-relaxed">Thời gian truyền xuất dữ liệu siêu tốc của viễn thông công nghiệp gửi thẳng vào bảng điều khiển sinh viên.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-surface-container-lowest relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-headline font-bold text-on-surface mb-6 leading-tight tracking-tight">Cơ sở hạ tầng tối tân cho Di chuyển thông minh</h2>
                <p className="text-lg text-secondary">Hệ thống áp dụng chuẩn công nghiệp IoT toàn cầu mang lại sự tiện nghi, đánh tan nỗi lo gửi xe truyền thống để bạn tự do phát triển tri thức sinh viên.</p>
              </div>
              <div className="hidden md:block">
                <span className="material-symbols-outlined text-primary text-7xl opacity-10">architecture</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Real-time Map */}
              <div className="group glass-card p-10 rounded-3xl hover:bg-primary hover:shadow-primary/20 transition-all duration-500 cursor-default">
                <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl font-bold">map</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-white">Bản đồ Động</h3>
                <p className="text-secondary leading-relaxed group-hover:text-white/80 transition-colors">Theo dõi sức chứa các bãi xe hiển thị qua bản đồ nhiệt (Heatmap) ngay thời gian thực mọi khoảnh khắc.</p>
              </div>
              {/* BKPay Integration */}
              <div className="group glass-card p-10 rounded-3xl hover:bg-primary hover:shadow-primary/20 transition-all duration-500 cursor-default">
                <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl font-bold">account_balance_wallet</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-white">Ví BKPay</h3>
                <p className="text-secondary leading-relaxed group-hover:text-white/80 transition-colors">Thanh toán trơn tru trực tiếp ngay khi đi ngang cổng, chia tay sự phiền toái bằng tiền mặt.</p>
              </div>
              {/* IoT Monitoring */}
              <div className="group glass-card p-10 rounded-3xl hover:bg-primary hover:shadow-primary/20 transition-all duration-500 cursor-default">
                <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl font-bold">settings_input_component</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-white">Viễn thông Edge</h3>
                <p className="text-secondary leading-relaxed group-hover:text-white/80 transition-colors">Cảm biến quang học với kiến trúc lưới phi tập trung đảm nhận việc giám sát an toàn toàn thời gian.</p>
              </div>
              {/* Automated Access */}
              <div className="group glass-card p-10 rounded-3xl hover:bg-primary hover:shadow-primary/20 transition-all duration-500 cursor-default">
                <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl font-bold">encrypted</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-white">An ninh mạng</h3>
                <p className="text-secondary leading-relaxed group-hover:text-white/80 transition-colors">Tín hiệu mở cổng nhận dạng bảo mật với thẻ RFID 13.5MHz và Camera chuẩn bóc tách ALPR cao cấp nhất.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 relative">
                {/* Overlapping Mobile App UI */}
                <div className="relative z-20 max-w-md mx-auto overlap-image">
                  <img alt="Mobile App UI" className="w-full rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,61,155,0.25)] border-[12px] border-slate-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuiTQqhGOtkyLqbKMuTxUZuyWfg1Un_g6cW4jX7ySa1Y_5_5ZGOLXhadkHIaSs6rtyz1qeBSbkDB_r-TQaNgLZHePCWSgXFyg270XIp9OuRct5MU2DJgC9TBWcIj-X_PE8qUxhXkvVQSU8hQBU3FG03B1L6ZK8NmlMZNf8ALogZnE9DlBIF-nuBfQnJiLjZlVCpGfHwraD-yFx2RQYJA5WhVDOgIP1Z1zVNsBgyKf6qiB-rALJmuk7kL4KWhbSoe4Oiz6IArHQNpta" />
                  {/* Floating Check-in UI */}
                  <div className="absolute top-1/3 -right-16 glass-card p-5 rounded-2xl shadow-2xl border border-white/60 animate-pulse">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-secondary uppercase">Trạng thái Check-in</p>
                        <p className="text-sm font-bold text-on-surface">Khớp thẻ Sinh viên</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Professional Photo Backdrop */}
                <div className="absolute -top-10 -left-10 w-64 h-64 opacity-20 -z-10 rotate-12">
                  <img alt="Parking Grid" className="rounded-3xl grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7iDr4gWK8P5onyaexqgET3mfvU6IpaR28xGPxzc0pHV2-svTcDvpwORctc2W8ogd3X1bxgmYvDneqFUBe8mHQxk84fb32sOpql-3rKbdD-lhhBfBpQlamLr42J-ElISmVQ35zWUJeWTeyYegSgQLjAHwQ1TWCiWThsZ89oWU3eHNiPfUpJJobqwa--9ltDpthVAPzK8hVUIcDDI4adTU85VOYOFQK4hQawO4qobRZQdtNpop9YaOjLR0ZHuV7fyjJuYAUACOZH9A" />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-5xl font-headline font-bold text-on-surface leading-tight">Quy trình Vận hành<br /><span className="text-primary">Không chạm</span></h2>
                  <p className="text-secondary text-lg max-w-lg">Bỏ qua thẻ cào giấy hay tiền mặt phiền toái. Chỉ với 3 bước, bạn nắm trọn vẹn cả lộ trình cho chuỗi di chuyển mượt mà tại Bách Khoa.</p>
                </div>
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-surface-container-high text-primary rounded-3xl flex items-center justify-center font-headline font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-all">01</div>
                    <div className="pt-2">
                       <h4 className="text-2xl font-headline font-bold text-on-surface mb-3">Thông quan cổng chính</h4>
                       <p className="text-secondary leading-relaxed">Cổng ghi nhận dữ liệu định danh bằng Camera AI ngay khi bạn lướt qua trạm kiểm soát hoặc chạm thẻ Sinh Viên.</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-surface-container-high text-primary rounded-3xl flex items-center justify-center font-headline font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-all">02</div>
                    <div className="pt-2">
                       <h4 className="text-2xl font-headline font-bold text-on-surface mb-3">Tìm kiếm chỗ trong nháy mắt</h4>
                       <p className="text-secondary leading-relaxed">Bật app Dashboard chỉ định luồng đi phù hợp, khoanh vùng khu đậu xe tối ưu nhất cho tòa nhà của bạn.</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-surface-container-high text-primary rounded-3xl flex items-center justify-center font-headline font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-all">03</div>
                    <div className="pt-2">
                       <h4 className="text-2xl font-headline font-bold text-on-surface mb-3">Tự động báo cáo cước</h4>
                       <p className="text-secondary leading-relaxed">Khi rời bến, cổng tính toán thời gian, quét tài khoản BKPay hoàn tất khấu trừ giao dịch chỉ trong phần ngàn giây.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Context (IoT Section) */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 kinetic-grid"></div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="w-20 h-px bg-primary"></div>
                <h2 className="text-5xl font-headline font-bold leading-tight">Giải pháp Mạng<br />Xương sống Bảo mật</h2>
                <p className="text-slate-400 text-xl leading-relaxed">Hệ thống mạng không dây vận hành bằng các giao thức bảo mật cao cấp nhất. Mọi dữ liệu đều được mã hóa trên đường biên và cam kết tính ổn định thời tiết mưa gió 100%.</p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div className="space-y-2">
                    <p className="text-primary font-bold font-headline text-3xl">IP68</p>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Chống Nước Mưa & Bụi Toàn Khối</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary font-bold font-headline text-3xl">AES-256</p>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Mã Hoá Quân Nhu (SHA-1)</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img alt="IoT Sensor Tech" className="rounded-[3rem] shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3kG3VyuahALS3IbpleV5_-kwEjVmJMq20iVqpPSDdZk-PaPPKg4AWCNoHbpuje9lMxT2M9Kdwj-4AWhiV8ae0Vi2oiehHHWq3UnOL4vSIZxNPG0maMUcewmKFtHQ45bo5uWLrAmZZFG_ofAW0JMLR96YlAZD4nqDohkV7IkEY6w5OOj_NcQQtxVtx4iDFZTycoFWACk2sFf7otkP4ImbhBCmSMT7eztKE1mS7N_xFKnP81o1NGEHa2U5yxvr1hVFP5zwuVNKhALUQ" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto rounded-[4rem] bg-gradient-to-br from-primary to-primary-container relative overflow-hidden p-16 md:p-32">
            <div className="absolute inset-0 kinetic-grid opacity-20"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight">Kỷ nguyên di chuyển mới dành cho khuôn viên bạn.</h2>
              <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto">Bắt nhịp với trung tâm đô thị số. Sử dụng SPMS ngay để trải nghiệm môi trường quy chuẩn của sinh viên Đại học Bách Khoa.</p>
              <div className="pt-6 flex flex-wrap justify-center gap-6">
                <Link className="px-12 py-6 bg-white text-primary rounded-3xl font-headline font-bold text-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:translate-y-[-5px] transition-all active:scale-95 inline-flex items-center" to="/login">
                  Tham gia Portal
                  <span className="material-symbols-outlined ml-3 text-3xl">rocket_launch</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-20 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <img src={bkLogo} alt="BK Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-on-surface font-headline">Phòng Thí Nghiệm Đô Thị Thông Minh (SCL)</span>
            </div>
            <p className="text-secondary font-medium leading-relaxed max-w-md">
              Mũi nhọn nghiên cứu thiết kế môi trường thành phố công nghệ cao. Tự hào được vận hành toàn phần dưới sự phân bổ của Trường Đại Học Bách Khoa ĐHQG-HCM, thay đổi tương lai đô thị qua từng thế hệ trí thức.
            </p>
            <div className="flex gap-4">
              <a className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
              <a className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="#">
                <span className="material-symbols-outlined">hub</span>
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-on-surface uppercase tracking-widest text-sm">Cơ Sở Dữ Liệu</h4>
            <ul className="space-y-4 font-medium text-secondary">
              <li><a className="hover:text-primary transition-colors" href="#">Trạng thái Kết nối Data Server</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Cổng thiết lập API Sinh viên</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Nghiên cứu về nền tảng IofE</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Bản tin điện tử</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-on-surface uppercase tracking-widest text-sm">Chính sách Thỏa Thuận</h4>
            <ul className="space-y-4 font-medium text-secondary">
              <li><a className="hover:text-primary transition-colors" href="#">Quy chế Đỗ xe & Nhà để xe</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Điều khoản sử dụng Hệ thống</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Trung tâm Hỗ trợ Cán Bộ Giảng Viên</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Cam kết Bảo mật thông tin</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-20 mt-20 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-medium text-sm">
            © 2024 Bản quyền nền tảng thuộc về Trường Đại học Bách Khoa - ĐHQG TP.HCM.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Status: TẤT CẢ CÁC TRẠM SERVER ONLINE 100%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
