import React from "react"

//image
import pickupImg from "../../assets/images/serviceImage/2866477f404409e05540736ba9f40ade 1.svg"

//icon
import { IoIosArrowRoundForward } from "react-icons/io"

const LaundryInfo: React.FC = () => {
  return (
    <section className="w-full flex  justify-center py-16 px-16 sm:px-8 lg:px-16">
      <div className="w-full max-w-[1920px] grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        <div className="flex justify-center">
          <img
            src={pickupImg}
            alt="Laundry Pickup"
            className=" w-full max-w-[80%] xl:max-w-[631px] h-auto lg:h-[562px] object-cover  "
          />
        </div>

        {/* TEXT */}
        <div className="font-['Reddit_Sans'] h-full text-[#5D5C5C] space-y-10">
          <p className=" font-normal  text-[18px] sm:text-[20px] xl:text-[24px] lg:h-[465px] lg:w-[470px] xl:w-[574px] ">
            We offer reliable, high-quality laundry care designed to make your
            life easier. From everyday washing to specialized garment care, our
            services are handled by trained professionals using modern equipment
            and fabric-safe processes. We understand that every garment is
            different. That’s why we follow careful sorting, controlled washing,
            and precise finishing methods to ensure cleanliness, freshness, and
            long-lasting fabric quality. Whether it’s daily wear, office
            outfits, or delicate clothing, your clothes receive the attention
            they deserve. Our doorstep pickup and delivery service adds
            convenience to quality.
          </p>

          <button className=" inline-flex items-center gap-2 px-6 py-3 bg-[#448AFF] text-white text-[16px] sm:text-[18px] font-medium rounded-full hover:bg-[#2a66d9] transition">
            Schedule Pick - Up
            <IoIosArrowRoundForward
              size={28}
              className="-rotate-40  transition-transform duration-300 "
            />
          </button>
        </div>
      </div>
    </section>
  )
}

export default LaundryInfo
