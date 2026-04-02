import React from "react"
import user from "../../assets/icons/authicon/mdi_account-circle.svg"

interface LoginFormProps {
  loading: boolean
  onContinue: (phone: string) => void
  onSwitchToRegister: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  loading,
  onContinue,
  onSwitchToRegister,
}) => {
  const [phone, setPhone] = React.useState("")
  const [error, setError] = React.useState("")

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      return "Phone number is required"
    }
    if (!/^\d{10}$/.test(value)) {
      return "Enter a valid 10-digit phone number"
    }
    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validatePhone(phone)
    if (validationError) {
      setError(validationError)
      return
    }

    onContinue(phone)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-2">
        <img src={user} alt="user" />
      </div>

      <h2 className="text-[24px] font-medium font-['Reddit_Sans'] mb-2">
        Feel free to login
      </h2>

      <p className="text-gray-500 mb-8">
        Don’t have an account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-[#448AFF] font-medium hover:underline cursor-pointer"
        >
          Register
        </button>
      </p>
      

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="text-[20px] font-normal text-[#5D5C5C] ml-1">
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setPhone(value)
              setError("")
            }}
            className={`w-full px-4 py-3 bg-gray-200/50 rounded-xl focus:ring-2 focus:outline-none transition-all mt-2
              ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}
            `}
            maxLength={10}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || phone.length !== 10}
          className={`w-full text-white font-semibold py-3 rounded-xl transition-colors mt-4
            ${
              phone.length === 10
                ? "bg-gradient-to-r from-cyan-600 to-blue-700 hover:opacity-90 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
