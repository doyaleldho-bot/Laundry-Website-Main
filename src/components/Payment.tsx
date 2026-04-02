import React from "react"
import { FaRegCalendarAlt } from "react-icons/fa"
import { SlLocationPin } from "react-icons/sl"
import { BsTelephone, BsDownload } from "react-icons/bs"
import { RxCrossCircled } from "react-icons/rx"

import { getDeliveryDateFromPickup } from "../utils/DateCalculator"

const Payment = () => {
  const daysToAdd = 2
  const deliveryDate = getDeliveryDateFromPickup(
    new Date().toISOString(),
    daysToAdd
  )
  const isPayment = true
  return (
    <section className="min-h-screen bg-gray-50  p-4">
      <div className="flex flex-col justify-center items-center w-full text-center">
        {isPayment ? (
          <>
            <img
              src="/images/order/success.gif"
              alt="Payment Successful"
              className="w-64 h-64 object-contain"
            />
            <h1 className="text-[40px] font-bold font-[Reddit_Sans] text-[#2375FF]">
              Payment Successful
            </h1>
            <p className="text-[24px] font-[Reddit_Sans] text-[#5D5C5C]">
              Your order has been confirmed
            </p>
          </>
        ) : (
          <>
            <RxCrossCircled className="w-44 h-64 text-[#AD0303]" />
            <h1 className="text-[40px] font-bold font-[Reddit_Sans] text-[#AD0303]">
              Payment Failed
            </h1>
            <p className="text-[24px] font-[Reddit_Sans] text-[#5D5C5C]">
              Payment failed. Try again
            </p>
          </>
        )}
      </div>

      <div className="mt-12 bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[1061px] space-y-8">
          <div className="rounded-2xl bg-white shadow-lg border-2 border-[#E2E2E2] ">
            <div
              className="px-5 py-3 h-[103px] flex items-center rounded-tl-2xl rounded-tr-2xl  text-white font-medium text-[20px] md:text-[24px]"
              style={{
                background: "linear-gradient(90deg, #448AFF 0%, #295399 100%)",
              }}
            >
              Order Details
            </div>

            <div className="grid items-center grid-cols-1 md:grid-cols-3 border-t md:h-[153px] h-auto ">
              {/* Order ID */}
              <div className="flex flex-col items-center  gap-2 py-4 md:py-0 md:border-r border-[#ACACAC] font-[Reddit_Sans] text-[#898A8D]">
                <p className="text-[18px] md:-ml-14 md:text-[20px]">Order ID</p>
                <p className="text-[20px] md:text-[24px] font-semibold text-[#4A4A4A]">
                  #LDR-10245
                </p>
                <div className="w-24 h-px bg-[#ACACAC] md:hidden mt-2" />
              </div>

              {/* Amount Paid */}
              <div className="flex flex-col items-center gap-2   py-4 md:py-0 md:border-r border-[#ACACAC] font-[Reddit_Sans] text-[#898A8D]">
                <p className="text-[18px] md:text-[20px]">Amount Paid</p>
                <p className="text-[20px] md:-ml-16 md:text-[24px] font-semibold text-[#448AFF]">
                  ₹650
                </p>
                <div className="w-24 h-px bg-[#ACACAC] md:hidden mt-2" />
              </div>

              {/* Number of Items */}
              <div className="flex flex-col items-center gap-2 py-4 md:py-0 font-[Reddit_Sans] text-[#898A8D]">
                <p className="text-[18px] md:text-[20px]">Number of items</p>
                <p className="text-[20px] md:-ml-32 md:text-[24px] font-semibold text-[#4A4A4A]">
                  12
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-lg border-2 border-[#E2E2E2] p-6 md:p-10 space-y-6 md:space-y-8">
            <h3 className="font-semibold text-[#555555] font-[Reddit_Sans] text-[20px] md:text-[24px]">
              Pickup Scheduled
            </h3>

            {/* Date & Time */}
            <div className="flex gap-4 items-start">
              <FaRegCalendarAlt className="text-[#2375FF] w-6 h-6 mt-1" />
              <div className="space-y-1">
                <p className="text-[#898A8D] text-[16px] md:text-[20px]">
                  Date & Time
                </p>
                <p className="text-[16px] md:text-[20px] text-[#5D5C5C]">
                  04 Jan 2026, 9:00 – 11:00
                </p>
              </div>
            </div>

            <hr className="border-[#DADADA]" />

            {/* Address */}
            <div className="flex gap-4 items-start">
              <SlLocationPin className="text-[#2375FF] w-6 h-6 mt-1" />
              <div className="space-y-1">
                <p className="text-[#898A8D] text-[16px] md:text-[20px]">
                  Pickup Address
                </p>
                <p className="text-[16px] md:text-[20px] text-[#5D5C5C]">
                  Flat 402, Palm Grove Apt, Kakkanad, Kochi – 682030
                </p>
              </div>
            </div>

            <hr className="border-[#DADADA]" />

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <BsTelephone className="text-[#2375FF] w-6 h-6 mt-1" />
              <div className="space-y-1">
                <p className="text-[#898A8D] text-[16px] md:text-[20px]">
                  Phone
                </p>
                <p className="text-[16px] md:text-[20px] text-[#5D5C5C]">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Date */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center text-[20px] text-[#555555]">
              <FaRegCalendarAlt className="text-[#2375FF] mr-3 w-6 h-6" />

              <p className=" mt-1 flex flex-col ">
                {deliveryDate}
                <span className=" mt-4">
                  Your laundry will be delivered in {daysToAdd} days
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                className="w-full px-6 py-3 md:py-4 rounded-lg text-white font-medium text-[18px] md:text-[24px]"
                style={{
                  background:
                    "linear-gradient(90deg, #448AFF 0%, #295399 100%)",
                }}
              >
                Track order
              </button>

              <button className="flex items-center justify-center w-full gap-2 px-6 py-3 md:py-4 border border-gray-300 text-[#535353] rounded-xl   text-[16px] md:text-[20px] hover:bg-gray-100 transition">
                <BsDownload size={20} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Payment
