import "./Service.css"

import OurServices from "../../components/ServiceComponent/OurServices"
import LaundryInfo from "../../components/ServiceComponent/LaundryInfo"
import img from "../../assets/images/serviceImage/Frame 513872 .svg"
import Hero from "../../components/layout/Hero"

const ServicePage = () => {
  return (
    <div>
      <Hero
        img={img}
        text1="Professional Laundry Care"
        text2="at Your"
        className="max-w-[820px]"
      />
      <OurServices />
      <LaundryInfo />
    </div>
  )
}

export default ServicePage
