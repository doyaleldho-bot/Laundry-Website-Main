import React from "react"
import ServiceCards from "../../components/ServiceComponent/ServiceCards"
import PricingTable from "../../components/ServiceComponent/PricingTable"
import { useAutoRedirectToLogin } from "../../utils/useAutoRedirectToLogin"


const ServiceRatePage = () => {
       useAutoRedirectToLogin() 
  return (
    <div className="px-10 lg:pt-10 space-y-8  bg-[#F7F9FB] ">
      {/* TITLE */}
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-[40px] text-[#474747] font-semibold">
          Our Service Rates
        </h1>
        <p className="text-[20px] text-[#5D5C5C]">
          Transparent pricing for quality laundry care
        </p>
      </div>

      {/* WASH BY WEIGHT */}
      <div>
        <h2 className="text-[32px] font-semibold text-[#474747] mt-10 ">
          Wash by Weight
        </h2>
        <p className="text-[#5D5C5C] text-[20px] mb-4 ">
          Affordable bulk laundry pricing for everyday needs
        </p>

        <ServiceCards />
      </div>

      {/* TABLE SECTION */}
      <div>
        <h2 className="text-[32px] font-semibold  text-[#474747]  mt-10 h">
          Item-Based Pricing
        </h2>
        <p className="text-[#5D5C5C] text-[20px] mb-4">
          Note : Price may vary depending on fabric type and condition
        </p>

        <PricingTable />
      </div>
    </div>
  )
}

export default ServiceRatePage