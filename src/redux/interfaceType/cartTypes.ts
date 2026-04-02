export interface CartItem {
  id: string
  title: string
  serviceType: string
  unitType: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface CartState {
  cartId: string | null
  items: CartItem[]
  totalAmount: number
  itemCount: number
  loading: boolean
  error: string | null
}
 