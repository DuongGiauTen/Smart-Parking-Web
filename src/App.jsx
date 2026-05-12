import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './domains/auth/AuthContext'
import Landing from './domains/landing/LandingPage'
import LoginPage from './domains/auth/LoginPage'
import AdminLayout from './shared/layouts/AdminLayout'
import UserLayout from './shared/layouts/UserLayout'
import AdminDashboardPage from './domains/dashboard/AdminDashboardPage'
import ParkingMapPage from './domains/parking/ParkingMapPage'
import IoTDevicesPage from './domains/iot/IoTDevicesPage'
import PricingPage from './domains/payment/PricingPage'
import RevenuePage from './domains/payment/RevenuePage'
import UsersPage from './domains/user-management/UsersPage'
import GateEntryPage from './domains/parking/GateEntryPage'
import GateExitPage from './domains/parking/GateExitPage'
import ParkingStatusPage from './domains/parking/ParkingStatusPage'
import BKPayPage from './domains/payment/BKPayPage'
import UserDashboardPage from './domains/dashboard/UserDashboardPage'
import UserParkingPage from './domains/parking/UserParkingPage'
import UserHistoryPage from './domains/activity/UserHistoryPage'
import BKPayGatewayPage from './domains/payment/BKPayGatewayPage'
import ProfilePage from './domains/auth/ProfilePage'
import SignagePage from './domains/iot/SignagePage'
import StaffDashboardPage from './domains/dashboard/StaffDashboardPage'
function ProtectedAdmin({ children }) {
  const { auth, isAdmin } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/user" replace />
  return children
}

function ProtectedUser({ children }) {
  const { auth } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  return children
}

function ProtectedStaff({ children }) {
  const { auth, isStaff } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  if (!isStaff) return <Navigate to="/user" replace />
  return children
}

function RootRedirect() {
  const { auth, isAdmin, isStaff } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  if (isAdmin) return <Navigate to="/dashboard" replace />
  if (isStaff) return <Navigate to="/staff" replace />
  return <Navigate to="/user" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Landing />} />

          {/* ADMIN ROUTES */}
          <Route path="/" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
            <Route path="dashboard"   element={<AdminDashboardPage />} />
            <Route path="gate-entry"      element={<GateEntryPage />} />
            <Route path="gate-exit"       element={<GateExitPage />} />
            <Route path="parking-status"  element={<ParkingStatusPage />} />
            <Route path="parking-map"     element={<ParkingMapPage />} />
            <Route path="iot-devices" element={<IoTDevicesPage />} />
            <Route path="pricing"     element={<PricingPage />} />
            <Route path="revenue"     element={<RevenuePage />} />
            <Route path="users"       element={<UsersPage />} />
            <Route path="profile"     element={<ProfilePage />} />
            <Route path="signage"     element={<SignagePage />} />
          </Route>

          {/* STAFF ROUTES */}
          <Route path="/staff" element={<ProtectedStaff><AdminLayout /></ProtectedStaff>}>
            <Route index element={<StaffDashboardPage />} />
            <Route path="gate-entry"     element={<GateEntryPage />} />
            <Route path="gate-exit"      element={<GateExitPage />} />
            <Route path="parking-status" element={<ParkingStatusPage />} />
            <Route path="parking-map"    element={<ParkingMapPage />} />

            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* USER ROUTES */}
          <Route path="/user" element={<ProtectedUser><UserLayout /></ProtectedUser>}>
            <Route index element={<UserDashboardPage />} />
            <Route path="map"     element={<UserParkingPage />} />
            <Route path="pay"     element={<BKPayPage />} />
            <Route path="history" element={<UserHistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="/bkpay-gateway" element={<ProtectedUser><BKPayGatewayPage /></ProtectedUser>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
