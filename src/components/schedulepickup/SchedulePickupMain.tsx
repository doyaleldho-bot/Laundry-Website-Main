import { useEffect, useRef, useState } from "react"
import PickupAddress from "./PickupAddress"
import OrderSummary from "./OrderSummary"

import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getAddresses } from "../../redux/action/authThunks"
import AddressList from "./AddressList"
import AddressForm from "./AddressForm"
import { getCartDetails } from "../../redux/action/cartThunks"

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
  const locationState = (location.state || {}) as {
    itemsCount?: number
    itemsTotal?: number
    type?: "PIECE" | "WEIGHT"
    weight?: number
    pricePerKg?: number
    services?: string[]
    items?: Array<{
      title: string
      serviceType: string[]
      quantity: number
      unitType: "PIECE" | "WEIGHT"
      unitPrice: number
      totalPrice: number
    }>
  }

  const {
    itemsCount = 0,
    itemsTotal = 0,
    type = "PIECE",
    weight = 0,
    pricePerKg = 0,
    services = [],
    items: locationItems = [],
  } = locationState

  const dispatch = useAppDispatch()
  // CART DATA FROM REDUX
  const { items, totalAmount, itemCount } = useAppSelector(
    (state) => state.cart
  )

  const pickupCharge = 50

  useEffect(() => {
    dispatch(getCartDetails())
  }, [dispatch])

  const displayedItemsCount =
    type === "WEIGHT"
      ? itemsCount || (weight > 0 ? 1 : 0)
      : itemsCount || itemCount
  const displayedItemsTotal =
    type === "WEIGHT"
      ? itemsTotal || totalAmount
      : itemsTotal || totalAmount
  const weightInfo =
    type === "WEIGHT"
      ? {
          weight,
          pricePerKg,
          services,
        }
      : null

  type PickupSummaryItem = {
    title: string
    serviceType: string[]
    quantity: number
    unitType: "PIECE" | "WEIGHT"
    unitPrice: number
    totalPrice: number
  }

  const cartSummaryItems: PickupSummaryItem[] = items.map((item) => ({
    title: item.title,
    serviceType: Array.isArray(item.serviceType)
      ? item.serviceType
      : typeof item.serviceType === "string"
      ? item.serviceType
          .split(" /")
          .map((service) => service.trim())
          .filter(Boolean)
      : [],
    quantity: item.quantity,
    unitType: item.unitType === "WEIGHT" ? "WEIGHT" : "PIECE",
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
  }))

  const summaryItems: PickupSummaryItem[] =
    type === "PIECE" && Array.isArray(locationItems) && locationItems.length > 0
      ? locationItems
      : cartSummaryItems

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
              items={summaryItems}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SchedulePickupMain
