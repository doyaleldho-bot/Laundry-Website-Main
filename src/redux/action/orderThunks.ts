import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

export interface OrderItemPayload {
  title: string
  serviceType: string[]
  quantity: number
  unitType: "PIECE" | "WEIGHT"
  unitPrice: number
  totalPrice: number
}

export interface CreateOrderPayload {
  addressId?: string
  apartment: string
  city: string
  landmark: string
  state: string
  pincode: string
  mobile: string
  instructions?: string
  pickupDate: string
  timeSlot: string
  image?: File
  type?: "PIECE" | "WEIGHT"
  items?: OrderItemPayload[]
  referralCode?: string
  couponCode?: string
}

export const createOrderWithPickup = createAsyncThunk(
  "order/createOrderWithPickup",
  async (data: CreateOrderPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData()

      if (data.addressId) {
        formData.append("addressId", data.addressId)
      } else {
        const address = {
          apartment: data.apartment,
          city: data.city,
          landmark: data.landmark,
          state: data.state,
          pincode: data.pincode,
          mobile: data.mobile,
          referralCode: data.referralCode,
          couponCode: data.couponCode,
        }
        formData.append("address", JSON.stringify(address))
      }

      formData.append("instructions", data.instructions || "")
      formData.append("pickupDate", data.pickupDate)
      formData.append("pickupSlot", data.timeSlot)

            // Add referral & coupon
      if (data.referralCode) formData.append("referralCode", data.referralCode)
      if (data.couponCode) formData.append("couponCode", data.couponCode)
      if (data.image) {formData.append("image", data.image) }
      if (data.type) { formData.append("type", data.type)}
      if (data.items && data.items.length > 0) {formData.append("items", JSON.stringify(data.items)) }

      const res = await api.post("/orders/createOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create order",
      )
    }
  },
)

export const getUserActiveOrders = createAsyncThunk(
  "orders/getUserActiveOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders/userOrders/active")

      return res.data
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error || "Failed to fetch active orders",
      )
    }
  },
)

export const fetchUserSingleOrder = createAsyncThunk(
  "order/fetchUserSingleOrder",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/orders/${orderId}/single`)
      return res.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch order",
      )
    }
  },
)

/* ---------------- UPDATE ORDER PICKUP ---------------- */

export const updateOrderWithPickup = createAsyncThunk(
  "order/updateOrderWithPickup",
  async (
    { orderId, data }: { orderId: string; data: CreateOrderPayload },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData()

      if (data.addressId) {
        formData.append("addressId", data.addressId)
      } else {
        const address = {
          apartment: data.apartment,
          city: data.city,
          landmark: data.landmark,
          state: data.state,
          pincode: data.pincode,
          mobile: data.mobile,
        }

        formData.append("address", JSON.stringify(address))
      }

      if (data.instructions) formData.append("instructions", data.instructions)
      if (data.pickupDate) formData.append("pickupDate", data.pickupDate)
      if (data.timeSlot) formData.append("pickupSlot", data.timeSlot)

      if (data.image) {
        formData.append("image", data.image)
      }

      const res = await api.put(`/orders/${orderId}/pickup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.msg || "Failed to update order pickup",
      )
    }
  },
)

/* ---------------- CANCEL ORDER ---------------- */

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (
    { orderId, reason }: { orderId: string; reason?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.patch(`/orders/${orderId}/cancel`, { reason })
      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel order",
      )
    }
  },
)
