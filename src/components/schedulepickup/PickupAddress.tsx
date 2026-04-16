import React, { useEffect, useRef, useState } from "react"

//icons
import { FaRegCalendarAlt } from "react-icons/fa"
import { PiUploadSimpleThin } from "react-icons/pi"
import { BsBoxSeam } from "react-icons/bs"
import { SlLocationPin } from "react-icons/sl"
import { BsHouseAdd } from "react-icons/bs"
import { IoIosDoneAll } from "react-icons/io"
import { io } from "socket.io-client";
import type { PickupFormData } from "./SchedulePickupMain"

interface PickupAddressProps {
  formData: PickupFormData
  setFormData: React.Dispatch<React.SetStateAction<PickupFormData>>
  onOpen: () => void
}

type Slot = {
  id: string;
  fromTime: string;
  toTime: string;
  maxOrders: number;
  currentOrders: number;
  status: "ACTIVE" | "FEW" | "FULL" | "INACTIVE";
};

const PickupAddress: React.FC<PickupAddressProps> = ({
  formData,
  onOpen,
  setFormData,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null)
  const imgInputRef = useRef<HTMLInputElement>(null)
  const today = new Date().toISOString().split("T")[0]
  const [slots, setSlots] = useState<Slot[]>([]);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const [checking, setChecking] = useState(false)
  const [isValidPincode, setIsValidPincode] = useState<boolean | null>(null)
  const dispatch = useAppDispatch()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))
  }

  const openPicker = () => {
    dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()
  }

  const openFilePicker = () => {
    imgInputRef.current?.click()
  }

 
   useEffect(() => {
      const validate = async () => {
        if (formData.pincode.length !== 6) {
          setIsValidPincode(null)
          return
        }
  
        setChecking(true)
  
        const res = await dispatch(checkDelivery(formData.pincode))
  
        if (checkDelivery.fulfilled.match(res)) {
          setIsValidPincode(res.payload.serviceable)
        } else {
          setIsValidPincode(false)
        }
  
        setChecking(false)
      }
  
      validate()
    }, [formData.pincode])
    
const fetchSlots = async () => {
  try {
    const res = await api.get(`/get-slot/${formData.pickupDate || today}`);
    setSlots(res.data?.data || []);
  } catch (err) {
    console.error("Failed to fetch slots", err);
  }
};

useEffect(() => {
  // Initial fetch
  fetchSlots();

  // Connect socket
  socketRef.current = io("http://localhost:5001");

  // Listen for slot updates
  socketRef.current.on("timeslot:update", () => {
    fetchSlots();
  });

  return () => {
    socketRef.current?.disconnect();
  };
}, [formData.pickupDate]);

  return (
    <div className="w-full max-w-full lg:max-w-[640px] 2xl:max-w-[740px] lg:mb-16">
      <div className="bg-white rounded-2xl p-6 md:shadow-sm font-[Reddit_Sans] space-y-6">
        <div className="  flex  justify-between items-center ">
          <h2 className="text-[24px] text-[#555555] font-medium mb-4 flex items-center gap-4">
            <SlLocationPin className="w-7 h-7 text-[#2375FF]" />
            Pickup Address
          </h2>
          <button
            onClick={onOpen}
            className="text-lg text-white -mt-2 bg-[#5896FF] p-[10px]  rounded-xl flex items-center gap-2 "
            title="change address"
          >
            <BsHouseAdd />
            <span className="hidden md:block lg:hidden xl:block">
              Change address
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <input
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            disabled
            className="bg-[#F0F0F0] h-[48px] lg:h-[56px] rounded-md px-3 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
          />
          <input
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            disabled
            inputMode="numeric"
            className="bg-[#F0F0F0] h-[48px] lg:h-[56px] rounded-md px-3 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
            placeholder="Landmark (Optional)"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled
            className="bg-[#F0F0F0] h-[48px] lg:h-[56px] rounded-md px-3 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
            placeholder="Street / Locality"
          />
          <input
            name="city"
            disabled
            value={formData.city}
            onChange={handleChange}
            inputMode="numeric"
            className="bg-[#F0F0F0] h-[48px] lg:h-[56px] rounded-md px-3 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
            placeholder="City"
          />
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            disabled
            inputMode="numeric"
            className="bg-[#F0F0F0] h-[48px] lg:h-[56px] rounded-md px-3 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
            placeholder="Pincode"
          />
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            disabled
            inputMode="numeric"
            className="bg-[#F0F0F0] h-[48px] lg:h-[56px] rounded-md px-3 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
            placeholder="Mobile Number"
          />
       <div className="mt-1">
            {isValidPincode === false && (
              <p className="text-xs sm:text-sm text-red-500 leading-snug">
                Service not available in this pincode
              </p>
            )}

            {isValidPincode === null && formData.pincode.length !==6 && (
              <p className="text-xs sm:text-sm text-red-500 leading-snug">
                Pincode must be 6 digits
              </p>
            )}
          </div>
        </div>

        <h2 className="text-[24px] text-[#555555] font-medium mt-6 mb-4 flex items-center gap-4">
          <BsBoxSeam className="w-7 h-7 rotate-y-180 text-[#2375FF] " />
          Item Instructions
        </h2>

        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="p-4 h-20 resize-none w-full bg-[#F0F0F0] rounded-md text-[16px] text-gray-600 outline-none focus:ring-2 focus:ring-[#448AFF] focus:border-[#448AFF]"
          placeholder="Describe the items ( eg. 2 shirts, 1 pair of jeans, bedsheets) "
        />

        <div className="mt-4 ">
          <label className=" text-[#555555]  text-[20px] ">
            Upload Image (Optional)
          </label>
          <div
            className={`mt-4 border ${formData.image ? "border-[#5ded5d]" : "border-[#A2A2A2]"
              } w-full sm:w-[256px] h-[48px] lg:h-[56px] rounded-md p-4 text-center ${formData.image ? "text-[#5ded5d]" : "text-[#828080]"
              } cursor-pointer flex gap-2 justify-center items-center`}
            onClick={openFilePicker}
          >
            {formData.image ? (
              <IoIosDoneAll className="w-6 h-6" />
            ) : (
              <PiUploadSimpleThin className="w-4 h-4" />
            )}
            {formData.image ? "Image Selected" : "Click to Upload"}
          </div>

          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <h2 className="text-[24px] text-[#555555] font-medium mt-6 mb-4">
          Pickup
        </h2>

        <div
          onClick={openPicker}
          className="flex items-center w-full bg-[#F0F0F0]  h-[48px] lg:h-[56px]   rounded-md px-3 py-2 cursor-pointer"
        >
          {/* Icon */}
          <FaRegCalendarAlt className="text-[#2375FF] mr-3 w-6 h-6" />

          <span
            className={`text-[16px] ${formData.pickupDate ? "text-[#8E8E8E] " : "text-gray-400"
              }`}
          >
            {formData.pickupDate
              ? new Date(formData.pickupDate).toLocaleDateString()
              : ""}
          </span>

          <input
            ref={dateInputRef}
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            min={today}
            className="absolute opacity-0 pointer-events-none"
          />
        </div>
        <h2 className="text-[24px] text-[#555555] font-medium mt-5 mb-4">
          Select Time Slot
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slots.map((slot) => {
            const label = `${formatTimeFrontend(slot.fromTime)} - ${formatTimeFrontend(slot.toTime)}`;

            const isDisabled =
              slot.status === "FULL" || slot.status === "INACTIVE";
              

            return (
              <TimeSlot
                key={slot.id}
                label={label}
                status={slot.status}
                active={formData.timeSlot === label}
                disabled={isDisabled}
                onClick={() => {
                 return isDisabled ? null : 
                  setFormData((p) => ({
                    ...p,
                    timeSlot: label,
                  }));
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default PickupAddress

import { BsClock } from "react-icons/bs"
import api from "../../utils/api"
import { formatTime, formatTimeFrontend } from "../../utils/formatTime"
import { checkDelivery } from "../../redux/action/authThunks"
import { useAppDispatch } from "../../redux/hooks"

interface TimeSlotProps {
  label: string;
  active?: boolean;
  status: "ACTIVE" | "FEW" | "FULL" | "INACTIVE";
  disabled?: boolean;
  onClick: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  label,
  active = false,
    status,
  disabled,
  onClick,
}) => (
<button
  type="button"
  onClick={onClick}
  disabled={disabled}
  className={`border rounded-md p-3 text-[16px] flex h-[55px] items-center justify-center gap-1 flex-col
    ${
      status === "FULL"
        ? "bg-red-100 text-red-500 border-red-300 cursor-not-allowed"
        : status === "INACTIVE"
        ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
        : status === "FEW"
        ? "bg-yellow-100 text-yellow-600 border-yellow-300"
        : "bg-green-100 text-green-600 border-green-300"
    }
    ${
      active
        ? "ring-2 ring-[#448AFF] border-[#448AFF]"
        : ""
    }
  `}
>
  <BsClock className="w-5 h-5" />

  {/* Time */}
  <span>{label}</span>

  {/* Status Text */}
  <span className="text-xs font-medium">
    {status === "FULL" && "Slot Full"}
    {status === "FEW" && "Only Few slot  left"}
    {status === "ACTIVE" && " Slots Available"}
    {status === "INACTIVE" && "Holiday"}
  </span>
</button>
)
