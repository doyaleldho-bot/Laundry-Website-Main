import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import ScrollToTop from "../components/common/ScrollToTop"
import ProtectedRoute from "../components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

// Lazy imports
const PublicLayout = lazy(() => import("../components/layout/PublicLayout"))
const HomeMain = lazy(() => import("../pages/Home/HomeMain"))
const ServicePage = lazy(() => import("../pages/Services/ServicePage"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const ServiceDetails = lazy(() => import("../pages/Services/ServiceDetails"))
const LoginPage = lazy(() => import("../pages/Login/LoginPage"))
const RegisterPage = lazy(() => import("../pages/Login/RegisterPage"))
const SchedulePickup = lazy(() => import("../pages/PickupPage/SchedulePickup"))
const ServiceRatePage = lazy(() => import("../pages/Services/ServiceRatePage"))
const Payment = lazy(() => import("../components/Payment"))
const Profile = lazy(() => import("../components/profile/Profile"))
const OrderHistory = lazy(() => import("../pages/OrderHistory/OrderHistory"))
const Chatbot = lazy(() => import("../components/Chatbot"))
const TrackOrderMain = lazy(() => import("../components/TrackOrderComponents/TrackOrderMain"))
const TrackOrders = lazy(() => import("../pages/OrderHistory/TrackOrders"))
const ConfirmPayment = lazy(() => import("../pages/ConfirmPayment/ConfirmPayment"))
const CheckLocationPage = lazy(() => import("../components/auth/CheckLocationPage"))
const Map = lazy(() => import("../pages/test"))

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomeMain />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment/:orderId" element={<ConfirmPayment />} />
            <Route path="/check-location" element={<CheckLocationPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/service/rate" element={<ServiceRatePage />} />
            <Route path="/test" element={<Map />} />

            <Route
              path="/service/details"
              element={
                <ProtectedRoute>
                  <ServiceDetails />
                </ProtectedRoute>
              }
            />

            <Route path="/orderDetails" element={<Payment />} />
            <Route path="/pickup" element={<SchedulePickup />} />
            <Route path="/order" element={<TrackOrders />} />
            <Route path="/order/track/:id" element={<TrackOrderMain />} />
            <Route path="/orders/history" element={<OrderHistory />} />
            <Route path="/need/help" element={<Chatbot />} />
          </Route>

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default AppRoutes