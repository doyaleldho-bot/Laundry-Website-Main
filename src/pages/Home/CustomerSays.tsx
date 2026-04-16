// import React, { useEffect, useRef, useState } from "react"
// import { TfiArrowLeft, TfiArrowRight } from "react-icons/tfi"

// import img1 from "../../assets/images/customerSays/Rectangle 1.svg"
// import img2 from "../../assets/images/customerSays/Rectangle 2.svg"
// import img3 from "../../assets/images/customerSays/Rectangle 3.svg"
// import img4 from "../../assets/images/customerSays/Rectangle 4.svg"
// import img5 from "../../assets/images/customerSays/Rectangle 5.svg"
// import img6 from "../../assets/images/customerSays/Rectangle 6.svg"
// import img7 from "../../assets/images/customerSays/Rectangle 7.svg"
// import img8 from "../../assets/images/customerSays/Rectangle 8.svg"
// import img9 from "../../assets/images/customerSays/Rectangle 9.svg"
// import img10 from "../../assets/images/customerSays/Rectangle 10.svg"
// import img11 from "../../assets/images/customerSays/Rectangle 11.svg"
// import img12 from "../../assets/images/customerSays/Rectangle 12.svg"
// import img13 from "../../assets/images/customerSays/Rectangle 13.svg"
// import img14 from "../../assets/images/customerSays/Rectangle 14.svg"

// import avr1 from "../../assets/images/customerSays/Ellipse 10 (1).svg"
// import avr2 from "../../assets/images/customerSays/Ellipse 10 (2).svg"
// import avr3 from "../../assets/images/customerSays/Ellipse 10.svg"

// interface ImageItem {
//   src: string
//   className: string
// }

// const images: ImageItem[] = [
//   { src: img1, className: "h-[196px] left-[50px] lg:left-[82px] top-[60px]" },
//   { src: img2, className: "h-[196px] left-[50px] lg:left-[82px] top-[272px]" },
//   { src: img3, className: "h-[196px] left-[223px] lg:left-[243px] top-[0px]" },
//   {
//     src: img4,
//     className: "h-[144px] left-[223px] lg:left-[243px] top-[212px]",
//   },
//   {
//     src: img5,
//     className: "h-[145px] left-[223px] lg:left-[243px] top-[372px]",
//   },
//   {
//     src: img6,
//     className: "h-[306px] hidden md:block  left-[406px] top-[60px]",
//   },
//   { src: img7, className: "h-[306px] left-[569px] top-[22px]" },
//   { src: img8, className: "h-[306px] hidden lg:block left-[732px] top-[22px]" },
//   { src: img9, className: "h-[306px]   left-[895px] top-[60px]" },
//   {
//     src: img10,
//     className: "h-[146px] hidden xl:block left-[1058px] top-[32px]",
//   },
//   {
//     src: img11,
//     className: "h-[146px] hidden xl:block left-[1058px] top-[194px]",
//   },
//   {
//     src: img12,
//     className: "h-[146px] hidden xl:block left-[1058px] top-[356px]",
//   },
//   {
//     src: img13,
//     className: "h-[203px] hidden min-[1290px]:block left-[1221px] top-[52px]",
//   },
//   {
//     src: img14,
//     className: "h-[203px] hidden min-[1290px]:block left-[1221px] top-[266px]",
//   },
// ]

// interface Testimonial {
//   id: number
//   rating: number
//   text: string
//   name: string
//   role: string
//   avatar: string
// }

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     rating: 4,
//     text: "Very reliable service. Clothes are always fresh, clean, and delivered on time. Highly recommended.",
//     name: "Jeanpol joseph",
//     role: "IT Employee",
//     avatar: avr1,
//   },
//   {
//     id: 2,
//     rating: 5,
//     text: "Great quality wash and careful handling of clothes. Booking is easy and stress-free.",
//     name: "Anushka rohan",
//     role: "MBA Student",
//     avatar: avr2,
//   },
//   {
//     id: 3,
//     rating: 5,
//     text: "Perfect for busy days. Pickup and delivery are always on time, and the results are excellent.",
//     name: "Devanand",
//     role: "HR Manager",
//     avatar: avr3,
//   },
//   {
//     id: 4,
//     rating: 5,
//     text: "Perfect for busy days. Pickup and delivery are always on time, and the results are excellent.",
//     name: "Devanand",
//     role: "HR Manager",
//     avatar: avr3,
//   },
//   {
//     id: 5,
//     rating: 5,
//     text: "Perfect for busy days. Pickup and delivery are always on time, and the results are excellent.",
//     name: "Devanand",
//     role: "HR Manager",
//     avatar: avr3,
//   },
// ]

// const CustomerSays: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const containerRef = useRef<HTMLDivElement>(null)

//   const [isDragging, setIsDragging] = useState(false)
//   const [startX, setStartX] = useState(0)
//   const [translateX, setTranslateX] = useState(0)
//   const [prevTranslate, setPrevTranslate] = useState(0)

//   const [cardsPerSlide, setCardsPerSlide] = useState(1)

//   useEffect(() => {
//     const updateCardsPerSlide = () => {
//       const width = window.innerWidth

//       if (width >= 1280) {
//         setCardsPerSlide(3)
//       } else if (width >= 768) {
//         setCardsPerSlide(2)
//       } else {
//         setCardsPerSlide(1)
//       }
//     }

//     updateCardsPerSlide() // run on mount
//     window.addEventListener("resize", updateCardsPerSlide)

//     return () => window.removeEventListener("resize", updateCardsPerSlide)
//   }, [])
//   const maxIndex = Math.max(testimonials?.length - cardsPerSlide, 0)
//   const nextSlide = () => {
//     setActiveIndex((prev) => Math.min(prev + cardsPerSlide, maxIndex))
//   }

//   const prevSlide = () => {
//     setActiveIndex((prev) => Math.max(prev - cardsPerSlide, 0))
//   }

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true)
//     setStartX(e.clientX)
//   }

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return

//     const currentX = e.clientX
//     const diff = currentX - startX
//     setTranslateX(prevTranslate + diff)
//   }

//   const handleMouseUp = () => {
//     setIsDragging(false)
//     setPrevTranslate(translateX)
//   }

//   return (
//     <>
//       <section className=" w-full min-h-[600px]  lg:-ml-2 xl:-ml-0 2xl:-ml-20   mt-12 2xl:flex 2xl:justify-center overflow-hidden lg:overflow-visible">
//         <div className=" w-full max-w-[1280px] 2xl:flex justify-center">
//           <div className="relative w-full max-w-[1280px] h-[520px] ">
//             {images.map((item, index) => (
//               <div
//                 key={index}
//                 className={`absolute w-[139px] rounded-2xl overflow-hidden ${item.className}`}
//               >
//                 <img src={item.src} className="w-full h-full object-cover" />
//               </div>
//             ))}
//             {/* Title */}

//             <div className="absolute hidden md:block left-1/2 top-[392px] xl:-translate-x-5 translate-x-1 text-center font-['Reddit_Sans'] font-semibold text-[36px] leading-[36px] text-[#448AFF] space-y-4">
//               <h2>What our</h2>
//               <h2>customers says</h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* TEXT */}
//       <div className=" text-center -mt-2 font-['Reddit_Sans'] text-[#474747] ">
//         <div className=" block md:hidden  text-center font-['Reddit_Sans'] font-semibold text-[36px] leading-[36px] text-[#448AFF] space-y-4">
//           <h2>What our</h2>
//           <h2>customers says</h2>
//         </div>
//         <p className="font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-tight md:mt-0 mt-10">
//           Trusted for reliability and timely delivery,
//         </p>
//         <p className="font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-tight">
//           Customer experiences speak louder than promises.
//         </p>
//       </div>

//       {/* SLIDER */}
//       <section className="w-full py-16 md: lg:px-16 relative">
//         <div className="max-w-[1280px] mx-auto  px-2 lg:px-4 relative">
//           {/* Arrows */}

//           <div className="justify-end flex gap-6">
//             {/* PREV */}
//             <button
//               onClick={prevSlide}
//               disabled={activeIndex === 0}
//               className={`w-[72px] h-[72px]  rounded-full border border-[#5D5C5C] flex items-center justify-center transition ${
//                 activeIndex === 0
//                   ? "opacity-40 cursor-not-allowed"
//                   : "hover:bg-blue-600 hover:text-white"
//               }`}
//             >
//               <TfiArrowLeft size={18} />
//             </button>

//             {/* NEXT */}
//             <button
//               onClick={nextSlide}
//               disabled={activeIndex === cardsPerSlide}
//               className={`w-[72px] h-[72px] rounded-full border border-[#5D5C5C] flex items-center justify-center transition ${
//                 activeIndex === testimonials.length - cardsPerSlide
//                   ? "opacity-40 cursor-not-allowed"
//                   : "hover:bg-blue-600 hover:text-white"
//               }`}
//             >
//               <TfiArrowRight size={18} />
//             </button>
//           </div>
//           {/* inside card */}
//           <div
//             ref={containerRef}
//             className="overflow-hidden mt-8 w-[364px] md:w-[744px] xl:w-[1120px] "
//           >
//             <div
//               className={`flex gap-[16px] ${
//                 isDragging ? "" : "transition-transform duration-500"
//               }`}
//               style={{
//                 transform: `translateX(-${activeIndex * (364 + 16)}px)`,
//               }}
//             >
//               {testimonials.map((item) => (
//                 <div
//                   key={item.id}
//                   className="w-[364px] h-[249.92px] flex-shrink-0 relative rounded-2xl overflow-hidden"
//                 >
//                   <img
//                     src={item.avatar}
//                     alt={item.name}
//                     className="absolute inset-0 w-full h-full object-cover"
//                   />

//                   <div className="absolute inset-0 bg-black/40" />

//                   <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
//                     <div>
//                       <div className="flex gap-1 mb-2">
//                         {Array.from({ length: item.rating }).map((_, i) => (
//                           <span key={i} className="text-yellow-400 text-sm">
//                             ★
//                           </span>
//                         ))}
//                       </div>

//                       <p className="font-medium text-[19.29px] leading-[19.29px]">
//                         {item.name}
//                       </p>
//                     </div>

//                     <div className="w-[291.79px]">
//                       <p className="text-[19.29px] leading-[25px]">
//                         “{item.text}”
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center gap-2 mt-10">
//             {testimonials.map((_, index) => (
//               <span
//                 key={index}
//                 onClick={() => setActiveIndex(index)}
//                 className={`h-2  rounded-full transition-all ${
//                   activeIndex === index ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default CustomerSays


import React, { useEffect, useRef, useState } from "react"
import { TfiArrowLeft, TfiArrowRight } from "react-icons/tfi"
import api from "../../utils/api"

import avr1 from "../../assets/images/customerSays/Ellipse 10 (1).svg"

interface Testimonial {
  id: number
  rating: number
  text: string
  name: string
  role: string
  avatar: string
}

interface Props {
  serviceId: string
}

const CustomerSays: React.FC<Props> = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const [cardsPerSlide, setCardsPerSlide] = useState(1)

  //  RESPONSIVE CARDS
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth

      if (width >= 1280) setCardsPerSlide(3)
      else if (width >= 768) setCardsPerSlide(2)
      else setCardsPerSlide(1)
    }

    updateCardsPerSlide()
    window.addEventListener("resize", updateCardsPerSlide)

    return () => window.removeEventListener("resize", updateCardsPerSlide)
  }, [])

  //  FETCH REVIEWS
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/review/service');

        const formatted = res.data.data.map((item: any, index: number) => ({
          id: index + 1,
          rating: item.rating,
          text: item.comment,
          name: item.User?.name || "Anonymous",
          role: "Customer",
          avatar: avr1,
        }))

        setTestimonials(formatted)
      } catch (err) {
        console.error("Failed to fetch reviews", err)
      }
    }

    fetchReviews()
  }, [])

  // ✅ SLIDER LOGIC
  const maxIndex = Math.max(testimonials.length - cardsPerSlide, 0)

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + cardsPerSlide, maxIndex))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - cardsPerSlide, 0))
  }

  return (
    <section className="w-full py-16 px-4 lg:px-16">
      <div className="max-w-[1280px] mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#448AFF]">
            What our customers says
          </h2>
          <p className="text-gray-500 mt-2">
            Real feedback from our happy customers
          </p>
        </div>

        {/* EMPTY STATE */}
        {testimonials.length === 0 && (
          <p className="text-center text-gray-400">
            No reviews yet
          </p>
        )}

        {/* ARROWS */}
        {testimonials.length > cardsPerSlide && (
          <div className="flex justify-end gap-4 mb-4">
            <button
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center ${
                activeIndex === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <TfiArrowLeft />
            </button>

            <button
              onClick={nextSlide}
              disabled={activeIndex >= maxIndex}
              className={`w-12 h-12 rounded-full border flex items-center justify-center ${
                activeIndex >= maxIndex
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <TfiArrowRight />
            </button>
          </div>
        )}

        {/* SLIDER */}
        <div
          ref={containerRef}
          className="overflow-hidden"
        >
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(-${activeIndex * (364 + 16)}px)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-[364px] h-[250px] flex-shrink-0 rounded-2xl overflow-hidden relative"
              >
                {/* BACKGROUND IMAGE */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50" />

                {/* CONTENT */}
                <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">

                  {/* TOP */}
                  <div>
                    {/* ⭐ STARS */}
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${
                            star <= item.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="font-semibold text-lg">
                      {item.name}
                    </p>
                  </div>

                  {/* TEXT */}
                  <p className="text-sm leading-5">
                    “{item.text}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full cursor-pointer ${
                activeIndex === index
                  ? "w-6 bg-blue-500"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerSays