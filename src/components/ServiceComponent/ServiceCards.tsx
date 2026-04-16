import React, { useCallback, useEffect, useState } from "react"

import laundary from "../../assets/images/solar_washing-machine-minimalistic-bold.png"
import api from "../../utils/api"
import socket from "../../services/soket"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const services1 = [
  { title: "Wash & Fold", price: 49, desc: "Best for daily wear" },
  { title: "Wash & Iron", price: 69, desc: "Neat and ready to wear" },
  { title: "Steam Press", price: 40, desc: "Wrinkle-free finish" },
  { title: "Dry Clean", price: 120, desc: "Premium fabric care" },
  { title: "Delicates", price: 80, desc: "Gentle wash" },
  { title: "Blanket Wash", price: 150, desc: "Heavy items" },
  { title: "Curtain Wash", price: 200, desc: "Deep cleaning" },
  { title: "Shoe Cleaning", price: 99, desc: "Fresh look" },
  { title: "Carpet Wash", price: 250, desc: "Deep wash" },
  { title: "Jacket Clean", price: 180, desc: "Winter wear" },
]

type Service = {
  pricePerKg: number
  id: string
  name: string
  description: string
}

const ServiceCards = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.auth)
  const navigate = useNavigate()

  const [visibleCount, setVisibleCount] = React.useState(4)
  const [services, setServices] = useState<Service[]>([])
  /* ---------------- LOAD SERVICES ---------------- */
  const loadServices = useCallback(async () => {
    try {
      const res = await api.get("/service/all", {
        withCredentials: true,
      })

      const data = res.data

      if (data.success) {
        setServices(data.data)
      }
    } catch (err) {
      console.error("Failed to load services", err)
    }
  }, [])

  useEffect(() => {
    loadServices()
  }, [loadServices])

  const handleViewDetails = (serviceId: string) => {
    if (!user) {
      toast.error("Please login to continue")
      navigate("/login")
      return
    }

    navigate(`/service/details?services=${serviceId}`)
  }


  const INITIAL_COUNT = 4
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 font-[Reddit-Sans]  ">
        {services.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition border border-[#E5E5E5] flex flex-col  h-full"
          >
            {/* ICON */}
            <div className="text-blue-500 bg-blue-100 text-2xl mb-2 w-[48px] h-[48px] flex items-center justify-center">
              <img src={laundary} className="w-[26px] h-[26px]" />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <h3 className="text-[20px] font-medium text-[#464646]">
                {item.name}
              </h3>

              <p className="text-[32px] font-semibold text-[#3A83FF] mt-2">
                ₹ {item.pricePerKg}
                <span className="text-[18px] text-[#464646] font-normal">
                  {" "}
                  / kg
                </span>
              </p>

              <p className="text-[18px] text-[#464646] mt-2">
                {item.description}
              </p>
            </div>

            {/* BUTTON */}
            <button
              className="mt-4 bg-[#448AFF] text-white px-4 py-2  rounded-lg w-full hover:bg-blue-600 transition"
              onClick={() => handleViewDetails(item.id)}
            >
              Service Now
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setVisibleCount((prev) => {
            if (prev >= services.length) {
              window.scrollTo({ top: 0, behavior: "smooth" })
              return INITIAL_COUNT
            }

            return Math.min(prev + 4, services.length)
          })
        }}
        className="text-[#3A83FF] rounded-lg text-center w-full transition hover:underline mt-10"
      >
        {visibleCount >= services.length ? "Show Less" : "View More..."}
      </button>
    </div>
  )
}

export default ServiceCards