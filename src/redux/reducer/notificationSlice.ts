import { createSlice } from "@reduxjs/toolkit"
import type { NotificationState } from "../interfaceType/notificationTypes"

import {
  fetchNotifications,
  markNotificationRead,
} from "../action/notificationThunks"

// ---------- initial state ----------
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
}

// ---------- slice ----------
const notificationSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    //  add realtime notification from socket
    addNotificationRealtime: (state, action: any) => {
      const exists = state.notifications.find((n) => n.id === action.payload.id)

      // prevent duplicates
      if (exists) return

      state.notifications.unshift(action.payload)

      if (!action.payload.isRead) {
        state.unreadCount += 1
      }
    },

    // optional: clear notifications
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------- FETCH ----------
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchNotifications.fulfilled, (state, action: any) => {
        state.loading = false
        state.notifications = action.payload

        // calculate unread count
        state.unreadCount = action.payload.filter((n) => !n.isRead).length
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch notifications"
      })

      // ---------- MARK READ ----------
      .addCase(markNotificationRead.fulfilled, (state, action: any) => {
        const notification = state.notifications.find(
          (n) => n.id === action.payload,
        )

        if (notification && !notification.isRead) {
          notification.isRead = true
          state.unreadCount -= 1
        }
      })
  },
})

export const { addNotificationRealtime, clearNotifications } =
  notificationSlice.actions

export default notificationSlice.reducer
