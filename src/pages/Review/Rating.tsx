import React, { useState } from "react"
import starIcon from "../../assets/icons/review_star.svg"
import api from "../../utils/api"
import toast from "react-hot-toast"

interface RatingProps {
    orderId: string
    onClose: () => void
}

const Rating = ({ orderId, onClose }: RatingProps) => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        if (!rating) {
            toast.error("Please select rating")
            return
        }

        try {
            setLoading(true)

            // call your API here
            await api.post("/review", { orderId, rating, comment })

            toast.success("Review submitted")
            onClose()
        } catch (err: unknown) {
            const message =
                (err as any)?.response?.data?.msg ||
                (err as any)?.response?.data?.message ||
                "Something went wrong"

            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            {/* Modal */}
            <div className="w-full max-w-[652px] bg-white rounded-[20px] p-5 sm:p-6 md:p-8 shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-800">
                        Write a Review
                    </h2>

                    <button onClick={onClose} className="text-gray-500 text-xl">
                        ✕
                    </button>
                </div>

                {/* Order */}
                <p className="text-sm sm:text-base text-blue-500 mb-4">
                    Order: {orderId}
                </p>

                {/* Rating */}
                <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                        How was your experience?
                    </p>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <img
                                key={star}
                                src={starIcon}
                                alt="star"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className={`w-7 h-7 cursor-pointer transition ${(hover || rating) >= star
                                    ? "opacity-100"
                                    : "opacity-30"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-black-600 mt-2">
                        {rating > 0 ? `${rating} Star${rating > 1 ? "s" : ""}` : "Select rating"}
                    </p>
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-1">
                        Share your thoughts
                    </label>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about your experience with our service..."
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
                    />
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Cancel */}
                    <button
                        onClick={onClose}
                        className="w-full sm:w-1/2 h-[48px] rounded-[15px] border border-gray-300 text-gray-600 text-sm sm:text-base"
                    >
                        Cancel
                    </button>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full sm:w-1/2 h-[48px] rounded-[15px] text-white text-sm sm:text-base font-medium"
                        style={{
                            background:
                                "linear-gradient(90deg, #448AFF 0%, #295399 100%)",
                        }}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Rating