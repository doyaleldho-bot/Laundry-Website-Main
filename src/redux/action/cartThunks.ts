import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (items: any[], { rejectWithValue }) => {
    try {
      const res = await api.post("/cart/add", { items })
      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add item to cart",
      )
    }
  },
)

export const getCartDetails = createAsyncThunk(
  "cart/getDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart/get")
      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cart",
      )
    }
  },
)

// Decrement a cart item
export const decrementCartItem = createAsyncThunk(
  "cart/decrementItem",
  async (
    payload: { title: string; services: string[] },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.post("/cart/decrement", payload)
      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to decrement item",
      )
    }
  },
)

//delete a cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/cart/delete/${cartItemId}`)
      return res.data.cart
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to decrement item",
      )
    }
  },
)
