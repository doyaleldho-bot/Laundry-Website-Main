import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getUserActiveOrders } from "../../redux/action/orderThunks"

/* -------------------- STATUS BADGE COLORS -------------------- */
const statusColor = (status: string) => {
  switch (status) {
    case "SCHEDULED":
      return "bg-blue-100 text-blue-700"
    case "PICKUP":
      return "bg-yellow-100 text-yellow-700"
    case "WASHING":
      return "bg-purple-100 text-purple-700"
    case "DRYING":
      return "bg-indigo-100 text-indigo-700"
    case "IRONING":
      return "bg-pink-100 text-pink-700"
    case "OUT_FOR_DELIVERY":
      return "bg-green-100 text-green-700"
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const ActiveOrder = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { activeOrders, loading, error } = useAppSelector(
    (state) => state.order,
  )

  /* -------------------- FETCH ACTIVE ORDERS -------------------- */
  useEffect(() => {
    dispatch(getUserActiveOrders())
  }, [dispatch])

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-44 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  /* -------------------- ERROR STATE -------------------- */
  if (error) {
    return <p className="text-red-600 text-center mt-8 font-medium">{error}</p>
  }

  /* -------------------- EMPTY STATE -------------------- */
  if (!activeOrders || activeOrders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No active orders found</p>
    )
  }

  /* -------------------- ORDER GRID -------------------- */
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Active Orders
      </h2>

      <div className=" grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
        {activeOrders?.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/order/track/${order.id}`)}
            className="
              cursor-pointer
              bg-white border border-gray-200 rounded-2xl
              p-6 transition-all duration-200
              hover:shadow-lg hover:-translate-y-1
            "
          >
            {/* ---------------- HEADER ---------------- */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-800">{order.orderID}</p>
              </div>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(
                  order.status,
                )}`}
              >
                {order.status.replaceAll("_", " ")}
              </span>
            </div>

            {/* ---------------- DETAILS ---------------- */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items</span>
                <span className="font-medium">{order.itemsCount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-medium">₹ {order.totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Placed On</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* ---------------- FOOTER ---------------- */}
            <div className="mt-5 pt-4 border-t flex justify-end">
              <span className="text-sm text-blue-600 font-medium">
                Track Order →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveOrder
