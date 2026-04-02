import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import api from "../../utils/api"
import { getImage } from "../../utils/getBackendImg"

type Service = {
  id: string
  name: string
  description: string
  image: string | null
}

const Services = () => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [cardsPerSlide, setCardsPerSlide] = useState(3)

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
          const formattedServices = data.data.map((ser) => ({
            id: ser.id,
            name: ser.name,
            description: ser.description?.split(".")[0] || "",
            image: ser.image ? getImage(ser.image) : DEFAULT_IMAGE,
          }))

          setServices(formattedServices)
        }
      } catch (err) {
        console.error("Failed to load services", err)
      }
    }

    loadServices()
  }, [])
  // 🔹 Detect screen size
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth

      if (width < 640) {
        setCardsPerSlide(1) // mobile
      } else if (width < 1024) {
        setCardsPerSlide(2) // tablet
      } else {
        setCardsPerSlide(3) // laptop & desktop
      }
    }

    updateCardsPerSlide()
    window.addEventListener("resize", updateCardsPerSlide)

    return () => window.removeEventListener("resize", updateCardsPerSlide)
  }, [])

  const totalSlides = Math.ceil(services.length / cardsPerSlide)
  const cardWidth = 100 / cardsPerSlide

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides)
    }, 3000)

    return () => clearInterval(interval)
  }, [totalSlides])

  return (
    <section className="bg-white py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-500">
              Our Services
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl">
              We take care of your daily and special clothes with simple,
              reliable laundry services you can trust.
            </p>
          </div>

          <div className="mt-6 md:mt-0 text-center md:text-right group">
            <button
              onClick={() => navigate("/service")}
              className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            bg-white
            text-black
            border
            border-gray-300
            rounded-full
            font-medium
            hover:bg-gray-100
            transition
          "
            >
              View more
              <ArrowUpRight
                size={18}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex flex-shrink-0 w-full">
                {services
                  .slice(
                    slideIndex * cardsPerSlide,
                    slideIndex * cardsPerSlide + cardsPerSlide,
                  )
                  .map((service) => (
                    <div
                      key={service.id}
                      className="px-3 sm:px-4"
                      style={{ width: `${cardWidth}%` }}
                    >
                      <div className="rounded-2xl overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-72 object-cover rounded-2xl"
                        />
                      </div>

                      <h3 className="mt-6 text-xl font-semibold text-gray-900">
                        {service.name}
                      </h3>

                      <p className="mt-2 text-gray-500">
                        {service.description}
                      </p>

                      <button
                        className="mt-4 flex items-center  gap-2 w-[136.98px] text-[14px] sm:text-[16px] lg:text-[18px] hover:text-[#2a4676] font-medium text-[#448AFF] group cursor-pointer"
                        onClick={() =>
                          navigate(`/service/details?services=${service.id}`)
                        }
                      >
                        View details
                        <ArrowUpRight
                          size={18}
                          className="group-hover:rotate-45 transition-transform duration-300"
                        />
                      </button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition ${
                i === index ? "w-6 bg-blue-500" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
