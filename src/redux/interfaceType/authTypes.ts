export interface Address {
  mobileNumber: string
  id: number
  type: "HOME" | "OFFICE"
  addressLine: string
  city: string
  state: string
  pincode: string
  landmark?: string
  isDefault?: boolean
}

export interface User {
  id: string
  role?: string
  name: string
  email?: string | null
  phone: string
  addresses?: Address[]
}

export interface AuthState {
  user: User | null
  addresses: Address[]
  defaultAddress: Address | null
  loading: boolean
  error: string | null

  otpSent: boolean
  expiresIn: number | null
  otpIssuedAt: number | null

  retryAfter: number | null
  isVerified: boolean
  authChecked: boolean
    pincode: string | null
  isServiceable: boolean
}
