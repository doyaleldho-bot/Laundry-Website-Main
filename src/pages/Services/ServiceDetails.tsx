import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import minus from "../../assets/icons/minus.svg"
import plus from "../../assets/icons/plus.svg"
import leftArrow from "../../assets/icons/left-arrow.svg"
import rightArrow from "../../assets/icons/right-arrow.svg"
import { FiShoppingCart, FiTrash2 } from "react-icons/fi"
import {
  addItemToCart,
  decrementCartItem,
  deleteCartItem,
  getCartDetails,
} from "../../redux/action/cartThunks"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import api from "../../utils/api"
import toast from "react-hot-toast"
import socket from "../../services/soket"
import { getImage } from "../../utils/getBackendImg"

type Item = {
  id: string
  title: string
  type: string
  image?: string
  totalPrice: number
  services: {
    serviceItemId: string
    serviceId: string
    serviceName: string
    price: number
  }[]
}

type Service = {
  pricePerKg: number
  id: string
  name: string
  description: string
}

const ServiceDetails = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const [tab, setTab] = useState("per")

  // services from API
  const [services, setServices] = useState<Service[]>([])

  // selected service
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([])

  // service items
  const [serviceItems, setServiceItems] = useState<Item[]>([])

  // cartcount
  const [cartCount, setCartCount] = useState<Record<string, number>>({})

  // weight pricing
  const [pricePerKg, setPricePerKg] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)

  // redux cart
  const {
    cartId,
    itemCount,
    totalAmount,
    items: cartItems,
  } = useAppSelector((state) => state.cart)

  //sort the key make for count
  const normalizeServices = (services: string[] = []) =>
    [...services].sort().join(",")

  // pagination
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 4

  // key generator
  const makeKey = (title: string, type: string, serviceType: string) =>
    `${title}__${type}__${serviceType}`



  // set initial cart values
  useEffect(() => {
    const initialCounts: Record<string, number> = {}

    if (cartItems && cartItems.length > 0) {
      cartItems?.forEach((item) => {
        const key = makeKey(
          item.title,
          item.type || "",
          normalizeServices(item?.serviceType || []),
        )
        initialCounts[key] = item.quantity
      })
    }
    setCartCount(initialCounts)
  }, [cartItems])

  //select services

  useEffect(() => {
    const servicesFromUrl = searchParams.get("services")

    if (servicesFromUrl) {
      setSelectedServiceIds(servicesFromUrl.split(","))
    }
  }, [])

  //price per kg effect
  useEffect(() => {
    if (!selectedServiceIds.length) return

    const selected = services.filter((s) =>
      selectedServiceIds.includes(s.id)
    )

    const totalKgPrice = selected.reduce(
      (sum, s) => sum + Number(s.pricePerKg || 0),
      0
    )
    setPricePerKg(totalKgPrice)
  }, [selectedServiceIds, services])



  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      let updated

      if (prev.includes(id)) {
        updated = prev.filter((s) => s !== id)
      } else if (prev.length < 3) {
        updated = [...prev, id]
      } else {
        return prev
      }

      // store in URL
      setSearchParams({
        services: updated.join(","),
      })

      return updated
    })
  }
  /* ---------------- LOAD cart ---------------- */
  useEffect(() => {
    dispatch(getCartDetails()).unwrap()
  }, [dispatch])

  /* ---------------- LOAD SERVICES ---------------- */
  const loadServices = useCallback(async () => {
    try {
      const res = await api.get("/service/all", {
        withCredentials: true,
      })

      const data = res.data

      if (data.success) {
        setServices(data.data)
      }
    } catch (err) {
      console.error("Failed to load services", err)
    }
  }, [])

  useEffect(() => {
    loadServices()
  }, [loadServices])

  useEffect(() => {
    if (!socket) return

    const handleServiceChanged = async (payload: any) => {
      console.log("Service changed:", payload)

      // reload service list when backend says something changed
      loadServices()
      await dispatch(getCartDetails()).unwrap()
    }

    socket.on("service-changed", handleServiceChanged)

    return () => {
      socket.off("service-changed", handleServiceChanged)
    }
  }, [socket, loadServices])


  useEffect(() => {
    if (!selectedServiceIds || selectedServiceIds?.length === 0) return
    // console.log(selectedServiceIds)
    const loadItems = async () => {
      try {
        const res = await api.post(
          "/service/multiple/item",
          { serviceIds: selectedServiceIds }, //service ids from frontend url
          { withCredentials: true },
        )

        const data = res.data

        if (!data.success) return
        // price per kg (only override when backend provides explicit value)
        if (typeof data.pricePerKg !== "undefined" && data.pricePerKg !== null) {
          setPricePerKg(Number(data.pricePerKg))
        }

        //  backend → UI format with total price
        const formatted = data.data.map((item: any) => {
          // console.log(item)
          const totalPrice = (item.services || []).reduce(
            (sum: number, service: any) => sum + Number(service.price || 0),
            0,
          )

          return {
            id: `${item.costume}__${item.type || ""}`,
            title: item.costume,
            type: item.type || "",
            services: item.services || [],
            totalPrice,
            image: item.image || "",
          }
        })

        setServiceItems(formatted)
      } catch (error) {
        console.error("Load items failed", error)
      }
    }

    loadItems()
  }, [selectedServiceIds])

  /* ---------------- CART ---------------- */
  const incrementItem = async (itemId: string) => {
    try {
      // get clicked item
      const item = serviceItems.find((i) => i.id === itemId)
      if (!item) return

      //  use item's services (not selected services)
      const itemServiceNames = (item?.services || []).map((s) => s.serviceName)
      if (itemServiceNames.length === 0) {
        alert("No services found for this item")
        return
      }
      const itemServiceItemIds = (item.services || []).map(
        (s) => s.serviceItemId
      )
      // payload for backend
      const payload = [
        {
          title: item.title,
          type: item.type,
          services: itemServiceNames, // array of service names
          serviceItemIds: itemServiceItemIds,
          quantity: 1,
          image: item.image,
          unitType: "PIECE",
        },
      ]

      // wait for backend success
      await dispatch(addItemToCart(payload)).unwrap()
      await dispatch(getCartDetails())
      toast.success("Item added to cart")
    } catch (error) {
      toast.error("Failed to add item")
      console.error("Add to cart failed", error)
    }
  }

  const decrementItem = async (itemId: string) => {
    try {
      // get clicked item
      const item = serviceItems.find((i) => i.id === itemId)
      if (!item) return

      //  use item's services (not selected services)
      const itemServiceNames = (item?.services || []).map((s) => s.serviceName)
      if (itemServiceNames.length === 0) {
        alert("No services found for this item")
        return
      }

      const itemServiceItemIds = (item.services || []).map(
        (s) => s.serviceItemId
      )

      // payload for backend
      const payload = {
        title: item.title,
        type: item.type,
        services: itemServiceNames,
        serviceItemIds: itemServiceItemIds,
        unitType: "PIECE",
      }

      await dispatch(decrementCartItem(payload)).unwrap()
      await dispatch(getCartDetails())
      toast.success("Item quantity decreased")
    } catch (error) {
      toast.error("Failed to update cart")
      console.error("Decrement failed", error)
    }
  }


  const removeCartItem = async (id: string) => {
    await dispatch(deleteCartItem(id))
      .unwrap()
      .then(() => {
        toast.success("Item removed")
      })
      .catch((err) => {
        toast.error(err || "Failed to remove item")
      })
  }

  const handleWeightPickup = () => {
    if (!selectedServiceIds.length) {
      toast.error("Select at least one service")
      return
    }

    if (!weight || weight <= 0) {
      toast.error("Enter valid weight")
      return
    }

    if (!pricePerKg || pricePerKg <= 0) {
      toast.error("Price not available")
      return
    }

    const selectedServices = services
      .filter((s) => selectedServiceIds.includes(s.id))
      .map((s) => s.name)

    const totalAmount = weight * pricePerKg

    console.log("NAVIGATING", {
      weight,
      pricePerKg,
      totalAmount,
      selectedServices,
    })

    navigate("/pickup", {
      state: {
        type: "WEIGHT",
        weight,
        pricePerKg,
        totalAmount,
        services: selectedServices,
        itemsCount: 1,
        itemsTotal: totalAmount,
        pickupCharge: 50,
      },
    })
  }
  const handlePiecePickup = () => {
    if (displayItems.length === 0) {
      toast.error("Add at least one item to cart before scheduling pickup")
      return
    }

    const orderItems = displayItems.map((item) => ({
      title: item.title,
      serviceType: item.serviceType
        ? item.serviceType.split(" /").map((s) => s.trim()).filter(Boolean)
        : [],
      quantity: Number(item.qty),
      unitType: "PIECE",
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.total),
    }))

    navigate("/pickup", {
      state: {
        type: "PIECE",
        itemsCount: displayItems.length,
        itemsTotal: subtotal,
        pickupCharge: 50,
        items: orderItems,
      },
    })
  }

  const imagePlaceholder = "https://placehold.co/80x80?text=Cloth"

  const totalPages = Math.ceil(serviceItems.length / PAGE_SIZE)
  /* ---------------- PAGINATION ---------------- */
  const visibleItems = useMemo(() => {
    const start = page * PAGE_SIZE
    const end = start + PAGE_SIZE
    return serviceItems.slice(start, end)
  }, [serviceItems, page])

  const loadMore = () => setPage((p) => p + 1)

  /* ---------------- TOTAL ---------------- */
  const totalPiecePrice = Object.entries(cartCount).reduce((sum, [id, qty]) => {
    const item = serviceItems.find((i) => i.id === id)
    return sum + (item?.price || 0) * qty
  }, 0)

  const totalWeightPrice = weight * pricePerKg
  const total = totalPiecePrice + totalWeightPrice

  const selectedServiceName = services
    .filter((s) => selectedServiceIds.includes(s.id))
    .map((s) => s.name)

    const selectedServiceDescription = services
    .filter((s) => selectedServiceIds.includes(s.id))
    .map((s) => `${s.name} - ${s.description}`)
    .join("  ")

  const displayItems =
    cartItems?.map((item: any) => {
      const qty = Number(item.quantity || 0)
      const unitPrice = Number(item.unitPrice || 0)

      return {
        id: item.id,
        title: item.title,

        // join multiple services for display
        serviceType: item.serviceType?.join(" / ") || "",

        // optional image fallback
        image: item.image || imagePlaceholder,

        qty,
        unitPrice,
        total: qty * unitPrice,
      }
    }) || []

  const subtotal = displayItems.reduce((sum, item) => sum + item.total, 0)
  /* ---------------- UI ---------------- */
  return (
    <section className="px-6 md:px-12 lg:px-24 py-12">
      {/* ---------- TITLE ---------- */}
      <h1 className="text-3xl font-bold text-[#448AFF] mb-2">
        {selectedServiceName?.join(" / ") || ""}
      </h1>

      <p className="mt-5 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#7D7D7D] mb-6 w-full text-justify">
       {selectedServiceDescription || "Select services to see details and schedule pickup"}
      </p>

      {/* ---------- SERVICE PILLS ---------- */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 items-center  ">
          {services.map((s) => (
            <button
              key={s.id}
              disabled={
                selectedServiceIds.length >= 3 &&
                !selectedServiceIds.includes(s.id)
              }
              onClick={() => toggleService(s.id)}
              className={`h-[48px] rounded-full border whitespace-nowrap transition ${selectedServiceIds?.includes(s.id) ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 hover:bg-gray-100"} disabled:bg-gray-200  disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed `}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
      {/* ---------- TABS ---------- */}
      <div className="max-w-[1100px] mx-auto mb-6 mt-10">
        <div className="bg-gray-200 rounded-full p-1 flex items-center">
          <button
            onClick={() => setTab("per")}
            className={`flex-1 text-center py-3 rounded-full transition ${tab === "per" ? "bg-white shadow text-gray-800" : "text-gray-600"
              }`}
          >
            Per Piece
          </button>

          <button
            onClick={() => setTab("weight")}
            className={`flex-1 text-center py-3 rounded-full transition ${tab === "weight"
                ? "bg-white shadow text-gray-800"
                : "text-gray-600"
              }`}
          >
            By Weight
          </button>
        </div>
      </div>
      {/* ---------- MAIN GRID ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN — ITEMS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Items</h2>
            </div>

            <div className="space-y-4">
              {/* ---------- PER PIECE ---------- */}
              {tab === "per" ? (
                visibleItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={getImage(item.image) || imagePlaceholder}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />

                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-black/60">
                          ₹ {item.totalPrice}/piece
                        </div>
                        {/* services list */}
                        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
                          {item.services?.map((service, index) => (
                            <div
                              key={index}
                              className="relative group whitespace-nowrap"
                              title={`₹ ${service.price}`}
                            >
                              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-400 rounded-full hover:text-gray-500 hover:bg-blue-100">
                                {service.serviceName}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrementItem(item?.id)}
                        className="w-10 h-10 flex items-center justify-center"
                      >
                        <img src={minus} className="w-6 h-6" />
                      </button>

                      <div className="min-w-[24px] text-center">
                        {cartCount[
                          makeKey(
                            item?.title,
                            item?.type,
                            normalizeServices(
                              (item?.services || []).map((s) => s.serviceName)
                            )
                          )
                        ] || 0}
                      </div>

                      <button
                        onClick={() => incrementItem(item.id)}
                        className="w-10 h-10 flex items-center justify-center"
                      >
                        <img src={plus} className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                /* ---------- BY WEIGHT ---------- */
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-lg font-medium mb-3">Price by weight</h4>

                  <label className="text-sm text-gray-600">Weight (Kg)</label>
                  <input
                    type="text"
                    step={0.1}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full mt-2 mb-4 p-3 border rounded"
                  />

                  <label className="text-sm text-gray-600">Price per kg</label>
                  <input
                    readOnly
                    value={pricePerKg > 0 ? `₹ ${pricePerKg}` : "Not available"}
                    className="w-full mt-2 mb-4 p-3 border rounded bg-gray-50"
                  />

                  <label className="text-sm text-gray-600">Total Price</label>
                  <div className="w-full mt-2 mb-4 p-3 border rounded text-blue-600">
                    {pricePerKg > 0
                      ? `₹ ${(weight * pricePerKg).toFixed(2)}`
                      : "₹ 0.00"}
                  </div>


                  <p className="text-md text-gray-500 mb-4">
                    *This is an estimated price. Final amount will be calculated by our delivery staff during pickup based on actual weight.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={handleWeightPickup}
                      className="px-6 py-2 bg-blue-600 text-white rounded"
                    >
                      Continue to Pickup
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ---------- PAGINATION ARROWS ---------- */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-12 h-12 flex items-center justify-center disabled:opacity-40"
              >
                <img src={leftArrow} className="w-6 h-6" />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="w-12 h-12 flex items-center justify-center disabled:opacity-40"
              >
                <img src={rightArrow} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — CART */}
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5 text-gray-700" />
                <h3 className="font-medium">Your Cart</h3>
              </div>

              {displayItems.length > 0 && (
                <span className="text-sm text-gray-500">
                  {displayItems.length} item(s)
                </span>
              )}
            </div>

            <div className="space-y-3 mb-4">
              {displayItems.length === 0 && (
                <div className="text-sm text-gray-500">No items in cart</div>
              )}

              {displayItems.map((it) => (
                <div
                  key={it.id}
                  className="flex items-start justify-between bg-gray-50 p-3 rounded"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getImage(it.image) || imagePlaceholder}
                      className="w-10 h-10 rounded-md"
                    />

                    <div>
                      <div className="text-sm font-medium text-blue-500">
                        {it.serviceType}
                      </div>
                      <div className="text-sm font-medium">{it.title}</div>
                      <div className="text-xs text-gray-500">
                        {it.qty} × ₹ {it.unitPrice}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">₹ {it.total}</div>

                    <button
                      onClick={() => removeCartItem(it.id)}
                      className="text-red-500"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-4">

              {/* Total */}
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Amount</span>
                <span>₹ {subtotal}</span>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500 leading-snug">
                Note: GST and delivery charges will be calculated based on your location at checkout.
              </p>

              {/* Button */}
              <button
                onClick={tab === "weight" ? handleWeightPickup : handlePiecePickup}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Schedule a pickup
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetails
