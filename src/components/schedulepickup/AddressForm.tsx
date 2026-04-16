import React, { useEffect, useState } from "react"
import { SlLocationPin } from "react-icons/sl"
import type { SelectAddress } from "./SchedulePickupMain"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addAddresses, checkDelivery, updateProfileAddress } from "../../redux/action/authThunks"
import toast from "react-hot-toast"

interface AddressFormProps {
  selectAddress?: SelectAddress | null
  onClose: () => void
}

const AddressForm: React.FC<AddressFormProps> = ({
  selectAddress,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const [checking, setChecking] = useState(false)
  const [isValidPincode, setIsValidPincode] = useState<boolean | null>(null)

  const [form, setForm] = useState({
    name: user?.name || "",
    addressLine: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    mobileNumber: "",
  })

  // Prefill when editing
  useEffect(() => {
    if (!selectAddress) {
      setForm({
        name: user?.name || "",
        addressLine: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        mobileNumber: "",
      })
      return
    }

    setForm({
      name: selectAddress.name || user?.name || "",
      addressLine: selectAddress.addressLine || "",
      landmark: selectAddress.landmark || "",
      city: selectAddress.city || "",
      state: selectAddress.state || "",
      pincode: selectAddress.pincode || "",
      mobileNumber:
        selectAddress.mobileNumber || selectAddress.mobile || "",
    })
  }, [selectAddress, user])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numberOnlyFields = ["mobileNumber", "pincode"]
    if (numberOnlyFields.includes(name) && !/^\d*$/.test(value)) return
    setForm((prev) => ({ ...prev, [name]: value }))
  }



  useEffect(() => {
    const validate = async () => {
      if (form.pincode.length !== 6) {
        setIsValidPincode(null)
        return
      }

      setChecking(true)

      const res = await dispatch(checkDelivery(form.pincode))

      if (checkDelivery.fulfilled.match(res)) {
        setIsValidPincode(res.payload.serviceable)
      } else {
        setIsValidPincode(false)
      }

      setChecking(false)
    }

    validate()
  }, [form.pincode])

  const handleSave = async () => {
    try {
      if (selectAddress?.id) {
        // UPDATE existing address
        await dispatch(
          updateProfileAddress({
            addressId: selectAddress.id,
            data: form,
          }),
        )
        toast.success("Address updated successfully")
      } else {
        // CREATE new address
        const res = await dispatch(addAddresses(form))

        if (addAddresses.fulfilled.match(res)) {
          toast.success("Address added successfully")
        } else {
          toast.error("Failed to add address")
        }
      }
      setForm({
        name: user?.name || "",
        addressLine: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        mobileNumber: "",
      })
      onClose()
    } catch (error: any) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to save address",
      )
    }
  }

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      addressLine: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      mobileNumber: "",
    })
    onClose()
  }

  return (
    <div className="w-full lg:max-w-[640px] 2xl:max-w-[740px] h-[955px]">
      <div className="bg-white rounded-2xl p-6 shadow-sm font-[Reddit_Sans] h-full flex flex-col">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#565656] mb-6">
          {selectAddress ? "Edit Address" : "Add New Address"}
        </h2>

        {/* Pickup Address */}
        <div className="flex items-center gap-2 text-xl text-gray-500 mb-6">
          <SlLocationPin size={22} className="text-[#448AFF]" />
          <span className="font-medium">Pickup Address</span>
        </div>

        {/* FORM (takes remaining space) */}
        <div className="flex-1 space-y-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            placeholder="Apartment / Building name"
            className="w-full bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Landmark (Optional)"
            className="w-full bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Pincode"
              className="bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="Mobile Number"
              className="bg-gray-100 rounded-md px-4 py-3 text-lg h-14 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {checking && (
            <p className="text-sm text-gray-500 mt-1">Checking availability...</p>
          )}

          {isValidPincode === true && (
            <p className="text-sm text-green-600 mt-1">
              Service available in this area
            </p>
          )}

          {isValidPincode === false && (
            <p className="text-sm text-red-500 mt-1">
              Service not available
            </p>
          )}
          {isValidPincode === null && form.pincode.length !==6 && (
            <p className="text-sm text-red-500 mt-1">
              pincode must be 6 digit
            </p>
          )}
        </div>

        {/* BUTTONS (fixed at bottom) */}
        <div className="flex gap-6 pt-6">
          <button
            onClick={handleCancel}
            className="w-full border border-gray-300 rounded-md py-4 text-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isValidPincode === false || isValidPincode === null}
            className={`w-full rounded-md py-4 text-lg text-white transition
    ${isValidPincode === false || isValidPincode === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#448AFF] hover:bg-blue-600"
              }
  `}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddressForm
