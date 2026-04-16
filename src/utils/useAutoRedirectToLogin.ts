import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"

export const useAutoRedirectToLogin = (delay?: number) => {
  const navigate = useNavigate()
  const { user,authChecked } = useAppSelector((s) => s.auth)
  const location = useLocation()

  useEffect(() => {
    if(!authChecked)return;
    if (user) return
    
    // run immediately if no delay
    if (!delay) {
      navigate("/login")
      return
    }

    const timer = setTimeout(() => {
      navigate("/login")
    }, delay)

    return () => clearTimeout(timer)
  }, [user, navigate, delay,authChecked, location.pathname])
}