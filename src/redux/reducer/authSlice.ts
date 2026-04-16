import { createSlice } from "@reduxjs/toolkit"
import type { AuthState } from "../interfaceType/authTypes"

import {
  addAddresses,
  checkDelivery,
  deleteAddress,
  getAddresses,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  resendOtp,
  setDefaultAddress,
  updateProfileAddress,
  verifyOtp,
} from "../action/authThunks"

const initialState: AuthState = {
  user: null,
  addresses: [],
  defaultAddress: null,
  retryAfter: null as number | null,
  loading: false,
  error: null,
  otpSent: false,
  isVerified: false,
  authChecked: false,
  expiresIn: null,
  otpIssuedAt: null as number | null,
    pincode: null,
  isServiceable: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload) {
          state.otpSent = true
          state.expiresIn = action.payload.expiresIn
          state.otpIssuedAt = Date.now()
        
        } else {
          state.otpSent = false
          state.error = action.payload.msg
        }
      })

      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.msg || "Login failed"
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.loading = false
        state.otpSent = true
        state.expiresIn = action.payload.expiresIn
        state.otpIssuedAt = Date.now()
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // RESEND OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(resendOtp.fulfilled, (state, action: any) => {
        state.loading = false
        state.otpSent = true
        state.retryAfter = null
        state.expiresIn = action.payload.expiresIn
        state.otpIssuedAt = Date.now()
      })

      .addCase(resendOtp.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.msg
        state.retryAfter = action.payload?.retryAfter || null
      })

      // VERIFY OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isVerified = true
        state.authChecked = true
          localStorage.setItem("user", "true")
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.authChecked = true
      }) // LOAD PROFILE ON REFRESH

      .addCase(getProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isVerified = true
        state.authChecked = true
      
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false
        state.user = null
        state.authChecked = true
        state.isVerified = false
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isVerified = false
        state.authChecked = true
            localStorage.removeItem("user")
      })

      .addCase(logoutUser.rejected, (state) => {
        state.user = null
        state.isVerified = false
      })
      // ADD ADDRESS
      .addCase(addAddresses.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(addAddresses.fulfilled, (state, action) => {
        state.loading = false

        const newAddress = action.payload

        // If new address is default → reset old defaults
        if (newAddress?.isDefault) {
          state.addresses = state.addresses.map((addr) => ({
            ...addr,
            isDefault: false,
          }))
        }

        state.addresses.unshift(newAddress)

        state.defaultAddress =
          state.addresses.find((a) => a.isDefault) || null
      })

      .addCase(addAddresses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // GET ADDRESSES
      .addCase(getAddresses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false

        const addresses = action.payload

        state.addresses = addresses
        state.defaultAddress =
          addresses?.find((a:any) => a.isDefault === true) || null
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // ADD / UPDATE ADDRESS
      .addCase(updateProfileAddress.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfileAddress.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload?.user
        state.addresses = action.payload?.user?.addresses || []

        // Update defaultAddress after updation
        state.defaultAddress =
          state.addresses.find((a) => a.isDefault === true) || null
      })

      .addCase(updateProfileAddress.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // DELETE ADDRESS
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== Number(action.payload),
        )
            // Update defaultAddress after deletion
        state.defaultAddress =
          state.addresses.find((a) => a.isDefault === true) || null
      })

      // SET DEFAULT ADDRESS

      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        const updatedAddresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === action.payload.id,
        }))

        state.addresses = updatedAddresses
        state.defaultAddress = updatedAddresses.find((a) => a.isDefault) || null
      })

      // CHECK DELIVERY (PINCODE)
      .addCase(checkDelivery.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(checkDelivery.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.serviceable) {
          state.pincode = action.payload.pincode
          state.isServiceable = true

          // persist
          localStorage.setItem("pincode", action.payload.pincode)
        } else {
          state.isServiceable = false
          state.error = action.payload.message || "Service not available"
        }
      })

      .addCase(checkDelivery.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isServiceable = false
      })
  },
})

export const { } = authSlice.actions
export default authSlice.reducer
