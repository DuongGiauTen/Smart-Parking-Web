import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import Landing from './pages/Landing'
import LoginPage from './pages/LoginPage'
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import Dashboard from './pages/admin/Dashboard'
import ParkingMap from './pages/admin/ParkingMap'
import IoTDevices from './pages/admin/IoTDevices'
import Pricing from './pages/admin/Pricing'
import Revenue from './pages/admin/Revenue'
import Users from './pages/admin/Users'
import GateEntry from './pages/admin/GateEntry'
import GateExit from './pages/admin/GateExit'
import BKPay from './pages/user/BKPay'
import UserHome from './pages/user/UserHome'
import UserParking from './pages/user/UserParking'
import UserHistory from './pages/user/UserHistory'
import BKPayGateway from './pages/user/BKPayGateway'
import Profile from './pages/Profile'
import Signage from './pages/admin/Signage'
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

function RootRedirect() {
  const { auth, isAdmin } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  return <Navigate to={isAdmin ? '/dashboard' : '/user'} replace />
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
            <Route path="dashboard"   element={<Dashboard />} />
            <Route path="gate-entry"  element={<GateEntry />} />
            <Route path="gate-exit"   element={<GateExit />} />
            <Route path="parking-map" element={<ParkingMap />} />
            <Route path="iot-devices" element={<IoTDevices />} />
            <Route path="pricing"     element={<Pricing />} />
            <Route path="revenue"     element={<Revenue />} />
            <Route path="users"       element={<Users />} />
            <Route path="profile"     element={<Profile />} />
            <Route path="signage"     element={<Signage />} />
          </Route>

          {/* USER ROUTES */}
          <Route path="/user" element={<ProtectedUser><UserLayout /></ProtectedUser>}>
            <Route index element={<UserHome />} />
            <Route path="map"     element={<UserParking />} />
            <Route path="pay"     element={<BKPay />} />
            <Route path="history" element={<UserHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/bkpay-gateway" element={<ProtectedUser><BKPayGateway /></ProtectedUser>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
