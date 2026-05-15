const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'duongtranminh253@gmail.com',
    pass: 'bvfb lrxh reke sstu',
  },
})

exports.sendPaymentConfirmation = async (req, res) => {
  const { sessionId, amount, plate, zone, entryTime, exitTime, duration, userName, userEmail } = req.body

  if (!sessionId || !amount) {
    return res.status(400).json({ success: false, error: 'Missing required fields' })
  }

  const recipient = 'duong.tran253@hcmut.edu.vn'

  const html = `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#003d9b 0%,#1a6bff 100%);padding:28px 32px;">
      <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">HCMUT BKParking System</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:24px;font-weight:800;">Xác nhận thanh toán</h1>
    </div>

    <div style="padding:28px 32px;">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:12px;">
        <span style="font-size:28px;">✅</span>
        <div>
          <p style="margin:0;font-size:15px;font-weight:700;color:#166534;">Thanh toán thành công!</p>
          <p style="margin:4px 0 0;font-size:13px;color:#15803d;">Giao dịch đã được ghi nhận và xử lý.</p>
        </div>
      </div>

      <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Chi tiết giao dịch</h3>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;font-size:14px;color:#64748b;font-weight:500;">Mã giao dịch</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:700;text-align:right;font-family:monospace;">${sessionId}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;font-size:14px;color:#64748b;font-weight:500;">Biển số xe</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:700;text-align:right;">${plate || '---'}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;font-size:14px;color:#64748b;font-weight:500;">Khu vực</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:700;text-align:right;">${zone || '---'}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;font-size:14px;color:#64748b;font-weight:500;">Thời gian vào</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:600;text-align:right;">${entryTime || '---'}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;font-size:14px;color:#64748b;font-weight:500;">Thời gian ra</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:600;text-align:right;">${exitTime || '---'}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;font-size:14px;color:#64748b;font-weight:500;">Thời gian gửi</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:600;text-align:right;">${duration || '---'}</td>
        </tr>
        <tr>
          <td style="padding:14px 0 0;font-size:16px;color:#0f172a;font-weight:800;">TỔNG THANH TOÁN</td>
          <td style="padding:14px 0 0;font-size:22px;color:#003d9b;font-weight:900;text-align:right;">${Number(amount).toLocaleString('vi-VN')} đ</td>
        </tr>
      </table>

      <div style="background:#f8fafc;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#64748b;">Người thanh toán: <strong style="color:#1e293b;">${userName || 'N/A'}</strong></p>
        <p style="margin:6px 0 0;font-size:13px;color:#64748b;">Phương thức: <strong style="color:#1e293b;">Ví BKPay HCMUT</strong></p>
        <p style="margin:6px 0 0;font-size:13px;color:#64748b;">Thời điểm: <strong style="color:#1e293b;">${new Date().toLocaleString('vi-VN')}</strong></p>
      </div>

      <p style="font-size:13px;color:#94a3b8;text-align:center;margin:0;">
        Email này được gửi tự động từ hệ thống BKParking HCMUT.<br>
        Vui lòng không trả lời email này.
      </p>
    </div>

    <div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;font-weight:600;">HCMUT BKParking System · Ho Chi Minh City University of Technology</p>
    </div>
  </div>
</body>
</html>`

  try {
    await transporter.sendMail({
      from: '"BKParking HCMUT" <duongtranminh253@gmail.com>',
      to: recipient,
      subject: `[BKParking] Xác nhận thanh toán ${sessionId} - ${Number(amount).toLocaleString('vi-VN')} đ`,
      html,
    })

    return res.json({ success: true, message: 'Email sent successfully', to: recipient })
  } catch (err) {
    console.error('Email send error:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
