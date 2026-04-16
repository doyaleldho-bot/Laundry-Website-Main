import React, { useEffect, useState } from "react"
import axios from "axios"
import api from "../../utils/api"
import toast from "react-hot-toast"

interface Category {
  id: string
  name: string
}
interface Complaint{
 orderId: string
 onClose: () => void
}

const Complaint = ({ orderId, onClose }: Complaint) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState("")
  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(false)

  //  Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/complaint/categories")
        setCategories(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategories()
  }, [])

  //  Submit complaint
  const handleSubmit = async () => {
    if (!categoryId || !details) {
      toast.error("Please fill all fields")
      return
    }

    try {
      setLoading(true)
      await api.post(
        "/complaint",
        {
          orderId,
          categoryId,
          details,
        },
        { withCredentials: true }
      )

      toast.success("Complaint submitted")
      onClose()
    } catch (err) {
      console.error(err)
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
            Complaint
          </h2>

          <button onClick={onClose} className="text-gray-500 text-xl">
            ✕
          </button>
        </div>

        {/* Order */}
        <p className="text-sm sm:text-base text-blue-500 mb-4">
          Order: {orderId}
        </p>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Category
          </label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Details
          </label>

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us about your complaint..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-[45px] rounded-lg text-white font-medium text-sm sm:text-base"
          style={{
            background:
              "linear-gradient(90deg, #448AFF 0%, #295399 100%)",
          }}
        >
          {loading ? "Submitting..." : "Register Complaint"}
        </button>
      </div>
    </div>
  )
}

export default Complaint