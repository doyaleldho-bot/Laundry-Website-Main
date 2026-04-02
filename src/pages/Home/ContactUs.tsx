import React, { useState, useRef, useEffect } from "react"
import { LuUserRound } from "react-icons/lu"
import { MdOutlineMail, MdOutlineArrowForwardIos } from "react-icons/md"
import { BsTelephone } from "react-icons/bs"
import toast from "react-hot-toast"

interface Service {
  label: string
  value: string
}

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  service?: string
  message?: string
}

const services: Service[] = [
  { label: "Laundry", value: "laundry" },
  { label: "Dry Cleaning", value: "dry-cleaning" },
  { label: "Ironing", value: "ironing" },
  { label: "Wash & Fold", value: "wash-fold" },
]

const ContactUs: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("Services")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const dropdownRef = useRef<HTMLDivElement>(null)

  const validateField = (name: string, value: string) => {
    let error = ""

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required"
        break

      case "email":
        if (!value.trim()) error = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email"
        break

      case "phone":
        if (!value.trim()) error = "Phone is required"
        else if (!/^\d{10}$/.test(value)) error = "Enter 10-digit phone"
        break

      case "service":
        if (!value) error = "Please select a service"
        break

      case "message":
        if (!value.trim()) error = "Message cannot be empty"
        break
    }

    return error
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    const error = validateField(name, value)
    setFormErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = {}

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) {
        newErrors[key as keyof FormErrors] = error
      }
    })

    setFormErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    console.log("Submitted Data:", formData)

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    })
    setSelected("Services")
    setFormErrors({})
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleCopy = (): void => {
    navigator.clipboard.writeText("+919876543210")
    toast.success("Number copied!", {
      style: {
        background: "#000",
        color: "#fff",
        fontFamily: "Reddit Sans",
      },
    })
  }

  return (
    <>
      <div
        id="contact"
        className="px-4 w-full max-w-[1280px] lg:max-w-[1450px] 2xl:max-w-[1900px] mx-auto mb-12 mt-12 scroll-mt-16"
      >
        <div className="  w-full  min-h-[123px]  md:min-h-[223px]  border border-[#414141]  flex  flex-col  md:flex-row  items-center  justify-between  gap-6 py-6 md:py-0  px-6  md:px-12">
          {/* Text */}
          <p className=" font-['Reddit_Sans'] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] text-[#448AFF] text-center md:text-left ">
            Get a call back?
          </p>

          {/* Button */}

          <button
            className=" w-full sm:w-[180px] md:w-[196px] h-[48px] md:h-[64px] bg-[#414141] font-['Reddit_Sans'] text-[18px] md:text-[24px] lg:text-[32px] text-white transition hover:bg-black "
            title="+919876543210"
            onClick={handleCopy}
          >
            Call Now
          </button>
        </div>
      </div>
      <section className="w-full flex justify-center py-12 ">
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
          {/* MAP */}
          <div className="w-full h-[260px] md:h-[380px] lg:h-[448px] rounded-md overflow-hidden">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Muppathadam,Aluva,Kerala&z=12&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* FORM */}
          <div>
            <p className="text-[#448AFF] font-medium mb-2">CONTACT US</p>
            <h2 className="text-[32px] md:text-[40px] font-medium mb-8">
              Send Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <div className="h-[50px] px-4 border border-[#D3D3D3] flex items-center gap-2">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full outline-none"
                    />
                    <LuUserRound className="text-gray-400" />
                  </div>
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="h-[50px] px-4 border border-[#D3D3D3] flex items-center gap-2">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full outline-none"
                    />
                    <MdOutlineMail className="text-gray-400" />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <div className="h-[50px] px-4 border border-[#D3D3D3] flex items-center gap-2">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="w-full outline-none"
                    />
                    <BsTelephone className="text-gray-400" />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Service Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full h-[50px] px-4 border border-[#D3D3D3] text-[#838383] flex items-center justify-between"
                  >
                    {selected}
                    <MdOutlineArrowForwardIos
                      className={`text-[#838383] transition-transform ${
                        open ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-[#D3D3D3] rounded-md shadow-md">
                      {services.map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => {
                            setSelected(service.label)
                            setFormData((prev) => ({
                              ...prev,
                              service: service.value,
                            }))
                            setOpen(false)
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-blue-50 hover:text-black"
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {formErrors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="w-full h-[150px] border border-[#D3D3D3] px-4 py-3 resize-none outline-none"
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-[200px] h-[47px] bg-[#414141] text-white hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUs
