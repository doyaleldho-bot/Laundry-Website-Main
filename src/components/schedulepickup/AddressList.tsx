import React from "react"
import Swal from "sweetalert2"

// icons
import { IoIosArrowForward } from "react-icons/io"
import { SlLocationPin } from "react-icons/sl"
import { IoCheckmark } from "react-icons/io5"
import { GoPencil } from "react-icons/go"
import { HiOutlineTrash, HiPlus } from "react-icons/hi2"

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import type { SelectAddress } from "./SchedulePickupMain"
import { deleteAddress, getAddresses, setDefaultAddress } from "../../redux/action/authThunks"

interface AddressListProps {
  setSelectAddress: React.Dispatch<React.SetStateAction<SelectAddress | null>>
  onClose: () => void
  onOpen: () => void
}

const AddressList: React.FC<AddressListProps> = ({
  setSelectAddress,
  onClose,
  onOpen,
}) => {
  const dispatch = useAppDispatch()
  const { addresses, user } = useAppSelector((s) => s.auth)

  const handleChangeSelect = async (id: string) => {
    const defaultAddress = addresses?.find((a) => a.isDefault)
      if (String(defaultAddress?.id) !== id) {
      await dispatch(setDefaultAddress(id))
    }
  }

  const handleDelete = (e: React.MouseEvent, addressId: string) => {
    e.stopPropagation()

    Swal.fire({
      title: "Delete address?",
      text: "This address will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E02424",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAddress(addressId))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Address has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            })
                    //fetching address after deleting
                  dispatch(getAddresses())
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
              title: "Error",
              text:
                typeof error === "string"
                  ? error
                  : error?.message || "Failed to delete address.",
              icon: "error",
            })
          })
      }
    })
  }

  return (
    <div className="w-full lg:max-w-[640px] 2xl:max-w-[740px] h-[955px] lg:mb-16">
      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl p-6 md:shadow-sm font-[Reddit_Sans]  h-full flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="space-y-4">
          <button onClick={onClose}>
            <IoIosArrowForward
              size={24}
              className="rotate-180 text-[#555555]"
            />
          </button>

          <div className="space-y-2">
            <h2 className="text-[24px] font-medium text-gray-500">
              Change Pickup Address
            </h2>
            <p className="text-lg text-[#898A8D]">
              Select or add a new pickup address
            </p>
          </div>
        </div>

        <hr className="border-dashed border-[#DADADA] my-4" />

        {/* CONTENT */}
        <div className="flex flex-col flex-1 min-h-0 ">
          <h3 className="text-xl font-medium text-gray-500 mb-4">
            Saved Addresses
          </h3>

          {/* SCROLLABLE ADDRESS LIST */}
          <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden space-y-4 pr-2">
            {addresses?.map((addr, i) => {
              const isSelected = addr.isDefault

              return (
                <div
                  key={addr.id}
                  onClick={() => handleChangeSelect(addr.id)}
                  className={`rounded-xl p-4 space-y-3 cursor-pointer transition
                    ${
                      isSelected
                        ? "border-2 border-[#448AFF] bg-blue-50"
                        : "border border-gray-300"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center text-md font-medium text-gray-500">
                      <SlLocationPin
                        size={16}
                        className={
                          isSelected ? "text-[#448AFF]" : "text-gray-500"
                        }
                      />
                      {`Address ${i + 1}`}
                    </div>

                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#448AFF] flex items-center justify-center">
                        <IoCheckmark size={16} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-gray-300" />
                    )}
                  </div>

                  <p className="text-xl text-[#8E8E8E] leading-relaxed max-w-[393px]">
                    {[
                      addr.addressLine || "—",
                      addr.landmark || "—",
                      `${addr.city || "—"}, ${addr.state || "—"} - ${addr.pincode || "—"}`,
                      addr?.mobileNumber || "—",
                    ].join(", ")}
                  </p>

                  <div className="flex gap-6 text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectAddress(addr)
                        onOpen()
                      }}
                      className="flex items-center gap-1 text-xl text-[#2375FF]"
                    >
                      <GoPencil size={20} /> Edit
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, addr.id)}
                      className="flex items-center gap-1 text-xl text-[#8E0000]"
                    >
                      <HiOutlineTrash size={20} /> Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* FIXED BOTTOM BUTTON */}
          <div className="pt-4">
            <button
              onClick={() => {
                setSelectAddress(null)
                onOpen()
              }}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 
              flex items-center justify-center gap-2 text-gray-600 
              hover:border-[#448AFF] hover:text-[#448AFF] transition"
            >
              <HiPlus size={18} />
              Add New Address
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressList
