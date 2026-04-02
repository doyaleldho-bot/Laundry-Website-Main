import React, { useEffect } from "react"
import OrderProgress from "./OrderProgress"
import OrderDetails from "./OrderDetails"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useLocation, useParams } from "react-router-dom"
import { fetchUserSingleOrder } from "../../redux/action/orderThunks"

const TrackOrderMain = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { order, orderID, loading } = useAppSelector((s) => s.order)

  useEffect(() => {
    if (id) {
      dispatch(fetchUserSingleOrder(id))
    }
  }, [id, dispatch])
  if (loading) return <p>Loading...</p>
  return (
    <div className="px-4 lg:px-20 mt-10">
      <h1 className="font-[Reddit_Sans] font-bold text-[clamp(28px,5vw,48px)] text-[#448AFF]">
        Track your order
      </h1>
      <div className="flex flex-col lg:flex-row  lg:gap-12">
        <OrderProgress status={order?.status || "SCHEDULED"} />
        <OrderDetails orders={order} orderID={orderID} />
      </div>
    </div>
  )
}

export default TrackOrderMain
