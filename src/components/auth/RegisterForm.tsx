import React from "react"

interface RegisterFormProps {
  loading: boolean
  onContinue: (data: { name: string; phone: string; email: string }) => void
  onSwitchToLogin: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  loading,
  onContinue,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue(formData)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-[#002B7F] p-4 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>

      <h2 className="text-2xl mb-1 font-medium ">Register yourself here</h2>
      <p className="mb-6 font-normal">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-[#448AFF] font-medium hover:underline cursor-pointer"
        >
          Log in
        </button>
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-200/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            className="w-full px-4 py-3 bg-gray-200/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            maxLength={10}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-200/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#448AFF] hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors mt-4 cursor-pointer"
        >
          {loading ? "loading..." : "Continue"}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
