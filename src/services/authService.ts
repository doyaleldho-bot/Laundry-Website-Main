import axios from "axios"

const API_URL = "http://localhost:5001/api/auth"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export interface SendOtpPayload {
  phone: string
  type: "LOGIN" | "REGISTER"
  name?: string
  email?: string
}

export interface VerifyOtpPayload {
  phone: string
  otp: string
}

export const authService = {
  sendOtp: async (payload: SendOtpPayload) => {
    const response = await api.post("/send-otp", payload)
    return response.data
  },

  verifyOtp: async (payload: VerifyOtpPayload) => {
    const response = await api.post("/verify-otp", payload)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
      // localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data
  },

  logout: async () => {
    try {
      await api.post("/logout")
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    if (userStr) return JSON.parse(userStr)
    return null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token")
  },
}
