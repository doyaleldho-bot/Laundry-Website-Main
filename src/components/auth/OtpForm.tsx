import React, { useRef, useState, useEffect } from "react"
import { formatTime } from "../../utils/formatTime"

interface OtpFormProps {
  loading: boolean
  otpTimer: number | null
  retryTimer: number | null
  phoneNumber: string
  onContinue: (otp: string) => void
  onResend: () => void
  onBack: () => void
}

const OtpForm: React.FC<OtpFormProps> = ({
  loading,
  otpTimer,
  retryTimer,
  phoneNumber,
  onContinue,
  onResend,
  onBack,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Focus next input
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Backspace handling
    if (e.key === "Backspace") {
      if (index > 0 && otp[index] === "") {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue(otp.join(""), phoneNumber)
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      <button
        onClick={onBack}
        className="absolute -top-1 -left-1 p-2 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <div className="bg-[#002B7F] p-4 rounded-full mb-6 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 text-white"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        OTP Verification
      </h2>
      <p className="text-gray-500 mb-1 text-center">
        OTP Sent to enter mobile number {phoneNumber}
      </p>
      {otpTimer !== null && (
        <p className="text-sm text-gray-500 mb-8">
          OTP expires in <n />
          <span className="font-semibold text-red-500">
            {formatTime(otpTimer)}
          </span>
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="flex gap-4 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 bg-gray-200/50 rounded-xl text-center text-xl font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Didn't receive the code?
          <button
            type="button"
            disabled={retryTimer !== null}
            onClick={onResend}
            className={`font-medium ml-1 ${
              retryTimer
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-500 hover:underline"
            }`}
          >
            {retryTimer
              ? `Resend OTP in ${formatTime(retryTimer)}`
              : "Resend OTP"}
          </button>
        </p>

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

// Verified: Presentational component. Logic lifted to AuthModal.
export default OtpForm
