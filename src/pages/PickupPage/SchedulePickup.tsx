import React from "react"
import Hero from "../../components/layout/Hero"
import img from "../../assets/images/schedulePickup/Pickup.jpg"
import SchedulePickupMain from "../../components/schedulepickup/SchedulePickupMain"

const SchedulePickup = () => {
  return (
    <div>
      <Hero
        img={img}
        text1="Easy Laundry Pickup"
        text2="Scheduled Right from Your"
        className="max-w-[1083px]"
      />
      <SchedulePickupMain />
    </div>
  )
}

export default SchedulePickup
