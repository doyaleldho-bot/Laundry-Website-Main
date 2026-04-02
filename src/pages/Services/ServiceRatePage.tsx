import React, { useEffect, useState } from "react"
import PricingTable from "../../components/ServiceComponent/PricingTable"

const ServiceRatePage = () => {
  return (
    <div className="px-10 lg:pt-10 py- space-y-4">
      <h1 className="text-[40px] text-[#474747] font-[Reddit_Sans]">
        Our Service Rates
      </h1>
      <p className="text-[24px] text-[#5D5C5C] font-[Reddit_Sans]">
        Transparent pricing for quality laundry care
      </p>

      {/*table*/}
      <div className="mb-0">
        <PricingTable />
      </div>
    </div>
  )
}

export default ServiceRatePage
