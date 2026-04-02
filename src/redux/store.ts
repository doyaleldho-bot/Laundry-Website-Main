import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authSlice"
import cartReducer from "./reducer/cartSlice"
import orderReducer from "./reducer/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
