import { Routes, Route } from "react-router-dom"
import PublicLayout from "../components/layout/PublicLayout"
import HomeMain from "../pages/Home/HomeMain"
import ServicePage from "../pages/Services/ServicePage"
import ScrollToTop from "../components/common/ScrollToTop"
import Dashboard from "../pages/Dashboard"
import ServiceDetails from "../pages/Services/ServiceDetails"
import ProtectedRoute from "../components/ProtectedRoute"
import LoginPage from "../pages/Login/LoginPage"
import SchedulePickup from "../pages/PickupPage/SchedulePickup"
// import TrackOrders from "../pages/TrackOrders/TrackOrders"
import ServiceRatePage from "../pages/Services/ServiceRatePage"
import { Toaster } from "react-hot-toast"
import Payment from "../components/Payment"
import Profile from "../components/profile/Profile"
import OrderHistory from "../pages/OrderHistory/OrderHistory"
import Chatbot from "../components/Chatbot"
import TrackOrderMain from "../components/TrackOrderComponents/TrackOrderMain"
import TrackOrders from "../pages/OrderHistory/TrackOrders"

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomeMain />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/service/rate" element={<ServiceRatePage />} />
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default AppRoutes
