import React from "react"
// import { downloadInvoice } from "../../utils/downloadInvoice"

import { BsDownload } from "react-icons/bs"
import { FiPhone } from "react-icons/fi"
import { BsClock } from "react-icons/bs"
import { FaRegCalendarAlt } from "react-icons/fa"

import truck from "../../assets/icons/orderIcon/hugeicons_delivery-truck-02 (1).svg"
import { getRemainingDays } from "../../utils/DateCalculator"

interface Pickup {
  pickupDate: string
  pickupSlot: string
  expectedDeliveryDate: string
  address: any
  instructions: string
}

interface Order {
  id: string
  orderNumber: number
  status: string
  itemsCount: number
  subTotal: string
  pickupCharge: string
  gstAmount: string
  totalAmount: string
  createdAt: string
  Pickup?: Pickup
}

interface OrderDetailsProps {
  orders: Order | null
  orderID: string | null
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orders, orderID }) => {
  //   const currentTime = new Date().toLocaleTimeString("en-IN", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   })
  if (!orders) return null
  const downloadInvoice = () => {
    window.open("http://localhost:5001/api/invoice/LDR-10245", "_blank")
  }

  const formatPickupDateTime = (date?: string, slot?: string) => {
    if (!date) return ""

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

    return slot ? `${formattedDate}, ${slot}` : formattedDate
  }

  const deliveryInfo = getRemainingDays(orders?.Pickup?.expectedDeliveryDate)
  return (
    <section className="space-y-6 w-full flex-1 mt-6 mb-12 font-[Reddit_Sans]">
      {/* Current Status */}
      <div
        className="p-6 rounded-2xl text-white space-y-3 text-[16px]"
        style={{
          background:
            "linear-gradient(92.76deg, #2375FF 0.65%, #154699 95.21%)",
        }}
      >
        <p className=" opacity-90 text-[16px]">Current Status</p>

        <h1 className="text-[20px] font-semibold">
          {`Your clothes are being ${orders?.status}`}
        </h1>

        <p className="text-[16px] leading-relaxed opacity-90 ">
          Our team is carefully ironing your clothes to perfection. This is the
          final touch before we prepare them for delivery.
        </p>

        <p className=" opacity-80 flex items-center gap-4">
          <BsClock className="w-6 h-6" />
          Last updated at 04:30 PM
        </p>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-2xl p-12 h-[590px] space-y-4 border border-[#DADADA] ">
        <div className="space-y-4  text-[20px] gap-4">
          <p className="text-[#565656] font-medium">Order ID</p>
          <p className="text-[#898A8D] ">{`#${orderID}`}</p>
        </div>
        <hr className="border-[#D9D9D9]" />

        <div className=" space-y-4 text-[20px] ">
          <p className="text-[#565656] font-medium">Service Type</p>
          <p className="text-[#898A8D]">Wash & Fold</p>
        </div>

        <hr className="border-[#D9D9D9]" />

        <div className="flex justify-between text-[20px]">
          <span className="text-[#898A8D]">{`Item (${orders?.itemsCount})`}</span>
          <span className="text-[#555555]">{`₹ ${orders?.totalAmount}`}</span>
        </div>

        <hr className="border-[#D9D9D9]" />

        <div className="space-y-4 text-[17px] md:text-[20px]">
          <p className="text-[#898A8D] text-[20px]">Pickup Date & Time</p>
          <p className="text-[#555555]">
            {formatPickupDateTime(
              orders?.Pickup?.pickupDate,
              orders?.Pickup?.pickupSlot,
            )}
          </p>
        </div>

        <div className="space-y-4 text-[16px] md:text-[20px]">
          <p className="text-[#8E8E8E] text-[20px]">Pickup Address</p>
          <p className="text-[#535353] max-w-[520px]">
            {orders?.Pickup?.address?.apartment},{" "}
            {orders?.Pickup?.address?.landmark}, {orders?.Pickup?.address?.city}
            , {orders?.Pickup?.address?.state} -{" "}
            {orders?.Pickup?.address?.pincode}
            <br />
            +91 {orders?.Pickup?.address?.mobile}
          </p>
        </div>
      </div>
      <p className="flex items-center gap-4 text-[#555555] -mb-4 mt-7 text-[20px]">
        <img src={truck} className="w-8 h-8" />
        Expected Delivery Date
      </p>
      {/* Expected Delivery */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center text-[20px] text-[#555555]">
        <FaRegCalendarAlt className="text-[#2375FF] mr-3 w-6 h-6" />

        <p className=" mt-1 flex flex-col ">
          {orders?.Pickup?.expectedDeliveryDate &&
            new Date(orders.Pickup.expectedDeliveryDate).toLocaleDateString(
              "en-GB",
              {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              },
            )}
          <span className="mt-4">
            <p>
              {deliveryInfo.message === "Time exceeded" ? (
                <span className="text-red-600 font-semibold">
                  {deliveryInfo.message}
                </span>
              ) : deliveryInfo.message === "Due today" ? (
                <span className="text-orange-600 font-medium">
                  {deliveryInfo.message}
                </span>
              ) : (
                <>
                  Your laundry will be delivered in{" "}
                  <span className="font-semibold">{deliveryInfo.days}</span> day
                  {deliveryInfo.days > 1 ? "s" : ""}
                </>
              )}
            </p>
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex  items-center justify-center w-full gap-2 px-6 py-4 border border-[#429C78] text-[#429C78] rounded-xl text-[20px] font-medium hover:bg-[#19BD7B]/10 transition">
          <FiPhone size={20} />
          Need Help? Contact Us
        </button>

        <button
          className="flex items-center justify-center w-full gap-2 px-6 py-4 border border-gray-300 text-[#535353] rounded-xl text-[20px] font-medium hover:bg-gray-100 transition"
          onClick={downloadInvoice}
        >
          <BsDownload size={20} />
          Download Invoice
        </button>
      </div>
    </section>
  )
}

export default OrderDetails