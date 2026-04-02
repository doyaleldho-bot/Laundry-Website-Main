import React, { useEffect, useRef, useState } from "react"
import PickupAddress from "./PickupAddress"
import OrderSummary from "./OrderSummary"

import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getAddresses } from "../../redux/action/authThunks"
import AddressList from "./AddressList"
import AddressForm from "./AddressForm"

export interface PickupFormData {
  apartment: string
  state: string
  landmark: string
  city: string
  pincode: string
  mobile: string
  instructions: string
  pickupDate: string
  image: File | null
  timeSlot: string
}
export type SelectAddress = {
  name: string | undefined
  mobileNumber: string | undefined
  id?: string
  addressLine?: string
  landmark?: string
  city?: string
  state?: string
  pincode?: string
  mobile?: string
} | null
const SchedulePickupMain = () => {
  const location = useLocation()

  const addressSectionRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)

  const [isChangeAddress, setIsChangeAddress] = useState<boolean>(false)
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [selectAddress, setSelectAddress] = useState<SelectAddress | null>(null)
  const {
    itemsCount = 0,
    itemsTotal = 0,
    pickupCharge = 50,
    type = "PIECE",
    weight = 0,
    pricePerKg = 0,
    services = [],
    totalAmount = 0,
    items = [],
  } = location.state || {}

  const dispatch = useAppDispatch()

  const displayedItemsCount =
    type === "WEIGHT" ? (itemsCount || (weight > 0 ? 1 : 0)) : itemsCount
  const displayedItemsTotal =
    type === "WEIGHT" ? (totalAmount || itemsTotal) : itemsTotal
  const weightInfo =
    type === "WEIGHT"
      ? {
          weight,
          pricePerKg,
          services,
        }
      : null

  const [formData, setFormData] = useState<PickupFormData>({
    apartment: "",
    state: "",
    landmark: "",
    city: "",
    pincode: "",
    mobile: "",
    instructions: "",
    pickupDate: "",
    image: null ,
    timeSlot: "",
  })
  const { defaultAddress, user } = useAppSelector((s) => s.auth)

  useEffect(() => {
    if (!user) return

    dispatch(getAddresses())
  }, [dispatch, user])
  useEffect(() => {
  if (!defaultAddress) return

  setFormData((prev) => ({
    ...prev,
    apartment: defaultAddress.addressLine || "",
    state: defaultAddress.state || "",
    landmark: defaultAddress.landmark || "",
    city: defaultAddress.city || "",
    pincode: defaultAddress.pincode || "",
    mobile:
      defaultAddress.mobileNumber || "",
  }))
}, [defaultAddress])

  useEffect(() => {
    if (isOpenForm) {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } else {
      addressSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [isOpenForm])
  return (
    <div className="px-4 lg:px-20">
      <h1 className="font-[Reddit_Sans] font-bold text-[48px] text-[#448AFF]">
        Schedule Pickup
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div ref={addressSectionRef}>
          {isChangeAddress ? (
            <AddressList
              setSelectAddress={setSelectAddress}
              onClose={() => {
                setIsChangeAddress(false)
                setIsOpenForm(false)
              }}
              onOpen={() => setIsOpenForm(true)}
            />
          ) : (
            <PickupAddress
              formData={formData}
              setFormData={setFormData}
              onOpen={() => setIsChangeAddress(true)}
            />
          )}
        </div>
        <div ref={formSectionRef}>
          {isOpenForm ? (
            <AddressForm
              selectAddress={selectAddress}
              onClose={() => setIsOpenForm(false)}
            />
          ) : (
            <OrderSummary
              formData={formData}
              itemsCount={displayedItemsCount}
              itemsTotal={displayedItemsTotal}
              pickupCharge={pickupCharge}
              type={type}
              weightInfo={weightInfo}
              items={items}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SchedulePickupMain
