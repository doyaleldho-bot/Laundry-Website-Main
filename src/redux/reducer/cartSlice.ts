// import { createSlice } from "@reduxjs/toolkit"
// import type { CartState } from "../interfaceType/cartTypes"
// import { addItemToCart, decrementCartItem, getCartDetails } from "../action/cartThunks"

// const initialState: CartState = {
//   cartId: null,
//   items: [],
//   totalAmount: 0,
//   itemCount: 0,
//   loading: false,
//   error: null,
// }

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     clearCart: (state) => {
//       state.cartId = null
//       state.items = []
//       state.totalAmount = 0
//       state.itemCount = 0
//       state.error = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       //  ADD ITEM TO CART
//       .addCase(addItemToCart.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(addItemToCart.fulfilled, (state, action: any) => {
//         state.loading = false
//         state.cartId = action.payload.cartId
//         state.totalAmount = action.payload.totalAmount
//         state.itemCount = action.payload.itemCount
//       })
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//       })

//       //  GET CART DETAILS
//       .addCase(getCartDetails.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(getCartDetails.fulfilled, (state, action: any) => {
//         state.loading = false

//         if (!action.payload) {
//           state.cartId = null
//           state.items = []
//           state.totalAmount = 0
//           state.itemCount = 0
//           return
//         }

//         state.cartId = action.payload.cartId
//         state.items = action.payload.items
//         state.totalAmount = action.payload.totalAmount
//         state.itemCount = action.payload.items.length  //undefined length?
//       })
//       .addCase(getCartDetails.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//       })  
//       .addCase(decrementCartItem.pending, (state) => {
//   state.loading = true
//   state.error = null
// })
// .addCase(decrementCartItem.fulfilled, (state, action) => {
//   state.loading = false
//   state.cartId = action.payload.cartId
//   state.items = action.payload.items
//   state.totalAmount = action.payload.totalAmount
//   state.itemCount = action.payload.itemCount
// })
// .addCase(decrementCartItem.rejected, (state, action) => {
//   state.loading = false
//   state.error = action.payload as string
// })

//   },
// })

// export const { clearCart } = cartSlice.actions
// export default cartSlice.reducer



import { createSlice } from "@reduxjs/toolkit"
import type { CartState } from "../interfaceType/cartTypes"
import {
  addItemToCart,
  decrementCartItem,
  deleteCartItem,
  getCartDetails,
} from "../action/cartThunks"

const initialState: CartState = {
  cartId: null,
  items: [],
  totalAmount: 0,
  itemCount: 0,
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartId = null
      state.items = []
      state.totalAmount = 0
      state.itemCount = 0
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      //  ADD ITEM TO CART
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addItemToCart.fulfilled, (state, action: any) => {
        state.loading = false
        state.cartId = action.payload.cartId
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload.itemCount
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      //  GET CART DETAILS
      .addCase(getCartDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCartDetails.fulfilled, (state, action: any) => {
        state.loading = false

        if (!action.payload) {
          state.cartId = null
          state.items = []
          state.totalAmount = 0
          state.itemCount = 0
          return
        }

        state.cartId = action.payload.cartId
        state.items = Array.isArray(action.payload?.items) ? action.payload.items : []
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload?.items?.length ?? 0
      })
      .addCase(getCartDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(decrementCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.cartId = action.payload.cartId
        state.items = Array.isArray(action.payload?.items) ? action.payload.items : []
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload.itemCount
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // DELETE CART ITEM
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false

        const deletedItemId = action.payload?.itemId

        // Remove item from list
        if (deletedItemId) {
          state.items = (state.items || []).filter((item) => item.id !== deletedItemId)
        }

        // If cart deleted (empty)
        if (!action.payload) {
          state.cartId = null
          state.items = []
          state.itemCount = 0
          state.totalAmount = 0
          return
        }

        // Update cart summary
        state.itemCount = action.payload?.itemsCount
        state.totalAmount = action.payload?.totalAmount
        state.items = Array.isArray(action.payload?.items) ? action.payload.items : state.items
      })

      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Delete failed"
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer