import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

// deliver pending notifications (login time)
export const deliverNotifications = createAsyncThunk(
  "notification/deliver",
  async (_, { rejectWithValue }) => {
    try {
      await api.patch("/notifications/deliver")
      return true
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)

// mark read
export const markNotificationRead = createAsyncThunk(
  "notification/read",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.patch(`/notifications/read/${id}`)
      return id
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)

// ✅ GET ALL USER NOTIFICATIONS
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notifications/")
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message)
    }
  },
)
