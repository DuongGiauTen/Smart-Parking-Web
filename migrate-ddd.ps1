# migration-ddd.ps1
# ================================================
# BK Parking - Lightweight DDD Migration (Plan 1)
# ================================================

$srcRoot = ".\src"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "🚀 Starting DDD Migration (Plan 1)..." -ForegroundColor Green
Write-Host "Creating directory structure..." -ForegroundColor Cyan

# Create domain directories (minimal structure)
$domains = @(
    "domains/auth",
    "domains/parking",
    "domains/payment",
    "domains/iot",
    "domains/dashboard",
    "domains/user-management",
    "domains/activity",
    "domains/landing",
    "shared/layouts",
    "shared/components",
    "shared/context",
    "shared/hooks",
    "shared/services",
    "shared/utils",
    "shared/assets"
)

foreach ($domain in $domains) {
    $path = Join-Path $srcRoot $domain
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "✓ Created: $domain" -ForegroundColor Yellow
    }
}

Write-Host "`n📁 Moving files to domains..." -ForegroundColor Cyan

# ==================== AUTH ====================
Write-Host "→ Moving Auth files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\LoginPage.jsx" -Destination "$srcRoot\domains\auth\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\Profile.jsx" -Destination "$srcRoot\domains\auth\ProfilePage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\AuthContext.jsx" -Destination "$srcRoot\domains\auth\" -Force -ErrorAction SilentlyContinue

# ==================== PARKING ====================
Write-Host "→ Moving Parking files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\admin\ParkingMap.jsx" -Destination "$srcRoot\domains\parking\ParkingMapPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\user\UserParking.jsx" -Destination "$srcRoot\domains\parking\UserParkingPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\admin\GateEntry.jsx" -Destination "$srcRoot\domains\parking\GateEntryPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\admin\GateExit.jsx" -Destination "$srcRoot\domains\parking\GateExitPage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== PAYMENT ====================
Write-Host "→ Moving Payment files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\user\BKPay.jsx" -Destination "$srcRoot\domains\payment\BKPayPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\user\BKPayGateway.jsx" -Destination "$srcRoot\domains\payment\BKPayGatewayPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\admin\Pricing.jsx" -Destination "$srcRoot\domains\payment\PricingPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\admin\Revenue.jsx" -Destination "$srcRoot\domains\payment\RevenuePage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== IoT ====================
Write-Host "→ Moving IoT files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\admin\IoTDevices.jsx" -Destination "$srcRoot\domains\iot\IoTDevicesPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\admin\Signage.jsx" -Destination "$srcRoot\domains\iot\SignagePage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== DASHBOARD ====================
Write-Host "→ Moving Dashboard files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\admin\Dashboard.jsx" -Destination "$srcRoot\domains\dashboard\AdminDashboardPage.jsx" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\pages\user\UserHome.jsx" -Destination "$srcRoot\domains\dashboard\UserDashboardPage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== USER MANAGEMENT ====================
Write-Host "→ Moving User Management files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\admin\Users.jsx" -Destination "$srcRoot\domains\user-management\UsersPage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== ACTIVITY ====================
Write-Host "→ Moving Activity files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\user\UserHistory.jsx" -Destination "$srcRoot\domains\activity\UserHistoryPage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== LANDING ====================
Write-Host "→ Moving Landing files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\pages\Landing.jsx" -Destination "$srcRoot\domains\landing\LandingPage.jsx" -Force -ErrorAction SilentlyContinue

# ==================== SHARED ====================
Write-Host "→ Moving Shared files..." -ForegroundColor Magenta
Move-Item -Path "$srcRoot\layouts\AdminLayout.jsx" -Destination "$srcRoot\shared\layouts\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "$srcRoot\layouts\UserLayout.jsx" -Destination "$srcRoot\shared\layouts\" -Force -ErrorAction SilentlyContinue

# Cleanup empty directories
Write-Host "`n🧹 Cleaning up empty directories..." -ForegroundColor Cyan
Remove-Item -Path "$srcRoot\pages\admin" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$srcRoot\pages\user" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$srcRoot\pages" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$srcRoot\layouts" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`n✅ Migration Complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create domain service/hook files"
Write-Host "2. Update import paths in App.jsx"
Write-Host "3. Test all routes" -ForegroundColor Gray
