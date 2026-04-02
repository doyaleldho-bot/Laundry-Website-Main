import deliveryTruck from "../../assets/icons/delivery-truck.png"
import cleanFold from "../../assets/icons/clean-fold.png"
import deliveryToYou from "../../assets/icons/deliverytoyou.png"

const HowItWroks = () => {
  return (
    <div>
      {/* How its Work */}
      <section className="relative ">
        <div
          className="relative w-full bg-cover bg-center min-h-[520px] sm:min-h-[650px] md:min-h-[780px] lg:min-h-[911px] flex items-start"
          style={{ backgroundImage: "url('/images/HomePage/howItsWork.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-center text-3xl sm:text-4xl  text-white mb-10 font-['Reddit_Sans'] font-semibold">
              How it’s work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-center z-20 ">
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 text-center text-white flex flex-col items-center gap-6 lg:translate-y-0 w-full sm:w-[220px] md:w-[240px]  lg:w-[280px] xl:w-[389px] h-[280px] md:h-[360px] lg:h-[451px] pt-[24px] md:pt-[40px] lg:pt-[70px] px-4 group transform duration-700">
                <div className="w-12 md:w-14 lg:w-20 h-12 md:h-14 lg:h-20 rounded-full  bg-blue-500 flex items-center justify-center text-white group-hover:bg-blue-100 group-hover:text-blue-500 font-semibold text-lg md:text-xl lg:text-2xl">
                  1
                </div>
                <h3 className="font-['Reddit_Sans'] group-hover:text-black text-[16px] md:text-[20px] lg:text-[32px] leading-[100%]  font-medium h-[30px] lg:h-[42px] w-full text-center">
                  Schedule a Pickup
                </h3>
                <p className="font-['Reddit_Sans'] group-hover:text-black text-[13px] md:text-[15px] lg:text-[20px] leading-[100%] lg:mt-5 font-regular  h-[54px] md:h-[64px] lg:h-[78px] w-full text-center">
                  turnaround times and reliable service, we ensure your laundry
                  is done right—every time.
                </p>
                <div className="mt-2 text-white/90 group-hover:text-black">
                  <img
                    src={deliveryTruck}
                    alt="icon"
                    className="h-6 w-6 mx-auto opacity-80"
                  />
                </div>
              </div>

              {/* Step 2 - center lower */}
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 text-center text-white flex flex-col items-center gap-6 md:translate-y-28 lg:translate-y-30 xl:translate-y-40 w-full sm:w-[220px] md:w-[240px]  lg:w-[280px] xl:w-[389px] h-[280px] md:h-[360px] lg:h-[451px] pt-[24px] md:pt-[40px] lg:pt-[70px] px-4 group transform duration-700">
                <div className="w-12 md:w-14 lg:w-20 h-12 md:h-14 lg:h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg md:text-xl lg:text-2xl group-hover:bg-blue-100 group-hover:text-blue-500">
                  2
                </div>
                <h3 className="font-['Reddit_Sans'] group-hover:text-black text-[16px] md:text-[20px] lg:text-[32px] leading-[100%] font-medium h-[30px] lg:h-[42px] w-full text-center">
                  Cleaned & Folded
                </h3>
                <p className="font-['Reddit_Sans'] group-hover:text-black text-[13px] md:text-[15px] lg:text-[20px] leading-[100%] lg:mt-5 font-regular h-[54px] md:h-[64px] lg:h-[78px] w-full text-center">
                  We professionally clean, dry, and fold your laundry using
                  gentle methods and high-quality detergents.
                </p>
                <div className="mt-2 text-white/90">
                  <img
                    src={deliveryToYou}
                    alt="icon"
                    className="h-6 w-6 mx-auto opacity-80"
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 text-center text-white flex flex-col items-center gap-6 lg:translate-y-0 w-full sm:w-[220px] md:w-[240px] lg:w-[280px] xl:w-[389px] h-[280px] md:h-[360px] lg:h-[451px] pt-[24px] md:pt-[40px] lg:pt-[70px] px-4 group transform duration-700">
                <div className="w-12 md:w-14 lg:w-20 h-12 md:h-14 lg:h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg md:text-xl lg:text-2xl group-hover:bg-blue-100 group-hover:text-blue-500">
                  3
                </div>
                <h3 className="font-['Reddit_Sans'] text-[16px] md:text-[20px] lg:text-[32px] leading-[100%] font-medium h-[30px] lg:h-[42px] w-full text-center group-hover:text-black">
                  Delivered to You
                </h3>
                <p className="font-['Reddit_Sans'] text-[13px] md:text-[15px] lg:text-[20px] leading-[100%] lg:mt-5 font-regular h-[54px] md:h-[64px] lg:h-[78px] w-full text-center group-hover:text-black">
                  Clean, freshly washed clothes brought straight to your
                  doorstep — folded and ready to wear.
                </p>
                <div className="mt-2 text-white/90">
                  <img
                    src={cleanFold}
                    alt="icon"
                    className="h-6 w-6 mx-auto opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWroks
