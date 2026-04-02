import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { useAppSelector } from "../redux/hooks"

interface ProtectedRouteProps {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading, isVerified, authChecked } = useAppSelector((s) => s.auth)
  console.log(isVerified)
  //   const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  //  Wait until auth check is done
  if (!authChecked || loading) {
    return <div>Loading...</div>
  }

  if (!isVerified) {
    // Redirect to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
