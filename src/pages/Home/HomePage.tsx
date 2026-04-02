import React from "react"
import { RxArrowTopRight } from "react-icons/rx"
import FloatingContactButtons from "../../components/ContactIcons/floatingContactButtons"
import homeVideo from "../../assets/video/192140-892436357 (1).mp4"

const Home: React.FC = () => {
  const slides = [
    {
      type: "video",
      src: homeVideo,
      text1: "From Pickup to Delivery,",
      text2: "We Take Care of Your Laundry ",
    },
    {
      type: "image",
      src: "/images/HomePage/HomePg.webp",
      text1: "Fresh Laundry, Right",
      text2: "around the corner",
    },

    {
      type: "image",
      src: "/images/HomePage/home3.svg",
      text1: "Get Up to",
      text2: "30% OFF",
      text3: "On Your First Laundry Order",
    },
  ] as const

  const [currentIndex, setCurrentIndex] = React.useState(0)

  // Auto carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div
      id="home"
      className="relative min-h-screen text-white transition-all duration-700 overflow-x-hidden scroll-mt-0"
      style={{
        fontFamily:
          "Reddit Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        backgroundImage:
          slides[currentIndex].type === "image"
            ? `url('${slides[currentIndex].src}')`
            : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Video background ONLY for first slide */}
      {slides[currentIndex].type === "video" && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={slides[currentIndex].src}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          currentIndex === 2 ? "bg-black/0" : "bg-black/40"
        }`}
      />

      <section>
        <main className="relative z-10 min-h-screen">
          {currentIndex !== 3 && (
            <div className="mx-auto max-w-7xl px-6">
              <div className="absolute  bottom-22 md:bottom-24  left-6 md:left-auto max-w-2xl text-left">
                <h1 className="text-3xl font-[Reddit_Sans]  md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                  <span
                    className={`${
                      currentIndex === 2
                        ? "text-lg font-normal   md:text-xl lg:text-4xl "
                        : ""
                    }`}
                  >
                    {slides[currentIndex]?.text1}
                  </span>
                  <br />
                  <span
                    className={`${
                      currentIndex === 2
                        ? "text-3xl   md:text-5xl lg:text-7xl "
                        : ""
                    }`}
                  >
                    {slides[currentIndex]?.text2}
                  </span>
                </h1>
                {currentIndex === 2 && (
                  <h1
                    className="text-xl md:text-3xl w-72 md:w-[430px] lg:w-auto lg:text-[38px] font-medium  drop-shadow-lg p-4 mt-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #448AFF 0%, #295399 100%)",
                    }}
                  >
                    {slides[currentIndex]?.text3}
                  </h1>
                )}
                <p className="mt-4 md:mt-6 text-lg text-white/90">
                  Professional care for your everyday clothes – fast, reliable,
                  nearby.
                </p>

                <div className="mt-6 md:mt-8">
                  <button className="rounded-full border border-white/60 px-5 py-3 text-white hover:bg-white/10 flex items-center gap-3 transition">
                    Schedule Pick-Up
                    <RxArrowTopRight className="h-4 w-4 md:h-6 md:w-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Carousel dots */}
          <div
            className="absolute 
              left-1/2 -translate-x-1/2 
              bottom-10 md:bottom-22
              z-20 flex gap-3"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white scale-110" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </main>

        {/* Floating WhatsApp & Phone Icons */}
        <FloatingContactButtons />
      </section>
    </div>
  )
}

export default Home
