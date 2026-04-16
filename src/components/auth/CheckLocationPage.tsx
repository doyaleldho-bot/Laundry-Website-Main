import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkDelivery } from '../../redux/action/authThunks';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CheckLocationPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [pincode, setPincode] = useState("");
  const { loading, error } = useSelector((state: any) => state.auth);

  const handleClose = () => {
    navigate("/", { replace: true });
  };

  useEffect(()=>{
    const savedPincode = localStorage.getItem("pincode");
    setPincode(savedPincode || "");
  },[])

  const handleCheck = async () => {
    if (pincode.length!==6) {
      toast.error("Please enter a valid 6-digit pincode")
      return;
  }
    const res = await dispatch(checkDelivery(pincode));

    if (checkDelivery.fulfilled.match(res)) {
      if (res.payload.serviceable) {
        toast.success(" We deliver to your area.");
        navigate("/service", { replace: true });
      }
      else{
        toast.error(" We do not deliver to your area.choose another pincode location.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* Modal */}
      <div className="relative w-full max-w-[652px] bg-white rounded-2xl shadow-2xl px-6 md:px-12 py-10 flex flex-col items-center animate-in fade-in zoom-in duration-200">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="bg-gradient-to-br from-[#002B7F] to-[#2E5AAC] w-[72px] h-[72px] flex items-center justify-center rounded-full mb-6 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7Z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Your Location
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 text-sm md:text-base mb-8 max-w-[420px] leading-relaxed">
          Enter your pincode to check service availability and get accurate delivery estimates
        </p>

        {/* Input Section */}
        <div className="w-full flex flex-col gap-3 mb-6">
          <label className="text-sm text-gray-600">Enter pincode</label>

          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Eg: 682001"
            className="w-full h-[52px] rounded-xl bg-gray-100 px-4 text-gray-800 text-base outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
            {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        </div>
        {/* Continue Button */}
        <button onClick={handleCheck} disabled={loading}
           className="w-full h-[52px] rounded-xl bg-gradient-to-r from-[#4A90E2] to-[#2E5AAC] text-white font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-md">
                   {loading ? "Checking..." : "Continue"}
        </button>
      </div>
    </div>
  )
}

export default CheckLocationPage
