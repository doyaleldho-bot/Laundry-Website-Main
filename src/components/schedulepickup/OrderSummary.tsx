import React, { useState } from "react"
import type { PickupFormData } from "./SchedulePickupMain"

//icons
import truck from "../../assets/images/schedulepickup/hugeicons_delivery-truck-02.svg"

import { FaRegCalendarAlt } from "react-icons/fa"
import { getDeliveryDateFromPickup } from "../../utils/DateCalculator"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { createOrderWithPickup } from "../../redux/action/orderThunks"
import Swal from "sweetalert2"
import api from "../../utils/api"

interface WeightInfo {
  weight: number
  pricePerKg: number
  services: string[]
}

interface OrderSummaryProps {
  formData: PickupFormData
  itemsCount: number
  itemsTotal: number
  pickupCharge: number
  type?: "PIECE" | "WEIGHT"
  weightInfo?: WeightInfo | null
  referralCode?: string
  couponCode?: string
  items?: Array<{
    title: string
    serviceType: string[]
    quantity: number
    unitType: "PIECE" | "WEIGHT"
    unitPrice: number
    totalPrice: number
  }>
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData,
  itemsCount,
  itemsTotal,
  pickupCharge,
  type = "PIECE",
  weightInfo = null,
  items = [],
}) => {
  const { loading } = useAppSelector((state) => state.order)
  const { defaultAddress } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const gstPercentage = 5


  // --- Promo code states ---
  const [discount, setDiscount] = useState(0);
  const [codeType, setCodeType] = useState<"referral" | "coupon" | null>(null);
  const [appliedCode, setAppliedCode] = useState<string>("");

  const handleApplyCode = (amount: number, type: "referral" | "coupon", code: string, minOrderAmount?: number) => {

    if (minOrderAmount && itemsTotal < minOrderAmount) {
      toast.error(`Minimum order amount for this code is ₹${minOrderAmount}`);
      return;
    }
    toast.success(`Referral code applied! ₹${amount} off`);
    setDiscount(amount);
    setCodeType(type);
    setAppliedCode(code);
  };
  const handleRemoveCode = () => {
    setDiscount(0);
    setCodeType(null);
    setAppliedCode("");
  };

  const gstAmount = Number((itemsTotal + pickupCharge) * (gstPercentage / 100))
  const totalAmount = Number(itemsTotal + pickupCharge + gstAmount - discount)
  const isAddressEmpty =
    !formData?.apartment &&
    !formData?.state &&
    !formData?.landmark &&
    !formData?.city &&
    !formData?.pincode &&
    !formData?.mobile

  const handleProceedToPayment = async () => {
    //  Basic validation
    if (
      !formData.pickupDate ||
      !formData.timeSlot ||
      !formData.apartment ||
      !formData.mobile
    ) {
      toast.error("Please complete pickup details")
      return
    }

    //  Show confirmation FIRST
    const result = await Swal.fire({
      title: "Proceed to Payment?",
      text: "If you proceed to payment, the order can be cancelled, but the amount paid will not be refunded.",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Reschedule",
      cancelButtonText: "Cancel Order ",
      reverseButtons: true,
    })

    //  Reschedule → just go back
    if (result.isDenied) {
      toast("You can reschedule pickup details", { icon: "ℹ️" })
      return
    }

    //  Cancel → no API call
    if (result.dismiss === Swal.DismissReason.cancel) {
      toast.success("Order cancelled")
      navigate("/")
      return
    }

    // Only NOW create order
    if (result.isConfirmed) {
      try {
        const orderPayload: any = {
          addressId: defaultAddress?.id || undefined,
          apartment: formData.apartment,
          city: formData.city,
          landmark: formData.landmark,
          state: formData.state,
          pincode: formData.pincode,
          mobile: formData.mobile,
          instructions: formData.instructions,
          pickupDate: formData.pickupDate,
          timeSlot: formData.timeSlot,
          image: formData?.image,
          type,
          referralCode: codeType === "referral" ? appliedCode : null,
          couponCode: codeType === "coupon" ? appliedCode : null,
        }

        if (type === "WEIGHT" && weightInfo) {
          orderPayload.items = [
            {
              title: "Weight-based laundry",
              serviceType: weightInfo.services || [],
              quantity: Number(weightInfo.weight || 0),
              unitType: "WEIGHT",
              unitPrice: Number(weightInfo.pricePerKg || 0),
              totalPrice: Number(itemsTotal || 0),
            },
          ]
        }

        if (type === "PIECE" && Array.isArray(items) && items.length > 0) {
          orderPayload.items = items.map((item) => ({
            title: item.title,
            serviceType: item.serviceType || [],
            quantity: Number(item.quantity || 0),
            unitType: "PIECE",
            unitPrice: Number(item.unitPrice || 0),
            totalPrice: Number(item.totalPrice || 0),
          }))
        }
        const res = await dispatch(createOrderWithPickup(orderPayload)).unwrap()

        toast.success("Order confirmed")
        navigate(`/payment/${res.orderId}`)
      } catch (error: any) {
        toast.error(
          typeof error === "string"
            ? error
            : error?.message || "Failed to place order",
        )
      }
    }
  }

  return (
    <div className="w-full max-w-full lg:max-w-[640px] 2xl:max-w-[740px] lg:mb-16">
      <div className="bg-white rounded-2xl p-6 md:shadow-sm font-[Reddit_Sans]">
        <h2 className="text-[24px] text-[#555555] font-medium mb-4">
          Order Summary
        </h2>

        {type === "WEIGHT" && weightInfo && (
          <>
            <SummaryRow
              label="Weight"
              value={`${weightInfo.weight.toFixed(2)} Kg`}
            />
            <SummaryRow
              label="Price per Kg"
              value={`₹ ${weightInfo.pricePerKg.toFixed(2)}`}
            />
            <SummaryRow
              label="Services"
              value={
                weightInfo.services.length > 0
                  ? weightInfo.services.join(" / ")
                  : "-"
              }
            />
          </>
        )}

        <SummaryRow
          label={`Item (${itemsCount})`}
          value={`₹ ${Number(itemsTotal || 0).toFixed(2)}`}
        />

        <SummaryRow
          label="Pickup & Delivery"
          value={`₹ ${Number(pickupCharge || 0).toFixed(2)}`}
        />
        <SummaryRow
          label="GST (5%)"
          value={`₹ ${Number(gstAmount || 0).toFixed(2)}`}
        />

        <hr className="my-4 border-[#D9D9D9]" />

        <PromoCodeInput
          appliedCode={appliedCode}
          onApply={handleApplyCode}
          onRemove={handleRemoveCode}
        />

        {discount > 0 && (
          <SummaryRow
            label={`Discount (${codeType || ""})`}
            value={`- ₹${discount.toFixed(2)}`}
          />
        )}

        <SummaryRow
          label="Total Amount"
          value={`₹ ${Number(totalAmount || 0).toFixed(2)}`}
          bold
        />
        <hr className="my-4 border-[#D9D9D9]" />

        <div className="mt-6 text-[20px] text-[#555555] flex flex-col gap-4">
          <p className=" text-[#898A8D] ">Pickup Date & Time</p>
          <p>
            {formData.pickupDate
              ? new Date(formData.pickupDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              : "Select PickupDate"}
          </p>
          <p>{formData.timeSlot || "Select PickupTime"}</p>
        </div>

        <div className="mt-4 text-[20px]">
          <p className=" text-[#898A8D] mb-4">Pickup Address</p>
          <p className="text-[#555555]">
            {isAddressEmpty ? (
              "Please fill the address"
            ) : (
              <>
                {`${formData?.apartment || "_"},  ${formData?.landmark || "_"}, ${formData?.city || "_"},${formData?.state || "_"} - ${formData?.pincode || "_"}`}
                <br />
                +91 {formData?.mobile || ""}
              </>
            )}
          </p>
        </div>
        <hr className="my-4 border-[#D9D9D9]" />

        <p className="text-[20px] text-[#555555] mt-6 flex gap-4">
          <img src={truck} alt="truck" />
          Expected Delivery Date
        </p>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center text-[20px] text-[#555555]">
          <FaRegCalendarAlt className="text-[#2375FF] mr-3 w-6 h-6" />

          <div>
            <p className="mt-1 flex flex-col">
              {formData.pickupDate
                ? getDeliveryDateFromPickup(formData.pickupDate, 2)
                : "Select Pickup Date"}

              <span className="mt-4">
                {formData.pickupDate
                  ? "Your laundry will be delivered in 2 days"
                  : "Select a pickup date to see delivery"}
              </span>
            </p>

            <p>
              {formData.pickupDate
                ? new Date(formData.pickupDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "Select Pickup Date"}
            </p>
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          disabled={loading}
          className={`lg:mt-16 mt-10 w-full text-[20px] text-white py-3 rounded-lg font-medium
    ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#448AFF] hover:bg-[#2d6edf]"
            }
  `}
        >
          {loading ? "Placing Order..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  )
}

export default OrderSummary

const SummaryRow = ({
  label,
  value,
  bold = false,
}: {
  label: string
  value: string
  bold?: boolean
}) => (
  <div className="flex justify-between text-[20px] mb-4 font-[Reddit_Sans]">
    <span className={bold ? "font-semibold text-[#050505]" : "text-[#898A8D]"}>
      {label}
    </span>
    <span className={bold ? "font-semibold text-[#050505]" : "text-[#898A8D]"}>
      {value}
    </span>
  </div>
)


const PromoCodeInput = ({
  onApply,
  onRemove,
  appliedCode,
}: {
  onApply: (amount: number, type: "referral" | "coupon", code: string, minOrderAmount?: number) => void;
  onRemove: () => void;
  appliedCode: string | null;
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return toast.error("Enter a code first");
    setLoading(true);

    try {
      // Try referral first
      const res = await api.post("/vouchers", {
        referralCode: code,
      });

      if (res.data.success) {
        const allVouchers = [...res.data.myVouchers, ...res.data.givenVouchers];

        // Find voucher by code that is not expired and not used
        const voucher = allVouchers.find(
          (v: any) =>
            v.code === code &&
            !v.isExpired &&
            !v.isUsedByReceiver &&
            !v.isUsedByReferrer
        );

        if (voucher) {
          onApply(voucher.discount, "referral", code, voucher.minOrderAmount);
        } else {
          toast.error("No valid voucher found or its expired");
        }
      } else {
        // throw new Error(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err: any) {
      const message =
      err.response?.data?.message || "Something went wrong";
      toast.error(message);


      // If in future you have coupon API, replace the return with actual API call:
      /*
      try {
        const resCoupon = await api("/api/apply-coupon", {
          method: "POST",
          body: { couponCode: code },
        });
        if (resCoupon.success) {
          onApply(resCoupon.breakdown.couponDiscount, "coupon");
          toast.success(resCoupon.message);
        } else {
          throw new Error(resCoupon.message);
        }
      } catch (err2: any) {
        toast.error(err2.message || "Invalid code");
      }
      */
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex gap-2 items-center mb-3">
      <input
        type="text"
        placeholder="Enter referral or coupon code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={!!appliedCode || loading}
        className="border rounded px-3 py-2 flex-1"
      />
      {appliedCode ? (
        <button
          onClick={() => {
            onRemove();
            setCode("");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      ) : (
        <button
          onClick={handleApply}
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      )}
    </div>
  );
};