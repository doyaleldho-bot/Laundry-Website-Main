import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { User, Phone, Mail, MapPin, Plus, Edit2, X, Check } from "lucide-react"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { FiUser } from "react-icons/fi"
import {
  deleteAddress,
  getAddresses,
  getProfile,
  updateProfileAddress,
} from "../../redux/action/authThunks"
import Swal from "sweetalert2"

interface Address {
  id: string
  label: string
  addressLine: string
  state: string
  postalCode: string
  city: string
  landmark?: string
}

interface ProfileFormData {
  fullName: string
  phone: string
  email: string
}

interface AddressFormData {
  apartment: string
  state: string
  landmark: string
  city: string
  postalCode: string
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>()

  const [addresses, setAddresses] = useState<Address[]>([])

  const [selectedAddressId, setSelectedAddressId] = useState<string>("1")
  const [editingFields, setEditingFields] = useState<Set<string>>(new Set())
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const dispatch = useAppDispatch()

  // React Hook Form for profile
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    watch: watchProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
    },
  })

  // React Hook Form for address
  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    setValue,
    formState: { errors: addressErrors },
  } = useForm<AddressFormData>({
    defaultValues: {
      apartment: "",
      state: "",
      landmark: "",
      city: "",
      postalCode: "",
    },
  })

  //   const profileFormValues = watchProfile();

  const toggleEditField = (fieldName: string) => {
    setEditingFields((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(fieldName)) {
        newSet.delete(fieldName)
      } else {
        newSet.add(fieldName)
      }
      return newSet
    })
  }

  const onProfileSubmit = async (formData: ProfileFormData) => {
    try {
      // select the address you want to update
      const selectedAddress = addresses[0] // or get the address user is editing

      if (!selectedAddress) {
        toast.error("No address selected")
        return
      }

      const payload = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        addressLine: selectedAddress.addressLine,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.postalCode, // must match backend
        landmark: selectedAddress.landmark,
        type: "HOME",
      }

      const res = await dispatch(
        updateProfileAddress({ data: payload, addressId: selectedAddress.id }),
      ).unwrap()

      toast.success(res.msg || "Profile updated successfully!")
    } catch (err) {
      toast.error("Failed to update profile")
    }
  }

  //  const onAddAddressSubmit = (addressData: AddressFormData) => {
  //   const newAddress: Address = {
  //     id:  crypto.randomUUID(),
  //     label: `Address ${addresses.length + 1}`,
  //     addressLine: addressData.apartment,
  //     state: addressData.state,
  //     postalCode: addressData.postalCode,
  //     city: addressData.city,
  //     landmark: addressData.landmark,
  //   };

  //   const updatedAddresses = [...addresses, newAddress];

  //   const profileValues = watchProfile(); // grab current profile data
  //   setAddresses(updatedAddresses);
  //     setValue('apartment', '');
  //   setValue('state', '');
  //   setValue('landmark', '');
  //   setValue('city', '');
  //   setValue('postalCode', '');
  //   setIsAddingAddress(false);
  //   toast.success('Address added successfully!');
  // };

  const onAddAddressSubmit = async (addressData: AddressFormData) => {
    try {
      const payload = {
        addressLine: addressData.apartment,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.postalCode,
        landmark: addressData.landmark,
        type: "HOME",
      }

      // Send to backend to create new address
      const res = await dispatch(
        updateProfileAddress({ data: payload }),
      ).unwrap()

      // Refresh addresses from backend
      const updatedAddresses = await dispatch(getAddresses()).unwrap()
      setAddresses(updatedAddresses)

      // Reset form
      setValue("apartment", "")
      setValue("state", "")
      setValue("landmark", "")
      setValue("city", "")
      setValue("postalCode", "")
      setIsAddingAddress(false)

      toast.success("Address added successfully!")
    } catch (err) {
      toast.error("Failed to add address")
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    const result = await Swal.fire({
      title: "Delete address?",
      text: "This address will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E02424",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    })

    if (!result.isConfirmed) return

    try {
      // Optimistic UI update
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId))

      if (selectedAddressId === addressId) {
        setSelectedAddressId("")
      }

      await dispatch(deleteAddress(addressId)).unwrap()

      Swal.fire({
        title: "Deleted!",
        text: "Address has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      toast.success("Address deleted successfully!")
    } catch (error) {
      console.error("Error deleting address:", error)

      Swal.fire({
        title: "Error",
        text: "Failed to delete address.",
        icon: "error",
      })

      toast.error("Failed to delete address")
    }
  }

  useEffect(() => {
    // Fetch user profile
    dispatch(getProfile())
      .unwrap()
      .then((user) => {
        if (user) {
          resetProfile({
            fullName: user?.name || "",
            phone: user.phone || "",
            email: user.email || "",
          })
        }
      })
      .catch((err) => console.error("Failed to fetch profile:", err))

    // Fetch addresses
    dispatch(getAddresses())
      .unwrap()
      .then((addresses) => {
        if (addresses) {
          setAddresses(
            addresses.map((addr: any) => ({
              id: addr.id,
              label: addr.label || "Address",
              addressLine: addr.addressLine,
              state: addr.state,
              postalCode: addr.pincode,
              city: addr.city,
              landmark: addr.landmark,
            })),
          )
          setSelectedAddressId(addresses[0]?.id || "")
        }
      })
      .catch((err) => console.error("Failed to fetch addresses:", err))
  }, [dispatch, resetProfile])
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      {/* Main Container - Responsive width */}
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8  max-w-full sm:max-w-[500px] md:max-w-[768px] lg:max-w-[815px]">
        {/* Profile Container with border */}
        <div className="bg-white rounded-[10.37px] border border-gray-300 border-opacity-70 shadow-sm overflow-hidden">
          {/* Header Section - Exact dimensions */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 text-center w-full h-auto md:h-[173.71px] flex flex-col justify-center items-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <User className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
            </div>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base">
              Manage your profile
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1">
              My Profile
            </h1>
          </div>

          {/* Content Section */}
          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-8"
          >
            {/* Profile Details Section */}
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <span className="text-gray-400 mr-2">
                  <FiUser />
                </span>
                Profile Details
              </h2>

              {/* Full Name */}
              <div className="mb-4 sm:mb-6">
                <label className="flex items-center text-gray-700 text-xs sm:text-sm font-medium mb-2">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Full Name
                </label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    {...registerProfile("fullName", {
                      required: "Full name is required",
                    })}
                    disabled={!editingFields.has("fullName")}
                    className={`flex-1 border rounded px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none transition ${
                      editingFields.has("fullName")
                        ? "bg-white border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                        : "bg-gray-100 border-gray-200 text-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEditField("fullName")}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    {editingFields.has("fullName") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Edit2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {profileErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {profileErrors.fullName.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="mb-4 sm:mb-6">
                <label className="flex items-center text-gray-700 text-xs sm:text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  Phone Number
                </label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="tel"
                    {...registerProfile("phone", {
                      required: "Phone number is required",
                    })}
                    disabled={!editingFields.has("phoneNumber")}
                    className={`flex-1 border rounded px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none transition ${
                      editingFields.has("phoneNumber")
                        ? "bg-white border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                        : "bg-gray-100 border-gray-200 text-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEditField("phoneNumber")}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    {editingFields.has("phoneNumber") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Edit2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {profileErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {profileErrors.phone.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="mb-4 sm:mb-6">
                <label className="flex items-center text-gray-700 text-xs sm:text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  Email Address
                </label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="email"
                    {...registerProfile("email", {
                      required: "Email is required",
                    })}
                    disabled={!editingFields.has("email")}
                    className={`flex-1 border rounded px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none transition ${
                      editingFields.has("email")
                        ? "bg-white border-blue-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
                        : "bg-gray-100 border-gray-200 text-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEditField("email")}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    {editingFields.has("email") ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Edit2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {profileErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Pickup Address Section */}
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                Pickup Address
              </h2>

              {/* Existing Addresses - Selectable */}
              {addresses.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-600 text-xs sm:text-sm font-medium mb-3">
                    Select a pickup address:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddressId(address.id)}
                        className={`p-3 sm:p-4 md:p-5 border-2 rounded-lg cursor-pointer transition relative group border-gray-200 bg-gray-100 `}
                      >
                        <p className="text-gray-600 text-xs font-semibold mb-2 sm:mb-3 uppercase tracking-wide">
                          {address.label},{address.addressLine}, {address.state}
                          , {address.city}, {address.landmark} -{" "}
                          {address.postalCode}
                        </p>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteAddress(address.id)
                          }}
                          className="text-red-500 text-xs hover:text-red-700 transition flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Address Section */}
              {!isAddingAddress ? (
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-6 sm:py-8 text-gray-400 hover:text-blue-600 hover:border-blue-400 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">
                    Add New Address
                  </span>
                </button>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                    Add New Address
                  </h3>

                  {/* Address Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Apartment / Building Name */}
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Apartment / Building name
                      </label>
                      <input
                        type="text"
                        {...registerAddress("apartment", {
                          required: "Apartment is required",
                        })}
                        placeholder="Enter apartment"
                        className="w-full bg-white border border-gray-200 rounded px-3 sm:px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                      />
                      {addressErrors.apartment && (
                        <p className="text-red-500 text-xs mt-1">
                          {addressErrors.apartment.message}
                        </p>
                      )}
                    </div>

                    {/* Street / Locality */}
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Street / Locality
                      </label>
                      <input
                        type="text"
                        {...registerAddress("state", {
                          required: "Street is required",
                        })}
                        placeholder="Enter street"
                        className="w-full bg-white border border-gray-200 rounded px-3 sm:px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                      />
                      {addressErrors.state && (
                        <p className="text-red-500 text-xs mt-1">
                          {addressErrors.state.message}
                        </p>
                      )}
                    </div>

                    {/* Landmark (Optional) */}
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        {...registerAddress("landmark")}
                        placeholder="Enter landmark"
                        className="w-full bg-white border border-gray-200 rounded px-3 sm:px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-gray-700 text-xs font-semibold mb-2 uppercase tracking-wider">
                        City
                      </label>
                      <input
                        type="text"
                        {...registerAddress("city", {
                          required: "City is required",
                        })}
                        placeholder="Enter city"
                        className="w-full bg-white border border-gray-200 rounded px-3 sm:px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                      />
                      {addressErrors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {addressErrors.city.message}
                        </p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div className="sm:col-span-2">
                      <label className="block text-gray-700 text-xs font-semibold mb-2 uppercase tracking-wider">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        {...registerAddress("postalCode", {
                          required: "Postal code is required",
                        })}
                        placeholder="Enter postal code"
                        className="w-full bg-white border border-gray-200 rounded px-3 sm:px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                      />
                      {addressErrors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {addressErrors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingAddress(false)
                        setValue("apartment", "")
                        setValue("state", "")
                        setValue("landmark", "")
                        setValue("city", "")
                        setValue("postalCode", "")
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded text-sm hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddressSubmit(onAddAddressSubmit)}
                      className="flex-1 px-4 py-2.5 bg-blue-500 text-white font-medium rounded text-sm hover:bg-blue-600 transition"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="bg-0 border-t border-gray-200 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingFields(new Set())
                  setIsAddingAddress(false)
                  resetProfile(profileData)
                }}
                className="flex-1 px-4 sm:px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 sm:px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
