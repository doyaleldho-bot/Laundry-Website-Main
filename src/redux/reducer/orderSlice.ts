import { createSlice } from "@reduxjs/toolkit"
import type { OrderState } from "../interfaceType/orderType"
import {
  cancelOrder,
  createOrderWithPickup,
  fetchUserSingleOrder,
  getUserActiveOrders,
  updateOrderWithPickup,
} from "../action/orderThunks"

const initialState: OrderState = {
  order: null,
  activeOrders: null,
  orderID: null,
  loading: false,
  error: null,
  success: false,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrderWithPickup.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })

      .addCase(createOrderWithPickup.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
        state.success = true
      })

      .addCase(createOrderWithPickup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
      .addCase(getUserActiveOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserActiveOrders.fulfilled, (state, action) => {
        state.loading = false
        state.activeOrders = action.payload.orders
      })
      .addCase(getUserActiveOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchUserSingleOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserSingleOrder.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload.data
        state.orderID = action.payload.orderID
      })
      .addCase(fetchUserSingleOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      }) /* ---------------- UPDATE ORDER PICKUP ---------------- */
      .addCase(updateOrderWithPickup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderWithPickup.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(updateOrderWithPickup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ---------------- CANCEL ORDER ---------------- */
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true

        const cancelledOrder = action.payload.order

        if (state.order && state.order.id === cancelledOrder.id) {
          state.order.status = "CANCELLED"
          state.order.cancelReason = cancelledOrder.cancelReason
          state.order.cancelledAt = cancelledOrder.cancelledAt
        }

        if (state.activeOrders) {
          state.activeOrders = state.activeOrders?.filter(
            (order) => order.id !== cancelledOrder.id,
          )
        }
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetOrderState } = orderSlice.actions
export default orderSlice.reducer
