import React, { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import OtpForm from "./OtpForm"
import { authService } from "../../services/authService"
import type { SendOtpPayload } from "../../services/authService"
import { useAuth } from "../../context/useAuth"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  loginUser,
  registerUser,
  resendOtp,
  verifyOtp,
} from "../../redux/action/authThunks"
import { useNavigate } from "react-router-dom"

type AuthView = "LOGIN" | "REGISTER" | "OTP"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: AuthView
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = "REGISTER" }) => {
  // const { login } = useAuth()
  const { loading, retryAfter, expiresIn, otpIssuedAt, otpSent } =
    useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
      const navigate = useNavigate();
  const [view, setView] = useState<AuthView>(initialView)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [contextData, setContextData] = useState<{
    name?: string
    email?: string
  }>({})
  const [authType, setAuthType] = useState<"LOGIN" | "REGISTER">(initialView === "LOGIN" ? "LOGIN" : "REGISTER")
  const [error, setError] = useState<string | null>(null)

  const [retryTimer, setRetryTimer] = useState<number | null>(null)
  const [otpTimer, setOtpTimer] = useState<number | null>(null)

  //otp retry countdown
  useEffect(() => {
    if (!retryAfter) return

    setRetryTimer(retryAfter)

    const interval = setInterval(() => {
      setRetryTimer((prev) => {
        if (prev && prev > 1) return prev - 1
        clearInterval(interval)
        return null
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [retryAfter, otpIssuedAt])

  //otp validate countdown
  useEffect(() => {
    if (!expiresIn) return

    setOtpTimer(expiresIn)

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev && prev > 1) return prev - 1
        clearInterval(interval)
        return null
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresIn, otpIssuedAt])

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView(initialView)
        setPhoneNumber("")
        setContextData({})
        setError(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, initialView])

  if (!isOpen) return null

  const handleLoginContinue = async (phone: string) => {
    setError(null)

    try {
      await dispatch(loginUser({ phone })).unwrap()

      setPhoneNumber(phone)
      setAuthType("LOGIN")
      setView("OTP")
    } catch (err: any) {
      if (err?.needRegister) {
        setError("Number not registered. Please register.")
        setView("REGISTER")
      } else {
        setError(err?.msg || "Failed to send OTP")
      }
    }
  }

  const handleRegisterContinue = async (data: {
    name: string
    phone: string
    email: string
    password?: string
    confirmPassword?: string
  }) => {
    setError(null)
    try {
      const payload = {
        ...data,
        source: "web", // default to web
      }
      await dispatch(registerUser(payload)).unwrap()
      setPhoneNumber(data.phone)
      setContextData({ name: data.name, email: data.email })
      setAuthType("REGISTER")
      setView("OTP")
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("User already exists. Please login.")
      } else {
        setError(err.response?.data?.message || "Failed to send OTP")
      }
    }
  }

  const handleOtpContinue = async (otp: string) => {
    setError(null)
    try {
      await dispatch(verifyOtp({ otp, phone: phoneNumber })).unwrap()
      onClose()
      navigate('/check-location', { replace: true }); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP")
    }
  }

  const handleResendOtp = async () => {
    setError(null)

    try {
      await dispatch(resendOtp(phoneNumber)).unwrap()
      console.log("OTP Resent")
    } catch (err: any) {
      setError(err?.msg || "Failed to resend OTP")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl transform transition-all scale-100 flex flex-col items-center animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {error && (
          <div className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="w-full mt-2">
          {view === "LOGIN" && (
            <LoginForm
              loading={loading}
              onContinue={handleLoginContinue}
              onSwitchToRegister={() => {
                setError(null)
                setView("REGISTER")
              }}
            />
          )}

          {view === "REGISTER" && (
            <RegisterForm
              loading={loading}
              onContinue={handleRegisterContinue}
              onSwitchToLogin={() => {
                setError(null)
                setView("LOGIN")
              }}
            />
          )}

          {view === "OTP" && (
            <OtpForm
              retryTimer={retryTimer}
              otpTimer={otpTimer}
              loading={loading}
              phoneNumber={phoneNumber}
              onContinue={handleOtpContinue}
              onResend={handleResendOtp}
              onBack={() => {
                setError(null)
                setView(authType === "LOGIN" ? "LOGIN" : "REGISTER")
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal
