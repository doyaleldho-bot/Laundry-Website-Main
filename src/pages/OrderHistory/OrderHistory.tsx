import React, { useEffect, useState } from "react"
import api from "../../utils/api"
import ordersIcon from "../../assets/icons/orders_icon.svg"
import itemsIcon from "../../assets/icons/items_icon.svg"

interface Order {
  id: string
  orderID: string
  status: string
  totalAmount: string
  itemsCount: number
  createdAt: string
  pickupDate: string
  expectedDeliveryDate: string
  serviceType: string
}

interface OrderStats {
  total: number
  delivered: number
  active: number
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    delivered: 0,
    active: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchOrderHistory()
  }, [])

  const fetchOrderHistory = async () => {
    try {
      const res = await api.get("/orders/userOrders")
      setOrders(res.data.data.orders)
      setStats(res.data.data.stats)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  const getOrderStatusUI = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return {
          label: "Delivered",
          className: "bg-[#0EBD76] text-white",
        }

      case "CANCELLED":
        return {
          label: "Cancelled",
          className: "bg-[#FF4D4F] text-white",
        }

      default:
        return {
          label: "In Progress",
          className: "bg-[#448AFF] text-white",
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-6 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold text-[#2563EB]">
            Order History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View your past and recent laundry orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="h-[72px] rounded-lg  bg-[linear-gradient(83.14deg,#2375FF_0%,#295399_79.5%)] flex flex-col items-center justify-center text-white">
            <span className="text-sm">Total orders</span>
            <span className="text-lg font-semibold">{stats.total}</span>
          </div>

          <div className="h-[72px] rounded-lg bg-[linear-gradient(83.14deg,#2375FF_0%,#295399_79.5%)] flex flex-col items-center justify-center text-white">
            <span className="text-sm">Delivered</span>
            <span className="text-lg font-semibold">{stats.delivered}</span>
          </div>

          <div className="h-[72px] rounded-lg bg-[linear-gradient(83.14deg,#2375FF_0%,#295399_79.5%)] flex flex-col items-center justify-center text-white">
            <span className="text-sm">Active orders</span>
            <span className="text-lg font-semibold">{stats.active}</span>
          </div>
        </div>

        {/* Orders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full max-w-[624px] bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      src={ordersIcon}
                      alt="Order ID"
                      className="w-14 h-14"
                    />
                    <div className="">
                      <p className="font-medium text-gray-700 text-xs sm:text-sm lg:text-base">
                        {order?.orderID}
                      </p>

                      <p className="text-gray-400 mt-1 sm:mt-1.5 lg:mt-2 text-[10px] sm:text-xs lg:text-sm">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-xs rounded-full font-medium ${getOrderStatusUI(order.status).className}`}
                  style={{
                    width: "140px",
                    height: "37px",
                    borderRadius: "25px",
                    padding: "8px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                  }}
                  title={
                    order.status === "CANCELLED"
                      ? "This order will be cleared after 24 hours"
                      : undefined
                  }
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#ffffff",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  {getOrderStatusUI(order.status).label}
                </span>
              </div>

              <hr className="border-gray-100 mb-3" />

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Service</span>
                  <span className="font-medium text-gray-800">
                    {order.serviceType}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="flex items-center gap-2">
                    <img src={itemsIcon} alt="Items" className="w-4 h-4" />
                    <span>Items</span>
                  </span>
                  <span className="font-medium">{order.itemsCount}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-base font-semibold text-[#2563EB]">
                  ₹{Number(order.totalAmount).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
