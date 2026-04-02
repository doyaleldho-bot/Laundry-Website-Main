import { useEffect, useState } from "react"

//icons
import { Check, Truck } from "lucide-react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { TbIroningSteam } from "react-icons/tb"
import { TbTruckDelivery } from "react-icons/tb"
import { LuPackageCheck } from "react-icons/lu"
import { BsTruck } from "react-icons/bs"
import { AiOutlineSchedule } from "react-icons/ai"
import { CgSmartHomeWashMachine } from "react-icons/cg"
import { BiSolidDryer } from "react-icons/bi"

const STEP_HEIGHT = 105

export type OrderStatus =
  | "SCHEDULED"
  | "PICKUP"
  | "WASHING"
  | "DRYING"
  | "IRONING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"

interface Step {
  id: number
  title: string
  desc: string
  time?: string
  icon: React.ElementType
}

const steps: Step[] = [
  {
    id: 1,
    title: "Order Scheduled",
    desc: "Your laundry pickup has been scheduled",
    icon: AiOutlineSchedule,
  },
  {
    id: 2,
    title: "Pickup",
    desc: "We've successfully picked up your laundry",
    icon: BsTruck,
  },
  {
    id: 3,
    title: "Washing",
    desc: "Your clothes are being washed",
    icon: CgSmartHomeWashMachine,
  },
  {
    id: 4,
    title: "Drying",
    desc: "Your clothes are being dried",
    icon: BiSolidDryer,
  },
  {
    id: 5,
    title: "Ironing",
    desc: "Your clothes are being ironed",
    icon: TbIroningSteam,
  },
  {
    id: 6,
    title: "Out for Delivery",
    desc: "Your order is on the way",
    icon: TbTruckDelivery,
  },
  {
    id: 7,
    title: "Delivered",
    desc: "Your order has been delivered",
    icon: LuPackageCheck,
  },
]

interface Props {
  status: OrderStatus
}

const STATUS_TO_STEP: Record<OrderStatus, number> = {
  SCHEDULED: 2,
  PICKUP: 3,
  WASHING: 4,
  DRYING: 5,
  IRONING: 6,
  OUT_FOR_DELIVERY: 7,
  DELIVERED: 8,
}

const OrderProgress = ({ status }: Props) => {
  const currentStep = STATUS_TO_STEP[status]
  const [animatedStep, setAnimatedStep] = useState(1)

  useEffect(() => {
    if (animatedStep >= currentStep) return

    const interval = setInterval(() => {
      setAnimatedStep((prev) => {
        if (prev >= currentStep) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 500)

    return () => clearInterval(interval)
  }, [currentStep, animatedStep])
  const activeHeight = () => {
    if (animatedStep === 1) {
      return 0
    } else if (animatedStep === 2) {
      return 80
    } else if (animatedStep === 3) {
      return 200
    } else if (animatedStep === 4) {
      return 320
    } else if (animatedStep === 5) {
      return 440
    } else if (animatedStep === 6) {
      return 565
    } else if (animatedStep === 7) {
      return 690
    } else {
      return 735
    }
  }
  return (
    <div className="bg-white rounded-xl p-4 w-full lg:max-w-[380px] xl:max-w-[481px] lg:mt-6  lg:h-[1011px] lg:shadow-sm mb-2 lg:mb-12 font-[Reddit_Sans]">
      <h3 className="font-medium text-[clamp(16px,2vw,24px)] text-[#535353] mb-10">
        Order Progress
      </h3>

      <div className="relative">
        {/* Background Line */}
        <div
          className="absolute left-[18px] top-2 border-l-2 border-dotted   border-gray-200"
          style={{
            height: steps.length * STEP_HEIGHT,
          }}
        />

        {/* Animated Line */}
        <div
          className="absolute left-[18px] top-2 border-l-2 border-dotted border-[#19BD7B] transition-all duration-500 ease-out"
          style={{
            height: activeHeight(),
          }}
        />

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index + 1 < animatedStep
            const isActive = index + 1 === animatedStep
            const Icon = step.icon
            return (
              <div key={step.id} className="flex items-start gap-3 relative">
                {/* Icon */}

                <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                  {isActive && !isCompleted && (
                    <div className="absolute inset-0 rounded-full border-3 border-blue-200 animate-ping" />
                  )}

                  {/* Main circle */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#19BD7B] border-[#19BD7B] text-white scale-105"
                        : isActive
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <IoMdCheckmarkCircleOutline className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 -mt-1 p-2 rounded-lg transition-colors duration-300 ${
                    isActive ? "bg-[#E2EDFF]" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <p
                      className={`font-medium text-[20px] ${
                        isCompleted
                          ? "text-[#19BD7B]"
                          : isActive
                            ? "text-[#2375FF]"
                            : "text-[#ADADAD]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <span className="text-[16px] text-gray-400">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[16px] w-full max-w-[171px] text-[#838383]">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrderProgress
