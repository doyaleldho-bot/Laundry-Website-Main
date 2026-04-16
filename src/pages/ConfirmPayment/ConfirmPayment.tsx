import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";


export default function ConfirmPayment() {
    const [selected, setSelected] = useState("advance");
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [amounts, setAmounts] = useState({
        total: 0,
        advance: 0,
        remaining: 0,
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${orderId}/summary`);
                setAmounts({
                    total: res.data.data.totalAmount,
                    advance: res.data.data.advanceAmount,
                    remaining: res.data.data.remainingAmount,
                });
            } catch (err: any) {
                toast.error("Failed to load order");
            }
        };

        if (orderId) fetchOrder();
    }, [orderId]);

    const handleConfirm = async () => {
        try {
            const paymentMethod =
                selected === "cod" ? "COD" : "ONLINE";

            const toastId = toast.loading("Confirming order...");

            const res = await api.patch(`/orders/${orderId}/confirm`, {
                paymentMethod,
                paymentType:
                    paymentMethod === "ONLINE"
                        ? selected === "advance"
                            ? "ADVANCE"
                            : "FULL"
                        : null, //
            });
            const data = res.data;

            toast.dismiss(toastId);
            toast.success("Order confirmed");

            //  COD → no payment page
            if (paymentMethod === "COD") {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                //  ONLINE → go to payment page
                setTimeout(() => {
                    navigate(`/payment/gateway/${data.order.id}`);
                }, 1500);
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };


    return (
        <div className="w-full flex justify-center py-10 bg-gray-50 min-h-[calc(100vh-120px)]">
            <div
                className="bg-white rounded-[20px] p-[40px] flex flex-col gap-[10px]"
                style={{ width: "652px" }}
            >
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-[32px] font-medium leading-[100%]">
                        Choose a payment method
                    </h2>
                    <button className="text-xl">✕</button>
                </div>

                <p className="text-[17px] text-gray-500 leading-[100%]">
                    Select your preferred payment option to continue
                </p>

                {/* Options */}
                <div className="flex flex-col gap-[16px] mt-[10px]">
                    <OptionBox
                        selected={selected === "advance"}
                        onClick={() => setSelected("advance")}
                        title="Advance Amount"
                        desc="Pay 50% now, remaining on delivery"
                    />

                    <OptionBox
                        selected={selected === "full"}
                        onClick={() => setSelected("full")}
                        title="Full Payment settle"
                        desc="Pay complete amount now and relax"
                    />

                    <OptionBox
                        selected={selected === "cod"}
                        onClick={() => setSelected("cod")}
                        title="Cash on Delivery"
                        desc="Pay when your laundry is picked up"
                    />
                </div>

                {/* Info Box */}
                <div
                    className="mt-[10px] p-[20px] rounded-[15px] border"
                    style={{
                        width: "572px",
                        height: "177px",
                        borderColor: "#E5E7EB",
                    }}
                >
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            i
                        </div>

                        <p className="text-gray-600 text-[15px]">
                            {selected === "advance" &&
                                "Pay 50% of the total amount including pickup charge to confirm your booking."}
                            {selected === "full" &&
                                "Pay full amount now to confirm your booking instantly."}
                            {selected === "cod" &&
                                "No advance required. Pay when service is completed."}
                        </p>
                    </div>
                    <div className="mt-6 text-[15px] text-gray-700">
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span>₹ {amounts.total.toFixed(2)}</span>
                        </div>

                        {selected !== "cod" && (
                            <>
                                <div className="flex justify-between mt-2 text-blue-600 font-medium">
                                    <span>
                                        {selected === "advance"
                                            ? "Advance payable:"
                                            : "Payable:"}
                                    </span>
                                    <span>
                                        ₹{" "}
                                        {selected === "advance"
                                            ? amounts.advance.toFixed(2)
                                            : amounts.total.toFixed(2)}
                                    </span>
                                </div>

                                {selected === "advance" && (
                                    <div className="flex justify-between mt-2">
                                        <span>Remaining:</span>
                                        <span>₹ {amounts.remaining.toFixed(2)}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleConfirm}
                    className="mt-[20px] h-[56px] rounded-[12px] bg-gradient-to-r from-blue-500 to-blue-700 text-white text-[16px] font-medium"
                >
                    {selected === "advance"
                        ? "Confirm & Pay Advance"
                        : selected === "full"
                            ? "Confirm & Pay Full"
                            : "Confirm Order"}
                </button>
            </div>
        </div>
    );
}

/* Option Box */
function OptionBox({ selected, onClick, title, desc }: any) {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between cursor-pointer px-[20px]"
            style={{
                width: "572px",
                height: "99px",
                borderRadius: "15px",
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderColor: selected ? "#448AFF" : "#E5E7EB",
                backgroundColor: selected ? "#F5F9FF" : "white",
            }}
        >
            <div>
                <h3 className="text-[18px] font-medium">{title}</h3>
                <p className="text-[14px] text-gray-500 mt-1">{desc}</p>
            </div>

            <div
                className="w-5 h-5 rounded-full border flex items-center justify-center"
                style={{
                    borderColor: selected ? "#448AFF" : "#9CA3AF",
                }}
            >
                {selected && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                )}
            </div>
        </div>
    );
}