import React, { useEffect, useState } from "react"

//image
import loandry1 from "../../assets/images/serviceImage/Component 20.svg"
import loandry2 from "../../assets/images/serviceImage/Component 18.svg"
import loandry3 from "../../assets/images/serviceImage/Component 19.svg"
import loandry4 from "../../assets/images/serviceImage/Component 47.svg"
import loandry5 from "../../assets/images/serviceImage/Component 51.svg"
import loandry6 from "../../assets/images/serviceImage/Component 54.svg"
import loandry7 from "../../assets/images/serviceImage/Component 69.svg"
import loandry8 from "../../assets/images/serviceImage/Component 66.svg"
import loandry9 from "../../assets/images/serviceImage/Component 59.svg"
import loandry10 from "../../assets/images/serviceImage/Component 63.svg"
import loandry11 from "../../assets/images/serviceImage/Component 69 (1).svg"
import loandry12 from "../../assets/images/serviceImage/Component 72.svg"

//icon
import { IoIosArrowRoundForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import api from "../../utils/api"
import { getImage } from "../../utils/getBackendImg"

interface ServiceItem {
  id: number
  img: string
  title: string
  content: string
}
const serviceCards: ServiceItem[] = [
  {
    id: 1,
    img: loandry1,
    title: "Wash & Fold",
    content: "Everyday laundry is washed, dried, and neatly folded.",
  },
  {
    id: 2,
    img: loandry2,
    title: "Wash & Iron",
    content: "Crisp, clean clothes pressed to perfection.",
  },
  {
    id: 3,
    img: loandry3,
    title: "Dry Cleaning",
    content: "Special care for delicate, formal, and premium fabrics.",
  },
  {
    id: 4,
    img: loandry4,
    title: "Starching",
    content: "Perfect stiffness, Sharp looks, expertly starched.",
  },
  {
    id: 5,
    img: loandry5,
    title: "Steam Press",
    content: "Professional steam press for a polished look.",
  },
  {
    id: 6,
    img: loandry6,
    title: "Premium Iron",
    content: "Luxury ironing for a flawless finish.",
  },
  {
    id: 7,
    img: loandry7,
    title: "Premium Dry Cleaning",
    content: "Luxury dry cleaning for your finest garments.",
  },
  {
    id: 8,
    img: loandry8,
    title: "Premium Starching",
    content: "Perfect stiffness, Sharp looks, expertly starched.",
  },
  {
    id: 9,
    img: loandry9,
    title: "Shoe Cleaning",
    content: "Expert cleaning for shoes that deserve better.",
  },
  {
    id: 10,
    img: loandry10,
    title: "Carpet Cleaning",
    content: "Safe, effective, and fabric-friendly cleaning.",
  },
  {
    id: 11,
    img: loandry11,
    title: "Helmet Clean & Fix",
    content: "Safe, effective, and fabric-friendly cleaning.",
  },
  {
    id: 12,
    img: loandry12,
    title: "Suitcase Clean & Fix",
    content: "Safe, effective, and fabric-friendly cleaning.",
  },
]

type Service = {
  id: string
  name: string
  description: string
  image: string | null
}

const OurServices: React.FC = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([])
  const DEFAULT_IMAGE = "https://placehold.co/400x300?text=Laundry+Service"
  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await api.get("/service/all/details", {
          withCredentials: true,
        })
        console.log(res)
        const data = await res.data

        if (data.success) {
          const formattedServices = data.data.map((ser: { id: any; name: any; description: string; image: string }) => ({
            id: ser.id,
            name: ser.name,
            description: ser.description?.split(".")[0] || "",
            image: ser?.image ? getImage(ser.image) : DEFAULT_IMAGE,
          }))

          setServices(formattedServices)
        }
      } catch (err) {
        console.error("Failed to load services", err)
      }
    }

    loadServices()
  }, [])

  return (
    <section className="px-16 sm:px-8 lg:px-16  font-['Reddit_sans]  ">
      <div className="flex flex-col  space-y-4 mb-10">
        <h1 className=" font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-[#448AFF]">
          Our Services
        </h1>
        <p className="text-[16px] sm:text-[18px] lg:text-[24px] lg:w-[624px] text-[#5D5C5C]">
          We take care of your daily and special clothes with simple, reliable
          laundry services you can trust.
        </p>
      </div>
      {/* gird box */}
      <div className="grid grid-cols-2 sm:grid-cols-3  2xl:grid-cols-4 grid-5  gap-12 ">
        {services.map((service) => (
          <div
            className=" flex flex-col w-[262.78px] xl:w-[310px] mb-4"
            key={service.id}
          >
            <div className="w-full h-[260px] xl:h-[320px] rounded-2xl mb-5 overflow-hidden group bg-gray-100">
              <img
                src={service.image || DEFAULT_IMAGE}
                alt={service.name}
                onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
                className="w-full h-full  object-cover transition-transform duration-500 ease-in-out  group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-[18px] sm:text-[20px] lg:text-[24px] text-[#2C2C2C]">
                {service.name}
              </h1>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#5D5C5C]">
                {service.description}
              </p>

              <div
                className=" flex items-center  gap-2 w-[136.98px] text-[14px] sm:text-[16px] lg:text-[18px] hover:text-[#2a4676] font-medium text-[#448AFF] group cursor-pointer"
                onClick={() =>
                  navigate(`/service/details?services=${service.id}`)
                }
              >
                View details
                <IoIosArrowRoundForward
                  size={28}
                  className="-rotate-40 group-hover:rotate-0 transition-transform duration-300 "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurServices
  