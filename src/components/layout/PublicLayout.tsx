import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const PublicLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === "/"
  return (
    <div className={`flex min-h-screen flex-col ${isHome ? "mt-0" : "mt-12"}`}>
      <Navbar />

      <main className="flex-1 ">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout
