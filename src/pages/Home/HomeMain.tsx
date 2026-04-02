import React from "react"
import HomePage from "../Home/HomePage"
import About from "./About"
import Services from "./Services"
import ChooseUs from "./ChooseUs"
import HowItWroks from "./HowItWroks"
import CustomerSays from "./CustomerSays"
import Resposibility from "./Responsibility"
import Faq from "./Faq"
import Download from "./Download"
import ClientNumber from "./ClientNumber"
import ContactUs from "./ContactUs"

const HomeMain: React.FC = () => {
  return (
    <>
      {/* Page sections */}
      <HomePage />
      <Services />
      <ChooseUs />
      <HowItWroks />
      <About />
      <CustomerSays />
      <Resposibility />
      <Faq />
      <Download />
      <ClientNumber />
      <ContactUs />
    </>
  )
}

export default HomeMain
